
import { Navigate, Outlet } from "react-router-dom";

const INST_ROLE_ID = 3;

const InstitutionProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const roleId = Number(localStorage.getItem("role_id"));

  if (!token) {
    return <Navigate to="/auth-login" replace />;
  }

  if (roleId !== INST_ROLE_ID) {
    return <Navigate to="/403" replace />;
  }
  return <Outlet />;
};


export default InstitutionProtectedRoute;
