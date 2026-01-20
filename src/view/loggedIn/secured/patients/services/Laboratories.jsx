import { HiOfficeBuilding } from "react-icons/hi";
import {
  defaultUrl,
} from "../../../../../components/Constants";
import UseSideBarMenu from "../../../../../hooks/UseSideBarMenu";
import { useLaboratoryServices } from "./ServicesForm";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiChemicalDrop } from "react-icons/gi";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import {
  MdSick,
  MdOutlineWorkOutline,
  MdOutlineDoubleArrow,
} from "react-icons/md";


const Laboratories = () => {
  const { LaboratoryData, loading } = useLaboratoryServices();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isReadMore, setIsReadMore] = useState(false);


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
  const filteredData = LaboratoryData;
  const totalItems = filteredData.filter((item) => item.verified === 1).length;
  const totalPages = Math.ceil(totalItems / currentItemsPerPage);

  const verifiedData = LaboratoryData.filter((item) => item.verified === 1);

  const paginatedData = verifiedData.slice(
    (currentPage - 1) * currentItemsPerPage,
    currentPage * currentItemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleItemClick = (id) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
    window.history.pushState({}, "", `?id=${id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
    window.history.pushState({}, "", window.location.pathname);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get("id");
    if (idFromUrl) {
      setSelectedItemId(Number(idFromUrl));
      setIsModalOpen(true);
    }
  }, []);

  const selectedItem = paginatedData.find((item) => item.id === selectedItemId);

  return (
    <div className="">
        <main className="flex-grow">
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <GiChemicalDrop size={48} className="text-secondary mb-4 mx-auto" />
                <p className="text-gray-600 font-semibold">Loading</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {paginatedData.map((item) => (
                  <Link
                    key={item.id}
                    to={{
                      pathname: item.link,
                      state: { title: item.title },
                    }}
                    className="justify-between border border-gray-200 rounded-lg shadow-sm bg-white-200 p-3"
                    onClick={() => handleItemClick(item.id)}
                  >
                    <div>
                      <img
                        src={
                          item?.logo
                            ? `${defaultUrl}${item.logo}`
                            : "/default-image.png"
                        }
                        alt={item.institution_name}
                        className="w-[450px] h-[150px] object-cover rounded-md"
                      />
                    </div>
  
                    <div>
                      <h5 className="font-semibold mb-1 text-primarycapitalize">
                        {item.institution_name}
                      </h5>
  
                      {/* <div className="flex gap-2 items-center mb-2">
                           <FaLocationDot className="text-secondary dark:text-secondary" />
                           <p className="text-primary mb-0 flex">
                             {item.address || "address"} {item.city} {item.state}{" "}
                             {item.country}
                           </p>
                         </div> */}
                    </div>
  
                    <hr />
  
                    <div className="flex justify-end p-[6px] text-gray-500 text-sm mt-2 space-x-1">
                      <HiOfficeBuilding className="text-primary dark:text-secondary" />
                      <p className="text-gray-500 dark:text-white -mt-1">
                        {item.institution_type}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
  
              <div className="flex justify-center space-x-7 items-center mt-4">
                {totalPages > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 border rounded-lg ${
                        currentPage === 1
                          ? "bg-gray-300"
                          : "bg-primary text-white cursor-pointer"
                      }`}
                    >
                      Previous
                    </button>
                    <p>
                      Page {currentPage} of {totalPages}
                    </p>
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 border rounded-lg ${
                        currentPage === totalPages
                          ? "bg-gray-300"
                          : "bg-primary text-white"
                      }`}
                    >
                      Next
                    </button>
                  </>
                )}
              </div>
            </>
          )}
          {isModalOpen && selectedItem && (
            <div
              className={`fixed inset-y-0 right-0 bg-gray-100 z-50 overflow-auto mb-10 w-full transform translate-x-0 top-[73px] md:top-[90px] bottom-0 h-full 
                `}
            >
              <div className="h-screen bg-white p-8 rounded-lg ">
                <div className="flex items-center justify-between w-full">
                  <FaArrowLeft
                    className="text-xl cursor-pointer"
                    onClick={closeModal}
                  />
                  <p className="font-semibold text-2xl uppercase text-center text-secondary flex-grow">
                    {selectedItem.institution_name}
                  </p>
                </div>
  
                <div className="relative w-full flex flex-col lg:flex-row lg:space-x-5">
                  <img
                    src={
                      selectedItem?.logo
                        ? `${defaultUrl}${selectedItem.logo}`
                        : "/default-image.png"
                    }
                    alt={selectedItem.institution_name}
                    className="w-full lg:w-[65%] h-[250px] lg:h-[80vh] object-cover object-top rounded-tl-xl rounded-bl-xl"
                  />
  
                  <div
                    className="md:mt-5   bg-gray-50 p-4 w-full relative"
                    style={{
                      borderTopLeftRadius: "20% 20px",
                      borderTopRightRadius: "20% 20px",
                      zIndex: 10,
                    }}
                  >
                    <div className="mt-6 mb-[50px]">
                      <h3 className="text-xl font-bold capitalize">
                        {selectedItem ? selectedItem.fullname : ""}
                      </h3>
                      <p className="text-gray-600 capitalize">
                        {selectedItem.specialization}{" "}
                      </p>
                      <p className="flex items-center text-gray-500 mt-3 ">
                        <FaLocationDot className="mr-1 text-primary" />
                        {selectedItem.address} {selectedItem.city}{" "}
                        {selectedItem.state} {selectedItem.country}{" "}
                      </p>
  
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="bg-gray-100 rounded-md p-4 shadow-xl text-center">
                          <p className="font-bold text-primary capitalize">
                            Patients
                          </p>
                          <div className="flex justify-center items-center mt-2">
                            <MdSick
                              className="mr-1 text-primary font-bold"
                              size={20}
                            />
                            <p className="captialize">
                              {selectedItem.no_of_consultations} Attended
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-100 rounded-md p-4 shadow-xl text-center">
                          <p className="font-bold text-primary capitalize">
                            Experience
                          </p>
                          <div className="flex justify-center items-center mt-2">
                            <MdOutlineWorkOutline
                              className="mr-1 text-primary font-bold"
                              size={20}
                            />
                            <p>{selectedItem.experience}Years</p>
                          </div>
                        </div>
                        <div className="bg-gray-100 rounded-md p-4 shadow-xl text-center">
                          <p className="font-bold text-primary capitalize">
                            Rating
                          </p>
                          <div className="flex justify-center items-center mt-2">
                            <FaStar
                              className="mr-1 text-primary font-bold"
                              size={20}
                            />
                            <p>{selectedItem.rating}</p>
                          </div>
                        </div>
                      </div>
  
                      <div className="mt-6">
                        <h3 className="text-lg font-bold uppercase text-primary">
                          About
                        </h3>
                        <p className="text-gray-600">{selectedItem.about}</p>
                        <button
                          className="text-primary underline mt-2 font-semibold"
                          onClick={() => setIsReadMore(!isReadMore)}
                        >
                          <div className="flex">
                            <p>{isReadMore ? "Read Less " : "Read More"}</p>
                            <MdOutlineDoubleArrow
                              className="mt-[4px] ml-[3px]"
                              size={20}
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
  );
};

export default Laboratories;
