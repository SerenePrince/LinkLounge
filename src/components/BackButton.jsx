// Importing the back arrow icon from react-icons
import { FaArrowCircleLeft } from "react-icons/fa";
// Importing the reusable custom hook for handling the back button action
import useBackButton from "../hooks/useBackButton.jsx";

const BackButton = () => {
  // Get the goBack function from the custom hook
  const goBack = useBackButton();

  return (
    <button
      onClick={goBack} // Execute the goBack function when clicked
      className="absolute top-5 left-5 bg-none border-none cursor-pointer z-50"
      aria-label="Go back to the previous page" // Improve clarity for accessibility
    >
      <FaArrowCircleLeft
        className="text-offblack hover:text-tertiary transition tablet:text-offwhite"
        size={32}
      />
    </button>
  );
};

export default BackButton;
