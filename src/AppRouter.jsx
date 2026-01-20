import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import VideoCall from "./components/VideoCall";

import Preloader from "./components/Preloader";

import PatientProtectedRoute from "./components/PatientProtectedRoute";
import PatientLayout from "./layout/PatientLayout";

import DoctorsLayout from "./layout/DoctorsLayout";
import DoctorProtectedRoute from "./components/DoctorProtectedRoute";
import InstLayout from "./layout/InstLayout";
import HomeLayout from "./layout/HomeLayout";

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
  DoctorsLists,
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
  DiamondCollection,
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
import InstiForgotPassword from "./view/guest/auth/InstiForgotPassword";
import InstiResetCode from "./view/guest/auth/InstiResetCode";
import PatientForgotPassword from "./view/guest/auth/PatientForgotPassword";
import PatientResetCode from "./view/guest/auth/PatientResetCode";

import AdminLayout from "./view/loggedIn/admin/AdminLayout";

import UsersLists from "./view/loggedIn/admin/UsersLists";
import AdminDoctorsLists from "./view/loggedIn/admin/AdminDoctorsLists";
import HospitalLists from "./view/loggedIn/admin/HospitalLists";
import PharmaciesLists from "./view/loggedIn/admin/PharmaciesLists";
import Withdrawals from "./view/loggedIn/admin/Withdrawals";
import AdminSettings from "./view/loggedIn/admin/AdminSettings";
import AdminDashboard from "./view/loggedIn/admin/AdminDashboard";
import AdminRegister from "./view/loggedIn/admin/AdminRegister";
import AdminLogin from "./view/loggedIn/admin/AdminLogin";
import SingleUsers from "./view/loggedIn/admin/SingleUsers";
import SingleDoctors from "./view/loggedIn/admin/SingleDoctors";
import AllTransactions from "./view/loggedIn/admin/AllTransactions";
import AllBookings from "./view/loggedIn/admin/AllBookings";

function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const siteTitle = "BADANIX";

    const pageTitleMap = {
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
      "/doctorsLists": "DoctorsLists",
      "/DoctorsBooking": "Doctor's Booking",
      "/onboarding": `Patient's Profile Completion`,
      "/PatientImageUpload": "Profile Image",
      "/pharmacies": "Pharmacies",
      "/profile": `Patient's Profile`,
      "/laboratories": "Laboratories",
      "/institutions": "Institutions",
      "/schedules": "Schedules",
      "/wallet": "Wallet",
      "/prescriptionreports": "Prescription Reports",
      "/userregistration": "Complete Registration",
      "/diamondcollection": "Diamond Collection",
    };
    const pageTitle = pageTitleMap[path] || "Page";
    document.title = `${pageTitle} | ${siteTitle}`;
  }, [location.pathname]);

  return (
    <Routes>
      {/* Homelayout */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/testimonal" element={<Testimonal />} />

        <Route path="/services" element={<Services />} />
      </Route>

      <Route path="/video" element={<VideoCall />} />
      <Route path="/auth-register" element={<AuthRegister />} />
      <Route path="/register" element={<AuthPatientRegister />} />
      <Route path="/auth-login" element={<AuthLogin />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/reset-code" element={<ResetCode />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/instiforgot-password" element={<InstiForgotPassword />} />
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
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UsersLists />} />
        <Route path="users/:id" element={<SingleUsers />} />
        <Route path="doctors" element={<AdminDoctorsLists />} />
        <Route path="doctors/:id" element={<SingleDoctors />} />
        <Route path="hospitals" element={<HospitalLists />} />
        <Route path="pharmacies" element={<PharmaciesLists />} />
        <Route path="withdrawals" element={<Withdrawals />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="transactions" element={<AllTransactions />} />
        <Route path="bookings" element={<AllBookings />} />
      </Route>

      {/*  laboratory*/}
      <Route element={<InstLayout />}>
        <Route
          path="/institution/Laboratory/dashboard"
          element={<LabDashboard />}
        />

        <Route
          path="/institution/Laboratory/onboarding"
          element={<LabOnboarding />}
        />

        <Route path="/institution/Laboratory/order" element={<LabOrder />} />

        <Route
          path="/institution/Laboratory/profile"
          element={<LabProfile />}
        />

        <Route
          path="/institution/Laboratory/LabImageUpload"
          element={LabImageUpload}
        />
        <Route
          path="/institution/Laboratory/LabDocumentUpload"
          element={<LabDocumentUpload />}
        />
      </Route>

      {/* pharmacy */}
      <Route element={<InstLayout />}>
        <Route
          path="/institution/pharmacy/dashboard"
          element={<PharmaciesDashboard />}
        />

        <Route
          path="/institution/pharmacy/wallet"
          element={<PharmaciesWallet />}
        />

        <Route
          path="/institution/pharmacy/order"
          element={<PharmaciesOrder />}
        />

        <Route
          path="/institution/pharmacy/profile"
          element={<PharmaciesProfile />}
        />

        <Route
          path="/institution/pharmacy/activity"
          element={<PharmaciesActivity />}
        />

        <Route
          path="/institution/pharmacy/settings"
          element={<PharmaciesSettings />}
        />

        <Route
          path="/institution/pharmacy/onboarding"
          element={<PharmaciesOnBoarding />}
        />

        <Route
          path="/institution/pharmacy/PharmImageUpload"
          element={<PharmImageUpload />}
        />

        <Route
          path="/institution/pharmacy/PharmDocumentUpload"
          element={<PharmDocumentUpload />}
        />
      </Route>

      {/*hospital */}
      <Route element={<InstLayout />}>
        <Route
          path="/institution/hospital/dashboard"
          element={<HospitalDashboard />}
        />

        <Route
          path="/institution/hospital/onboarding"
          element={<HospitalOnboarding />}
        />

        <Route
          path="/institution/hospital/HosImageUpload"
          element={<HosImageUpload />}
        />

        <Route
          path="/institution/hospital/HosDocumentUpload"
          element={<HosDocumentUpload />}
        />

        <Route path="/institution/hospital/order" element={<HospitalOrder />} />

        <Route
          path="/institution/hospital/profile"
          element={<HospitalProfile />}
        />
      </Route>

      {/* Doctor */}
      <Route element={<DoctorProtectedRoute />}>
       
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

          <Route path="/doctor/calendar" element={<DoctorCalendar />} />

          <Route path="/doctor/appointments" element={<DoctorAppointments />} />

          <Route path="/doctor/activity" element={<DoctorActivities />} />

          <Route path="/doctor/patients" element={<DoctorPatients />} />

          <Route path="/doctor/payment" element={<DoctorPayment />} />

          <Route path="/doctor/profile" element={<DoctorProfile />} />

          <Route path="/doctor/ImageUpload" element={<ImageUpload />} />

          <Route
            path="/doctor/DoctorDocumentUpload"
            element={<DoctorDocumentUpload />}
          />

          <Route path="/doctor/PatientNote" element={<PatientNote />} />

          <Route path="/doctor/PatientEhr" element={<PatientEhr />} />

          <Route path="/doctor/Transactions" element={<Transactions />} />

          <Route path="/doctor/settings" element={<DoctorSettings />} />

          <Route path="/doctor/onboarding" element={<DoctorOnBoarding />} />
        
      </Route>

      {/* Patients */}
      <Route element={<PatientProtectedRoute />}>
        <Route element={<PatientLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/onboarding" element={<PatientOnBoarding />} />
          <Route
            path="/patients/PatientImageUpload"
            element={<PatientImageUpload />}
          />
          <Route
            path="/prescriptionreports"
            element={<PrescriptionReports />}
          />
          <Route path="/medicalrecords" element={<MedicalRecords />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/doctorsLists" element={<DoctorsLists />} />
          <Route path="/DoctorsBooking" element={<DoctorsBooking />} />
          <Route path="/pharmacies" element={<Pharmacies />} />
          <Route path="/laboratories" element={<Laboratories />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/DoctorRate" element={<DoctorRate />} />
          <Route path="/diamondcollection" element={<DiamondCollection />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
