import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice.jsx";
import { useEffect } from "react";

function Admin() {
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || isSuccess || isError) navigate("/");
  }, [isLoading, isSuccess, isError, navigate]);

  const errorMessage = error?.data?.message || "An error occurred.";
  const loadingMessage = "Logging out...";

  // Loading and error classes for consistency
  const messageClass = "text-center text-offwhite";

  if (isLoading)
    return <p className={`${messageClass} text-lg`}>{loadingMessage}</p>;

  if (isError)
    return (
      <p className={`${messageClass} text-lg text-error`}>
        Error: {errorMessage}
      </p>
    );

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen space-y-6 bg-offblack p-4">
      {/* Main Content */}
      <h1 className="text-2xl font-semibold text-offwhite">Admin Dashboard</h1>
      <div className="flex flex-col space-y-4">
        <Link
          to="users"
          className="text-lg font-medium border px-6 py-3 rounded-md text-center text-offwhite border-error hover:bg-error hover:text-offblack transition"
        >
          Manage Users
        </Link>
        <Link
          to="lounges"
          className="text-lg font-medium border px-6 py-3 rounded-md text-center text-offwhite border-error hover:bg-error hover:text-offblack transition"
        >
          Manage Lounges
        </Link>
      </div>
      {/* Logout Button */}
      <button
        onClick={sendLogout}
        className="text-lg font-medium px-4 py-2 rounded-md text-offwhite border border-offwhite hover:bg-offwhite hover:text-offblack transition"
      >
        Logout
      </button>
    </section>
  );
}

export default Admin;
