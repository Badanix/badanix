import SideBarMenu from "../../../../../components/SideBarMenu";
import UseSideBarMenu from "../../../../../hooks/UseSideBarMenu";
import HospitalHeader from "../../../../partials/HospitalHeader";
import {
  NAMES,
  HOSPITALSIDEBARMENU,
} from "../../../../../components/Constants";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../../../../../components/Helper";
import { useEffect } from "react";

const Dashboard = () => {
  const userData = getUserData();
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const Name = userData?.data?.institution_name;
  const EHR = userData?.data?.ehr;
  const totalSales = userData?.data?.totalSales || 576;
  const totalOrders = userData?.data?.totalSales || 570;
  const totalRevenue = userData?.data?.totalRevenue || 12220.65;
  const navigate = useNavigate();

  useEffect(() => {
    const profileUpdated = userData?.data?.profile_updated;
    console.log("Profile Updated:", profileUpdated);

    if (profileUpdated !== 1) {
      console.log("Redirecting to onboarding...");
      navigate("/institution/hospital/onboarding");
    }
  }, [userData]);

    useEffect(() => {
    console.log("Institution type (useEffect):", userData?.data?.institution_type);
  }, [userData]);

  console.log("Institution type:", userData?.data?.institution_type);
  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Sidebar */}
      <SideBarMenu
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        institutionType={userData?.data?.institution_type?.toLowerCase()}
        
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0 sm:ml-20"
        }`}
      >
        {/* Topbar */}
        <HospitalHeader />

        {/* Dashboard Content */}
       <main className="p-6 bg-gray-100 flex-grow min-w-[320px] mt-5 md:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
            {/* Standing Orders Section */}
            <div className="bg-primary p-6 rounded-lg shadow-lg text-white">
              <h2 className="text-xl font-bold">View Patient order List</h2>
              <p className="mt-2">
                You can either scan or write the code prescribed to patient by
                doctor.
              </p>
              <Link to={"/institution/hospital/Order"}>
                <button className="bg-white text-primary px-4 py-2 mt-4 rounded-lg">
                  View Order Note
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const HospitalCard = ({ Hospital, balance, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg">
    <div className="flex justify-between items-center">
      {icon}
      <p className="text-lg font-semibold">{balance}</p>
    </div>
    <p className="text-gray-500 mt-2">{Hospital}</p>
  </div>
);

// PropTypes validation
HospitalCard.propTypes = {
  Hospital: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default Dashboard;
