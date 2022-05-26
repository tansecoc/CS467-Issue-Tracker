const router = require("express").Router();
const passport = require("passport");
let pool = require("../config/database");
const { createHash } = require('crypto');

/* ------------- Begin Model Functions ------------- */

// Creates invite code hash
function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}

// Creates an organization
async function createOrg(pool, org_creator_id, org_name) {
    let org_invite_code = hash('secret' + Date.now() + 'code');
    await pool('organizations').insert({
        org_creator_id: org_creator_id,
        org_name: org_name,
        org_create_date: (new Date()).toISOString().split('T')[0],
        org_invite_code: org_invite_code
    });
    return await pool.select('org_id').from('organizations').where({
        org_invite_code: org_invite_code
    });
}

// Gets an organization's invite code
async function getInviteCode(pool, org_id) {
    return await pool.select('org_invite_code').from('organizations').where({
        org_id: org_id
    });
}

// Gets an organization's ID given an invite code
async function getOrgIdWithInvite(pool, org_invite_code) {
    return await pool.select('org_id', 'org_name').from('organizations').where({
        org_invite_code: org_invite_code
    });
}

// Adss user to an organization
async function joinOrg(pool, org_id, user_id) {
    return await pool('users').where('user_id', '=', user_id).update({
        org_id: org_id
    });
}

// Gets all users within an organization
async function getOrgUsers(pool, org_id) {
    return await pool.select().from("users").where({
        org_id: org_id
    });
}

// Removes a user from an organization
async function leaveOrg(pool, user_id) {
    return await pool('users').where('user_id', '=', user_id).update({
        org_id: null
    })
}

/* ------------- End Model Functions ------------- */


/* ------------- Begin Controller Functions ------------- */

// Creates a new organization
router.post('/', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            try {
                let entity = await createOrg(pool, req.user.user_id, req.body.org_name);
                let org_id = entity[0].org_id;
                await joinOrg(pool, org_id, req.user.user_id);
                res.cookie('org_id', org_id, {maxAge: 10 * 24 * 60 * 60 * 1000}); // 10 days
                res.status(200).send(true).end();
            } catch (error) {
                console.log(error);
                res.status(400).send(false).end();
            }
        } else {
            res.status(401).send(false).end();
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send(false).end();
    }
})

// Gets an invite to join an organization
router.get('/invite', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            try {
                let result = await getInviteCode(pool, req.user.org_id);
                res.status(200).send(result[0]).end();
            } catch (error) {
                console.log(error);
                res.status(400).send(false).end();
            }
        } else {
            res.status(401).send(false).end();
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send(false).end();
    }
})

// Uses an invite to join an organization
router.post('/invite', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            try {
                let org = await getOrgIdWithInvite(pool, req.body.org_invite_code);
                let result = await joinOrg(pool, org[0].org_id, req.user.user_id);
                res.cookie('org_id', org[0].org_id, {maxAge: 10 * 24 * 60 * 60 * 1000}) // 10 days
                res.status(200).json({org_id: org[0].org_id, org_name: org[0].org_name}).end();
            } catch (error) {
                console.log(error);
                res.status(400).send(false).end();
            }
        } else {
            res.status(401).send(false).end();
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send(false).end();
    }
})

// Get all users of an organization
router.get('/users', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            try {
                result = await getOrgUsers(pool, req.user.org_id, );
                res.status(200).send(result).end();
            } catch (error) {
                console.log(error);
                res.status(400).send(false).end();
            }
        } else {
            res.status(401).send(false).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(false).end();
    }
});

// Removes a user from an organization
router.delete('/users', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            try {
                await leaveOrg(pool, req.user.user_id);
                res.clearCookie('org_id');
                res.status(200).send(true).end();
            } catch (error) {
                console.log(error);
                res.status(400).send(false).end();
            }
        } else {
            res.status(401).send(false).end();
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send(false).end();
    }
})


/* ------------- End Controller Functions ------------- */

module.exports = router;
