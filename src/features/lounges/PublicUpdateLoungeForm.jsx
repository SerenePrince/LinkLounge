import { useState, useEffect, useCallback } from "react";
import {
  useUpdateLoungeMutation,
  useDeleteLoungeMutation,
} from "./loungesApiSlice.jsx";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { ICONS } from "../../config/icons.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import { THEMES_LIST } from "../../config/themesList.jsx";
import PropTypes from "prop-types";
import BackButton from "../../components/BackButton.jsx";

function PublicUpdateLoungeForm({ lounge }) {
  const { username } = useAuth();
  const [updateLounge, { isLoading, isSuccess, error }] =
    useUpdateLoungeMutation();
  const [deleteLounge, { isSuccess: isDeleteSuccess }] =
    useDeleteLoungeMutation();
  const navigate = useNavigate();

  const [user] = useState(lounge.user);
  const [profile, setProfile] = useState(lounge.profile);
  const [description, setDescription] = useState(lounge.description);
  const [title, setTitle] = useState(lounge.title);
  const [buttons, setButtons] = useState(lounge.buttons || []);
  const [icons, setIcons] = useState(lounge.icons || []);
  const [background, setBackground] = useState(lounge.background || "");
  const [isPublic, setIsPublic] = useState(lounge.isPublic);
  const [theme, setTheme] = useState(lounge.theme || "default.css");

  const [profilePreview, setProfilePreview] = useState(lounge.profile);
  const [backgroundPreview, setBackgroundPreview] = useState(lounge.background);

  useEffect(() => {
    if (isSuccess) {
      alert("You've successfully updated your lounge!");
      navigate(-1);
    }
    if (isDeleteSuccess) {
      alert("You've successfully deleted your lounge!");
      navigate(-1);
    }
  }, [isSuccess, isDeleteSuccess, navigate, username]);

  const onProfileDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const image = new Image();
      const reader = new FileReader();
      reader.onload = () => {
        image.onload = () => {
          const size = Math.min(image.width, image.height);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = size;
          canvas.height = size;
          ctx.drawImage(
            image,
            (image.width - size) / 2,
            (image.height - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
          );
          const squaredImage = canvas.toDataURL(file.type);
          setProfilePreview(squaredImage);
          setProfile(file);
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onBackgroundDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBackground(file);
        setBackgroundPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const {
    getRootProps: getProfileRootProps,
    getInputProps: getProfileInputProps,
    isDragActive: isProfileDragActive,
  } = useDropzone({
    onDrop: onProfileDrop,
    accept: "image/*",
    multiple: false,
  });

  const {
    getRootProps: getBackgroundRootProps,
    getInputProps: getBackgroundInputProps,
    isDragActive: isBackgroundDragActive,
  } = useDropzone({
    onDrop: onBackgroundDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleProfileReset = () => {
    setProfile(null);
    setProfilePreview("");
  };

  const handleBackgroundReset = () => {
    setBackground(null);
    setBackgroundPreview("");
  };

  const onSaveLoungeClicked = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", lounge.id);
    formData.append("user", JSON.stringify(user));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("isPublic", isPublic.toString());
    formData.append("theme", theme);

    if (profile) {
      formData.append("profile", profile);
    } else {
      formData.append("profile", "null");
    }
    if (background) {
      formData.append("background", background);
    } else {
      formData.append("background", "null");
    }

    formData.append("buttons", JSON.stringify(buttons));
    formData.append("icons", JSON.stringify(icons));

    try {
      await updateLounge(formData);
    } catch (err) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.error("Failed to save lounge:", err);
      }
    }
  };

  const onDeleteLoungeClicked = async () => {
    await deleteLounge({ id: lounge._id });
  };

  const canSave = title && !isLoading;
  const errorContent = error?.data?.message || "";

  const handleAddIcon = () => setIcons([...icons, { icon: "", link: "" }]);
  const handleRemoveIcon = (index) =>
    setIcons(icons.filter((_, i) => i !== index));

  const handleIconChange = (index, value) => {
    const updatedIcons = icons.map((icon, i) =>
      i === index ? { ...icon, icon: value } : icon
    );
    setIcons(updatedIcons);
  };

  const handleLinkChange = (index, value) => {
    const updatedIcons = icons.map((icon, i) =>
      i === index ? { ...icon, link: value } : icon
    );
    setIcons(updatedIcons);
  };

  const handleAddButton = () =>
    setButtons([...buttons, { text: "", link: "" }]);
  const handleRemoveButton = (index) =>
    setButtons(buttons.filter((_, i) => i !== index));
  const handleButtonTextChange = (index, value) => {
    const updatedButtons = buttons.map((button, i) =>
      i === index ? { ...button, text: value } : button
    );
    setButtons(updatedButtons);
  };

  const handleButtonLinkChange = (index, value) => {
    const updatedButtons = buttons.map((button, i) =>
      i === index ? { ...button, link: value } : button
    );
    setButtons(updatedButtons);
  };

  return (
    <section className="space-y-6 max-w-4xl mx-auto p-5 bg-offwhite">
      <BackButton />
      <h2 className="text-xl font-semibold text-primary text-center tablet:text-left">
        Update Lounge
      </h2>
      {errorContent && <p className="text-center text-error">{errorContent}</p>}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {/* Profile Image */}
        <div>
          <h3 className="text-lg font-medium text-primary">Profile Picture</h3>
          <div
            {...getProfileRootProps()}
            className={`border-dashed border-2 p-5 text-center rounded-md ${
              isProfileDragActive
                ? "border-highlight bg-tertiary"
                : "border-primary bg-white"
            }`}
          >
            <input {...getProfileInputProps()} />
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile Preview"
                className="max-w-full h-32 object-cover mx-auto"
              />
            ) : (
              <p className="text-primary">Click or drag & drop profile image</p>
            )}
          </div>
          {profilePreview && (
            <button onClick={handleProfileReset} className="text-error mt-1">
              Reset Profile Image
            </button>
          )}
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-primary"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 border rounded-md text-offblack bg-lightgrey"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-primary"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2.5 border rounded-md text-offblack bg-lightgrey"
          />
        </div>

        {/* Icon Selection */}
        <div>
          <h3 className="text-lg font-medium text-primary">Icons</h3>
          <button
            type="button"
            onClick={handleAddIcon}
            className="text-primary hover:text-accent transition"
          >
            Add
          </button>
          {icons.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <select
                value={item.icon}
                onChange={(e) => handleIconChange(index, e.target.value)}
                className="p-2.5 w-1/4 border rounded-md text-offblack bg-lightgrey mt-3"
              >
                <option value="">Select Icon</option>
                {Object.keys(ICONS).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Add link"
                value={item.link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                className="w-full p-2.5 border rounded-md text-offblack bg-lightgrey mt-3"
              />
              <button
                type="button"
                onClick={() => handleRemoveIcon(index)}
                className="text-error hover:text-error transition mt-3"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div>
          <h3 className="text-lg font-medium text-primary">Buttons</h3>
          <button
            type="button"
            onClick={handleAddButton}
            className="text-primary hover:text-accent"
          >
            Add
          </button>
          {buttons.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Button Text"
                value={item.text}
                onChange={(e) => handleButtonTextChange(index, e.target.value)}
                className="w-full p-2.5 border rounded-md text-offblack bg-lightgrey mt-3"
              />
              <input
                type="text"
                placeholder="Button Link"
                value={item.link}
                onChange={(e) => handleButtonLinkChange(index, e.target.value)}
                className="w-full p-2.5 border rounded-md text-offblack bg-lightgrey mt-3"
              />
              <button
                type="button"
                onClick={() => handleRemoveButton(index)}
                className="text-error hover:text-error transition mt-3"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>

        {/* Background Image */}
        <div>
          <h3 className="text-lg font-medium text-primary">Background Image</h3>
          <div
            {...getBackgroundRootProps()}
            className={`border-dashed border-2 p-5 text-center rounded-md ${
              isBackgroundDragActive
                ? "border-highlight bg-tertiary"
                : "border-primary bg-white"
            }`}
          >
            <input {...getBackgroundInputProps()} />
            {backgroundPreview ? (
              <img
                src={backgroundPreview}
                alt="Background Preview"
                className="max-w-full h-32 object-cover mx-auto"
              />
            ) : (
              <p className="text-primary">
                Click or drag & drop background image
              </p>
            )}
          </div>
          {backgroundPreview && (
            <button onClick={handleBackgroundReset} className="text-error mt-1">
              Reset Background Image
            </button>
          )}
        </div>

        {/* Theme Selection */}
        <div>
          <label
            htmlFor="theme"
            className="block text-lg font-medium text-primary"
          >
            Theme
          </label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="p-2 w-full border rounded-md text-offblack bg-lightgrey"
          >
            <option value="">-- Theme --</option>
            {THEMES_LIST.map((themeOption) => (
              <option key={themeOption} value={themeOption}>
                {themeOption}
              </option>
            ))}
          </select>
        </div>

        {/* Public Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            className="text-primary"
          />
          <label className="text-lg font-medium text-primary mt-1">
            Make Public
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-2">
          <button
            onClick={onSaveLoungeClicked}
            disabled={!canSave}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-accent transition disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Lounge"}
          </button>
          <button
            type="button"
            onClick={onDeleteLoungeClicked}
            className="bg-error text-white py-2 px-4 rounded-md hover:bg-accent transition disabled:opacity-50"
          >
            Delete Lounge
          </button>
        </div>
      </form>
    </section>
  );
}

PublicUpdateLoungeForm.propTypes = {
  lounge: PropTypes.object.isRequired,
};

export default PublicUpdateLoungeForm;
