const router = require("express").Router();
const passport = require("passport");
let pool = require("../config/database");

/* ------------- Begin Model Functions ------------- */

async function getOrgUsers(pool, org_id) {
    return await pool.select().from("users").where({
        org_id: org_id
    });
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

/* ------------- End Controller Functions ------------- */

module.exports = router;