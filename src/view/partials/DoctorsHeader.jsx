import { NAMES, DOCTORTOPBARMENU, DOCTORSIDEBARMENU } from "../../components/Constants";
import TopBar from "../../components/TopBar"
import UseTopMenu from "@hooks/useTopMenu";
import UseSideBar from "@hooks/UseSideBarMenu";
import MobileTopBar from "../../components/MobileTopBar";

const DoctorsHeader = () => {
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
    menuItems={DOCTORTOPBARMENU} 
    profileDropdownOpen={profileDropdownOpen}
    toggleTopbar={toggleTopbar}
    placeholder="Search for patients, medications, articles..."
    />

<MobileTopBar menuItems={DOCTORSIDEBARMENU} />
  
      </>
  )
}

export default DoctorsHeader
