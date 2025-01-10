import BackButton from "../../components/BackButton.jsx";
import AdminLounge from "./AdminLounge.jsx";
import { useGetLoungesQuery } from "./loungesApiSlice.jsx";

const AdminLoungesList = () => {
  const {
    data: lounges,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLoungesQuery();

  let content;

  if (isLoading) {
    content = <p className="text-center text-offwhite">Loading...</p>;
  }

  if (isError) {
    content = (
      <p className="text-center text-error">
        {error?.data?.message || "An error occurred."}
      </p>
    );
  }

  if (isSuccess) {
    const { ids = [] } = lounges || {};

    if (ids.length === 0) {
      content = <p className="text-center text-offwhite">No lounges found.</p>;
    } else {
      const tableContent = ids.map((loungeId) => (
        <AdminLounge key={loungeId} loungeId={loungeId} />
      ));

      content = (
        <table className="w-full max-w-4xl mx-auto mt-6 table-auto border-collapse border border-offwhite">
          <thead>
            <tr>
              <th
                scope="col"
                className="border border-offwhite px-4 py-2 text-left text-offwhite"
              >
                Username
              </th>
              <th
                scope="col"
                className="border border-offwhite px-4 py-2 text-left text-offwhite"
              >
                Created
              </th>
              <th
                scope="col"
                className="border border-offwhite px-4 py-2 text-left text-offwhite"
              >
                Updated
              </th>
              <th
                scope="col"
                className="border border-offwhite px-4 py-2 text-left text-offwhite"
              >
                Title
              </th>
              <th
                scope="col"
                className="border border-offwhite px-4 py-2 text-left text-offwhite"
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      );
    }
  }

  return (
    <div className="flex justify-center px-4 bg-offblack min-h-screen py-8">
      <BackButton />
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-offwhite font-josefin text-center">
          All Lounges
        </h1>
        {content}
      </div>
    </div>
  );
};

export default AdminLoungesList;
