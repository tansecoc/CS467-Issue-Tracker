const server = require('../server.js');
const { Router } = require('express');
const router = Router();

/* ------------- Begin Model Functions ------------- */

async function getUsers(pool) {
    return await pool.select().from('users');
}

/* ------------- End Model Functions ------------- */


/* ------------- Begin Controller Functions ------------- */

router.get('/', async (req, res) => {
    pool = await server.createPool();
    try {
      let result = await getUsers(pool);
      res.send(result).end();
    } catch (err) {
      console.log(err);
      res.status(500).send(false).end();
    }
})

/* ------------- End Controller Functions ------------- */


module.exports = router;