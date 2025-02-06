import { Link, useNavigate } from "react-router-dom";
import { FaCouch, FaUserGear, FaRegMessage } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { useSendLogoutMutation } from "../features/auth/authApiSlice.jsx";
import { useEffect } from "react";

// Section Card Component
function SectionCard({ title, description, linkText, linkTo, Icon }) {
  return (
    <div className="bg-offwhite p-6 rounded-lg shadow-lg hover:bg-lightgrey transition duration-200 flex justify-between items-center">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-2 text-offblack">{title}</h2>
        <p className="mb-4 text-offblack">{description}</p>
        <Link
          to={linkTo}
          className="text-accent underline hover:text-secondary transition-colors duration-200"
        >
          {linkText}
        </Link>
      </div>
      <div className="text-4xl text-accent ml-4">
        <Icon size={60} />
      </div>
    </div>
  );
}

SectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

// Dashboard Component
function Dashboard() {
  const [sendLogout, { isLoading, isSuccess, isError }] =
    useSendLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || isSuccess || isError) navigate("/");
  }, [isLoading, isSuccess, isError, navigate]);

  const sections = [
    {
      title: "Lounges",
      description: "Create, view, and edit your lounges.",
      linkText: "Manage Lounges",
      linkTo: "lounges",
      Icon: FaCouch,
    },
    {
      title: "Help",
      description: "Find tips and guides for creating the perfect lounge.",
      linkText: "Get Help",
      linkTo: "help",
      Icon: FaQuestionCircle,
    },
    {
      title: "Settings",
      description:
        "Update your username, email, or password, or delete your account.",
      linkText: "Manage Settings",
      linkTo: "settings",
      Icon: FaUserGear,
    },
    {
      title: "Feedback",
      description:
        "Share your thoughts, report issues, or suggest improvements.",
      linkText: "Provide Feedback",
      linkTo: "feedback",
      Icon: FaRegMessage,
    },
  ];

  return (
    <div className="bg-highlight text-offblack min-h-screen font-raleway">
      <button
        onClick={sendLogout}
        className="absolute top-5 left-5 px-6 py-3 rounded-lg bg-offwhite duration-200 border-none cursor-pointer z-50 text-offblack shadow-lg hover:bg-lightgrey transition"
        aria-label="Sign out of LinkLounge" // Improve clarity for accessibility
      >
        {isLoading ? "Logging Out..." : "Logout"}
      </button>
      {/* Main Content */}
      <main className="p-8 mt-16 laptop:mt-0">
        <h1 className="text-4xl font-bold mb-6 text-offblack font-josefin text-center">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg mb-8 text-offblack text-center">
          Manage your lounges, explore guides, update your settings, or provide
          feedback—all in one place.
        </p>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <SectionCard key={index} {...section} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
