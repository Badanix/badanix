import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { CgMenuRound } from "react-icons/cg";

import { NAMES } from "./Constants";
import { logout } from "./Helper";
import NotificationIcon from "./NotificationIcon";
import Notification from "./Notification";
import { useNotification } from "../hooks/useNotification";
import _ from "lodash";
import PropTypes from "prop-types";

const MobileTopBar = ({ menuItems }) => {
  const { notifications } = useNotification();
  const [showNotification, setShowNotification] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logo = NAMES.LOGO;

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const totalNotifications = _.size(notifications);
  console.log(`the total ${totalNotifications}`);

  // Step 2: Toggle notification visibility
  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };
  return (
  <>
    {/* Mobile Top Bar */}
    <div className="fixed top-0 left-0 right-0 bg-white dark:bg-secondary text-primary px-3 py-2 flex items-center justify-between shadow-md z-50 sm:hidden">
      {/* Left: MobileMenu and Logo */}
      <div className="flex items-center gap-2 max-w-[70%]">
        <MobileMenu menuItems={menuItems} />
        <img src={logo} alt="Logo" className="h-8 w-auto max-w-[100px]" />
      </div>

      {/* Right: Notifications & Menu */}
      <div className="flex items-center gap-3 relative">
        {/* Notification Icon */}
        <NotificationIcon
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
          BadgeClassName="relative"
        />

        {/* Menu Toggle */}
        <button onClick={toggleDropdown}>
          <CgMenuRound
            size={24}
            className={`transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Notification Dropdown */}
        {showNotification && (
          <div className="absolute right-0 top-10 bg-white dark:bg-gray-800 shadow-lg z-50 overflow-y-auto scrollbar-thin w-[90vw] max-w-[350px] h-[500px] rounded-xl">
            <Notification
              onClose={handleCloseNotification}
              showNotification={showNotification}
            />
          </div>
        )}
      </div>
    </div>

    {/* User Dropdown Menu */}
    {isDropdownOpen && (
      <div className="absolute top-14 right-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-md p-2 z-50 sm:hidden">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-secondary">
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    )}
  </>
);

};
MobileTopBar.propTypes = {
  menuItems: PropTypes.array.isRequired,
};
export default MobileTopBar;
