/**
 * This represents some generic auth provider API, like Firebase.
 */

export const fakeAPI = {
  signin(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!JSON.parse(localStorage.getItem('ITServer_Users'))?.includes(user)) {
          reject(new Error('Invalid email or password.'));
        }
        resolve(true); // fake async
      }, 250);
    });
  },
  signup(newUser) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = JSON.parse(localStorage.getItem('ITServer_Users'));
        if (users?.includes(newUser)) {
          reject(new Error('An account already exists for this email.'));
        } else if (Array.isArray(users)) {
          users.push(newUser);
        } else {
          users = [newUser];
        }
        localStorage.setItem('ITServer_Users', JSON.stringify([...users]));
        resolve(true);
      }, 250); // fake async
    });
  },
  signout() {
    return new Promise((resolve) => {
      setTimeout(() => {resolve(true)}, 250); // fake async
    });
  },
  get_projects() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const projects = [
          {
            id: 0,
            name: 'ExampleProject1',
            description: 'We are going to build something amazing!',
            openIssues: 2,
            closedIssues: 9
          },
          {
            id: 1,
            name: 'ExampleProject2',
            description: 'Solving big other issues',
            openIssues: 1,
            closedIssues: 14
          } 
        ];
        resolve(projects);
      }, 250); // fake async
    });
  },
  get_issues(projectId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const issues = [
          {
            id: 0,
            title: 'Home page error',
            type: 'Bug',
            priority: 'Low',
            status: 'Open',
            dueDate: '06/12/22',
            assignee: 'Kevin Gilpin'
          },
          {
            id: 1,
            title: 'Create new signup page',
            type: 'Task',
            priority: 'Med',
            status: 'Open',
            dueDate: '06/04/22',
            assignee: 'Kevin Gilpin'
          },
          {
            id: 2,
            title: 'Sign In error',
            type: 'Bug',
            priority: 'High',
            status: 'Open',
            dueDate: '06/02/22',
            assignee: 'Kevin Peralta'
          },
          {
            id: 3,
            title: 'New feature 3',
            type: 'Task',
            priority: 'Med',
            status: 'Open',
            dueDate: '07/04/22',
            assignee: 'Casimero Tanseco'
          },
          {
            id: 4,
            title: 'Settings UI change',
            type: 'Task',
            priority: 'Low',
            status: 'Open',
            dueDate: '07/16/22',
            assignee: 'Kevin Gilpin'
          },
          {
            id: 5,
            title: 'New Feature 5',
            type: 'Task',
            priority: 'Low',
            status: 'Open',
            dueDate: '08/04/22',
            assignee: 'Kevin Gilpin'
          },  
        ];
        resolve(issues);
      }, 250); // fake async
    });
  }
};
