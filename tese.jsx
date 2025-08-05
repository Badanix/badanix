import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { GrUserExpert } from "react-icons/gr";
import SideBarMenu from "../../../../../components/SideBarMenu";
import UseSideBarMenu from "../../../../../hooks/UseSideBarMenu";
import Search from "../../../../../components/Search";
import {
  Doctor,
  PATIENTSIDEBARMENU,
  APIURLS,
  defaultUrl,
} from "../../../../../components/Constants";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { MdEventAvailable, MdLanguage, MdSick } from "react-icons/md";
import PatientHeader from "../../../../partials/PatientHeader";
import { doctorSpecializationOptions } from "./ServicesForm";
import { HiOfficeBuilding } from "react-icons/hi";

import dermatologistsIcon from "../../../../../assets/icons/Dermatologists.png";
import cardiologistsIcon from "../../../../../assets/icons/cardiologist.png";
import entSurgeonsIcon from "../../../../../assets/icons/ENT_Surgeon.png";
import generalIcon from "../../../../../assets/icons/General Practitioners.png";
import orthopedicIcon from "../../../../../assets/icons/Orthopedic_Surgeon.png";
import fallbackImage from "../../../../../assets/icons/doctor.png"



const specializationImages = {
  Dermatologists: dermatologistsIcon,
  Cardiologists: cardiologistsIcon,
  "ENT Surgeons": entSurgeonsIcon,
  "General Practitioners": generalIcon,
  "Orthopedic Surgeons": orthopedicIcon,
};



const DoctorCardContent = ({ img, title, details, onClose }) => (
  <div className="flex flex-col items-center p-4">
    <img src={img} alt={title} className="w-48 h-48 object-cover rounded-full mb-6" />
    <p className="text-lg text-center">{details}</p>
    <button onClick={onClose} className="mt-8 bg-gray-700 text-white py-2 px-4 rounded-lg">
      Close
    </button>
  </div>
);

const DoctorsLists = () => {
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const [doctorsCards, setDoctorsCards] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState(doctorSpecializationOptions);
  const [doctorData, setDoctorData] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [hoveredDoctor, setHoveredDoctor] = useState(null);
  const [lastHoveredDoctor, setLastHoveredDoctor] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const itemsPerPage = {
    desktop: 9,
    tablet: 6,
    mobile: 4,
  };

  const getItemsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1024) return itemsPerPage.desktop;
    if (width >= 768) return itemsPerPage.tablet;
    return itemsPerPage.mobile;
  };

  const currentItemsPerPage = getItemsPerPage();

  const handleSearchToggle = () => setShowSearch(true);
  const handleSearchCancel = () => {
    setShowSearch(false);
    setFilteredDoctors(Doctor);
  };
  const goBack = () => navigate(-1);
  const handleDoctorsCards = (doctor) => {
    setDoctorsCards(doctor);
    setShowSearch(false);
    setSelectedSpecialization(doctor.title);
  };

  useEffect(() => {
    document.body.style.overflow = doctorsCards ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [doctorsCards]);

  const paginatedDoctors = doctorData.filter((doctor) => {
    const matchesSpecialization =
      doctor.specialization.toLowerCase() === (doctorsCards?.title || "").toLowerCase();
    const matchesName =
      !searchValue || doctor.fullname.toLowerCase().includes(searchValue.toLowerCase());
    const isVerified = doctor.verified === 1;
    return matchesSpecialization && matchesName && isVerified;
  });

  const startIndex = (currentPage - 1) * currentItemsPerPage;
  const endIndex = startIndex + currentItemsPerPage;
  const doctorSpecialization = paginatedDoctors.slice(startIndex, endIndex);
  const totalPages = Math.ceil(paginatedDoctors.length / currentItemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  useEffect(() => {
    if (filteredDoctors.length > 0) {
      setLastHoveredDoctor(filteredDoctors[0]);
    }
  }, [filteredDoctors]);

  const handleMouseEnter = (doctor) => {
    setHoveredDoctor(doctor);
    setLastHoveredDoctor(doctor);
  };

  const handleMouseLeave = () => setHoveredDoctor(null);

  useEffect(() => {
    if (selectedSpecialization) {
      const fetchDoctors = async () => {
        setLoading(true);
        try {
          const apiUrl = `${APIURLS.APIURLPATIENTSFINDDoctorSpecializationSearch}specialization=${encodeURIComponent(selectedSpecialization)}`;
          const token = localStorage.getItem("token");
          if (!token) return;

          const response = await fetch(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const jsonResponse = await response.json();
          setDoctorData(Array.isArray(jsonResponse.data) ? jsonResponse.data : []);
        } catch (error) {
          console.error("Error fetching doctors:", error);
          setDoctorData([]);
        } finally {
          setLoading(false);
        }
      };

      fetchDoctors();
    }
  }, [selectedSpecialization]);

  const handleDoctorDetails = (doctor) => {
    navigate(`/DoctorsBooking?specialization=${encodeURIComponent(doctor.specialization)}&doctor_id=${doctor.id}`);
  };

  const itemsPerPages = 10;
  const totalPage = Math.ceil(filteredDoctors.length / itemsPerPages);
  const paginatedDoctorsSpecialization = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPages,
    currentPage * itemsPerPages
  );

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPage));
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleFilterChange = (newFilteredDoctors) => {
    setFilteredDoctors(newFilteredDoctors);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBarMenu
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={PATIENTSIDEBARMENU}
      />

      <div className={`flex-1 transition-all duration-300 ml-${isSidebarOpen ? "64" : "0 sm:ml-20"}`}>
        <PatientHeader />

        <main className="p-6 bg-gray-100 flex-grow">
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <img src={fallbackImage} className="w-16 h-16 animate-bounce mx-auto mb-4" />
                <p className="text-gray-600 font-semibold">Loading</p>
              </div>
            </div>
          ) : (
            <>
              <div className="sm:flex">
                <div>
                  <div className="flex space-x-3 items-center text-primary p-4 border-b border-gray-200">
                    <FaArrowLeft className="text-xl cursor-pointer" onClick={goBack} />
                    <p className="font-semibold text-lg uppercase">Doctor Categories</p>
                  </div>

                  <div className="mt-4">
                    <Search
                      placeholder="Search for Doctor's Category such as dermatologists, surgeons, etc"
                      searchValue=""
                      onSearchChange={() => {}}
                      items={doctorSpecializationOptions}
                      onFilterChange={handleFilterChange}
                      customClassName="w-full lg:min-w-[70vw]"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mx-8 my-2 overflow-y-visible">
                    {paginatedDoctorsSpecialization.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center text-center border-2 border-gray-200 rounded-lg bg-white shadow-md cursor-pointer my-3 px-4 py-2"
                        onClick={() => handleDoctorsCards(item)}
                        onMouseEnter={() => handleMouseEnter(item)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          src={specializationImages[item.title] || fallbackImage}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-full mb-2"
                        />
                        <p className="truncate text-center text-gray-800 w-full">{item.title}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4 px-8">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="bg-secondary text-white py-2 px-4 rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <p>Page {currentPage} of {totalPage}</p>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPage}
                      className="bg-primary text-white py-2 px-4 rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block w-2/3 max-h-[70vh] px-8 py-4 shadow-2xl mx-0 mt-[60px] mr-9">
                  {hoveredDoctor || lastHoveredDoctor ? (
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={
                          specializationImages[(hoveredDoctor || lastHoveredDoctor)?.title] ||
                          fallbackImage
                        }
                        alt={(hoveredDoctor || lastHoveredDoctor)?.title}
                        className="w-24 h-24 object-cover rounded-full mb-2"
                      />
                      <h3 className="text-xl font-semibold text-center mb-2">
                        {(hoveredDoctor || lastHoveredDoctor).title}
                      </h3>
                      <p className="text-gray-600 text-center">
                        {(hoveredDoctor || lastHoveredDoctor).description}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">No doctor available</p>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

DoctorCardContent.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DoctorsLists;
