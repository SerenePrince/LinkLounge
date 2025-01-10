import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoungeById } from "./loungesApiSlice.jsx";
import AdminUpdateLoungeForm from "./AdminUpdateLoungeForm.jsx";

function AdminUpdateLounge() {
  const { id } = useParams();
  const lounge = useSelector((state) => selectLoungeById(state, id));

  return (
    <section className="bg-offblack">
      {lounge ? (
        <div>
          <AdminUpdateLoungeForm lounge={lounge} />
        </div>
      ) : (
        <p className="text-center text-offwhite">Loading...</p>
      )}
    </section>
  );
}

export default AdminUpdateLounge;
