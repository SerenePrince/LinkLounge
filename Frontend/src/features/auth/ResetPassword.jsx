import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "./authApiSlice.jsx";

const PWD_REGEX = /^[\w!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]{8,64}$/;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const token = searchParams.get("token"); // Extract token from query params

  useEffect(() => {
    if (!token) {
      setErrMsg("Invalid or expired password reset link.");
    }
  }, [token]);

  // Validate password using regex
  const [validPassword, setValidPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setPasswordError(
      validPassword ? "" : "Password must be between 8 and 64 characters."
    );
  }, [password, validPassword]);

  useEffect(() => {
    setPasswordMatchError(
      password !== confirmPassword ? "Passwords do not match." : ""
    );
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match.");
      return;
    }
    if (!validPassword) {
      setErrMsg(passwordError);
      return;
    }
    try {
      await resetPassword({ token, password }).unwrap();
      setPassword("");
      setErrMsg("");
      alert("Password successfully reset. Redirecting to login...");
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err?.data?.message || "Failed to reset password. Please try again.";
      setErrMsg(errorMessage);
    }
  };

  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value);
  const onBlur = (field) => {
    if (field === "password") setPasswordTouched(true);
    if (field === "confirmPassword") setConfirmPasswordTouched(true);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-primary p-6 font-raleway">
      <header className="text-center">
        <h1 className="text-3xl font-semibold text-offwhite font-josefin">
          Reset Password
        </h1>
      </header>
      <main className="w-full max-w-md space-y-6">
        <div className="space-y-4">
          {errMsg && (
            <p className="text-center text-error" aria-live="assertive">
              {errMsg}
            </p>
          )}
        </div>

        {token && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* New Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-offwhite"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={onPasswordChanged}
                onBlur={() => onBlur("password")}
                required
                className={`w-full px-3 py-2 border rounded-md text-offblack focus:outline-none focus:ring-2 focus:ring-accent ${
                  !validPassword && password !== "" && "border-error"
                }`}
              />
              {passwordTouched && passwordError && password !== "" && (
                <p className="absolute text-error text-sm mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-offwhite mt-8"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={onConfirmPasswordChanged}
                onBlur={() => onBlur("confirmPassword")}
                required
                className={`w-full px-3 py-2 border rounded-md text-offblack focus:outline-none focus:ring-2 focus:ring-accent ${
                  passwordMatchError && confirmPasswordTouched && "border-error"
                }`}
              />
              {confirmPasswordTouched && passwordMatchError && (
                <p className="absolute text-error text-sm mt-1">
                  {passwordMatchError}
                </p>
              )}
            </div>

            {/* Reset Password Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="!mt-8 w-full px-4 py-2 text-lg font-medium text-offwhite bg-accent border border-accent rounded-md hover:bg-offwhite hover:text-offblack transition font-josefin"
            >
              {isLoading ? <span>Loading...</span> : "Reset Password"}
            </button>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-6 text-center">
        <p className="text-sm font-medium text-offwhite font-josefin">
          Remembered your password?{" "}
          <a href="/login" className="underline hover:text-lightgrey">
            Log in
          </a>
        </p>
      </footer>
    </section>
  );
};

export default ResetPassword;
