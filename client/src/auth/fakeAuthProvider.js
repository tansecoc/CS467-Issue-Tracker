/**
 * This represents some generic auth provider API, like Firebase.
 */
 const fakeAuthProvider = {
  signin(loginInfo) {
    if (localStorage.getItem('userInfo') !== loginInfo) {
      return false;
    }
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(() => {}, 100); // fake async
    return true;
  },
  signup(newUser) {
    localStorage.setItem('userInfo', newUser);
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(() => {}, 100); // fake async
    return true;
  },
  signout() {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(() => {}, 100);
    return true;
  },
};

export { fakeAuthProvider };