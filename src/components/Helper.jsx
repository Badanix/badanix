// Helper.jsx
import { format, isBefore,isAfter,addHours } from 'date-fns';
import { APIURLS } from './Constants';
import { FaClock, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";
/**
 * Format the current date to a specific string format.
 * @returns {string} - The formatted current date.
 */
export const formatCurrentDate = () => {
  return format(new Date(), 'EEEE, dd MMMM yyyy');
};

/**
 * Get the color for the date based on its availability status.
 * @param {Date} date - The date to check.
 * @param {boolean} available - Whether the date is available or not.
 * @returns {string} - Tailwind CSS class for background color.
 */
export const getSlotColor = (date, available) => {
  const now = new Date();
  if (isBefore(date, now)) {
    return 'bg-gray-300';  
  }
  return available ? 'bg-green-500' : 'bg-red-500'; 
};


export const formatTime = (timeString, isAM) => {
  let [time] = timeString.split(' - ')[0].split(' ');
  let [hours, minutes] = time.split(':'); 
  hours = parseInt(hours, 10);

  if (isAM && hours === 12) {
    hours = 0; 
  }
  if (!isAM && hours < 12) {
    hours += 12; 
  }

  const formattedHours = hours % 12 || 12; 
  const formattedTime = `${formattedHours}:${minutes} ${isAM ? 'AM' : 'PM'}`;

  return formattedTime;
};

export const getUpcomingItem = (items, now) => {
  return items.find(item => {
    const itemDateTime = new Date(`${item.date}T${item.time || ''}`);
    return isAfter(itemDateTime, now) && isBefore(itemDateTime, addHours(now, 24));
  });
};


export const calculateCountdown = (targetDate) => {
  const now = new Date();
  const difference = targetDate - now;

  if (difference > 0) {
    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  } else {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
};

export const getUserData = () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_data'));

    if (!userData) {
      console.error("No user data found in localStorage");
      return null;
    }

    console.log("Retrieved User Data:", userData);  
    return userData;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    window.location.href = '/auth-login';
    return null;
  }
};

export const logout = async () => {
  const token = localStorage.getItem('token');
  const roleId = localStorage.getItem('role_id');

  const logoutUrls = {
    "1": `${APIURLS.APILOGOUT}user/logout`,        // Patients
    "2": `${APIURLS.APILOGOUT}doctor/logout`,      // Doctors
    "3": `${APIURLS.APILOGOUT}institution/logout`, // Institutions
  };

  const logoutUrl = logoutUrls[roleId];

  if (token && logoutUrl) {
    try {
      const response = await fetch(logoutUrl, {
        method: 'DELETE', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('role_id');
        localStorage.removeItem('user_data');
        window.location.href = '/auth-login';
      } else {
        console.error("Logout failed:", await response.json());
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('role_id');
    localStorage.removeItem('user_data');
    window.location.href = '/auth-login';
  }
};

export function formatEvent(event) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

  const date = new Date(event.day).toLocaleDateString('en-GB', options);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour % 12 || 12; 
    return `${formattedHour}:${minutes} ${period}`;
  };

  const startTime = formatTime(event.start_time);
  const closeTime = formatTime(event.end_time);

  return `date: ${date}\nstart time: ${startTime}\nclose time: ${closeTime}`;
}

export const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th";  
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString); 
  const options = { year: 'numeric', month: 'short', day: 'numeric' }; 
  return date.toLocaleDateString('en-US', options).replace(',', '');
};

export const formatDateWithOrdinalSuffix = (dateString) => {
  const date = new Date(dateString); 
  const day = date.getDate();
  const month = format(date, 'MMM'); 
  const year = date.getFullYear();

  const ordinalSuffix = getOrdinalSuffix(day);

  return `${day}${ordinalSuffix} ${month}, ${year}`;
};

export const statusMap = {
  0: { label: 'pending', icon: <FaExclamationTriangle className="text-yellow-500" size={14} /> },
  1: { label: 'upcoming', icon: <FaClock className="text-primary" size={14} /> },
  2: { label: 'completed', icon: <FaCheckCircle className="text-green-500" size={14} /> },
  3: { label: 'cancelled', icon: <FaTimesCircle className="text-red-500" size={14} /> },
};

export const getStatusLabel = (activeTab) => {
  return statusMap[activeTab]?.label || 'pending';
};
export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);  
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  const birthMonth = birthDate.getMonth();

  if (month < birthMonth || (month === birthMonth && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

const padZero = (num) => String(num).padStart(2, "0");

export const currentTime = padZero(new Date().getHours()) + ":" + 
                    padZero(new Date().getMinutes()) + ":" + 
                    padZero(new Date().getSeconds());

export const currentDate=  new Date().toISOString().split('T')[0];



export const getStatusColor = (status) => {
  switch (status) {
    case 0: return "yellow-400"; // Pending
    case 1: return "blue-400";   // Upcoming
    case 2: return "green-400";  // Completed
    case 3: return "purple-400"; // Ongoing
    case 4: return "red-400";    // Cancelled
    default: return "gray-400";  // Unknown
  }
};
