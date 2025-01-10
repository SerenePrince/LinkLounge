import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice.jsx";
import { useLoginMutation } from "./authApiSlice.jsx";
import usePersist from "../../hooks/usePersist.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    setErrMsg(""); // Clear error message when inputs change
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      setErrMsg("");
      navigate(`/dashboard/${username}`);
    } catch (err) {
      const errorMessage = err?.data?.message || "Login Failed";
      setErrMsg(errorMessage); // Display error message
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-primary p-6 font-raleway">
      <header className="text-center">
        <h1 className="text-3xl font-semibold text-offwhite font-josefin">
          Login
        </h1>
      </header>
      <main className="w-full max-w-md space-y-6 mt-6">
        {/* Reserve space for the error message */}
        <div className="min-h-[2rem]">
          {errMsg && (
            <p
              className="text-center text-error"
              role="alert"
              aria-live="assertive"
            >
              {errMsg}
            </p>
          )}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-offwhite"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
              aria-label="Username"
              className="w-full px-3 py-2 border rounded-md text-offblack bg-lightgrey focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-offwhite"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePwdInput}
              required
              aria-label="Password"
              className="w-full px-3 py-2 border rounded-md text-offblack bg-lightgrey focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Trust Device Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="persist"
              checked={persist}
              onChange={handleToggle}
              className="form-checkbox h-5 w-5"
            />
            <label
              htmlFor="persist"
              className="ml-2 mt-1 text-sm font-medium text-offwhite"
            >
              Trust This Device
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-lg font-medium bg-accent text-offwhite rounded-md hover:bg-tertiary transition font-josefin"
          >
            {isLoading ? (
              <span>Loading...</span> // Show Loading text instead of button text
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="mt-6 text-center flex flex-col space-y-2">
        <span>
          <Link
            to="/signup"
            className="text-sm font-medium text-offwhite underline hover:text-lightgrey font-josefin"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </span>
        <span className="flex gap-3">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-offwhite underline hover:text-lightgrey font-josefin"
          >
            Forgot password?
          </Link>

          <Link
            to="/forgot-username"
            className="text-sm font-medium text-offwhite underline hover:text-lightgrey font-josefin"
          >
            Forgot username?
          </Link>
        </span>
      </footer>
    </section>
  );
};

export default Login;
