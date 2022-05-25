const router = require("express").Router();
const passport = require("passport");
let pool = require("../config/database");

/* ------------- Begin Model Functions ------------- */

// Creates an organization
async function createOrg(pool, project_name, project_description, user_id, org_id) {
    return await pool('projects').insert({
        org_id: org_id,
        project_creator_id: user_id,
        project_name: project_name,
        project_create_date: (new Date()).toISOString().split('T')[0],
        project_description: project_description
    });
}

// Gets all projects within an organization
async function getProjects(pool, org_id) {
    return await pool.select().from("projects").where({
        org_id: org_id
    });
}

// Gets all issues within a project
async function getIssues(pool, project_id) {
    return await pool.select().from("issues").where({
        project_id: project_id
    });
}

// Updates a project's information
async function updateProject(pool, project_id, project_name, project_description) {
    if ((project_name === null || project_name === undefined) && (project_description === undefined)) {
        return;
    } else if (project_name === null || project_name === undefined) {
        return await pool('projects').where('project_id', '=', project_id).update({
            project_description: project_description
        });
    } else if (project_description === undefined) {
        return await pool('projects').where('project_id', '=', project_id).update({
            project_name: project_name
        });
    } else {
        return await pool('projects').where('project_id', '=', project_id).update({
            project_name: project_name,
            project_description: project_description
        });
    }
}

// Deletes a project
async function deleteProject(pool, project_id) {
    await pool('projects').where('project_id', '=', project_id).del();
    await pool('issues').where('project_id', '=', project_id).del();
}


/* ------------- End Model Functions ------------- */


/* ------------- Begin Controller Functions ------------- */

// Creates a new project in a user's organization
router.post('/', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            try {
                await createOrg(pool, req.body.project_name, req.body.project_description, req.cookies.user_id, req.cookies.org_id);
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

// Gets a list of all projects within a user's organization
router.get('/', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            try {
                result = await getProjects(pool, req.cookies.org_id);
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
})

// Gets a list of all issues within a project
router.get('/:project_id/issues', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            try {
                result = await getIssues(pool, req.params.project_id);
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
})

// Updates a project's information
router.put('/:project_id', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            try {
                result = await updateProject(pool, req.params.project_id, req.body.project_name, req.body.project_description);
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

// Deletes a project
router.delete('/:project_id', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            try {
                result = await deleteProject(pool, req.params.project_id);
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
