import {
  NAMES,
  PATIENTSIDEBARMENU,
  PATIENTTOPBARMENU,
} from "../../components/Constants";
import TopBar from "../../components/TopBar";
import UseTopMenu from "../../hooks/UseTopMenu";
import UseSideBar from "@hooks/UseSideBarMenu";
import MobileTopBar from "../../components/MobileTopBar";

const PatientHeader = () => {
  const userImage = NAMES.userImage;
  const siteTitle = NAMES.SITE_TITLE;
  const { profileDropdownOpen, toggleTopbar } = UseTopMenu();
  const { toggleSidebar } = UseSideBar();

  return (
    <>
      <TopBar
        siteTitle={siteTitle}
        userImage={userImage}
        toggleSidebar={toggleSidebar}
        NAMES={NAMES}
        menuItems={PATIENTTOPBARMENU}
        profileDropdownOpen={profileDropdownOpen}
        toggleTopbar={toggleTopbar}
        placeholder="Search for patients, pharmacies, hospitals medications, articles..."
      />

      <MobileTopBar menuItems={PATIENTSIDEBARMENU} />
    </>
  );
};

export default PatientHeader;
