import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice.jsx";
import { FaPenToSquare } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useCallback } from "react";

const AdminUser = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  const handleEdit = useCallback(
    () => navigate(`/dashboard/admin/users/${userId}`),
    [navigate, userId]
  );

  if (!user) {
    if (import.meta.env.MODE === "development") {
      console.warn(`User with ID ${userId} not found.`);
    }
    return (
      <tr>
        <td
          colSpan="3"
          className="text-center border border-offwhite px-4 py-2 text-error"
        >
          User not found
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td className="border border-offwhite px-4 py-2 text-offwhite">
        {user.username}
      </td>
      <td className="border border-offwhite px-4 py-2 text-offwhite">
        {user.email}
      </td>
      <td className="border border-offwhite px-4 py-2">
        <button
          onClick={handleEdit}
          aria-label={`Edit user ${user.username}`}
          className="p-2 border border-offwhite rounded-md text-offwhite hover:bg-offwhite hover:text-offblack transition"
        >
          <FaPenToSquare size={16} />
        </button>
      </td>
    </tr>
  );
};

AdminUser.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default AdminUser;
