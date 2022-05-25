const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
let pool = require('../config/database');

/* ------------- Begin Model Functions ------------- */

async function obtainOrgData(pool, org_id) {
    let orgData = await pool
    .select()
    .from('organizations')
    .where('org_id', org_id);
    return orgData[0];
}

/* ------------- End Model Functions ------------- */


/* ------------- Begin Controller Functions ------------- */

// Creates new user account 
router.post('/', async (req, res) => {
    try {
        let firstName = req.body.firstName
        let lastName = req.body.lastName
        let email = req.body.email;
        let password = req.body.password;

        // Checks if all fields of form are filled out
        if (firstName && lastName && email && password){
            bcrypt.hash(password, 10, function(err, hash){
                pool('users').insert(
                    {user_first_name: firstName, user_last_name: lastName, user_email: email, user_password_hash: hash}
                )
                .then(result => {
                    res.status(201).send(true).end()
                })
            })
        } else {
            res.status(400).send(false).end();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(false).end();
    }
})

// Validates user credentials and redirects based on failure/success
router.post('/login', passport.authenticate('local', { failureRedirect: 'login-failure', successRedirect: 'login-success' }), (err, req, res, next) => {
    if (err) next(err);
});


// Redirected to from successful /login
router.get('/login-success', (req, res, next) => {
    let userInfo = {};
    try {
        userInfo.firstName = req.user.user_first_name;
        userInfo.lastName = req.user.user_last_name;
        userInfo.email = req.user.user_email;
        res.cookie('user_id', req.user.user_id, {maxAge: 10 * 24 * 60 * 60 * 1000}) // 10 days
        if(req.user.org_id === undefined || req.user.org_id === null){
            userInfo.orgId = null;
            userInfo.orgName = null
            res.status(200).send(userInfo).end()
        } else{
            userInfo.org_id = req.user.org_id;
            obtainOrgData(pool, req.user.org_id).then(orgData => {
                userInfo.orgName = orgData.org_name;
                res.cookie('org_id', req.user.org_id, {maxAge: 10 * 24 * 60 * 60 * 1000}) // 10 days
                res.status(200).send(userInfo).end();
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(false).end();
    }
})

// Redirected to from failure /login
router.get('/login-failure', (req, res, next) => {
    try {
        res.status(401).send(false).end()
    } catch (err) {
        console.log(err);
        res.status(500).send(false).end();
    }
})

// User logout
router.get('/logout', (req, res, next) => {
    try{
        res.clearCookie('user_id');
        res.clearCookie('org_id');
        req.logout();
        res.status(200).send(true).end();
    } catch (err){
        console.log(err);
        res.status(500).send(false).end();
    }
});

/* ------------- End Controller Functions ------------- */


module.exports = router;