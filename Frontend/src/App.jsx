// Importing necessary dependencies
import { Routes, Route } from "react-router-dom";

// Importing layout and page components
import Layout from "./components/Layout.jsx";
import Public from "./pages/Public.jsx";
import Login from "./features/auth/Login.jsx";
import SignUp from "./features/auth/SignUp.jsx";
import Admin from "./pages/Admin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Help from "./pages/Help.jsx";
import Feedback from "./pages/Feedback.jsx";
import PublicLounge from "./pages/PublicLounge.jsx";

// Importing feature components
import AdminUsersList from "./features/users/AdminUsersList.jsx";
import AdminUpdateUser from "./features/users/AdminUpdateUser.jsx";
import AdminLoungesList from "./features/lounges/AdminLoungesList.jsx";
import AdminUpdateLounge from "./features/lounges/AdminUpdateLounge.jsx";
import PublicUpdateUserForm from "./features/users/PublicUpdateUserForm.jsx";
import PublicLoungeList from "./features/lounges/PublicLoungeList.jsx";
import PublicCreateLounge from "./features/lounges/PublicCreateLounge.jsx";
import PublicUpdateLounge from "./features/lounges/PublicUpdateLounge.jsx";

// Importing authentication components
import Prefetch from "./features/auth/Prefetch.jsx";
import PersistLogin from "./features/auth/PersistLogin.jsx";
import RequireAuth from "./features/auth/RequireAuth.jsx";
import ForgotPassword from "./features/auth/ForgotPassword.jsx";
import ForgotUsername from "./features/auth/ForgotUsername.jsx";
import ResetPassword from "./features/auth/ResetPassword.jsx";

// Importing roles and configuration
import { ROLES } from "./config/roles.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Public />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="forgot-username" element={<ForgotUsername />} />
        <Route path="reset-password" element={<ResetPassword />} />

        {/* Protected Routes with PersistLogin and Prefetch */}
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            {/* Dashboard Routes (Require Auth for User and Admin) */}
            <Route
              path="dashboard"
              element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
            >
              {/* Admin Routes (Require Auth for Admin) */}
              <Route
                path="admin"
                element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
              >
                <Route index element={<Admin />} />
                <Route path="users">
                  <Route index element={<AdminUsersList />} />
                  <Route path=":id" element={<AdminUpdateUser />} />
                </Route>
                <Route path="lounges">
                  <Route index element={<AdminLoungesList />} />
                  <Route path=":id" element={<AdminUpdateLounge />} />
                </Route>
              </Route>

              {/* User Profile Routes (Nested under username) */}
              <Route path=":username" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="settings" element={<PublicUpdateUserForm />} />
                <Route path="lounges">
                  <Route index element={<PublicLoungeList />} />
                  <Route path="create/:id" element={<PublicCreateLounge />} />
                  <Route path=":id" element={<PublicUpdateLounge />} />
                </Route>
                <Route path="help" element={<Help />} />
                <Route path="feedback" element={<Feedback />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="/:username/:title" element={<PublicLounge />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
