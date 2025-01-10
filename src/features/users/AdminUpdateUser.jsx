import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice.jsx";
import AdminUpdateUserForm from "./AdminUpdateUserForm.jsx";
import BackButton from "../../components/BackButton.jsx";

function UpdateUser() {
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));

  return (
    <section className="p-5 bg-offblack min-h-screen">
      {user ? (
        <div>
          <BackButton />
          <AdminUpdateUserForm user={user} />
        </div>
      ) : (
        <p className="text-center text-offwhite">Loading...</p>
      )}
    </section>
  );
}

export default UpdateUser;
