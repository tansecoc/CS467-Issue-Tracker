'use strict';

const process = require('process');             // Require process, so we can mock environment variables.
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);
const knexSession = require('connect-session-knex')(session);
const passport = require('passport');
const poolPromise = require('./config/database');

require('./config/passport')
require('dotenv').config();                     // for injecting local environment

const app = express();
app.enable('trust proxy');

// Automatically parse request body as form data.
app.use(express.urlencoded({extended: true}));
// This middleware is available in Express v4.16.0 onwards
app.use(express.json());
// Use for cookie setup and management
app.use(cookieParser());

// Set Content-Type for all responses for these routes.
app.use((req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});


// // Routes for the API endpoints
// const testRoute = require('./routes/testRoute');
// const orgs = require('./routes/orgs');
// const users = require('./routes/users');
// const projects = require('./routes/projects');
// const issues = require('./routes/issues');
const test = require('./routes/test');


// Session Setup for Knex
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 10 * 24 * 60 * 60 * 1000},  // 10 days
  // // PG Sesssion set up
  // store: new pgSession({
  //     pool: pool,
  //     tableName: 'user_sessions',
  //     createTableIfMissing: true
  // })
  store: new knexSession({
      knex: poolPromise,
      tableName: 'user_sessions_knex',
      createTable: true
  })
}))


// Passport
app.use(passport.initialize());
app.use(passport.session());


// // Routes
// app.use('/testRoute', testRoute);
// app.use('/orgs', orgs);
// app.use('/users', users);
// app.use('/projects', projects);
// app.use('/issues', issues);
app.use('/test', test)


// Start server
const PORT = parseInt(process.env.PORT) || 8080;
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});