import { Link } from "react-router-dom";
import { FaBars, FaBell, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Notification from "./Notification";
import { defaultUrl, ScheduleLists } from "./Constants";
import useTargetUrl from "../hooks/useTagetUrl";
import { getUserData, logout } from "./Helper";
import { IoSettings } from "react-icons/io5";
import { GrLogout } from "react-icons/gr";
import { useNotification } from "../hooks/useNotification";

const TopBar = ({
  toggleSidebar,
  NAMES,
  profileDropdownOpen,
  toggleTopbar,
  envelopeIcon,
}) => {
  const { notifications } = useNotification();
const userData = getUserData();

console.log("FULL userData:", userData);
console.log("userData.data:", userData?.data);
console.log("role_id:", userData?.data?.role_id);
console.log("logo:", userData?.data?.logo);
console.log("prof_pics:", userData?.data?.prof_pics);

  const getTargetUrl = useTargetUrl();

  const urlMapping = [
    [(pathname) => pathname.includes("/doctor"), "/doctor/appointments"],
    [(pathname) => pathname.includes("/admin"), "/admin/messages"],
  ];

  const finalUrl = getTargetUrl(urlMapping);
  const targetUrl =
    finalUrl ||
    (location.pathname.includes("institution") ||
    location.pathname.includes("doctor") ||
    location.pathname.includes("admin")
      ? "/schedules"
      : "/schedules");
  const [showNotification, setShowNotification] = useState(false);
  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };
  // eslint-disable-next-line react/prop-types
  const logo = NAMES.LOGO;

  const formatCurrentDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <header className="hidden sm:flex justify-between items-center bg-white p-4 py-3 shadow-md -mt-3 top-0 right-0 sticky z-50">
      <div className="flex items-center">
        {/* Sidebar Toggle Button */}
        <button onClick={toggleSidebar} className="sm:hidden">
          <FaBars size={24} />
        </button>

        {/* Logo Image */}

        <img src={logo} alt="Logo" className="h-14 lg:w-[26vw] " />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative sm:bg-white sm:rounded-full sm:p-4">
          {/* Notification Bell */}
          <div className="flex items-center justify-center">
            <FaBell
              className={`text-primary cursor-pointer${
                showNotification ? "rotate-180" : ""
              }`}
              size={24}
              onClick={handleNotificationClick}
            />

            {notifications.length > 0 && (
              <div className="absolute -top-0 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.length}
              </div>
            )}
          </div>

          {showNotification && (
            <div className="absolute right-0 bg-white dark:bg-gray-800 shadow-lg z-50 transition-transform duration-300 ease-in-out overflow-y-auto scrollbar-thin top-[50px] w-[400px] h-[500px] mx-auto rounded-xl">
              <Notification
                onClose={handleCloseNotification}
                showNotification={showNotification}
              />
            </div>
          )}
        </div>

        {/* Link to Schedules Page */}
        {userData?.data?.rolde_id === 1 && (
          <div className="relative sm:bg-white sm:rounded-full sm:p-4">
            <Link to={targetUrl} className="flex items-center justify-center">
              {/* Envelope Icon */}
              {envelopeIcon ? (
                React.createElement(envelopeIcon, {
                  className: "text-primary cursor-pointer",
                  size: 24,
                })
              ) : (
                <FaEnvelope className="text-primary cursor-pointer" size={24} />
              )}

              {/* Total Upcoming Schedules Badge */}
              {ScheduleLists.filter(
                (schedule) => schedule.status === "upcoming"
              ).length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {
                    ScheduleLists.filter(
                      (schedule) => schedule.status === "upcoming"
                    ).length
                  }
                </div>
              )}
            </Link>
          </div>
        )}

        <div className="hidden lg:flex sm:bg-white sm:rounded-full sm:p-4">
          <FaCalendarAlt className="text-primary mr-2" size={24} />
          {formatCurrentDate()}
        </div>
        <div className="relative ">
          <div className="flex cursor-pointer" onClick={() => toggleTopbar()}>
            <div className="sm:bg-white sm:rounded-full sm:p-1">
              <img
                src={
                  userData?.data?.role_id === 3
                    ? `${defaultUrl}${userData?.data?.logo}`
                    : `${defaultUrl}${userData?.data?.prof_pics}`
                }
                alt="profile-image"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
            </div>
            <div className="hidden lg:block sm:mt-1 ml-2">
              <p className="font-bold">
                {userData?.data?.role_id === 3
                  ? userData?.data?.institution_name
                  : userData?.data?.fullname || "Guest User"}
              </p>
              <p className="-mt-1 text-sm uppercase">
                {userData?.data?.ehr || "N/A"}
              </p>
            </div>
          </div>

          {profileDropdownOpen && (
            <div
              className={`absolute right-0 bg-white  rounded shadow-md mt-2 z-10 w-[50vw] py-4 md:w-[20vw]`}
            >
              {/* Settings Item */}
              {userData?.data?.rolde_id === 1 && (
                <Link
                  to="/settings"
                  className="flex border-b-2 p-2 justify-center space-x-3"
                >
                  <IoSettings className="icon-class text-primary text-xl" />
                  <p>Settings</p>
                </Link>
              )}

      

              {/* Logout Item */}
              <button
                onClick={logout} // Trigger the logout function
                className={`flex  p-2 justify-center space-x-3 w-full text-left  ${
                  userData?.data?.rolde_id === 1 ? "border-b-2" : ""
                }`}
              >
                <GrLogout className="icon-class text-primary text-xl" />
                <p>Logout</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
TopBar.propTypes = {
  siteTitle: PropTypes.string,
  userImage: PropTypes.string,
  TOPBARMENU: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  toggleSidebar: PropTypes.func,
  NAMES: PropTypes.shape({
    FULLNAME: PropTypes.string,
    SITE_TITLE: PropTypes.string,
    selectedCurrency: PropTypes.shape({
      symbol: PropTypes.string,
      sign: PropTypes.string,
    }),
  }),
  profileDropdownOpen: PropTypes.bool,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      icon: PropTypes.elementType,
      name: PropTypes.string,
    })
  ),
  toggleTopbar: PropTypes.func,
  placeholder: PropTypes.string,
  envelopeIcon: PropTypes.elementType,
};
export default TopBar;
