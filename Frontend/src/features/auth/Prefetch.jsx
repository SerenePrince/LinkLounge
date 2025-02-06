import { store } from "../../app/store.jsx";
import { loungesApiSlice } from "../lounges/loungesApiSlice.jsx";
import { usersApiSlice } from "../users/usersApiSlice.jsx";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function Prefetch() {
  useEffect(() => {
    if (import.meta.env.MODE === "development") {
      console.log("subscribing");
    }
    const lounges = store.dispatch(
      loungesApiSlice.endpoints.getLounges.initiate()
    );
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      if (import.meta.env.MODE === "development") {
        console.log("unsubscribing");
      }
      lounges.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
}

export default Prefetch;
