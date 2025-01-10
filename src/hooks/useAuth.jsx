import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice.jsx";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  if (token) {
    const decoded = jwtDecode(token);
    const { username, email, role } = decoded.UserInfo;
    return { username, email, role }; // Returning username, email, and id directly
  }
  return { username: "", email: "", role: "" }; // Returning empty strings if no token
};

export default useAuth;
