import { useGetLoungesByUserQuery } from "./loungesApiSlice.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import { useSelector } from "react-redux";
import { selectUserByUsername } from "../users/usersApiSlice.jsx";
import PublicLounge from "./PublicLounge.jsx";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";

const PublicLoungeList = () => {
  const { username } = useAuth();
  const user = useSelector((state) => selectUserByUsername(state, username));
  const navigate = useNavigate();

  const {
    data: lounges,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLoungesByUserQuery(user?._id);

  let content;

  if (isLoading) {
    content = <p className="text-center text-offblack">Loading...</p>;
  }

  if (isError) {
    content = (
      <p className="text-center text-offblack mt-6">
        {error?.data?.message || "An error occurred."}
      </p>
    );
  }

  if (isSuccess) {
    const { ids = [] } = lounges || {};

    if (ids.length === 0) {
      content = (
        <p className="text-center text-offblack mt-6">No lounges found.</p>
      );
    } else {
      content = (
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6 mt-6 max-w-6xl mx-auto">
          {ids.map((loungeId) => (
            <PublicLounge key={loungeId} loungeId={loungeId} />
          ))}
        </div>
      );
    }
  }

  return (
    <div className="bg-highlight text-offblack min-h-screen py-8">
      <BackButton />
      <div className="w-full max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-offblack font-josefin text-center">
          Your Lounges
        </h1>
        <p className="text-lg text-center text-offblack mt-2">
          Manage and customize your lounges effortlessly.
        </p>
        {content}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(`create/${user._id}`)}
            className="px-6 py-3 bg-secondary text-offwhite rounded-md hover:bg-accent transition-colors duration-200"
          >
            Create New Lounge
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicLoungeList;
