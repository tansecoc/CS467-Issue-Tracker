// Google Cloud postgresql database connection parameters
const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: '104.154.249.235',
  database: 'postgres',
  password: 'bennythebeaver',
  port: 5432,
});

module.exports.client = client;