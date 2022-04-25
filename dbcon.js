// Google Cloud postgresql database connection parameters
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: '104.154.249.235',
  database: 'postgres',
  password: 'bennythebeaver',
  port: 5432,
});

module.exports.pool = pool;