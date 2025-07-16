import { INSTITUTIONSIDEBARMENU, INSTITUTIONTOPBARMENU, NAMES } from "../../components/Constants";
import TopBar from "../../components/TopBar"
import UseTopMenu from "@hooks/useTopMenu";
import UseSideBar from "@hooks/UseSideBarMenu";
import MobileTopBar from "../../components/MobileTopBar";

const PatientHeader = () => {
    const userImage= NAMES.userImage
  const siteTitle = NAMES.SITE_TITLE
  const { profileDropdownOpen, toggleTopbar }=UseTopMenu();
  const {  toggleSidebar } = UseSideBar();

  return (
    <>
    <TopBar siteTitle={siteTitle} 
    userImage={userImage} 
    toggleSidebar={toggleSidebar} 
    NAMES={NAMES}
    menuItems={INSTITUTIONTOPBARMENU} 
    profileDropdownOpen={profileDropdownOpen}
    toggleTopbar={toggleTopbar}
    placeholder="Search for doctors, pharmacies, hospitals medications, articles..."
    />

<MobileTopBar menuItems={INSTITUTIONSIDEBARMENU} />
  
      </>
  )
}

export default PatientHeader
