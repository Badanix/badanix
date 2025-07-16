import { FaEnvelope, FaCog, FaBell, FaChevronDown } from 'react-icons/fa';
import Search from './Search';
import { NAMES, Notifications } from './Constants';
import  { NotificationBadge } from './NotificationIcon';
import { useState } from 'react';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const fullName= NAMES.FULLNAME
    const eidNumber=NAMES.EIDNUMBER
    const navigate = useNavigate();

    const [userToggle, setUserToggle] = useState(false);
    const [showNotification, setShowNotification] = useState(false);


    const userToggleClick = () =>{

        setUserToggle(!userToggle)
    }
    const handleNotificationClick = () => {
        setShowNotification(!showNotification);
      };
    
      
      const handleCloseNotification = () => {
        setShowNotification(false);
      };

      const handleOptionClick = (option) => {
        console.log('Option clicked:', option); // Debug line
        setUserToggle(false); // Close the dropdown after click
        if (option === 'Settings') {
          navigate('/settings'); // Navigate to Settings page
        } else if (option === 'Profile') {
          navigate('/profile'); // Navigate to Profile page
        } else if (option === 'Logout') {
          // Handle logout logic (clear session, etc.)
          navigate('/logout'); // Navigate to Logout page or perform logout action
        }
      };
      
  return (
    <header className="flex justify-between items-center mb-8 -mt-6">
      {/* Search Input Section */}
      <div className="flex-1 flex justify-between items-center">
        <div className="flex-grow">
          <Search
            placeholder="Search for Doctors such as dermatologists, surgeons, etc"
            searchValue=""
            onSearchChange={() => {}}
            customClassName="w-full" // Use full width within its container
          />
        </div>
        
        {/* Header Icons */}
        <div className="flex items-center space-x-4 ml-4 ">
        <div className='flex items-center justify-center p-2 rounded-full bg-secondary'>
        <div className='p-2 rounded-full bg-gradient-to-r from-primary to-gray-500'>
        <FaCog className="text-white cursor-pointer"  onClick={() => handleOptionClick('Settings')} />
      </div>
    </div>
    <div className='flex items-center justify-center p-2 rounded-full bg-secondary'>
      <div className='p-2 rounded-full bg-gradient-to-r from-primary to-gray-500'>
        <FaEnvelope className="text-white cursor-pointer" />
      </div>
    </div>
    <div className='relative flex items-center justify-center p-2 rounded-full bg-secondary'>
  <div className='p-2 rounded-full bg-gradient-to-r from-primary to-gray-500'>
    {/* Using NotificationBadge to handle the icon and notification count */}
    <NotificationBadge 
      icon={FaBell} 
      
      className="cursor-pointer text-white" 
      onClick={handleNotificationClick}
    />
  </div>
  
  {/* You can still keep a separate badge span, but totalNotifications is now handled by NotificationBadge */}
  <span className='absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full'>
    {Notifications.length}
  </span>
  
  {/* Conditional rendering of the Notification component */}
  {showNotification &&  <Notification
          onClose={handleCloseNotification}
          showNotification={showNotification} className={`fixed inset-y-0 right-0 w-[60vw] bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out overflow-y-scroll scrollbar-thin`}
        />}
</div>

        </div>
        
      {/* User Info */}
<div className="relative flex items-center space-x-2 ml-4 cursor-pointer" onClick={userToggleClick}>
  <img
    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="User"
    className="w-[50px] h-[50px] rounded-full"
  />
  <div className="text-sm">
    <div className='flex'>
      <p className="font-semibold primary-color">{fullName}</p>
      <FaChevronDown className='mt-1 mx-1 primary-color' />
    </div>
    <p className="text-gray-400">EID No: {eidNumber}</p>
  </div>

  {/* Dropdown Menu */}
  {userToggle && (
    <div className="absolute right-0 top-full -mt-5 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <ul className="py-2">
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleOptionClick('Settings')}
        >
          Settings
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleOptionClick('Profile')}
        >
          Profile
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleOptionClick('Logout')}
        >
          Logout
        </li>
      </ul>
    </div>
  )}
</div>

      </div>
    </header>
  );
};

export default Header;
