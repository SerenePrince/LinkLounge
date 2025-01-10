import { useState, useEffect } from "react";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "./usersApiSlice.jsx";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import PropTypes from "prop-types";

const USER_REGEX = /^[A-z]{3,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^[\w!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]{8,64}$/;

function UpdateUserForm({ user }) {
  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDeleteSuccess }] = useDeleteUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => setValidUsername(USER_REGEX.test(username)), [username]);
  useEffect(() => setValidEmail(EMAIL_REGEX.test(email)), [email]);
  useEffect(() => setValidPassword(PWD_REGEX.test(password)), [password]);

  useEffect(() => {
    if (isSuccess) {
      alert("You've successfully saved this users info!");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate(-1);
    }
    if (isDeleteSuccess) {
      alert("You've successfully deleted this users info!");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate(-1);
    }
  }, [isSuccess, isDeleteSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onSaveUserClicked = async () => {
    const updatedUser = password
      ? { id: user.id, username, email, password }
      : { id: user.id, username, email };
    await updateUser(updatedUser);
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const canSave = password
    ? [validUsername, validEmail, validPassword].every(Boolean) && !isLoading
    : [validUsername, validEmail].every(Boolean) && !isLoading;

  const errorContent = error?.data?.message || "";

  return (
    <section className="space-y-6 max-w-4xl p-6 mx-auto bg-offblack">
      <h2 className="text-xl font-semibold text-offwhite">Edit User</h2>
      {errorContent && <p className="text-center text-error">{errorContent}</p>}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="flex justify-between">
          <button
            onClick={onSaveUserClicked}
            disabled={!canSave}
            className="px-6 py-2 border rounded-md text-lg text-offwhite border-offwhite hover:bg-offwhite hover:text-offblack transition"
          >
            <span className="flex align-middle items-center">
              <FaSave className="mr-2" />
              <p className="mt-1">Save</p>
            </span>
          </button>
          <button
            onClick={onDeleteUserClicked}
            className="px-6 py-2 border rounded-md text-lg text-error border-error hover:bg-error hover:text-offblack transition"
          >
            <span className="flex align-middle items-center">
              <FaTrashCan className="mr-2" />
              <p className="mt-1">Delete</p>
            </span>
          </button>
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-offwhite"
          >
            Username [3-20 letters]
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={onUsernameChanged}
            className={`w-full p-2 border rounded-md mt-2 text-offblack ${
              !validUsername ? "border-error" : "border-offwhite"
            }`}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-offwhite"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={onEmailChanged}
            className={`w-full p-2 border rounded-md mt-2 text-offblack ${
              !validEmail ? "border-error" : "border-offwhite"
            }`}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-offwhite"
          >
            Password [8-64 chars incl.] (Leave blank for no change)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
            className={`w-full p-2 border rounded-md mt-2 text-offblack ${
              password && !validPassword ? "border-error" : "border-offwhite"
            }`}
          />
        </div>
      </form>
    </section>
  );
}

UpdateUserForm.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UpdateUserForm;
