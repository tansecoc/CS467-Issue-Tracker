-- General guide on how to perform basic CRUD queries for each entity.
-- As the database changes to fit our needs, so will these queries and
-- more will probably need to be added.



--------------------USERS--------------------

-- View all users and their info (results ordered by user_id ascending)
SELECT * FROM users ORDER BY user_id ASC;

-- View all users' first and last names (results ordered by user_id ascending)
SELECT user_first_name, user_last_name FROM users ORDER BY user_id ASC;

-- View all users in a particular organization
SELECT * FROM users WHERE org_id = 1 ORDER BY user_id ASC;

-- Insert new user (org_id is left null when adding new members)
INSERT INTO users (user_first_name, user_last_name, user_email, user_password_hash)
VALUES ('TestF', 'TestL', 'testest@email.com', 'password');

-- Update user (cannot update user_id)
UPDATE users SET org_id = 1 WHERE user_id = 3;

-- Cannot delete users


--------------------ORGANIZATIONS--------------------

-- View all organizations and their info (results orderd by org_id ascending)
SELECT * FROM organizations ORDER BY org_id ASC;

-- Insert new organization (org_description can be left null by not including key-value pair in query below)
INSERT INTO organizations (org_creator_id, org_name, org_create_date, org_description)
VALUES (1, 'Test Org Name', '04/20/2022', 'Test description');

-- Update organization (cannot update org_id)
UPDATE organizations SET org_description = 'This is a test description' WHERE org_id = 1;

-- Cannot delete organizations


--------------------PROJECTS--------------------

-- View all projects and their info (results ordered by project_id ascending)
SELECT * FROM projects ORDER BY project_id ASC;

-- View all projects in a particular organization
SELECT * FROM projects WHERE org_id = 1 ORDER BY project_id ASC;

-- Insert new project (project_description can be left null by not including key-value pair in query below)
INSERT INTO projects (org_id, project_creator_id, project_name, project_create_date, project_description)
VALUES (3, 1, 'Test Project 6', '04/20/2022', 'Test description');

-- Update project (cannot update project_id)
UPDATE projects SET project_description = 'This is a test description' WHERE project_id = 1;

-- Delete project (this deletes all issues associated with this project as well)
DELETE FROM projects WHERE project_id = 6;


--------------------ISSUES--------------------

-- View all issues and their info (results ordered by issue_id ascending)
SELECT * FROM issues ORDER BY issue_id ASC;

-- View all issues in a particular project
SELECT * FROM issues WHERE project_id = 1 ORDER BY issue_id ASC;

-- Insert new issue (issue_due_date and issue_description can be left null by not including key-value pair in query below)
INSERT INTO issues (project_id, issue_creator_id, issue_name, issue_assignee_id, issue_create_date,
issue_type, issue_priority, issue_status, issue_due_date, issue_description)
VALUES (6, 1, 'Delete this issue', 2, '04/20/2022', 'BUG', 'LOW', 'IN PROGRESS', '04/30/2022', 'This issue must be deleted');

-- Update issues (cannot update issue_id)
UPDATE issues SET issue_description = 'This is a test description' WHERE project_id = 1;

-- Delete issue
DELETE FROM issues WHERE issue_id = 5;