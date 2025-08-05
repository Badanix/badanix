import { useMemo } from "react";
import { NAMES } from "./Constants";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import PropTypes from "prop-types";

import DoctorIcon from "../assets/icons/doctor.png";
import PharmacyIcon from "../assets/icons/pharmacy.png";
import FaPatient from "../assets/icons/Patient.png";
import scheduleIcon from "../assets/icons/schedule.png";
import hospitalIcon from "../assets/icons/hospital.png";
import labIcon from "../assets/icons/laboratory.png";
import walletIcon from "../assets/icons/wallet.png";
import InstitutionIcon from "../assets/icons/hospital.png";
import PatientIcon from "../assets/icons/Patient.png";
import OrderIcon from "../assets/icons/Order.png"

const SideBarMenu = ({ isSidebarOpen, toggleSidebar, institutionType }) => {
  const siteTitle = NAMES.SITE_TITLE;
  const location = useLocation();

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
            icon: scheduleIcon,
            label: "Settings",
            link: "/doctor/settings",
          },
        ];

      case "institution":
        if (institutionType === "pharmacy") {
          return [
            {
              icon: InstitutionIcon,
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
              label: "Hospital Dashboard",
              link: "/institution/dashboard",
            },
            {
              icon: DoctorIcon,
              label: "Doctors",
              link: "/institution/doctors",
            },
            {
              icon: scheduleIcon,
              label: "Appointments",
              link: "/institution/appointments",
            },
            {
              icon: PatientIcon,
              label: "Patients",
              link: "/institution/patients",
            },
          ];
        }

        if (institutionType === "laboratory") {
          return [
            {
              icon: InstitutionIcon,
              label: "Lab Dashboard",
              link: "/institution/dashboard",
            },
            {
              icon: labIcon,
              label: "Tests",
              link: "/institution/tests",
            },
            {
              icon: PatientIcon,
              label: "Patients",
              link: "/institution/patients",
            },
            {
              icon: scheduleIcon,
              label: "Test Results",
              link: "/institution/results",
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
          { icon: FaBars, label: "Settings", link: "/settings" },
        ];
    }
  };

  const menuItems = useMemo(
    () => getMenuItemsByRole(currentRole),
    [currentRole, institutionType]
  );

  return (
    <aside
      className={`${
        isSidebarOpen
          ? "w-64 overflow-y-scroll scrollbar-thin bg-primary dark:bg-secondary"
          : "w-20 sm:bg-primary dark:bg-secondary"
      } h-full text-white fixed transition-all duration-300 hidden sm:block`}
    >
      <div className="flex justify-between items-center p-4">
        <h1
          className={`${isSidebarOpen ? "block" : "hidden"} text-xl font-bold`}
        >
          {siteTitle}
        </h1>
        <button onClick={toggleSidebar} className="hidden sm:block">
          <FaBars size={24} />
        </button>
      </div>

      <nav className="mt-4">
        <ul>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.link;
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
                  <img src={item.icon} alt={item.label} className="w-8 h-8" />
                  <span
                    className={`${isSidebarOpen ? "block ml-4" : "hidden"}`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

SideBarMenu.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  institutionType: PropTypes.oneOf(["pharmacy", "hospital", "laboratory"]),
};

export default SideBarMenu;
