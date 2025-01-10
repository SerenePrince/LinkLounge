import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoungeById } from "./loungesApiSlice.jsx";
import { FaPenToSquare } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useCallback } from "react";

// Utility function for date formatting
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleString("en-US", { day: "numeric", month: "long" })
    : "N/A";

const PublicLounge = ({ loungeId }) => {
  const lounge = useSelector((state) => selectLoungeById(state, loungeId));
  const navigate = useNavigate();

  // Always define the callback hook
  const handleEdit = useCallback(
    () => navigate(`${loungeId}`),
    [navigate, loungeId]
  );

  // Early return if lounge is not found
  if (!lounge) {
    if (import.meta.env.MODE === "development") {
      console.warn(`Lounge with ID ${loungeId} not found.`);
    }
    return (
      <div className="bg-error text-offwhite p-4 rounded-md text-center">
        Lounge not found.
      </div>
    );
  }

  const created = formatDate(lounge.createdAt);
  const updated = formatDate(lounge.updatedAt);

  return (
    <div className="bg-lightgrey p-4 rounded-lg shadow-lg hover:shadow-lg transition flex flex-row items-center justify-between">
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-offblack mb-2">
          {lounge.title}
        </h3>
        <p className="text-offblack mb-1">{lounge.description}</p>
        <a
          href={`https://${import.meta.env.VITE_PROD_URL}/${lounge.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline hover:text-secondary transition-colors duration-200"
        >
          {`linklounge-2inr.onrender.com/${lounge.url}`}
        </a>
        <div className="text-sm text-darkgrey mt-2">
          <p>Created: {created}</p>
          <p>Updated: {updated}</p>
        </div>
      </div>
      <button
        onClick={handleEdit}
        aria-label={`Edit lounge ${lounge.title}`}
        className="mt-4 tablet:mt-0 tablet:ml-4 p-2 bg-secondary text-offwhite rounded-md hover:bg-accent transition-colors duration-200"
      >
        <FaPenToSquare size={20} />
      </button>
    </div>
  );
};

PublicLounge.propTypes = {
  loungeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default PublicLounge;
