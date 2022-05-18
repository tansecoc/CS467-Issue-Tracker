/**
 * This represents some generic auth provider API, like Firebase.
 */
 const fakeAuthAPI = {
  signin(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!JSON.parse(localStorage.getItem('ITServer_Users').includes(user))
        ) {
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
        if (users.includes(newUser)) {
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
};

export { fakeAuthAPI };
