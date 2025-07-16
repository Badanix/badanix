import { HiOfficeBuilding } from 'react-icons/hi';
import { defaultUrl, PATIENTSIDEBARMENU } from '../../../../../components/Constants';
import SideBarMenu from '../../../../../components/SideBarMenu';
import UseSideBarMenu from '../../../../../hooks/UseSideBarMenu';
import PatientHeader from '../../../../partials/PatientHeader';
import { useLaboratoryServices } from './ServicesForm';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GiChemicalDrop } from 'react-icons/gi';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import { MdSick, MdOutlineWorkOutline, MdOutlineDoubleArrow } from 'react-icons/md';
import Select from "react-select";
import { Country, State, City } from "country-state-city";
// import { getUserData } from '../../../../../components/Helper';

const Laboratories = () => {
  // const userData=getUserData();
  
  // const [address, setAddress] = useState([userData?.data?.address, userData?.data?.city, userData?.data?.state, userData?.data?.country]);

  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const { LaboratoryData, loading } = useLaboratoryServices();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isReadMore, setIsReadMore] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const formatOptions = (data, labelKey = "name") =>
    data.map((item) => ({
      value: item.isoCode || item.id,
      label: item[labelKey],
    }));

  const countries = formatOptions(Country.getAllCountries());
  const states = selectedCountry ? formatOptions(State.getStatesOfCountry(selectedCountry.value)) : [];
  const cities = selectedState ? formatOptions(City.getCitiesOfState(selectedCountry.value, selectedState.value)) : [];

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
  
  // Filter laboratories based on country, state, and city
  const filterLaboratories = (data) => {
    return data.filter((item) => {
      const matchesCountry = selectedCountry ? item.country === selectedCountry.label : true;
      const matchesState = selectedState ? item.state === selectedState.label : true;
      const matchesCity = selectedCity ? item.city === selectedCity.label : true;
      return matchesCountry && matchesState && matchesCity;
    });
  };
  // const filterLaboratories = (data) => {
  //   return data.filter((item) => {
  //     const matchesCountry = address[2] ? item.country === address[2] : true;
  //     const matchesState = address[1] ? item.state === address[1] : true;
  //     const matchesCity = address[0] ? item.city === address[0] : true;
  //     return matchesCountry && matchesState && matchesCity;
  //   });
  // };
  const filteredData = filterLaboratories(LaboratoryData);
  const totalItems = filteredData.filter((item) => item.verified === 1).length;
  const totalPages = Math.ceil(totalItems / currentItemsPerPage);

  const verifiedData = filteredData.filter((item) => item.verified === 1);

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
    window.history.pushState({}, '', `?id=${id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
    window.history.pushState({}, '', window.location.pathname);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    if (idFromUrl) {
      setSelectedItemId(Number(idFromUrl));
      setIsModalOpen(true);
    }
  }, []);

  const selectedItem = paginatedData.find(item => item.id === selectedItemId);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBarMenu
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={PATIENTSIDEBARMENU}
      />
      
      <div className={`flex-1 ml-${isSidebarOpen ? '64' : '0 sm:ml-20'} transition-all duration-300`}>
        <PatientHeader />

        <main className="p-6 bg-gray-100 flex-grow relative ">
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <GiChemicalDrop size={48} className="text-secondary mb-4 mx-auto" />
                <p className="text-gray-600 font-semibold">Loading</p>
              </div>
            </div>
          ) : (
            <>
            <div className=' lg:w-10/12  mx-auto  flex justify-between space-x-3 mt-[70px] md:mt-4'>
              <Select
                options={countries}
                value={selectedCountry}
                onChange={(option) => {
                  setSelectedCountry(option);
                  setSelectedState(null);
                  setSelectedCity(null);
                }}
                placeholder="Select Country"
                className="w-full md:w-1/3"
              />
              <Select
                options={states}
                value={selectedState}
                onChange={(option) => {
                  setSelectedState(option);
                  setSelectedCity(null);
                }}
                placeholder="Select State"
                isDisabled={!states.length}
                className="w-full md:w-1/3"
              />
              <Select
                options={cities}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="Select City"
                isDisabled={!cities.length}
                className="w-full md:w-1/3"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {paginatedData.map((item) => (
                <Link
                  key={item.id}
                  to={{
                    pathname: item.link,
                    state: { title: item.title },
                  }}
                  className="flex flex-col p-1 justify-between items-center m-3 border border-gray-200 rounded-lg shadow-sm"
                  onClick={() => handleItemClick(item.id)}
                >
                  <img
src={item?.logo ? `${defaultUrl}${item.logo}` : "/default-image.png"}
alt={item.institution_name}
                    className="w-[450px] h-[250px] object-cover rounded-md"
                  />
                  <div>
                    <div className="flex justify-between space-x-3 -mt-9">
                      <div className="flex flex-col justify-between w-full ml-3 mt-[50px] lg:mt-9">
                        <h5 className="text-lg font-semibold mb-1 text-primary dark:text-secondary capitalize">
                          {item.institution_name}
                        </h5>
                        <div className="flex space-x-1">
                          <FaLocationDot className="text-secondary dark:text-secondary mt-[5px]" />
                          <p className="text-gray-500 dark:text-white text-sm mb-2 flex">
                            {item.address} {item.city} {item.state} {item.country}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="flex justify-end p-[6px] text-gray-500 text-sm space-x-4 mt-2">
                      <div className="flex space-x-1">
                        <HiOfficeBuilding className="text-primary dark:text-secondary" />
                        <p className="text-gray-500 dark:text-white -mt-1">{item.institution_type}</p>
                      </div>
                    </div>
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
                    className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-primary text-white cursor-pointer'}`}
                  >
                    Previous
                  </button>
                  <p>
                    Page {currentPage} of {totalPages}
                  </p>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-primary text-white'}`}
                  >
                    Next
                  </button>
                </>
              )}
            </div>
            </>
          )}
   {isModalOpen && selectedItem && (
      <div className={`fixed inset-y-0 right-0 bg-gray-100 z-50 overflow-auto mb-10 w-full transform translate-x-0 top-[73px] md:top-[90px] bottom-0 h-full ${
        isSidebarOpen ? 'w-[63%] md:w-[73%] lg:w-[83%]' : 'md:w-[90.5%] lg:w-[94.3%]'
      }`}>           
      
         <div className="h-screen bg-white p-8 rounded-lg ">
         <div className="flex items-center justify-between w-full">
  <FaArrowLeft 
    className="text-xl cursor-pointer" 
    onClick={closeModal} 
  />
  <p className="font-semibold text-2xl uppercase text-center text-secondary flex-grow">{selectedItem.institution_name}</p>
</div>


<div className="relative w-full flex flex-col lg:flex-row lg:space-x-5">
              <img
src={selectedItem?.logo ? `${defaultUrl}${selectedItem.logo}` : "/default-image.png"}

                alt={selectedItem.institution_name}
                className="w-full lg:w-[65%] h-[250px] lg:h-[80vh] object-cover object-top rounded-tl-xl rounded-bl-xl"
              />

              <div className="md:mt-5   bg-gray-50 p-4 w-full relative" style={{ borderTopLeftRadius: '20% 20px', borderTopRightRadius: '20% 20px', zIndex: 10 }}>
                <div className="mt-6 mb-[50px]">
                  <h3 className="text-xl font-bold capitalize">
                    {selectedItem ? selectedItem.fullname :""}
                  </h3>
                  <p className="text-gray-600 capitalize">{selectedItem.specialization} </p>
                  <p className="flex items-center text-gray-500 mt-3 ">
                    <FaLocationDot className="mr-1 text-primary" />
                    {selectedItem.address} {selectedItem.city} {selectedItem.state} {selectedItem.country}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-100 rounded-md p-4 shadow-xl text-center">
                      <p className="font-bold text-primary capitalize">Patients</p>
                      <div className="flex justify-center items-center mt-2">
                        <MdSick className="mr-1 text-primary font-bold" size={20} />
                        <p className="captialize">{selectedItem.no_of_consultations} Attended</p>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-md p-4 shadow-xl text-center">
                      <p className="font-bold text-primary capitalize">Experience</p>
                      <div className="flex justify-center items-center mt-2">
                        <MdOutlineWorkOutline className="mr-1 text-primary font-bold" size={20} />
                        <p>{ selectedItem.experience}Years</p>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-md p-4 shadow-xl text-center">
                      <p className="font-bold text-primary capitalize">Rating</p>
                      <div className="flex justify-center items-center mt-2">
                        <FaStar className="mr-1 text-primary font-bold" size={20} />
                        <p>{selectedItem.rating}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-bold uppercase text-primary">About</h3>
                    <p className="text-gray-600">
                      { selectedItem.about}
                    </p>
                    <button className="text-primary underline mt-2 font-semibold" onClick={() => setIsReadMore(!isReadMore)}>
                      <div className='flex'>
                        <p>{isReadMore ? 'Read Less ' : 'Read More'}</p>
                        <MdOutlineDoubleArrow className='mt-[4px] ml-[3px]' size={20}/>
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
    </div>
  );
};

export default Laboratories;
