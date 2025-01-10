import { useGetPublicLoungeQuery } from "../features/lounges/loungesApiSlice.jsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import themes from "../config/themes.jsx";
import { ICONS } from "../config/icons.jsx";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

const PublicLounge = () => {
  const { username, title } = useParams();
  const [copied, setCopied] = useState(false);

  const {
    data: lounge,
    isLoading,
    error,
  } = useGetPublicLoungeQuery({ username, title });

  // Apply theme when the lounge data is loaded
  useEffect(() => {
    if (lounge && lounge.theme) {
      themes(lounge.theme);
    }
  }, [lounge]);

  const handleCopy = () => {
    const url = `${import.meta.env.VITE_PROD_URL}/${username}/${title}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading)
    return <div className="text-center text-offwhite">Loading...</div>;

  if (error)
    return <div className="text-center text-error">Error: {error.message}</div>;

  if (!lounge)
    return <div className="text-center text-offwhite">Lounge not found</div>;

  const backgroundStyle = {
    backgroundImage: lounge.background ? `url(${lounge.background})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  const profileImage = lounge.profile || "/loungeLogo.png";

  return (
    <div
      className="flex items-center justify-center min-h-screen p-5 bg-primary bg-no-repeat"
      style={backgroundStyle}
    >
      <div className="flex flex-col border-2 border-textcolor items-center text-center bg-secondary rounded-lg p-5 laptop:max-w-xs w-full text-textcolor">
        {/* Profile Picture */}
        <div className="w-24 h-24 mb-4 overflow-hidden rounded-full border-2 border-textcolor">
          <img
            src={profileImage}
            alt={`${lounge.title} profile`}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Lounge Description */}
        <h1 className="text-lg mb-4">{lounge.description}</h1>

        {/* Icons */}
        <div className="flex flex-wrap justify-center gap-4 my-3">
          {lounge.icons &&
            lounge.icons.map((iconData, index) => (
              <a
                key={index}
                href={iconData.link}
                className="text-textcolor transition-all duration-300 ease-in-out hover:text-highlight hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Link to ${iconData.link}`}
              >
                {ICONS[iconData.icon]({ size: 40 })}
              </a>
            ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-3 my-3 w-full">
          {lounge.buttons &&
            lounge.buttons.map((button, index) => (
              <a
                key={index}
                href={button.link}
                className="bg-tertiary border-2 border-textcolor text-textcolor p-3 px-5 rounded-md text-md transition-all duration-300 ease-in-out hover:bg-highlight hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={button.text}
              >
                {button.text}
              </a>
            ))}
        </div>

        {/* Lounge URL with Copy Button */}
        <div className="text-sm flex items-center justify-center gap-2 mt-3">
          <p className="italic text-textcolor break-words text-center">
            {import.meta.env.VITE_PROD_URL}/{username}/{title}
          </p>
          <button
            className="bg-tertiary border-2 border-textcolor text-textcolor p-1 rounded-md transition-all duration-300 ease-in-out hover:bg-highlight hover:scale-110"
            onClick={handleCopy}
            aria-label="Copy lounge URL"
          >
            {copied ? <FaClipboardCheck /> : <FaClipboard />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicLounge;
