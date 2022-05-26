import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../auth/Auth';

export function RequireOrg() {
  let location = useLocation();
  let auth = useAuth();
  let user = auth.user;

  if (user.orgId === null || user.orgId === undefined) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/app/org" state={{ from: location }} replace />;
  }

  return <Outlet />;
}