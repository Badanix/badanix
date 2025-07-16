import {     DOCTORSIDEBARMENU, NAMES, TOPBARMENU } from '../../../../components/Constants';

import SideBarMenu from '../../../../components/SideBarMenu';

import UseSideBarMenu from '@hooks/UseSideBarMenu';

import TopBar from '../../../../components/TopBar';
import UseTopMenu from '@hooks/useTopMenu';
import DefaultProfile from '../../../../components/DefaultProfile';

const Profile = () => {

  const userImage= NAMES.userImage
  const siteTitle = NAMES.SITE_TITLE
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const { profileDropdownOpen, toggleTopbar }=UseTopMenu();

  


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
    <SideBarMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}   menuItems={DOCTORSIDEBARMENU}/>

      {/* Main Content */}
      <div className={`flex-1 ml-${isSidebarOpen ? '64' : '0 sm:ml-20'}  transition-all duration-300`}>

        {/* Topbar */}
       {/* <TopBar siteTitle={siteTitle} 
                userImage={userImage} 
                toggleSidebar={toggleSidebar} 
                NAMES={NAMES}
                TOPBARMENU={TOPBARMENU} 
                profileDropdownOpen={profileDropdownOpen}
                toggleTopbar={toggleTopbar}
                placeholder={"Search for Patients, Invoices, and appointments etc."} 
                /> */}


        {/* Dashboard Content */}
        <main className="p-6 bg-gray-100 flex-grow">
          <div className='   sm:flex justify-between mb-0'>
          <div className=' mb-4'>
             

            </div>
   
          </div>
          {/* main contnent */}
        
<DefaultProfile
title= ""
/>


        </main>
      </div>
    </div>
  );
};

export default Profile;
