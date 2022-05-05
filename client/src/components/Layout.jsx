import {
  Outlet
} from "react-router-dom";
import PrivateNav from './PrivateNav';

export default function Layout() {

  return (
    <>
      <PrivateNav />
      <Outlet />
    </>
  );
}