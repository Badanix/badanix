import CardSlider from "../../../../../components/Cards";
import SearchMobile from "../../../../../components/SearchMobile";
import MobileSecuredHeader from "./MobileSecuredPatientsHeader";
import ServicesMenu from "./ServicesMenu";
import TopSpecialists from "./TopSpecialists";
import Banner from "../../../../../components/Banner";
import NearbyInstitution from "./NearbyInstitution";

const MobileDashboard = () => {
  const handleFilterChange = () => {
    // Your filter change logic here
  };
  return (
    <div className="block sm:hidden overflow-hidden">
      <MobileSecuredHeader />

      <SearchMobile
        placeholder="Search for doctors, pharmacies, hospitals, medications, articles..."
        searchValue=""
        onSearchChange={() => {}}
        customClassName="w-[90vw]"
        onFilterChange={handleFilterChange}
      />

      <div className="-mt-3">
        <Banner />
      </div>

      <ServicesMenu />

      <TopSpecialists />

      <div>
        <CardSlider />
      </div>

      <NearbyInstitution />
    </div>
  );
};

export default MobileDashboard;
