import PropTypes from "prop-types";
import BackButton from "../components/BackButton.jsx";
import {
  FaPen,
  FaImage,
  FaLockOpen,
  FaFileAlt,
  FaInfoCircle,
  FaExternalLinkAlt,
  FaFileImage,
  FaEye,
  FaPaintBrush,
  FaFileUpload,
  FaUpload,
  FaSave,
  FaLock,
  FaThumbsUp,
  FaKey,
} from "react-icons/fa"; // Importing icons for visual enhancement
import { FaRegMessage, FaUserGear } from "react-icons/fa6";

const Help = () => {
  const Card = ({ id, title, children }) => (
    <section id={id} className="mb-12">
      <div className="bg-offwhite p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
        <h3 className="text-3xl font-semibold mb-6 text-accent text-center">
          {title}
        </h3>
        {children}
      </div>
    </section>
  );

  Card.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  return (
    <div className="help-container p-8 bg-highlight text-offblack">
      <BackButton />
      <h1 className="text-5xl font-extrabold mb-12 text-center text-primary">
        Help & Guides
      </h1>

      <Card id="creating-lounges" title="Creating a Lounge">
        <p className="text-xl mb-6 text-center text-secondary">
          Follow these simple steps to create your first lounge on LinkLounge.
        </p>
        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-semibold text-secondary mb-2 flex items-center">
              <FaLockOpen className="mr-3 mb-1" />
              Accessing the Create Page
            </h4>
            <p className="text-lg">
              On your dashboard, navigate to the <strong>Manage Lounges</strong>{" "}
              section. Click the <strong>Create New Lounge</strong> button to
              get started.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaFileImage className="mr-3 mb-1" />
              Profile Picture
            </h5>
            <p className="text-lg">
              Drag and drop an image for your profile picture or use the file
              explorer. Images are automatically cropped to a square. If no
              image is added, the default LinkLounge logo will be used.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaPen className="mr-3 mb-1" />
              Title
            </h5>
            <p className="text-lg">
              The title generates a unique URL for your lounge, e.g.,
              <code className="bg-lightgrey ml-2 text-accent rounded-md">
                {import.meta.env.VITE_PROD_URL}/
                <span className="font-bold">username</span>/
                <span className="font-bold">title</span>
              </code>
              . Titles are mandatory and must be unique.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaFileAlt className="mr-3 mb-1" />
              Description
            </h5>
            <p className="text-lg">
              Add a tagline or description that appears under your profile
              picture. This is a great way to introduce yourself or your brand.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaInfoCircle className="mr-3 mb-1" />
              Icons
            </h5>
            <p className="text-lg">
              Select an icon and provide a corresponding link, such as your
              social media or website. Both fields are required.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaExternalLinkAlt className="mr-3 mb-1" />
              Buttons
            </h5>
            <p className="text-lg">
              Add custom call-to-action buttons by entering text and a link.
              Both fields are required for each button.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaImage className="mr-3 mb-1" />
              Background Image
            </h5>
            <p className="text-lg">
              Upload a background image or use the default theme color.
              Background images are optional.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaPaintBrush className="mr-3 mb-1" />
              Theme
            </h5>
            <p className="text-lg">
              Choose a theme that matches your style. Themes are optional, with
              a default applied if none is selected.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaEye className="mr-3 mb-1" />
              Make Public
            </h5>
            <p className="text-lg">
              Toggle the visibility of your lounge. Public lounges are
              accessible to everyone, while private ones are hidden.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaFileUpload className="mr-3 mb-1" />
              Create Lounge
            </h5>
            <p className="text-lg">
              Complete all required fields and click the{" "}
              <strong>Create Lounge</strong> button to publish your lounge.
            </p>
          </div>
        </div>
      </Card>

      <Card id="updating-lounges" title="Updating a Lounge">
        <p className="text-xl mb-6 text-center text-secondary">
          Learn how to keep your lounge updated with this guide.
        </p>
        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-semibold text-secondary mb-2 flex items-center">
              <FaKey className="mr-3 mb-1" />
              Accessing the Update Page
            </h4>
            <p className="text-lg">
              Navigate to <strong>Manage Lounges</strong> on your dashboard.
              Click the <strong>Edit</strong> button for the lounge you want to
              update.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaUpload className="mr-3 mb-1" />
              Making Updates
            </h5>
            <p className="text-lg">
              Modify any field, such as the profile picture, title, description,
              icons, buttons, background image, or theme.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-secondary mb-2 flex items-center">
              <FaSave className="mr-3 mb-1" />
              Saving Changes
            </h4>
            <p className="text-lg">
              Click <strong>Save</strong> to confirm updates. To delete the
              lounge, click <strong>Delete</strong>. Note that this action is
              irreversible.
            </p>
          </div>
        </div>
      </Card>

      <Card id="updating-settings" title="Updating Settings">
        <h4 className="text-lg font-semibold text-secondary mb-2 flex items-center">
          <FaUserGear className="mr-3 mb-1" />
          Accessing the Settings Page
        </h4>
        <p className="text-lg mb-4">
          From your dashboard, navigate to <strong>Manage Settings</strong> to
          update your username or password.
        </p>
        <div className="space-y-8">
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaPen className="mr-3 mb-1" />
              Updating Username
            </h5>
            <p className="text-lg">
              Enter a new username (3-20 letters, no numbers or symbols). This
              will update your lounge URL, so choose something that represents
              your content.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaLock className="mr-3 mb-1" />
              Updating Password
            </h5>
            <p className="text-lg">
              Enter your new password (8-64 letters, can include numbers and
              symbols) twice to confirm. Click <strong>Save Changes</strong>,
              after which you will be logged out and redirected to log in with
              the new credentials.
            </p>
          </div>
        </div>
      </Card>

      <Card id="providing-feedback" title="Providing Feedback">
        <h4 className="text-lg font-semibold text-secondary mb-2 flex items-center">
          <FaRegMessage className="mr-3 mb-1" />
          Accessing the Feedback Page
        </h4>
        <p className="text-lg mb-4">
          From your dashboard, navigate to <strong>Provide Feedback</strong> to
          fill out a form with your inquiries.
        </p>
        <div className="space-y-8">
          <div>
            <h5 className="text-lg font-medium text-darkgrey flex items-center">
              <FaThumbsUp className="mr-3 mb-1" />
              Submitting Feedback
            </h5>
            <p className="text-lg">
              Select the purpose of your feedback (e.g., bug report, question,
              suggestion) from the dropdown menu. Enter your message in the
              provided text area. An email confirmation will be sent to your
              registered email address.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Help;
