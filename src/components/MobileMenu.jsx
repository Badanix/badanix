import { useState, useMemo } from "react";
import { FaArrowLeft, FaCog, FaRegWindowClose, FaUser } from "react-icons/fa";
import { IoCopyOutline, IoSettings } from "react-icons/io5";
import { FaBars } from "react-icons/fa";

import { defaultUrl } from "./Constants";
import Swal from "sweetalert2";
import { getUserData } from "./Helper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import DoctorIcon from "../assets/icons/doctor.png";
import PharmacyIcon from "../assets/icons/pharmacy.png";
import FaPatient from "../assets/icons/patient.png";
import scheduleIcon from "../assets/icons/schedule.png";
import hospitalIcon from "../assets/icons/hospital.png";
import labIcon from "../assets/icons/laboratory.png";
import walletIcon from "../assets/icons/wallet.png";
import InstitutionIcon from "../assets/icons/hospital.png";
import PatientIcon from "../assets/icons/patient.png";
import OrderIcon from "../assets/icons/Order.png";

const MobileMenu = ({ isSidebarOpen, toggleSidebar, institutionType }) => {
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

  const currentRole = useMemo(() => {
    if (location.pathname.startsWith("/doctor")) return "doctor";
    if (location.pathname.startsWith("/institution")) return "institution";
    return "patient";
  }, [location.pathname]);

  const getMenuItemsByRole = (role) => {
    switch (role) {
      case "doctor":
        return [
          {
            icon: DoctorIcon,
            label: "Dashboard",
            link: "/doctor/dashboard",
          },
          {
            icon: scheduleIcon,
            label: "Appointments",
            link: "/doctor/appointments",
          },
          {
            icon: PatientIcon,
            label: "Patients",
            link: "/doctor/patients",
          },
          {
            icon: walletIcon,
            label: "Wallet",
            link: "/doctor/payment",
          },
          {
            icon: PatientIcon,
            label: "Patient Note",
            link: "/doctor/PatientNote",
          },
          {
            icon: PatientIcon,
            label: "Patient EHR",
            link: "/doctor/PatientEhr",
          },
          {
            icon: FaCog,
            label: "Settings",
            link: "/doctor/settings",
          },
        ];

      case "institution":
        if (institutionType === "pharmacy") {
          return [
            {
              icon: PharmacyIcon,
              label: "Dashboard",
              link: "/institution/pharmacy/dashboard",
            },
            {
              icon: OrderIcon,
              label: "Orders",
              link: "/institution/Pharmacy/Order",
            },
            {
              icon: PharmacyIcon,
              label: "Profile",
              link: "/institution/Pharmacy/Profile",
            },
          ];
        }

        if (institutionType === "hospital") {
          return [
            {
              icon: InstitutionIcon,
              label: "Dashboard",
              link: "/institution/hospital/dashboard",
            },
            {
              icon: OrderIcon,
              label: "Orders",
              link: "/institution/hospital/Order",
            },
            {
              icon: hospitalIcon,
              label: "Profile",
              link: "/institution/hospital/Profile",
            },
          ];
        }

        if (institutionType === "laboratory") {
          return [
            {
              icon: labIcon,
              label: "Dashboard",
              link: "/institution/laboratory/dashboard",
            },

            {
              icon: OrderIcon,
              label: "Orders",
              link: "/institution/laboratory/Order",
            },

            {
              icon: labIcon,
              label: "Profile",
              link: "/institution/laboratory/Profile",
            },
          ];
        }

        return [
          {
            icon: InstitutionIcon,
            label: "Institution Dashboard",
            link: "/institution/dashboard",
          },
        ];

      case "patient":
      default:
        return [
          { icon: FaPatient, label: "Dashboard", link: "/dashboard" },
          { icon: DoctorIcon, label: "Doctors", link: "/patient/doctors" },
          { icon: scheduleIcon, label: "Appointments", link: "/schedules" },
          { icon: hospitalIcon, label: "Hospitals", link: "/hospitals" },
          { icon: PharmacyIcon, label: "Pharmacies", link: "/pharmacies" },
          { icon: labIcon, label: "Laboratories", link: "/laboratories" },
          { icon: walletIcon, label: "Wallet", link: "/wallet" },
          { icon: FaCog, label: "Settings", link: "/settings" },
        ];
    }
  };

  const menuItems = useMemo(
    () => getMenuItemsByRole(currentRole),
    [currentRole, institutionType]
  );

  return (
    <div className="relative  ">
      <div onClick={toggleMenu} className="ml-2 ">
        <FaUser
          size={40}
          className="p-2 border-2 rounded-full cursor-pointer text-primary dark:text-secondarybg-gray-200"
        />
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-[90%] bg-white shadow-lg transform overflow-y-scroll scrollbar-thin mb-[45px] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className=" px-4 py-4 bg-primary text-white cursor-pointer">
          <div className="flex justify-between items-center">
            <FaArrowLeft
              size={20}
              onClick={toggleMenu}
              className="cursor-pointer hover:text-gray-300"
            />
            <div className="flex justify-end ">
        
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

        <div className="bg-white text-black px-4 ">
          <nav className="p-6 bg-white rounded-lg w-full max-w-sm">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.link;
              const IconComponent = item.icon;

              return (
                <li
                  key={index}
                  className={`flex items-center p-4 cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-bgray-600 text-secondary dark:text-secondary"
                      : ""
                  }`}
                >
                  <Link to={item.link} className="flex items-center w-full">
                    {typeof IconComponent === "string" ? (
                      <img
                        src={IconComponent}
                        alt={item.label}
                        className="w-8 h-8"
                      />
                    ) : (
                      <IconComponent className="w-6 h-6 text-[#856443]" />
                    )}
                    <span
                      className={`${isSidebarOpen ? "block ml-4" : "hidden"}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </nav>
        </div>
      </div>

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
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  institutionType: PropTypes.oneOf(["pharmacy", "hospital", "laboratory"]),
};
export default MobileMenu;
