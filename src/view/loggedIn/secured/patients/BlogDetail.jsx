import { useState } from "react";
import { FaHeart,  } from "react-icons/fa";
import { GiStethoscope, GiTooth, GiBrain,  } from "react-icons/gi";
import { BsFillHeartFill } from "react-icons/bs";
import { MdPerson, MdPsychology } from "react-icons/md";
import {     DOCTORSIDEBARMENU, NAMES, TOPBARMENU } from '../../../../components/Constants';

import SideBarMenu from '../../../../components/SideBarMenu';

import UseSideBarMenu from '@hooks/UseSideBarMenu';

import TopBar from '../../../../components/TopBar';
import UseTopMenu from '@hooks/useTopMenu';
const DoctorDashboard = () => {

  const userImage= NAMES.userImage
  const siteTitle = NAMES.SITE_TITLE
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const { profileDropdownOpen, toggleTopbar }=UseTopMenu();

  

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    {
      id: 1,
      name: "Dr. Jennie Kim",
      title: "Orthopedic",
      price: 36,
      image: "https://via.placeholder.com/150",
      favorite: false,
    },
    {
      id: 2,
      name: "Prof. Dr. Niall Horan",
      title: "Neurologist",
      price: 36,
      image: "https://via.placeholder.com/150",
      favorite: true,
      experience: 5,
      patients: 9845,
      reviews: 6099,
    },
    {
      id: 3,
      name: "Dr. Alexandra Boje",
      title: "Orthopedic",
      price: 36,
      image: "https://via.placeholder.com/150",
      favorite: false,
    },
    {
      id: 4,
      name: "Dr. Alexandra Boje",
      title: "Orthopedic",
      price: 36,
      image: "https://via.placeholder.com/150",
      favorite: false,
    },
    {
      id: 5,
      name: "Dr. Alexandra Boje",
      title: "Orthopedic",
      price: 36,
      image: "https://via.placeholder.com/150",
      favorite: false,
    },
    {
      id: 6,
      name: "Dr. Alexandra Boje",
      title: "Orthopedic",
      price: 36,
      image: "https://via.placeholder.com/150",
      favorite: false,
    },
  ];

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
    {/* Sidebar */}
  <SideBarMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}   menuItems={DOCTORSIDEBARMENU}/>

    {/* Main Content */}
    <div className={`flex-1 ml-${isSidebarOpen ? '64' : '0 sm:ml-20'}  transition-all duration-300`}>

      {/* Topbar */}
     <TopBar siteTitle={siteTitle} 
              userImage={userImage} 
              toggleSidebar={toggleSidebar} 
              NAMES={NAMES}
              TOPBARMENU={TOPBARMENU} 
              profileDropdownOpen={profileDropdownOpen}
              toggleTopbar={toggleTopbar}
              placeholder={"Search for Patients, Invoices, and appointments etc."} 
              />


      {/* Dashboard Content */}
      <main className="p-9 bg-gray-100 flex-grow">

      <div className="flex justify-between space-x-3 ">
        {/* Left Side - Categories and Recommended Doctors */}
        
        <div className="w-full md:w-9/12 pr-4  border-2 shadow-lg bg-white p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl  font-bold text-[24px] italic capitalize flex ml-2">keep healthy, {NAMES.USER}!</h2>
            <p className="text-gray-600">Get a medical consultation with our below listed medical specialists?</p>
          </div>

          {/* Categories with Scroll */}
          <div className="container mx-auto p-4 ">
      {/* Scrollable Button Section - Display 6 at a time */}
      <div className="overflow-x-auto scrollbar-thin  whitespace-nowrap  ">
        <div className="inline-flex space-x-4 mb-3">
          {/* Create an array of button items */}
          {[
            { icon: <GiStethoscope size={32} className="text-blue-600" />, label: 'GP' },
            { icon: <BsFillHeartFill size={32} className="text-red-600" />, label: 'Cardiologist' },
            { icon: <GiBrain size={32} className="text-purple-600" />, label: 'Neurologist' },
            { icon: <GiTooth size={32} className="text-green-600" />, label: 'Dentist' },
            { icon: <MdPsychology size={32} className="text-pink-600" />, label: 'Psychiatrist' },
            { icon: <MdPerson size={32} className="text-yellow-600" />, label: 'Orthopedic' },
            { icon: <MdPerson size={32} className="text-yellow-600" />, label: 'Orthopedic' },
            { icon: <MdPerson size={32} className="text-yellow-600" />, label: 'Orthopedic' },
            { icon: <MdPerson size={32} className="text-yellow-600" />, label: 'Orthopedic' },
            { icon: <MdPerson size={32} className="text-yellow-600" />, label: 'Orthopedic' },
          ].map((item, index) => (
            <button
              key={index}
              className="min-w-[150px] p-4 bg-gray-100 rounded-lg flex flex-col items-center border-2 border-gray-200"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
          {/* Recommended Doctors */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Recommended Orthopedic (27)</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`border p-4 rounded-lg cursor-pointer ${
                    selectedDoctor?.id === doctor.id ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <div className="text-center">
                    <h4 className="font-semibold">{doctor.name}</h4>
                    <p className="text-gray-500">{doctor.title}</p>
                    <p className="text-blue-600 mt-2">${doctor.price}/h</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <FaHeart className={`${doctor.favorite ? "text-red-500" : "text-gray-400"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Upcoming Schedule and Selected Doctor Details */}
        <div className=" md:w-4/12  shadow-xl ml-3 bg-white">
          {/* Upcoming Schedule */}
          {/* <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Upcoming Schedule(3)</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <div className="flex">
              <img src={NAMES.userImage} alt="" className="w-16 h-16" />
                <div>
                  <h4 className="font-semibold">Dr. Alexandra Boje</h4>
                  <p className="text-sm text-gray-500">Orthopedic</p>
                  <p className="text-sm text-gray-500">June 12, 2023</p>
                </div>
                <FaVideo />

                </div>
                <FaCalendarAlt size={24} className="text-blue-500" />
              </div>
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <div>
                  <h4 className="font-semibold">Dr. Niall Horan</h4>
                  <p className="text-sm text-gray-500">Orthopedic</p>
                  <p className="text-sm text-gray-500">June 22, 2023</p>
                </div>
                <FaCalendarAlt size={24} className="text-blue-500" />
              </div>
            </div>
          </div> */}

          {/* Selected Doctor Details */}
          {selectedDoctor && (
            <div className="bg-white p-4 rounded-lg shadow">
             <div className="flex space-x-3">
              <img src={selectedDoctor.image} alt="" className="w-16 h-16 rounded-md" />
              <div>
              <h3 className="text-xl font-bold mb-2">{selectedDoctor.name}</h3>
              <p className="text-gray-500">{selectedDoctor.title}</p>
              <p className="text-blue-600 mt-2">${selectedDoctor.price}/h</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                    <FaHeart className={`${selectedDoctor.favorite ? "text-red-500" : "text-gray-400"}`} />
                  </div>
             </div>
             
              
             
              <div className="mt-4 flex">
                <div>
                  <strong>Experience</strong> <p>{selectedDoctor.experience} years</p>
                </div>
                <p>
                  <strong>Patients:</strong> {selectedDoctor.patients}
                </p>
                <p>
                  <strong>Reviews:</strong> {selectedDoctor.reviews}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </main>
    </div>
  </div>
  );
};

export default DoctorDashboard;
