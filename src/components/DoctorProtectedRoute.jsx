import { Navigate, Outlet } from "react-router-dom";

const DOCTOR_ROLE_ID = 2;

const DoctorProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const roleId = Number(localStorage.getItem("role_id"));
  
  if (!token) {
    return <Navigate to="/auth-login" replace />;
  }

  if (roleId !== DOCTOR_ROLE_ID) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export default DoctorProtectedRoute;
