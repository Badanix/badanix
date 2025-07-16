import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useEffect, useState } from "react";
import Notification from "../../../../../components/Notification";
import MobileMenu from "../../../../../components/MobileMenu";
import NotificationIcon from "../../../../../components/NotificationIcon";
import { getUserData, logout } from "../../../../../components/Helper";
import { useNotification } from "../../../../../hooks/useNotification";
import { NAMES } from "../../../../../components/Constants";
import Greet from "../../../../../components/Greet";
import { CgMenuRound } from "react-icons/cg";
import _ from "lodash";
import { Link } from "react-router-dom";

const MobileSecuredHeader = () => {
  const { notifications } = useNotification();
  const userData = getUserData();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isEidVisible, setIsEidVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleBalanceVisibility = () => setIsBalanceVisible(!isBalanceVisible);
  const totalNotifications = _.size(notifications);

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const renderValue = () => {
    return isBalanceVisible
      ? `Wallet Balance: ${
          NAMES.NairaSymbol
        }${NAMES.WALLETBALANCE.toLocaleString()}`
      : `Wallet Balance: ${"*".repeat(
          String(userData?.data?.walletbalance).length
        )}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEidVisible((prev) => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-between items-start sm:items-center gap-2 px-3 py-3 w-full">
      <div className="flex items-start sm:items-center gap-2 flex-1 min-w-0">
        <div className="ml-2 min-w-0 flex-1">
          <p className="font-bold text-primary dark:text-secondary flex flex-wrap items-center gap-x-1 text-sm sm:text-base leading-tight">
            <Greet />
            <span className="capitalize truncate max-w-[130px] sm:max-w-[160px]">
              {userData
                ? userData?.data?.fullname?.split(" ")[0].trim()
                : "User"}
              !
            </span>
          </p>
          <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-1 w-full">
            <p className="break-words whitespace-normal flex-1 inline-flex items-center gap-x-1">
              {renderValue()}
              <button onClick={toggleBalanceVisibility} className="p-0 m-0">
                {isBalanceVisible ? (
                  <IoMdEye
                    className="text-gray-500 dark:text-white"
                    size={16}
                  />
                ) : (
                  <IoMdEyeOff
                    className="text-gray-500 dark:text-white"
                    size={16}
                  />
                )}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section: Notifications + Dropdown */}
      <div className="flex items-start sm:items-center gap-2 relative z-40">
        <NotificationIcon
          BadgeClassName="mt-[3px]"
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
        />

        {/* Full-width Notification Panel on mobile */}
        {showNotification && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end sm:justify-center">
            <Notification
              onClose={handleCloseNotification}
              showNotification={showNotification}
              className="w-full sm:max-w-sm h-full bg-white dark:bg-gray-800 shadow-lg overflow-y-auto p-4"
            />
          </div>
        )}

        {/* Dropdown Button */}
        <button onClick={toggleDropdown}>
          <CgMenuRound
            size={24}
            className={`transform transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Items - Show only on small screens */}
        {isDropdownOpen && (
          <div className="absolute top-10 right-0 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-md w-44 z-50 sm:hidden">
            <ul className="text-sm">
              <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Link to="/settings">Profile</Link>
              </li>

              <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-secondary">
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSecuredHeader;
