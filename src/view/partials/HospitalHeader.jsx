import { NAMES, INSTITUTIONTOPBARMENU,INSTITUTIONSIDEBARMENU } from "../../components/Constants";
import TopBar from "../../components/TopBar"
import UseTopMenu from "@hooks/useTopMenu";
import UseSideBarMenu from "@hooks/UseSideBarMenu";
import MobileTopBar from "../../components/MobileTopBar";

const HospitalHeader = () => {
    const userImage= NAMES.userImage
  const siteTitle = NAMES.SITE_TITLE
  const { profileDropdownOpen, toggleTopbar }=UseTopMenu();
  const {  toggleSidebar } = UseSideBarMenu();

  return (
     <>
       <TopBar siteTitle={siteTitle} 
       userImage={userImage} 
       toggleSidebar={toggleSidebar} 
       NAMES={NAMES}
       menuItems={INSTITUTIONTOPBARMENU} 
       profileDropdownOpen={profileDropdownOpen}
       toggleTopbar={toggleTopbar}
       placeholder=""
       />
   
   <MobileTopBar menuItems={INSTITUTIONSIDEBARMENU} />
     
         </>
  )
}

export default HospitalHeader
