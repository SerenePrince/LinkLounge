import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { role } = useAuth(); // Destructure 'role' here

  const content = allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
