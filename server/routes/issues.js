const router = require('express').Router();
const passport = require('passport');
let pool = require('../config/database');

/* ------------- Begin Model Functions ------------- */

async function getUserID(pool, user_email) {
    issueData = await pool.select().from('users').where('user_email', user_email);
    return issueData[0];
}

/* ------------- End Model Functions ------------- */


/* ------------- Begin Controller Functions ------------- */

// Creates a new issue
router.post('/', async (req, res) => {
    try {
        if (req.isAuthenticated()) {

            // Required
            let projectID = req.body.project_id;
            let issueCreatorID;
            if(req.cookies.user_id === undefined || req.cookies.user_id === null){
                res.status(400).send(false).end();
                return;
            } else{
                issueCreatorID = req.cookies.user_id;
            }
            let issueName = req.body.issue_name;

            // Optional
            let issueType = (req.body.issue_type !== undefined && req.body.issue_type !== null) ? req.body.issue_type : null;
            let issuePriority = (req.body.issue_priority !== undefined && req.body.issue_priority !== null) ? req.body.issue_priority : null;
            let issueStatus = (req.body.issue_status !== undefined && req.body.issue_status !== null) ? req.body.issue_status : null;
            let issueDueDate = (req.body.issue_due_date !== undefined && req.body.issue_due_date !== null) ? req.body.issue_due_date : null;
            let issueDescription = (req.body.issue_description !== undefined && req.body.issue_description !== null) ? req.body.issue_description : null;
            let issueAssigneeEmail = (req.body.issue_assignee_email !== undefined && req.body.issue_assignee_email !== null) ? req.body.issue_assignee_email : null;

            // Set creation date
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            let issueCreateDate = mm + '/' + dd + '/' + yyyy;

            // Checks if all required fields of form are filled out
            if (projectID && issueCreatorID && issueName && issueType && issuePriority && issueStatus && issueAssigneeEmail){
                getUserID(pool, issueAssigneeEmail)
                .then(result => {
                    if(result !== undefined || result !== null){
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

/* ------------- End Controller Functions ------------- */


module.exports = router;