import { useState } from "react";
import { FaArrowLeft, FaRegWindowClose, FaUser } from "react-icons/fa";
import { IoCopyOutline, IoSettings } from "react-icons/io5";

import { defaultUrl } from "./Constants";
import Swal from "sweetalert2";
import { getUserData } from "./Helper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const MobileMenu = ({ menuItems = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userData = getUserData();

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const log = (e) => {
    return console.log(e);
  };

  const location = useLocation();

  const handleCopy = () => {
    const eidNumber = userData?.data?.ehr;
    navigator.clipboard
      .writeText(eidNumber)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "EHR Number has been copied to clipboard.",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to copy EHR Number.",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="relative  ">
      {/* User Icon */}
      <div onClick={toggleMenu} className="ml-2 ">
        <FaUser
          size={40}
          className="p-2 border-2 rounded-full cursor-pointer text-primary dark:text-secondarybg-gray-200"
        />
      </div>

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[90%] bg-white shadow-lg transform overflow-y-scroll scrollbar-thin mb-[45px] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Top Section: Customer Stop */}
        <div className=" px-4 py-4 bg-primary text-white cursor-pointer">
          <div className="flex justify-between items-center">
            <FaArrowLeft
              size={20}
              onClick={toggleMenu}
              className="cursor-pointer hover:text-gray-300"
            />
            <div className="flex justify-end ">
              <IoSettings
                size={24}
                className="mx-5 cursor-pointer"
                onClick={() => navigate("/settings")}
              />
              <FaRegWindowClose
                size={26}
                className="mr-5 cursor-pointer hover:text-gray-700 "
                onClick={toggleMenu}
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex justify-center">
              <img
                src={`${defaultUrl}${userData?.data?.prof_pics || ""}`}
                alt={userData?.data?.fullname}
                className=" h-20 w-20 rounded-full object-cover"
              />
            </div>
            <div className="text-center">
              {/* <p className=" text-center mt-4 capitalize text-md">{userData?.data?.fullname || "Guest User"}</p> */}
              <p className="text-center mt-4 capitalize text-md">
                {userData?.data?.fullname ||
                  userData?.data?.institution_name ||
                  "Guest User"}
              </p>

              <div className="flex justify-center text-[14px] ml-2 -mt-1">
                <p className="">EHR: </p>{" "}
                <div className="flex">
                  <span className="ml-1">{userData?.data?.ehr}</span>
                  <IoCopyOutline
                    className="mt-1 ml-1 cursor-pointer"
                    onClick={handleCopy}
                  />
                </div>
              </div>
              <p className=" text-center text-gray-400 text-sm">
                {userData?.data?.email || ""}
              </p>
            </div>

            {/*  */}
          </div>
        </div>

        {/* Other Content */}
        <div className="bg-white text-black px-4 ">
          {/* Add your other content here */}
          <nav className="p-6 bg-white rounded-lg w-full max-w-sm">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.link;
              return (
                <Link
                  to={item.link}
                  key={index}
                  className={`flex items-center space-x-4 py-3 px-4 rounded-lg  transition duration-200 w-full${
                    isActive
                      ? "bg-white  dark:bg-bgray-600 text-secondary dark:text-secondary"
                      : ""
                  } `}
                >
                  <item.icon className="text-primary" size={24} />
                  <p className="text-gray-700 text-base font-medium">
                    {item.label}
                  </p>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Background Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

MobileMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ).isRequired,
};
export default MobileMenu;
