import { useSelector } from "react-redux";
import { selectLoungeById } from "./loungesApiSlice.jsx";
import PublicUpdateLoungeForm from "./PublicUpdateLoungeForm.jsx";
import { useParams } from "react-router-dom";

function PublicUpdateLounge() {
  const { id } = useParams();
  const lounge = useSelector((state) => selectLoungeById(state, id));

  return (
    <section>
      {lounge ? (
        <PublicUpdateLoungeForm lounge={lounge} />
      ) : (
        <p className="text-center text-offwhite">Loading...</p>
      )}
    </section>
  );
}

export default PublicUpdateLounge;
