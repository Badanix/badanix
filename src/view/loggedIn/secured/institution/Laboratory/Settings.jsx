import { useNavigate } from 'react-router-dom';
import { LABORATORYSIDEBARMENU } from '../../../../../components/Constants';
import { getUserData } from '../../../../../components/Helper';
import SideBarMenu from '../../../../../components/SideBarMenu';
import UseSideBarMenu from '../../../../../hooks/UseSideBarMenu';
import LaboratoryHeader from '../../../../partials/LaboratoryHeader';
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
      navigate("/institution/laboratory/onboarding");
    }
  }, [userData]);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
    <SideBarMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}   menuItems={LABORATORYSIDEBARMENU}/>

      {/* Main Content */}
      <div className={`flex-1 ml-${isSidebarOpen ? '64' : '0 sm:ml-20'}  transition-all duration-300`}>

        {/* Topbar */}
        <LaboratoryHeader />

        {/* Dashboard Content */}
        <main className="p-6 bg-gray-100 flex-grow">
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
