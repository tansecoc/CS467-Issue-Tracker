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
    let projects = await pool.select().from("projects").where({
        org_id: org_id
    });
    let newProjects = projects.map(async project => {
        let open_count = await pool.select().from("issues").where({
            project_id: project.project_id
        }).whereNot('issue_status', 'Done').count();
        let closed_count = await pool.select().from("issues").where({
            project_id: project.project_id
        }).where('issue_status', 'Done').count();
        return { ...project, open_count: open_count[0].count, closed_count: closed_count[0].count };
    });
    const results = await Promise.all(newProjects);
    return results;
}

// Gets all issues within a project
async function getIssues(pool, project_id) {
    return await pool.select(['issues.*', {issue_assignee_id: 'users.user_id'}, { issue_assignee_first_name: 'users.user_first_name' }, { issue_assignee_last_name: 'users.user_last_name' }, { issue_assignee_email: 'users.user_email' }]).from('issues').where({
        project_id: project_id
    }).join('users', {
        'users.user_id': 'issues.issue_creator_id'
    });
}

// Gets an organization's ID for a given project
async function getOrgID(pool, project_id) {
    return await pool.select('org_id').from('projects').where({
        project_id: project_id
    });
}

// Gets a projects's name and description for a given id
async function getProject(pool, project_id) {
    return await pool.first('project_name', 'project_description').from('projects').where({
        project_id: project_id
    })
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
                await createOrg(pool, req.body.project_name, req.body.project_description, req.user.user_id, req.user.org_id);
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
                result = await getProjects(pool, req.user.org_id);
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
            entity = await getOrgID(pool, req.params.project_id);
            org_id = entity[0].org_id;
            if (req.user.org_id === org_id) {
                try {
                    result = await getIssues(pool, req.params.project_id);
                    res.status(200).send(result).end();
                } catch (error) {
                    console.log(error);
                    res.status(400).send(false).end();
                }
            } else {
                res.status(403).send(false).end();
            }
        } else {
            res.status(401).send(false).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(false).end();
    }
})

// Retrieves a project's information
router.get('/:project_id', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            entity = await getOrgID(pool, req.params.project_id);
            org_id = entity[0].org_id;
            if (req.user.org_id === org_id) {
                try {
                    result = await getProject(pool, req.params.project_id);
                    res.status(200).send(result).end();
                } catch (error) {
                    console.log(error);
                    res.status(400).send(false).end();
                }
            } else {
                res.status(403).send(false).end();
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
            entity = await getOrgID(pool, req.params.project_id);
            org_id = entity[0].org_id;
            if (req.user.org_id === org_id) {
                try {
                    result = await updateProject(pool, req.params.project_id, req.body.project_name, req.body.project_description);
                    res.status(200).send(true).end();
                } catch (error) {
                    console.log(error);
                    res.status(400).send(false).end();
                }
            } else {
                res.status(403).send(false).end();
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
            entity = await getOrgID(pool, req.params.project_id);
            org_id = entity[0].org_id;
            if (req.user.org_id === org_id) {
                try {
                    result = await deleteProject(pool, req.params.project_id);
                    res.status(200).send(true).end();
                } catch (error) {
                    console.log(error);
                    res.status(400).send(false).end();
                }
            } else {
                res.status(403).send(false).end();
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
