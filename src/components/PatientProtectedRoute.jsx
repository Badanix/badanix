import { Navigate, Outlet } from "react-router-dom";

const PATIENT_ROLE_ID = 1;

const PatientProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const roleId = Number(localStorage.getItem("role_id"));

  // Not logged in
  if (!token) {
    return <Navigate to="/auth-login" replace />;
  }

  // Logged in but not a patient
  if (roleId !== PATIENT_ROLE_ID) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export default PatientProtectedRoute;
