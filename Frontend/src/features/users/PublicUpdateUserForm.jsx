import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateUserMutation,
  selectUserByUsername,
  useDeleteUserMutation,
} from "./usersApiSlice.jsx";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth.jsx";
import BackButton from "../../components/BackButton.jsx";
import { useGetLoungesByUserQuery } from "../lounges/loungesApiSlice.jsx";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[\w!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]{8,64}$/;

function PublicUpdateUserForm() {
  const navigate = useNavigate();
  const { username: currentUsername } = useAuth();
  const user = useSelector((state) =>
    selectUserByUsername(state, currentUsername)
  );

  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDeleteSuccess }] = useDeleteUserMutation();

  const { data: lounges } = useGetLoungesByUserQuery(user?._id);

  const [showDeletePage, setShowDeletePage] = useState(false);

  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const canSave =
    validUsername &&
    (!password || (validPassword && password === confirmPassword)) &&
    !isLoading;

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    setUsernameError(
      validUsername ? "" : "Username must be between 3 and 20 characters."
    );
  }, [username, validUsername]);

  useEffect(() => {
    const isPasswordValid = PWD_REGEX.test(password);
    setValidPassword(isPasswordValid);
    setPasswordMatchError(
      isPasswordValid && password !== confirmPassword
        ? "Passwords do not match."
        : ""
    );
  }, [password, confirmPassword]);

  useEffect(() => {
    if (isSuccess) {
      alert("Profile update successful. Please re-login to verify new info.");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isDeleteSuccess) {
      alert("You've successfully deleted your account.");
      setShowDeletePage(false);
      navigate("/");
    }
  }, [setShowDeletePage, isDeleteSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value);

  const onBlur = (field) => {
    if (field === "username") setUsernameTouched(true);
    if (field === "password") setPasswordTouched(true);
    if (field === "confirmPassword") setConfirmPasswordTouched(true);
  };

  const onSaveUserClicked = async () => {
    const updatedUser = password
      ? { id: user.id, username, email: user.email, password }
      : { id: user.id, username, email: user.email };
    await updateUser(updatedUser);
  };

  const onDeleteUserClicked = async () => {
    if (lounges && lounges.length !== 0) {
      alert(
        "You must delete all your lounges before you can delete your account."
      );
    } else {
      await deleteUser({ id: user._id });
    }
  };

  const errorContent = error?.data?.message || "";

  if (showDeletePage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-highlight text-center p-6">
        <h1 className="text-2xl font-bold text-error mb-4">
          Delete Your Account
        </h1>
        <p className="text-offblack mb-8">
          Clicking this button will permanently delete your account. No take
          backs. Are you sure you would like to delete?
        </p>
        <button
          onClick={onDeleteUserClicked}
          className="px-6 py-3 bg-error text-offwhite rounded-lg shadow-lg hover:bg-offwhite hover:text-error font-semibold transition"
          aria-label="Delete Account"
        >
          Delete Account
        </button>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowDeletePage(false);
          }}
          className="mt-6 text-offblack hover:text-offwhite underline transition"
        >
          No, take me back
        </a>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-highlight p-6 font-raleway">
      <BackButton />
      <header className="text-center">
        <h1 className="text-3xl font-semibold text-offblack font-josefin">
          Edit Your Profile
        </h1>
      </header>
      <main className="w-full max-w-md space-y-6">
        <div className="min-h-[2rem]">
          {errorContent && (
            <p className="text-center text-error" aria-live="assertive">
              {errorContent}
            </p>
          )}
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-offblack mt-8"
            >
              Update Username [3-20 letters]
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={onUsernameChanged}
              onBlur={() => onBlur("username")}
              required
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

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-offblack mt-8"
            >
              Update Password [8-64 chars incl.] (Leave blank for no change)
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
              onBlur={() => onBlur("password")}
              className={`w-full px-3 py-2 border rounded-md text-offblack focus:outline-none focus:ring-2 focus:ring-accent ${
                !validPassword &&
                passwordTouched &&
                password !== "" &&
                "border-error"
              }`}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-offblack mt-8"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={onConfirmPasswordChanged}
              onBlur={() => onBlur("confirmPassword")}
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

          <button
            type="button"
            onClick={onSaveUserClicked}
            disabled={!canSave || isLoading}
            className="disabled:opacity-50 w-full !mt-8 px-4 py-2 text-lg font-medium text-offwhite bg-secondary rounded-md hover:bg-accent transition font-josefin"
          >
            {isLoading ? <span>Loading...</span> : <span>Save Changes</span>}
          </button>
        </form>
      </main>
      <footer className="mt-6 text-center">
        <button
          onClick={() => setShowDeletePage(true)}
          className="text-sm font-medium text-error underline hover:text-lightgrey font-josefin transition"
        >
          Delete my account
        </button>
      </footer>
    </section>
  );
}

export default PublicUpdateUserForm;
