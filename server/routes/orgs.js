const server = require('../server.js');
const { Router } = require('express');
const router = Router();

/* ------------- Begin Model Functions ------------- */

function makeCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

async function createOrg(pool, org_creator_id, org_name) {
    await pool('organizations').insert({
        org_creator_id: org_creator_id,
        org_name: org_name,
        org_create_date: (new Date()).toISOString().split('T')[0]
    })

    return true;
}

/* ------------- End Model Functions ------------- */


/* ------------- Begin Controller Functions ------------- */

router.post('/', async (req, res) => {
    pool = await server.createPool();
    try {
        let result = await createOrg(pool, req.body.org_creator_id, req.body.org_name);
        res.send(result).end();
    } catch (err) {
        console.log(err);
        res.status(500).send(false).end();
    }
})

/* ------------- End Controller Functions ------------- */

module.exports = router;