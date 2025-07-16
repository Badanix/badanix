import { FaCalendar, FaUserMd, FaFileAlt, FaHospital, FaEnvelope, FaChartBar, FaHeartbeat, FaBrain, FaTooth, FaEye } from 'react-icons/fa';
import { NAMES } from './Constants';

const Sidebar = () => {
    const siteName = NAMES.SITE_TITLE
    const logo = NAMES.LOGO
  return (
    <div>
      <aside className="fixed top-0 left-0 w-64 bg-white shadow-md p-4 h-full z-50 overflow-y-auto scrollbar-thin">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold primary-color">{logo}{siteName}</h1>
        </div>

        {/* Menu Items */}
        <nav className="space-y-4">
          <a href="#" className="flex items-center p-2 space-x-2 primary-color font-medium">
            <FaChartBar className="text-xl" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center p-2 space-x-2 hover:bg-gray-100 rounded-md">
            <FaCalendar className="text-xl" />
            <span>Appointments</span>
          </a>
          <a href="#" className="flex items-center p-2 space-x-2 hover:bg-gray-100 rounded-md">
            <FaUserMd className="text-xl" />
            <span>Doctors</span>
          </a>
          <a href="#" className="flex items-center p-2 space-x-2 hover:bg-gray-100 rounded-md">
            <FaFileAlt className="text-xl" />
            <span>Reports</span>
          </a>
          <a href="#" className="flex items-center p-2 space-x-2 hover:bg-gray-100 rounded-md">
            <FaHospital className="text-xl" />
            <span>Clinics</span>
          </a>
          <a href="#" className="flex items-center p-2 space-x-2 hover:bg-gray-100 rounded-md">
            <FaEnvelope className="text-xl" />
            <span>Messages</span>
          </a>

          {/* Other Menu */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Other Menu</h3>
            <a href="#" className="flex items-center p-2 space-x-2 hover:bg-gray-100 rounded-md">
              <FaHeartbeat className="text-xl" />
              <span>Cardiology</span>
            </a>
            <a href="#" className="flex items-center p-2 space-x-2 hover:bg-gray-100 rounded-md">
              <FaBrain className="text-xl" />
              <span>Brain Treatment</span>
            </a>
            <a href="#" className="flex items-center p-2 space-x-2 hover:bg-gray-100 rounded-md">
              <FaTooth className="text-xl" />
              <span>Dental Treatment</span>
            </a>
            <a href="#" className="flex items-center p-2 space-x-2 hover:bg-gray-100 rounded-md">
              <FaEye className="text-xl" />
              <span>Eye Treatment</span>
            </a>
          </div>
        </nav>

        {/* Settings and Log Out */}
        
        {/* Medication Card */}
        <div className="relative mt-8 p-4 bg-white rounded-lg shadow-md">
          {/* Medication bottle image, exceeding the card */}
          <div className="relative">
            <img
              src="https://img.icons8.com/?size=100&id=lcdTodbOM2sE&format=png&color=000000" // Replace this with your medication bottle image
              alt="Medication Bottle"
              className="w-16 h-16 object-cover absolute -top-8 left-1/2 transform -translate-x-1/2"
            />
          </div>

          {/* Text below the image */}
          <div className="pt-8 text-center bg-gray-200 rounded-lg">
            <p className="text-lg font-semibold">Medication</p>
            <p className="text-sm text-gray-500">Stay on track with your prescribed medicines</p>
            <button className="capitalize m-3 primary-bgcolor text-white p-2 rounded-lg text-ellipsis">
              View Medicine status
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
