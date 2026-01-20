import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/* ================= ICONS ================= */
import {
  FaBars,
  FaBell,
  FaEnvelope,
  FaCalendarAlt,
  FaCog,
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { GrLogout } from "react-icons/gr";

/* ================= HELPERS & HOOKS ================= */
import { IMAGE, defaultUrl, NAMES } from "../../components/Constants";
import useTargetUrl from "../../hooks/useTagetUrl";
import UseTopMenu from "../../hooks/UseTopMenu";
import { getUserData, logout } from "../../components/Helper";
import { useNotification } from "../../hooks/useNotification";
import Notification from "../../components/Notification";

/* ================= IMAGE ICONS ================= */
import DoctorIcon from "../../assets/icons/doctor.png";
import PharmacyIcon from "../../assets/icons/pharmacy.png";
import PatientIcon from "../../assets/icons/patient.png";
import scheduleIcon from "../../assets/icons/schedule.png";
import hospitalIcon from "../../assets/icons/hospital.png";
import labIcon from "../../assets/icons/laboratory.png";
import walletIcon from "../../assets/icons/wallet.png";

/* ================= SIDEBAR MENU ================= */
const PATIENTSIDEBARMENU = [
  { icon: PatientIcon, type: "img", label: "Dashboard", link: "/dashboard" },
  { icon: DoctorIcon, type: "img", label: "Doctors", link: "/doctorsLists" },
  {
    icon: scheduleIcon,
    type: "img",
    label: "Appointments",
    link: "/schedules",
  },
  { icon: hospitalIcon, type: "img", label: "Hospitals", link: "/hospitals" },
  { icon: PharmacyIcon, type: "img", label: "Pharmacies", link: "/pharmacies" },
  { icon: labIcon, type: "img", label: "Laboratories", link: "/laboratories" },
  { icon: walletIcon, type: "img", label: "Wallet", link: "/wallet" },
  { icon: FaCog, type: "icon", label: "Settings", link: "/settings" },
];

const PATIENTTOPBARMENU = [
  { name: "Settings", link: "/settings", icon: IoSettings },
  { name: "Logout", link: "/logout", icon: GrLogout },
];

/* ================= COMPONENT ================= */
const PatientMenu = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const userData = getUserData();
  const { notifications } = useNotification();
  const { profileDropdownOpen, toggleTopbar } = UseTopMenu();
  const [showNotification, setShowNotification] = useState(false);

  const getTargetUrl = useTargetUrl();
  const finalUrl = getTargetUrl([
    [(pathname) => pathname.includes("/doctor"), "/doctor/appointments"],
    [(pathname) => pathname.includes("/admin"), "/admin/messages"],
  ]);
  const targetUrl = finalUrl || "/schedules";

  const formatCurrentDate = () =>
    new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    
             const isMobile = window.innerWidth < 640; 
  return (
    <>
      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= HEADER ================= */}
      <header
        className={`hidden sm:flex justify-between items-center bg-white p-2 shadow-md sticky top-0 z-30 transition-all duration-300
          ${collapsed ? "ml-20" : "ml-[130px]"}`}
      >
        <Link to="/">
          <img
            src={IMAGE.site_logo || NAMES.LOGO}
            alt="Logo"
            className="h-14"
          />
        </Link>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <FaBell
              size={22}
              className="cursor-pointer text-primary"
              onClick={() => setShowNotification(!showNotification)}
            />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}

            {showNotification && (
              <div className="fixed top-20 right-6 w-[400px] h-[500px] bg-white shadow-xl rounded-xl z-[9999]">
                <Notification onClose={() => setShowNotification(false)} />
              </div>
            )}
          </div>

          {/* Date */}
          <div className="hidden lg:flex items-center">
            <FaCalendarAlt className="mr-2 text-primary" />
            {formatCurrentDate()}
          </div>

          {/* Profile */}
          <div className="relative">
            <div
              onClick={toggleTopbar}
              className="flex cursor-pointer items-center"
            >
              <img
                src={`${defaultUrl}${userData?.data?.prof_pics}`}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="hidden lg:block ml-2">
                <p className="font-bold">
                  {userData?.data?.fullname || "Guest User"}
                </p>
                <p className="text-sm uppercase">
                  {userData?.data?.ehr || "N/A"}
                </p>
              </div>
            </div>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-48 z-50">
                {PATIENTTOPBARMENU.map((item, index) =>
                  item.name === "Logout" ? (
                    <button
                      key={index}
                      onClick={logout}
                      className="flex items-center px-4 py-2 w-full"
                    >
                      <item.icon className="mr-2 text-primary" />
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={index}
                      to={item.link}
                      className="flex items-center px-4 py-2 border-b"
                    >
                      <item.icon className="mr-2 text-primary" />
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white shadow-lg z-50
          transition-transform duration-300
          ${collapsed ? "w-20" : "w-50"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0
        `}
      >
        {/* Collapse / Close Buttons */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <span className="font-bold">{NAMES.SITE_TITLE}</span>}
          <div className="flex gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden sm:block"
            >
              <FaBars size={20} />
            </button>
            <button onClick={() => setMobileOpen(false)} className="sm:hidden">
              ✕
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav
          className="mt-4 overflow-y-auto"
          style={{ height: "calc(100vh - 80px)" }}
        >
          {PATIENTSIDEBARMENU.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-4 px-5 py-3 hover:bg-gray-100"
            >
              {item.type === "icon" ? (
                <item.icon className="text-secondary text-xl object-contain" />
              ) : (
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-[35px] h-10 object-contain"
                />
              )}


{(!collapsed || isMobile) && (
  <span className="whitespace-nowrap">{item.label}</span>
)}

            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

PatientMenu.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  setMobileOpen: PropTypes.func.isRequired,
};

export default PatientMenu;
