import { useGetUsersQuery } from "./usersApiSlice.jsx";
import AdminUser from "./AdminUser.jsx";
import BackButton from "../../components/BackButton.jsx";

const AdminUsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

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
    const { ids = [] } = users || {};

    if (ids.length === 0) {
      content = <p className="text-center text-offwhite">No users found.</p>;
    } else {
      const tableContent = ids.map((userId) => (
        <AdminUser key={userId} userId={userId} />
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
                Email
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
    <div className="flex justify-center  px-4 bg-offblack min-h-screen py-8">
      <BackButton />
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-offwhite font-josefin text-center">
          All Users
        </h1>
        {content}
      </div>
    </div>
  );
};

export default AdminUsersList;
