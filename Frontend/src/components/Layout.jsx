// Importing Outlet from react-router-dom to render nested routes
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    // Outlet serves as a placeholder for nested routes
    <Outlet />
  );
}

export default Layout;
