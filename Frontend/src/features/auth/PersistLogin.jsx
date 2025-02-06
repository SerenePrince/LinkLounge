import { Link, Outlet } from "react-router-dom";
import usePersist from "../../hooks/usePersist.jsx";
import { useSelector } from "react-redux";
import { useRefreshMutation } from "./authApiSlice.jsx";
import { useEffect } from "react";
import { selectCurrentToken } from "./authSlice.jsx";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const [refresh, { isLoading, isError, error }] = useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        if (import.meta.env.MODE === "development") {
          console.log("Verifying refresh token...");
        }
        await refresh().unwrap(); // Attempt to refresh token
      } catch (err) {
        if (import.meta.env.MODE === "development") {
          console.error("Error refreshing token:", err);
        }
      }
    };

    if (!token && persist) {
      verifyRefreshToken(); // Only verify if no token and persist is true
    }
  }, [token, persist, refresh]);

  if (!persist) {
    return <Outlet />;
  }

  if (isLoading) {
    return <p className="text-center text-lg text-offblack">Loading...</p>;
  }

  if (isError) {
    return (
      <div className="errmsg text-center">
        <p className="text-lg text-error">
          {error?.data?.message || "An error occurred."}
        </p>
        <Link
          to="/login"
          className="text-accent underline hover:text-secondary"
        >
          Please login again.
        </Link>
      </div>
    );
  }

  // Render children if token is available or refresh succeeded
  return token ? <Outlet /> : null;
};

export default PersistLogin;
