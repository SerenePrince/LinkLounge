import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoungeById } from "./loungesApiSlice.jsx";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";

const AdminLounge = ({ loungeId }) => {
  const lounge = useSelector((state) => selectLoungeById(state, loungeId));

  const navigate = useNavigate();

  const handleEdit = useCallback(
    () => navigate(`/dashboard/admin/lounges/${loungeId}`),
    [navigate, loungeId]
  );

  if (!lounge) {
    if (import.meta.env.MODE === "development") {
      console.warn(`Lounge with ID ${loungeId} not found.`);
    }
    return (
      <tr>
        <td
          colSpan="5"
          className="text-center border border-mediumgrey px-4 py-2 text-error"
        >
          Lounge not found
        </td>
      </tr>
    );
  }

  const created = lounge.createdAt
    ? new Date(lounge.createdAt).toLocaleString("en-US", {
        day: "numeric",
        month: "long",
      })
    : "N/A";

  const updated = lounge.updatedAt
    ? new Date(lounge.updatedAt).toLocaleString("en-US", {
        day: "numeric",
        month: "long",
      })
    : "N/A";

  return (
    <tr>
      <td className="border border-mediumgrey px-4 py-2 text-offwhite">
        {lounge.user.username}
      </td>
      <td className="border border-mediumgrey px-4 py-2 text-offwhite">
        {created}
      </td>
      <td className="border border-mediumgrey px-4 py-2 text-offwhite">
        {updated}
      </td>
      <td className="border border-mediumgrey px-4 py-2 text-offwhite">
        {lounge.title}
      </td>
      <td className="border border-mediumgrey px-4 py-2">
        <button
          onClick={handleEdit}
          aria-label={`Edit lounge ${lounge.title}`}
          className="p-2 border border-offwhite rounded-md text-offwhite hover:bg-offwhite hover:text-offblack transition"
        >
          <FaRegPenToSquare size={16} />
        </button>
      </td>
    </tr>
  );
};

AdminLounge.propTypes = {
  loungeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AdminLounge;
