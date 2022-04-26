const express = require('express');
const router = express.Router();
const pgsql = require('./dbcon.js');
const pool = pgsql.pool;

async function testFunction() { 
    var client = await pool.connect();
    var result;
    
    try {
        result = await client.query(`SELECT * FROM users`)
      } finally {
        client.release()
      }

    return result.rows;
}

router.get('/', function (req, res) {
    testFunction().then(response => {
        res.send(response);
    })
});

module.exports = router;