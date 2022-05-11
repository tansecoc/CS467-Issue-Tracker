'use strict';

// Require process, so we can mock environment variables.
const process = require('process');
const express = require('express');
const Knex = require('knex');
const fs = require('fs');

const app = express();
app.enable('trust proxy');

// Automatically parse request body as form data.
app.use(express.urlencoded({extended: false}));
// This middleware is available in Express v4.16.0 onwards
app.use(express.json());

// Set Content-Type for all responses for these routes.
app.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});

// Create a Winston logger that streams to Stackdriver Logging.
const winston = require('winston');
const {LoggingWinston} = require('@google-cloud/logging-winston');
const loggingWinston = new LoggingWinston();
const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console(), loggingWinston],
});

// Retrieve and return a specified secret from Secret Manager
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

async function accessSecretVersion(secretName) {
  const [version] = await client.accessSecretVersion({name: secretName});
  return version.payload.data;
}

// Set up a variable to hold our connection pool. It would be safe to
// initialize this right away, but we defer its instantiation to ease
// testing different configurations.
let pool;

app.use(async (req, res, next) => {
  if (pool) {
    return next();
  }
  try {
    pool = await createPool();
    next();
  } catch (err) {
    logger.error(err);
    return next(err);
  }
});

// [START cloud_sql_postgres_knex_create_tcp_sslcerts]
const createTcpPoolSslCerts = async config => {
  // Extract host and port from socket address
  const dbSocketAddr = process.env.DB_HOST.split(':'); // e.g. '127.0.0.1:5432'

  // Establish a connection to the database
  return Knex({
    client: 'pg',
    connection: {
      user: process.env.DB_USER, // e.g. 'my-user'
      password: process.env.DB_PASS, // e.g. 'my-user-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
      host: dbSocketAddr[0], // e.g. '127.0.0.1'
      port: dbSocketAddr[1], // e.g. '5432'
      ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(process.env.DB_ROOT_CERT), // e.g., '/path/to/my/server-ca.pem'
        key: fs.readFileSync(process.env.DB_KEY), // e.g. '/path/to/my/client-key.pem'
        cert: fs.readFileSync(process.env.DB_CERT), // e.g. '/path/to/my/client-cert.pem'
      },
    },
    // ... Specify additional properties here.
    ...config,
  });
};
// [END cloud_sql_postgres_knex_create_tcp_sslcerts]

// [START cloud_sql_postgres_knex_create_tcp]
const createTcpPool = async config => {
  // Extract host and port from socket address
  const dbSocketAddr = process.env.DB_HOST.split(':'); // e.g. '127.0.0.1:5432'

  // Establish a connection to the database
  return Knex({
    client: 'pg',
    connection: {
      user: process.env.DB_USER, // e.g. 'my-user'
      password: process.env.DB_PASS, // e.g. 'my-user-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
      host: dbSocketAddr[0], // e.g. '127.0.0.1'
      port: dbSocketAddr[1], // e.g. '5432'
    }
  });
};
// [END cloud_sql_postgres_knex_create_tcp]

// [START cloud_sql_postgres_knex_create_socket]
const createUnixSocketPool = async config => {
  const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

  // Establish a connection to the database
  return Knex({
    client: 'pg',
    connection: {
      user: process.env.DB_USER, // e.g. 'my-user'
      password: process.env.DB_PASS, // e.g. 'my-user-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
      host: `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`,
    },
    // ... Specify additional properties here.
    ...config,
  });
};
// [END cloud_sql_postgres_knex_create_socket]

// Initialize Knex, a Node.js SQL query builder library with built-in connection pooling.
const createPool = async () => {
  const config = {pool: {}};
  config.pool.max = 5;
  config.pool.min = 5;
  config.pool.acquireTimeoutMillis = 60000; // 60 seconds
  config.pool.createTimeoutMillis = 30000; // 30 seconds
  config.pool.idleTimeoutMillis = 600000; // 10 minutes
  config.pool.createRetryIntervalMillis = 200; // 0.2 seconds

  // Check if a Secret Manager secret version is defined
  // If a version is defined, retrieve the secret from Secret Manager and set as the DB_PASS
  const {CLOUD_SQL_CREDENTIALS_SECRET} = process.env;
  if (CLOUD_SQL_CREDENTIALS_SECRET) {
    const secrets = await accessSecretVersion(CLOUD_SQL_CREDENTIALS_SECRET);
    try {
      process.env.DB_PASS = secrets.toString();
    } catch (err) {
      err.message = `Unable to parse secret from Secret Manager. Make sure that the secret is JSON formatted: \n ${err.message} `;
      throw err;
    }
  }

  if (process.env.DB_HOST) {
    if (process.env.DB_ROOT_CERT) {
      return createTcpPoolSslCerts(config);
    } else {
      return createTcpPool(config);
    }
  } else {
    return createUnixSocketPool(config);
  }
};


// Routes
const testRoute = require('./routes/testRoute');
const orgs = require('./routes/orgs');
const users = require('./routes/users');
const projects = require('./routes/projects');
const issues = require('./routes/issues');

app.use('/testRoute', testRoute);
app.use('/orgs', orgs);
app.use('/users', users);
app.use('/projects', projects);
app.use('/issues', issues);


// Start server
const PORT = parseInt(process.env.PORT) || 8080;
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


// module.exports = server;
module.exports.createPool = createPool;
