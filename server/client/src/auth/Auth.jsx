import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { fakeAPI } from './fakeAPI';

let AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(localStorage.getItem('ITClient_User'));

  const storeUser = (user) => {
    localStorage.setItem('ITClient_User', user);
    setUser(user);
  };

  let signin = async (loginInfo, callback) => {
    try {
      const authorized = await fakeAPI.signin(loginInfo);
      if (authorized) {
        storeUser(loginInfo);
        callback();
        return true;
      }
    }
    catch(err) {
      console.error(err);
    };
  };

  let signup = async (newUser, callback) => {
    try {
      const authorized = await fakeAPI.signup(newUser.email);
      if (authorized) {
        storeUser(newUser.email);
        callback();
        return true;
      }
      return false;
    } catch(err) {
      console.error(err);
    }
  };

  let signout = async (callback) => {
    try {
      if (await fakeAPI.signout()) {
        setUser(null);
        localStorage.removeItem('ITClient_User');
        callback();
        return true;
      }
    } catch(err) {
      console.error(err);
    }
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