const router = require("express").Router();
const passport = require("passport");
let pool = require("../config/database");
const { createHash } = require('crypto');

/* ------------- Begin Model Functions ------------- */

async function getOrgUsers(pool, org_id) {
    return await pool.select().from("users").where({
        org_id: org_id
    });
}

function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}

async function createOrg(pool, org_creator_id, org_name, org_id) {
    let org_invite_code = hash('secret' + org_id + 'code');
    await pool('organizations').insert({
        org_creator_id: org_creator_id,
        org_name: org_name,
        org_create_date: (new Date()).toISOString().split('T')[0],
        org_invite_code: org_invite_code
    });

    return true;
}

async function getInviteCode(pool, org_id) {
    return await pool.select("org_invite_code").from("organizations").where({
        org_id: org_id
    });
}

/* ------------- End Model Functions ------------- */


/* ------------- Begin Controller Functions ------------- */

router.get("/users", async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            result = await getOrgUsers(pool, req.cookies.org_id, );
            res.send(result).end();
        } else {
            res.send('You are not authenticated');
        }
    } catch (error) {
        console.log(error);
        res.send('There was an error with this request.');
    }
});

router.post('/', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            let result = await createOrg(pool, req.cookies.user_id, req.body.org_name);
            res.send(result).end();
        } else {
            res.send('You are not authenticated');
        } 
    } catch (error) {
        console.log(error);
        res.send('There was an error with this request.');
    }
})

router.get('/invite', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            let result = await getInviteCode(pool, req.cookies.org_id);
            res.send(result[0]).end();
        } else {
            res.send('You are not authenticated');
        } 
    } catch (error) {
        console.log(error);
        res.send('There was an error with this request.');
    }
})

/* ------------- End Controller Functions ------------- */

module.exports = router;