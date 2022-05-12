const server = require('../server.js');
const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
require('../passport.js')(passport, LocalStrategy, server, bcrypt);
const saltRounds = 10;

/* ------------- Begin Model Functions ------------- */

function validateCookie(req, res, next) {
    const { cookies } = req;
    console.log(cookies);
    next();
}

async function obtainUserData(pool, email) {
    userData = await pool
    .select()
    .from('users')
    .where('user_email', email);

    return userData[0];
}

async function obtainOrgData(pool, org_id) {
    orgData = await pool
    .select()
    .from('organizations')
    .where('org_id', org_id);

    return orgData[0];
}

async function createUser(pool, req, hashedPwd){
    return await pool('users').insert(
        {user_first_name: req.body.first_name, user_last_name: req.body.last_name, user_email: req.body.email, user_password_hash: hashedPwd}
    )
}

/* ------------- End Model Functions ------------- */


/* ------------- Begin Controller Functions ------------- */

// Test endpoints
router.get('/', async (req, res) => {
    res.status(200).json({msg: "got it"})
})

router.post('/testlogin', passport.authenticate('local', {
    successReturnToOrRedirect: '/users',
    failureRedirect: '/losers',
    failureMessage: true
}))

// Creates new user account 
router.post('/', async (req, res) => {
    pool = await server.createPool();
    try {
        let firstName = req.body.first_name
        let lastName = req.body.last_name
        let email = req.body.email;
        let password = req.body.password;

        // Checks if all fields of form are filled out
        if (firstName && lastName && email && password){
            // Creates SALT
            bcrypt.genSalt(saltRounds, function(err, salt) {
                // Hashes password
                bcrypt.hash(password, salt, function(err, hash) {
                    // Creates user with hashed password
                    createUser(pool, req, hash)
                    .then(result => {
                        res.status(201).send(true).end()
                    })
                });
            });
        } else{
            res.status(400).json({ msg: 'Bad request.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(false).end();
    }
})

// Validate user credentials, and send back user information and cookies
router.post('/login', async (req, res) => {
    pool = await server.createPool();
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (email && password) {
            let userData = await obtainUserData(pool, email);
            if (userData.user_email === email && userData.user_password_hash === password) {
                let orgData = await obtainOrgData(pool, userData.org_id);
                res.cookie('user_id', userData.user_id);
                res.cookie('org_id', orgData.org_id);
                res.status(200).json({
                    first_name: userData.user_first_name,
                    last_name: userData.user_last_name,
                    email: userData.user_email,
                    org_id: orgData.org_id,
                    org_name: orgData.org_name
                });
            } else {
                res.status(401).json({ msg: 'Invalid credentials.' });
            }
        } else {
            res.status(400).json({ msg: 'Bad request.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(false).end();
    }
})

/* ------------- End Controller Functions ------------- */


module.exports = router;