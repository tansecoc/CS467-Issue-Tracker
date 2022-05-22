/**
 * This represents some generic auth provider API, like Firebase.
 */

export const fakeAuthAPI = {
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
            openIssues: 1,
            closedIssues: 9
          },
          {
            id: 1,
            name: 'ExampleProject2',
            description: 'Solving big other issues',
            openIssues: 2,
            closedIssues: 14
          } 
        ];
        resolve(projects);
      }, 250); // fake async
    });
  },
  get_issues() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const issues = [
          
        ];
        resolve(issues);
      }, 250); // fake async
    });
  }
};
