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

import { FaUserDoctor } from "react-icons/fa6";
import PatientHeader from "../../../../partials/PatientHeader";
import { doctorSpecializationOptions } from "./ServicesForm";
import { HiOfficeBuilding } from "react-icons/hi";
import specializationImages from "../../../../../components/specializationImages";
import fallbackImage from '../../../../../assets/icons/doctor.png'


const DoctorCardContent = ({ img, title, details, onClose }) => (
  <div className="flex flex-col items-center p-4">
    <img
      src={img}
      alt={title}
      className="w-48 h-48 object-cover rounded-full mb-6"
    />
    <p className="text-lg text-center">{details}</p>
    <button
      onClick={onClose}
      className="mt-8 bg-gray-700 text-white py-2 px-4 rounded-lg"
    >
      Close
    </button>
  </div>
);

const DoctorsLists = () => {
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();

  // const nairaSymbol =  NAMES.NairaSymbol;
  const [doctorsCards, setDoctorsCards] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [showSearch, setShowSearch] = useState(false);

  const [filteredDoctors, setFilteredDoctors] = useState(
    doctorSpecializationOptions
  );

  const [doctorData, setDoctorData] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);

  const [hoveredDoctor, setHoveredDoctor] = useState(null);
  const [lastHoveredDoctor, setLastHoveredDoctor] = useState(null);

  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

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
  const handleSearchToggle = () => {
    setShowSearch(true);
  };

  const handleSearchCancel = () => {
    setShowSearch(false);
    setFilteredDoctors(Doctor);
  };

  const goBack = () => {
    navigate(-1);
  };

  const [loading, setLoading] = useState(false);

  const handleDoctorsCards = (doctor) => {
    setDoctorsCards(doctor);
    setShowSearch(false);
    setSelectedSpecialization(doctor.title);
  };

  useEffect(() => {
    if (doctorsCards) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [doctorsCards]);

  const paginatedDoctors = doctorData.filter((doctor) => {
    const matchesSpecialization =
      doctor.specialization.toLowerCase() ===
      (doctorsCards?.title || "").toLowerCase();
    const matchesName =
      !searchValue ||
      doctor.fullname.toLowerCase().includes(searchValue.toLowerCase());
    const isVerified = doctor.verified === 1;
    return matchesSpecialization && matchesName && isVerified;
  });

  const startIndex = (currentPage - 1) * currentItemsPerPage;
  const endIndex = startIndex + currentItemsPerPage;
  const doctorSpecialization = paginatedDoctors.slice(startIndex, endIndex);

  const totalPages = Math.ceil(paginatedDoctors.length / currentItemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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

  const handleMouseLeave = () => {
    setHoveredDoctor(null);
  };

  //doctor specialization search
  useEffect(() => {
    if (selectedSpecialization) {
      const fetchDoctors = async () => {
        setLoading(true);
        try {
          const apiUrl = `${
            APIURLS.APIURLPATIENTSFINDDoctorSpecializationSearch
          }specialization=${encodeURIComponent(selectedSpecialization)}`;
          const token = localStorage.getItem("token");

          if (!token) {
            setDoctorData([]);
            setLoading(false);
            return;
          }

          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const jsonResponse = await response.json();

          setDoctorData(
            Array.isArray(jsonResponse.data) ? jsonResponse.data : []
          );
        } catch (error) {
          setDoctorData([]);
        } finally {
          setLoading(false);
        }
      };

      fetchDoctors();
    }
  }, [selectedSpecialization]);

  const handleDoctorDetails = (doctor) => {
    navigate(
      `/DoctorsBooking?specialization=${encodeURIComponent(
        doctor.specialization
      )}&doctor_id=${doctor.id}`
    );
  };
  const itemsPerPages = 10;

  const totalPage = Math.ceil(filteredDoctors.length / itemsPerPages);

  const paginatedDoctorsSpecialization = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPages,
    currentPage * itemsPerPages
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPage));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleFilterChange = (newFilteredDoctors) => {
    setFilteredDoctors(newFilteredDoctors);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBarMenu
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={PATIENTSIDEBARMENU}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ml-${
          isSidebarOpen ? "64" : "0 sm:ml-20"
        }`}
      >
        {/* Topbar */}
        <PatientHeader />

        {/* Dashboard Content */}
        <main className=" bg-gray-100 flex-grow">
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <img
                  src={fallbackImage}
                  className="w-16 h-16 animate-bounce mx-auto mb-4"
                />
                <p className="text-gray-600 font-semibold">Loading</p>
              </div>
            </div>
          ) : (
            <>
              {/* List of Doctors */}
              <div className="sm:flex">
                <div>
                  <div className="flex space-x-3 items-center text-primary p-4 border-b border-gray-200">
                    <FaArrowLeft
                      className="text-xl cursor-pointer"
                      onClick={goBack}
                    />
                    <p className="font-semibold text-lg uppercase">
                      Doctor Categories
                    </p>
                  </div>

                  {/* Search */}
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

                  {/* Doctors Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mx-8 my-2 overflow-y-visible">
                    {paginatedDoctorsSpecialization.map((item, index) => {
                      const iconColor =
                        index % 2 === 0 ? "text-primary" : "text-secondary";
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center text-center border-2 border-gray-200 rounded-lg bg-white shadow-md cursor-pointer my-3 px-2 py-2"
                          onClick={() => handleDoctorsCards(item)}
                          onMouseEnter={() => handleMouseEnter(item)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <img
                            src={
                              specializationImages[item.title] || fallbackImage
                            }
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-full mb-2"
                          />
                          <p className="truncate text-center text-gray-800 w-full" style={{fontSize: "13px"}}>
                            {item.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {/* Pagination Controls */}
                  <div className="flex justify-between items-center mt-4 px-8">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="bg-secondary text-white py-2 px-4 rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <p>
                      Page {currentPage} of {totalPage}
                    </p>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPage}
                      className="bg-primary text-white py-2 px-4 rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>

                {/* Right Side: Hovered Doctor Info */}
                <div className="hidden lg:block w-2/3 max-h-[70vh] px-8 py-4 shadow-2xl mx-0 mt-[60px] mr-9">
                  {hoveredDoctor || lastHoveredDoctor ? (
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={
                          specializationImages[
                            (hoveredDoctor || lastHoveredDoctor)?.title
                          ] || fallbackImage
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
                    <p className="text-gray-500 text-center">
                      No doctor available
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {doctorsCards && (
        <div
          className={`fixed inset-y-0 right-0 bg-gray-100 z-50 overflow-auto mb-10 w-full transform translate-x-0 top-[73px] md:top-[90px] bottom-0 h-full ${
            isSidebarOpen
              ? "w-[63%] md:w-[73%] lg:w-[83%]"
              : "md:w-[90.5%] lg:w-[94.3%]"
          }`}
        >
          {/* Conditional Header */}
          <div className="flex justify-between items-center text-primary p-4 border-b border-gray-200">
            <div className="flex items-center">
              {!showSearch ? (
                <>
                  <FaArrowLeft
                    className="text-xl cursor-pointer"
                    onClick={() => setDoctorsCards(null)}
                  />
                  <p className="font-semibold text-2xl ml-4 uppercase text-center text-secondary">
                    {doctorsCards.title}
                  </p>
                </>
              ) : (
                <div className="flex items-center w-[90vw]">
                  <div className="flex-grow -ml-7 rounded-md overflow-hidden">
                    <Search
                      placeholder={`Search for ${doctorsCards.title}`}
                      searchValue=""
                      onSearchChange={(e) => setSearchValue(e.target.value)}
                      items={Doctor}
                      customClassName="w-full"
                    />
                  </div>
                  <p
                    className="w-20 text-center cursor-pointer text-gray-100 bg-primary rounded-xl py-2"
                    onClick={handleSearchCancel}
                  >
                    Cancel
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center">
              {!showSearch && (
                <ImSearch
                  className="cursor-pointer text-2xl"
                  onClick={handleSearchToggle}
                />
              )}
            </div>
          </div>

          {/* Doctor Specialization Grid */}
          <div className="relative">
            {/* Loading Spinner */}
            {loading && (
              <div className="flex items-center justify-center h-screen">
                {" "}
                <div className="text-center">
                  <FaUserDoctor
                    size={48}
                    className="animate-bounce text-secondary mb-4 mx-auto"
                  />
                  <p className="text-gray-600 font-semibold">Loading...</p>
                </div>
              </div>
            )}

            {/* Render Doctors or No Doctors Registered */}
            <div
              className={`${
                doctorSpecialization.length === 0 && !loading
                  ? "flex items-center justify-center h-screen"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
              }`}
            >
              {doctorSpecialization.length === 0 && !loading ? (
                <div className="flex items-center justify-center h-screen">
                  <div className="text-center">
                    <FaUserDoctor
                      size={48}
                      className=" text-secondary mb-4 mx-auto"
                    />
                    <p className="text-gray-600 font-semibold">
                      No {doctorsCards?.title || "Specialization"} is yet
                      registered.
                    </p>
                  </div>
                </div>
              ) : (
                doctorSpecialization.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => handleDoctorDetails(doctor)}
                    className="flex flex-col p-1 justify-between items-center m-3 border border-gray-200 rounded-lg shadow-sm cursor-pointer"
                  >
                    <img
                      src={`${defaultUrl}${doctor.prof_pics}`}
                      alt={doctor.fullname}
                      className="w-[450px] h-[250px] object-cover rounded-tl-md rounded-bl-md"
                    />
                    <h5 className="text-lg font-semibold text-primary capitalize">
                      {doctor.fullname}
                    </h5>
                    <div className="w-full p-3 ">
                      <div className="flex justify-center mb-3 -mt-3"></div>
                      <div className="text-center">
                        <div className="flex flex-wrap justify-between my-2">
                          <p className="flex items-center">
                            <MdLanguage className="mr-1 text-primary" />{" "}
                            {doctor.pref_language}
                          </p>
                          <p
                            className={`flex items-center ${
                              doctor.experience ? "mr-9" : "mr-1"
                            }`}
                          >
                            <MdEventAvailable className="mr-1 text-primary" />
                            {doctor.experience
                              ? `${doctor.experience} years`
                              : "0 year"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-between">
                        <p className="flex items-center">
                          <GrUserExpert className="mr-1 text-primary" />{" "}
                          {doctor.gender}
                        </p>
                        <p className="flex items-center mr-4">
                          <MdSick className="mr-1 text-primary" />{" "}
                          {doctor.no_of_consultations} Patients
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-5 mb-3 border-t-4 ">
                        <div className="flex items-center space-x-1">
                          <HiOfficeBuilding className="text-primary" />
                          <p className="text-gray-500 text-sm">
                            {doctor.specialization}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination (only shown if there are doctors) */}
            {doctorSpecialization.length > 0 && (
              <div className="flex justify-center space-x-7 items-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-300 text-primary"
                      : "bg-primary text-secondary cursor-pointer"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={
                      currentPage === index + 1
                        ? "active text-secondary"
                        : "text-primary"
                    }
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-primary"
                      : "bg-primary text-secondary"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
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
