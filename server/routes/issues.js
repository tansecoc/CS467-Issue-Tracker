const router = require('express').Router();
const e = require('express');
const passport = require('passport');
let pool = require('../config/database');

/* ------------- Begin Model Functions ------------- */

// Gets user info from user_email
async function getUserInfo(pool, user_email) {
    let userData = await pool.select().from('users').where('user_email', user_email);
    return userData[0];
}

// Gets issue from issue_id
async function getIssue(pool, issue_id){
    let issueData = await pool.select().from('issues').where('issue_id', issue_id);
    return issueData[0];
}

// Updates issue
async function patchIssue(pool, issue_id, updateObject){
    return await pool('issues').where('issue_id', issue_id).update(updateObject);
}

// Deletes issue
async function deleteIssue(pool, issue_id){
    return await pool('issues').where('issue_id', issue_id).del();
}

// Validates whether given issue with issue_id belongs to org with org_id
async function isInOrg(pool, issue_id, org_id){
    if (org_id === undefined || org_id === null){
        return false
    }
    let issuesJoinProjects = await pool('issues')
    .select('issues.issue_id', 'projects.org_id')
    .join('projects', 'issues.project_id', '=', 'projects.project_id')
    .where('issue_id', issue_id);
    if(issuesJoinProjects[0]){
        if(issuesJoinProjects[0].org_id === org_id){
            return true
        } else{
            return false
        }
    } else{
        return false
    }
}

/* ------------- End Model Functions ------------- */


/* ------------- Begin Controller Functions ------------- */

// Creates a new issue
router.post('/', async (req, res) => {
    try {
        if (req.isAuthenticated()) {

            // Required properties
            let projectID = req.body.project_id;
            let issueCreatorID = req.user.user_id;
            let issueName = req.body.issue_name;
            let issueType = (req.body.issue_type !== undefined && req.body.issue_type !== null) ? req.body.issue_type : null;
            let issuePriority = (req.body.issue_priority !== undefined && req.body.issue_priority !== null) ? req.body.issue_priority : null;
            let issueStatus = (req.body.issue_status !== undefined && req.body.issue_status !== null) ? req.body.issue_status : null;
            let issueAssigneeEmail = (req.body.issue_assignee_email !== undefined && req.body.issue_assignee_email !== null) ? req.body.issue_assignee_email : null;
            
            // Optional properties
            let issueDueDate = (req.body.issue_due_date !== undefined && req.body.issue_due_date !== null) ? req.body.issue_due_date : null;
            let issueDescription = (req.body.issue_description !== undefined && req.body.issue_description !== null) ? req.body.issue_description : null;

            // Set creation date
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            let issueCreateDate = mm + '/' + dd + '/' + yyyy;

            // Checks if all required fields of form are filled out
            if (projectID && issueCreatorID && issueName && issueType && issuePriority && issueStatus && issueAssigneeEmail){
                getUserInfo(pool, issueAssigneeEmail)
                .then(result => {
                    if(result !== undefined && result !== null){
                        pool('issues')
                        .insert(
                            {project_id: projectID, issue_creator_id: issueCreatorID, issue_name: issueName, issue_assignee_id: result.user_id, issue_create_date: issueCreateDate, issue_type: issueType, issue_priority: issuePriority, issue_status: issueStatus, issue_due_date: issueDueDate, issue_description: issueDescription}
                        )
                        .then(result => {
                            res.status(201).send(true).end()
                        })
                    } else{
                        res.status(404).send(false).end()
                    }
                })
            } else {
                res.status(400).send(false).end();
            }
        } else{
            res.status(401).send(false).end();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(false).end();
    }
})

// Partially update issue
router.put('/:issue_id', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            // User authorization
            let isAuthorized = await isInOrg(pool, req.params.issue_id, req.user.org_id);
            if(!(isAuthorized)){
                res.status(403).send(false).end();
                return;
            }
            getIssue(pool, req.params.issue_id)
            .then(issue => {
                // issue_id does not exist
                if(issue === undefined || issue === null){
                    res.status(404).send(false).end();
                } else{
                    // Sets JSON object and properties
                    let issueUpdate = {};
                    issueUpdate.issue_name = (req.body.issue_name !== undefined && req.body.issue_name !== null) ? req.body.issue_name : null;
                    issueUpdate.issue_type = (req.body.issue_type !== undefined && req.body.issue_type !== null) ? req.body.issue_type : null;
                    issueUpdate.issue_priority = (req.body.issue_priority !== undefined && req.body.issue_priority !== null) ? req.body.issue_priority : null;
                    issueUpdate.issue_status = (req.body.issue_status !== undefined && req.body.issue_status !== null) ? req.body.issue_status : null;
                    issueUpdate.issue_due_date = (req.body.issue_due_date !== undefined && req.body.issue_due_date !== null) ? req.body.issue_due_date : null;
                    issueUpdate.issue_description = (req.body.issue_description !== undefined && req.body.issue_description !== null) ? req.body.issue_description : null;

                    // Removes any falsy values from update object
                    for(let prop in issueUpdate){
                        if(!(issueUpdate[prop])){
                            delete issueUpdate[prop]
                        }
                    }
                    
                    // Changing issue_assignee_id
                    if(req.body.issue_assignee_email){
                        // Checks if issue_assignee_email is valid
                        getUserInfo(pool, req.body.issue_assignee_email)
                        .then(user => {
                            // User with issue_assignee_email found
                            if(user !== undefined && user !== null){
                                issueUpdate.issue_assignee_id = user.user_id
                                patchIssue(pool, req.params.issue_id, issueUpdate)
                                .then(result => {
                                    res.status(200).send(true).end()
                                })
                            // No user with issue_assignee_email found
                            } else{
                                res.status(404).send(false).end()
                            }
                        })
                    // Update object is empty
                    } else if(Object.keys(issueUpdate).length < 1){
                        res.status(400).send(false).end()
                    // Not changing issue_assignee_id but update object is not empty
                    } else{
                        patchIssue(pool, req.params.issue_id, issueUpdate)
                        .then(result => {
                            res.status(200).send(true).end()
                        })
                    }
                }
            })
        } else{
            res.status(401).send(false).end();
        }
    } catch (err){
        console.log(err);
        res.status(500).send(false).end();
    }
})

// Deletes an issue
router.delete('/:issue_id', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            // User authorization
            let isAuthorized = await isInOrg(pool, req.params.issue_id, req.user.org_id);
            if(!(isAuthorized)){
                res.status(403).send(false).end();
                return;
            }
            getIssue(pool, req.params.issue_id)
            .then(issue => {
                if(issue === undefined || issue === null){
                    res.status(404).send(false).end();
                } else{
                    deleteIssue(pool, req.params.issue_id)
                    .then(result => {
                        res.status(200).send(true).end();
                    })
                }
            })
        } else{
            res.status(401).send(false).end();
        }
    } catch (err){
        console.log(err);
        res.status(500).send(false).end();
    }
})

/* ------------- End Controller Functions ------------- */


module.exports = router;