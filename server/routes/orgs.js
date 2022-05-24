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
    return await pool('organizations').insert({
        org_creator_id: org_creator_id,
        org_name: org_name,
        org_create_date: (new Date()).toISOString().split('T')[0],
        org_invite_code: org_invite_code
    });
}

async function getInviteCode(pool, org_id) {
    return await pool.select('org_invite_code').from('organizations').where({
        org_id: org_id
    });
}

async function getOrgIdWithInvite(pool, org_invite_code) {
    return await pool.select('org_id', 'org_name').from('organizations').where({
        org_invite_code: org_invite_code
    });
}

async function joinOrg(pool, org_id, user_id) {
    return await pool('users').where('user_id', '=', user_id).update({
        org_id: org_id
    });
}

async function leaveOrg(pool, user_id) {
    return await pool('users').where('user_id', '=', user_id).update({
        org_id: null
    })
}

/* ------------- End Model Functions ------------- */


/* ------------- Begin Controller Functions ------------- */

router.get('/users', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            result = await getOrgUsers(pool, req.cookies.org_id, );
            res.send(result);
        } else {
            res.send('You are not authenticated');
        }
    } catch (error) {
        console.log(error);
        res.send(false);
    }
});

router.post('/', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            let result = await createOrg(pool, req.cookies.user_id, req.body.org_name);
            res.send(true);
        } else {
            res.send('You are not authenticated');
        } 
    } catch (error) {
        console.log(error);
        res.send(false);
    }
})

router.get('/invite', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            let result = await getInviteCode(pool, req.cookies.org_id);
            res.send(result[0]);
        } else {
            res.send('You are not authenticated');
        } 
    } catch (error) {
        console.log(error);
        res.send(false);
    }
})

router.post('/invite', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            let org = await getOrgIdWithInvite(pool, req.body.org_invite_code);
            let result = await joinOrg(pool, org[0].org_id, req.cookies.user_id);
            if (result === 1) {
                res.json({
                    org_name: org[0].org_name
                }).end();
            } else {
                res.status(400).send('Unable to join org');
            }
        } else {
            res.send('You are not authenticated');
        } 
    } catch (error) {
        console.log(error);
        res.send(false);
    }
})

router.delete('/users', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            let result = await leaveOrg(pool, req.cookies.user_id);
            res.send(true);
        } else {
            res.send('You are not authenticated');
        } 
    } catch (error) {
        console.log(error);
        res.send(false);
    }
})


/* ------------- End Controller Functions ------------- */

module.exports = router;
