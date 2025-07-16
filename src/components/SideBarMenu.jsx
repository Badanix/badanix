import { useState, useEffect, useMemo } from 'react';
import { NAMES } from './Constants';
import { Link,useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import PropTypes from 'prop-types';

const SideBarMenu = ({ isSidebarOpen, toggleSidebar, menuItems }) => {
    const siteTitle = NAMES.SITE_TITLE;
    const [showMedicationCard, setShowMedicationCard] = useState(false);
    const location = useLocation();

    const shouldShowMedicationCard = useMemo(() => {
        return !(
            location.pathname.includes("/doctor/") || 
            location.pathname.includes("/admin/") || 
            location.pathname.includes("/institution/")
        );
    }, [location.pathname]);
    useEffect(() => {
        if (isSidebarOpen) {
            const timer = setTimeout(() => {
                // Only show the card if the path is valid
                if (shouldShowMedicationCard) {
                    setShowMedicationCard(true);
                }
            }, 3000); 
            return () => clearTimeout(timer);
        } else {
            setShowMedicationCard(false);
        }
    }, [isSidebarOpen, shouldShowMedicationCard]);

    return (
        <aside className={`${isSidebarOpen ? 'w-64 overflow-y-scroll scrollbar-thin bg-primary dark:bg-secondary' : 'w-20 sm:bg-primary dark:bg-secondary'} h-full text-white   fixed transition-all duration-300  hidden sm:block`}>
            <div className="flex justify-between items-center p-4">
                <h1 className={`${isSidebarOpen ? 'block' : 'hidden'} text-xl font-bold`}>{siteTitle}</h1>
                <button onClick={toggleSidebar} className='hidden sm:block'>
                    <FaBars size={24} />
                </button>
            </div>
            <nav className="mt-4">
            <ul>
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.link;
                    return (
                        <li key={index} className={`flex items-center p-4 cursor-pointer  ${isActive ? 'bg-white  dark:bg-bgray-600 text-secondary dark:text-secondary' : ''} `}>
                            <Link to={item.link} className="flex items-center w-full">
                                <item.icon size={24} className={`${isSidebarOpen ? 'block ml-4' : 'hidden sm:block'}`} />
                                <span className={`${isSidebarOpen ? 'block ml-4' : 'hidden'}`}>{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            {/* Medication Card */}
            {/* {showMedicationCard && (
                <div className="relative mt-8 p-4 bg-white rounded-lg shadow-md">
                    <div className="relative">
                        <img
                            src="https://img.icons8.com/?size=100&id=lcdTodbOM2sE&format=png&color=000000" 
                            alt="Medication Bottle"
                            className="w-16 h-16 object-cover absolute -top-8 left-1/2 transform -translate-x-1/2"
                        />
                    </div>
                    <div className="pt-8 text-center bg-gray-200 rounded-lg">
                        <p className="text-lg font-semibold text-primary dark:text-secondary">Medication</p>
                        <p className="text-sm text-gray-500">Stay on track with your prescribed medicines</p>
                        <button className="capitalize m-3 bg-primary dark:bg-secondary text-white p-2 rounded-lg text-ellipsis">
                            View Medicine status
                        </button>
                    </div>
                </div>
            )} */}
        </nav>
        </aside>
    );
};

// Define prop types
SideBarMenu.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string.isRequired,
        icon: PropTypes.elementType.isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired,  
};

export default SideBarMenu;
