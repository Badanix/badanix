import { Link, useNavigate } from 'react-router-dom';
import { PHARMACYSIDEBARMENU } from '../../../../../components/Constants';
import SideBarMenu from '../../../../../components/SideBarMenu';
import UseSideBarMenu from '../../../../../hooks/UseSideBarMenu';
import PharmacyHeader from '../../../../partials/PharmacyHeader';
import { FaArrowLeft } from 'react-icons/fa';
import { getUserData } from '../../../../../components/Helper';
import { useEffect } from 'react';

const Settings = () => {


  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();

    const userData =getUserData();
    
    const navigate = useNavigate();
  
  useEffect(() => {
      const profileUpdated = userData?.data?.profile_updated;
      console.log("Profile Updated:", profileUpdated);
    
      if (profileUpdated !== 1) {
        console.log("Redirecting to onboarding...");
        navigate("/institution/Pharmacy/onboarding");
      }
    }, [userData]);


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
    <SideBarMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}   menuItems={PHARMACYSIDEBARMENU}/>

      {/* Main Content */}
      <div className={`flex-1 ml-${isSidebarOpen ? '64' : '0 sm:ml-20'}  transition-all duration-300`}>

        {/* Topbar */}
       <PharmacyHeader/>

        {/* Dashboard Content */}
        <main className="p-6 bg-gray-100 flex-grow">
            <Link to={'/institution/pharmacy/Dashboard'} className='underline flex space-x-2 text-secondary my-4 '><FaArrowLeft className='mt-1 text-primary'/>
                                       <span>Back to Home</span></Link>
          <div className='   sm:flex justify-between mb-0'>
          <div className=' mb-4'>
             

            </div>
   
          </div>
          {/* main contnent */}
        



        </main>
      </div>
    </div>
  );
};

export default Settings;
