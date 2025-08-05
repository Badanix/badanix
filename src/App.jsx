import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import VideoCall from "./components/VideoCall";

import Preloader from "./components/Preloader";

import {
  AuthRegister,
  AuthPatientRegister,
  AuthLogin,
  Reset,
  ResetCode,
  VerifyEmail,
  ForgotPassword,
  Location,
} from "./view/guest/auth";
import { Forbidden, NotFound, InternalServer } from "./view/guest/errorPage";
// Import secured pages

import {
  Dashboard,
  Doctors,
  DoctorsBooking,
  Schedules,
  Hospitals,
  Pharmacies,
  Laboratories,
  Wallet,
  Activity,
  Settings,
  MedicalRecords,
  PrescriptionReports,
  PatientOnBoarding,
  Profile,
  PatientImageUpload,
  DoctorRate,
} from "./view/loggedIn/secured/patients";

import {
  DoctorDashboard,
  DoctorCalendar,
  DoctorAppointments,
  DoctorActivities,
  DoctorPatients,
  DoctorPayment,
  DoctorProfile,
  DoctorSettings,
  DoctorOnBoarding,
  ImageUpload,
  DoctorDocumentUpload,
  PatientNote,
  PatientEhr,
  Transactions,
} from "./view/loggedIn/secured/doctor";

import {
  PharmaciesDashboard,
  PharmaciesOrder,
  PharmaciesProfile,
  PharmaciesWallet,
  PharmaciesActivity,
  PharmaciesSettings,
  PharmaciesOnBoarding,
  PharmImageUpload,
  PharmDocumentUpload,
} from "./view/loggedIn/secured/institution";

import {
  LabDashboard,
  LabOnboarding,
  LabOrder,
  LabImageUpload,
  LabProfile,
  LabDocumentUpload,
} from "./view/loggedIn/secured/institution";

import {
  HospitalDashboard,
  HospitalOnboarding,
  HosImageUpload,
  HosDocumentUpload,
  HospitalOrder,
  HospitalProfile,
} from "./view/loggedIn/secured/institution";

// import for landng pages
import {
  Home,
  About,
  Contact,
  Faq,
  Cookies,
  Privacy,
  Terms,
  Testimonal,
  Services,
} from "./view/guest/pages";

import { NAMES } from "./components/Constants";
import useColor from "./hooks/useColor";
import PropTypes from "prop-types";
import ProtectedRoute from "./components/ProtectedRoute";
import useInactivityLogout from "./hooks/useInactivityLogout";
import InstiForgotPassword from "./view/guest/auth/InstiForgotPassword";
import InstiResetCode from "./view/guest/auth/InstiResetCode";
import PatientForgotPassword from "./view/guest/auth/PatientForgotPassword";
import PatientResetCode from "./view/guest/auth/PatientResetCode";


const siteTitle = NAMES.SITE_TITLE;
const pagesWithPreloader = ["/"];

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const pageTitleMap = {
      "/auth-register": "Register",
      "/register": "Register",
      "/auth-login": "Login",
      "/reset": "Reset",
      "/reset-code": "Reset Code",
      "/verify-email": "Verify Email",
      "/forgot-password": "Forgot Password",
      "/instiforgot-password": "Institution forgot password",
      "/instireset-code": "Reset Code",
      "/patientforgot-password": "Patient forgot password",
      "/patientreset-code": "Reset Code",
      "/Location": "Location",

      "/403": "403",
      "/404": "404",
      "/500": "500",
      "/dashboard": "Dashboard",
      "/doctor/dashboard": `Doctor's Dashboard`,
      "/doctor/calendar": `Doctor's Calendar`,
      "/doctor/appointments": `Doctor's Appointments`,
      "/doctor/activity": `Doctor's Activities`,
      "/doctor/patients": `Doctor's Patients`,
      "/doctor/payment": `Doctor's Payment`,
      "/doctor/profile": `Doctor's Profile`,
      "/doctor/ImageUpload": `ImageUpload`,
      "/doctor/Transactions": `Transactions`,
      "/doctor/DoctorDocumentUpload": `DoctorDocumentUpload`,
      "/doctor/settings": `Doctor's Settings`,
      "/doctor/onboarding": `Doctor's Profile Completion`,
      "/video": "Video Call",

      "/institution/pharmacy/dashboard": " Dashboard",
      "/institution/pharmacy/order": " Order List",
      "/institution/pharmacy/profile": `pharmacy's Profile`,
      "/institution/pharmacy/wallet": `pharmacy's Wallet`,
      "/institution/pharmacy/activity": `pharmacy's Activity`,
      "/institution/pharmacy/settings": `pharmacy's Settings`,
      "/institution/pharmacy/onboarding": `pharmacy's OnBoarding`,
      "/institution/pharmacy/PharmImageUpload": `pharmacy's Profile Image`,
      "/institution/pharmacy/PharmDocumentUpload": `Pharmcy Document Upload`,

      "/institution/hospital/dashboard": " Dashboard",
      "/institution/hospital/onboarding": `Hospital's OnBoarding`,
      "/institution/hospital/HosImageUpload": `Hospital's Profile Image`,
      "/institution/hospital/HosDocumentUpload": `Hospital Document Upload`,
      "/institution/hospital/order": " Order List",
      "/institution/hospital/profile": `hospital's Profile`,

      "/institution/Laboratory/dashboard": " Dashboard",
      "institution/Laboratory/onboarding": "OnBoarding",
      "/institution/Laboratory/LabImageUpload": `Lab's Profile Image`,
      "/institution/Laboratory/LabDocumentUpload": `Lab Document Upload`,
      "institution/Laboratory/order": "Order",
      "institution/Laboratory/profile": "Profile",

      "/blog": "Blog",
      "/patient/doctors": "Doctors",
      "/DoctorsBooking": "Doctor's Booking",
      "/onboarding": `Patient's Profile Completion`,
      "/PatientImageUpload": "Profile Image",
      "/pharmacies": "Pharmacies",
      "/profile": `Patient's Profile`,
      "/laboratories": "Laboratories",
      "/institutions": "Institutions",
      "/schedules": "Schedules",
      "/wallet": "Wallet",
      "/": "Home",
      "/about": "About Us",
      "/contact": "Contact Us",
      "/faq": "Frequently Asked Questions",
      "/cookies": "Cookies",
      "/privacy": "Privacy Policy",
      "/terms": "Terms and Conditions",
      "/activity": "Activity History",
      "/medicalrecords": "Medical Records",
      "/settings": "User Settings",
      "/testimonal": "Testimonials",
      "/services": "Services",
      "/prescriptionreports": "Prescription Reports",
      "/userregistration": "Complete Registration",
    };
    document.title = `${pageTitleMap[path]} | ${siteTitle}`;
  }, [location.pathname]);
};

const InactivityProtectedRoute = ({ children }) => {
  useInactivityLogout();
  return <>{children}</>;
};

// Prop types for InactivityProtectedRoute
InactivityProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // children is required
};
function AppRouter({ toggleMode, darkMode }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(false);

  // Call the custom hook to update the page title
  usePageTitle();
  useEffect(() => {
    const path = location.pathname;
    if (pagesWithPreloader.includes(path)) {
      setShowPreloader(true);
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowPreloader(false);
      setLoading(false);
    }
  }, [location.pathname]);

  return (
    <>
      {showPreloader && loading ? (
        <Preloader />
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Home toggleMode={toggleMode} darkMode={darkMode} />}
          />

          <Route
            path="/about"
            element={<About toggleMode={toggleMode} darkMode={darkMode} />}
          />
          <Route
            path="/contact"
            element={<Contact toggleMode={toggleMode} darkMode={darkMode} />}
          />
          <Route
            path="/faq"
            element={<Faq toggleMode={toggleMode} darkMode={darkMode} />}
          />
          <Route
            path="/cookies"
            element={<Cookies toggleMode={toggleMode} darkMode={darkMode} />}
          />
          <Route
            path="/terms"
            element={<Terms toggleMode={toggleMode} darkMode={darkMode} />}
          />
          <Route
            path="/testimonal"
            element={<Testimonal toggleMode={toggleMode} darkMode={darkMode} />}
          />
          <Route
            path="/privacy"
            element={<Privacy toggleMode={toggleMode} darkMode={darkMode} />}
          />
          <Route
            path="/services"
            element={<Services toggleMode={toggleMode} darkMode={darkMode} />}
          />

          <Route
            path="/video"
            element={<VideoCall/>}
          />
          <Route path="/auth-register" element={<AuthRegister />} />
          <Route path="/register" element={<AuthPatientRegister />} />
          <Route path="/auth-login" element={<AuthLogin />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/reset-code" element={<ResetCode />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/instiforgot-password"
            element={<InstiForgotPassword />}
          />
          <Route path="/instireset-code" element={<InstiResetCode />} />
          <Route
            path="/patientforgot-password"
            element={<PatientForgotPassword />}
          />
          <Route path="/patientreset-code" element={<PatientResetCode />} />
          <Route path="/location" element={<Location />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="404" element={<NotFound />} />
          <Route path="500" element={<InternalServer />} />

          {/*  laboratory*/}
          <Route
            path="/institution/Laboratory/dashboard"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={LabDashboard}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/institution/Laboratory/onboarding"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={LabOnboarding}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/institution/Laboratory/order"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={LabOrder}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/institution/Laboratory/profile"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={LabProfile}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/institution/Laboratory/LabImageUpload"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={LabImageUpload}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/institution/Laboratory/LabDocumentUpload"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={LabDocumentUpload}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          {/* pharmacy */}
          <Route
            path="/institution/pharmacy/dashboard"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PharmaciesDashboard}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/institution/pharmacy/wallet"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PharmaciesWallet}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/institution/pharmacy/Order"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PharmaciesOrder}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/institution/pharmacy/wallet"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PharmaciesWallet}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/institution/pharmacy/profile"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PharmaciesProfile}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/institution/pharmacy/activity"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PharmaciesActivity}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/institution/pharmacy/settings"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PharmaciesSettings}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/institution/pharmacy/onboarding"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PharmaciesOnBoarding}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/institution/pharmacy/PharmImageUpload"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PharmImageUpload}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/institution/pharmacy/PharmDocumentUpload"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PharmDocumentUpload}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          {/*hospital */}

          <Route
            path="/institution/hospital/dashboard"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={HospitalDashboard}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/institution/hospital/onboarding"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={HospitalOnboarding}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/institution/hospital/HosImageUpload"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={HosImageUpload}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/institution/hospital/HosDocumentUpload"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={HosDocumentUpload}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/institution/hospital/Order"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={HospitalOrder}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/institution/hospital/profile"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={HospitalProfile}
                  allowedRoles={[3]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          {/* Doctor */}
          <Route
            path="/doctor/dashboard"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={DoctorDashboard}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/doctor/calendar"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={DoctorCalendar}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={DoctorAppointments}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/doctor/activity"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={DoctorActivities}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/doctor/patients"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={DoctorPatients}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/doctor/payment"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={DoctorPayment}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={DoctorProfile}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/doctor/ImageUpload"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={ImageUpload}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/doctor/DoctorDocumentUpload"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={DoctorDocumentUpload}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/doctor/PatientNote"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PatientNote}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/doctor/PatientEhr"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PatientEhr}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/doctor/Transactions"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={Transactions}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/doctor/settings"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={DoctorSettings}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/doctor/onboarding"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={DoctorOnBoarding}
                  allowedRoles={[2]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/DoctorRate"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={DoctorRate}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={Dashboard}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/wallet"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={Wallet}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/activity"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={Activity}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={Settings}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/onboarding"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PatientOnBoarding}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/patients/PatientImageUpload"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PatientImageUpload}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/prescriptionreports"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={PrescriptionReports}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/medicalrecords"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={MedicalRecords}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={Profile}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

       

          <Route
            path="/patient/doctors"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={Doctors}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/DoctorsBooking"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={DoctorsBooking}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />

          <Route
            path="/pharmacies"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={Pharmacies}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/laboratories"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={Laboratories}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/hospitals"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={Hospitals}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
          <Route
            path="/schedules"
            element={
              <InactivityProtectedRoute>
                <ProtectedRoute
                  component={Schedules}
                  allowedRoles={[1]}
                  toggleMode={toggleMode}
                  darkMode={darkMode}
                />
              </InactivityProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
}

function App() {
  const [toggleMode, darkMode] = useColor();

  return (
    <Router>
      <div className={darkMode ? "dark" : "light"}>
        {/* Pass down darkMode and toggleMode to AppRouter */}
        <AppRouter toggleMode={toggleMode} darkMode={darkMode} />
      </div>{" "}
    </Router>
  );
}
AppRouter.propTypes = {
  toggleMode: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default App;
