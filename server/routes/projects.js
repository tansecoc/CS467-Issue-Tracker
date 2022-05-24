const router = require("express").Router();
const passport = require("passport");
let pool = require("../config/database");

/* ------------- Begin Model Functions ------------- */

async function createOrg(pool, project_name, project_description, user_id, org_id) {
    return await pool('projects').insert({
        org_id: org_id,
        project_creator_id: user_id,
        project_name: project_name,
        project_create_date: (new Date()).toISOString().split('T')[0],
        project_description: project_description
    });
}

async function getProjects(pool, org_id) {
    return await pool.select().from("projects").where({
        org_id: org_id
    });
}

/* ------------- End Model Functions ------------- */


/* ------------- Begin Controller Functions ------------- */

router.post('/', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            await createOrg(pool, req.body.project_name, req.body.project_description, req.cookies.user_id, req.cookies.org_id);
            res.status(200).send(true).end();
        } else {
            res.status(401).send(false).end();
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send(false).end();
    }
})

router.get('/', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            result = await getProjects(pool, req.cookies.org_id);
            res.status(200).send(result).end();
        } else {
            res.status(401).send(false).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(false).end();
    }
});

/* ------------- End Controller Functions ------------- */


module.exports = router;