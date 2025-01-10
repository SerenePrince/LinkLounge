import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAddNewUserMutation } from "../users/usersApiSlice.jsx";

const USER_REGEX = /^[A-z]{3,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^[\w!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]{8,64}$/;

const SignUp = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState("");
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  // Refs for focus management

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    setUsernameError(
      validUsername ? "" : "Username must be between 3 and 20 characters."
    );
  }, [username, validUsername]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    setEmailError(validEmail ? "" : "Please enter a valid email.");
  }, [email, validEmail]);

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

  useEffect(() => {
    if (isSuccess) {
      alert("Congratulations! Your sign-up was successful.");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value);

  const onBlur = (field) => {
    if (field === "username") setUsernameTouched(true);
    if (field === "email") setEmailTouched(true);
    if (field === "password") setPasswordTouched(true);
    if (field === "confirmPassword") setConfirmPasswordTouched(true);
  };

  const canSave =
    [
      validUsername,
      validEmail,
      validPassword,
      password === confirmPassword,
    ].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, email, password });
    }
  };

  // Standard error message handling
  const errMsg = isError ? error?.data?.message || "Signup Failed" : "";

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-primary p-6 font-raleway">
      <header className="text-center">
        <h1 className="text-3xl font-semibold text-offwhite font-josefin">
          Sign Up
        </h1>
      </header>
      <main className="w-full max-w-md space-y-6">
        {errMsg && (
          <p className="text-center text-error" aria-live="assertive">
            {errMsg}
          </p>
        )}
        <form className="space-y-4" onSubmit={onSaveUserClicked}>
          {/* Username Field */}
          <div className="relative">
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
              onChange={onUsernameChanged}
              onBlur={() => onBlur("username")}
              required
              aria-label="Username"
              className={`w-full px-3 py-2 border rounded-md text-offblack focus:outline-none focus:ring-2 focus:ring-accent ${
                !validUsername &&
                usernameTouched &&
                username !== "" &&
                "border-error"
              }`}
            />
            {usernameTouched && usernameError && username !== "" && (
              <p className="absolute text-error text-sm mt-1">
                {usernameError}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-offwhite mt-8"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={onEmailChanged}
              onBlur={() => onBlur("email")}
              required
              aria-label="Email"
              className={`w-full px-3 py-2 border rounded-md text-offblack focus:outline-none focus:ring-2 focus:ring-accent ${
                !validEmail && emailTouched && email !== "" && "border-error"
              }`}
            />
            {emailTouched && emailError && email !== "" && (
              <p className="absolute text-error text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-offwhite mt-8"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
              onBlur={() => onBlur("password")}
              required
              aria-label="Password"
              className={`w-full px-3 py-2 border rounded-md text-offblack focus:outline-none focus:ring-2 focus:ring-accent ${
                !validPassword &&
                passwordTouched &&
                password !== "" &&
                "border-error"
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
              aria-label="Confirm Password"
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

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={!canSave}
            className="w-full px-4 py-2 text-lg font-medium disabled:opacity-50 text-offwhite bg-accent rounded-md hover:bg-tertiary transition font-josefin !mt-8"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="mt-6 text-center">
        <Link
          to="/login"
          className="text-sm font-medium text-offwhite underline hover:text-lightgrey font-josefin"
        >
          Already have an account? Log in
        </Link>
      </footer>
    </section>
  );
};

export default SignUp;
