import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { fakeAuthProvider } from './fakeAuthProvider';

let AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (loginInfo, callback) => {
    if (fakeAuthProvider.signin(loginInfo)) {
      setUser(loginInfo);
      callback();
      return true;
    }
    return false;
  };

  let signup = (newUser, callback) => {
    if (fakeAuthProvider.signup(newUser.email)) {
      setUser(newUser);
      callback();
      return true;
    }
    return false;
  };

  let signout = (callback) => {
    if (fakeAuthProvider.signout()) {
      setUser(null);
      callback();
      return true;
    }
    return false;
  };

  let value = { user, signin, signup, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export function RequireUnauth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/app" state={{ from: location }} replace />;
  }

  return <Outlet />;
}