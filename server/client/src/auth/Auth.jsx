import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { postData } from '../utils/postData';

let AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));

  const storeUser = (user) => {
    const userData = JSON.stringify(user);
    localStorage.setItem('user', userData);
    setUser(user);
  }

  const updateUser = (newInfo) => {
    const newUser = {...user, ...newInfo};
    const newUserData = JSON.stringify(newUser);
    localStorage.setItem('user', newUserData);
    setUser(newUser);
  }

  const clearUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  const signin = async ({email, password}, callback) => {
    try {
      const user = await postData('/api/users/login', { username: email, password });
      storeUser(user);
      callback();
      return true;
    }
    catch(err) {
      console.error(err);
    };
  };

  const signup = async (newUser, callback) => {
    try {
      const authorized = await postData('/api/users', newUser);
      if (authorized) {
        let user = {...newUser, orgId: null, orgName: null};
        storeUser(user);
        callback();
        return true;
      }
      return false;
    } catch(err) {
      console.error(err);
    }
  };

  const signout = async (callback) => {
    try {
      if (await fetch('/api/users/logout')) {
        clearUser();
        callback();
        return true;
      }
      return false;
    } catch(err) {
      console.error(err);
    }
  };

  const createOrg = async (orgName, callback) => {
    try {
      let res = await postData('/api/orgs', { org_name: orgName });
      if(res) {
        callback();
      }
    }
    catch(err) {
      console.error(err);
    }
  };

  const joinOrg = async (inviteCode, callback) => {
    try {
      let orgInfo = await postData('/api/orgs/invite', { org_invite_code: inviteCode });
      updateUser({...user, orgId: orgInfo.org_id, orgName: orgInfo.org_name});
      callback();
    }
    catch(err) {
      console.error(err);
    }
  }

  const leaveOrg = async (callback) => {
    try {
      fetch('/api/orgs/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateUser({orgId: null, orgName: null});
      callback();
    }
    catch(err) {
      console.error(err);
    }
  }

  let value = { user, signin, signup, signout, createOrg, joinOrg, leaveOrg };

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

export function RequireOrg() {
  let location = useLocation();
  let auth = useAuth();
  let user = auth.user;

  if (user.orgId === null || user.orgId === undefined) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/app/add-org" state={{ from: location }} replace />;
  }

  return <Outlet />;
}