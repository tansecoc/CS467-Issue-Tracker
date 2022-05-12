const server = require('../server.js');
const { Router } = require('express');
const router = Router();

/* ------------- Begin Model Functions ------------- */

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

/* ------------- End Model Functions ------------- */


/* ------------- Begin Controller Functions ------------- */

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