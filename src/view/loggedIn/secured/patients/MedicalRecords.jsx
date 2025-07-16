


import {     PATIENTSIDEBARMENU,  } from '../../../../components/Constants';

import SideBarMenu from '../../../../components/SideBarMenu';

import UseSideBarMenu from '../../../../hooks/UseSideBarMenu';

// import useTabs from '../../../../hooks/useTabs';

import { Link } from 'react-router-dom';
import PatientHeader from '../../../partials/PatientHeader';
import { formatDate, getUserData } from '../../../../components/Helper';
import { differenceInYears } from 'date-fns';

const MedicalRecords = () => {

  const userData= getUserData()
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  // const { activeTab, toggleTab } = useTabs('userRecord'); 
  
  // const renderTabContent = () => {
  //   switch (activeTab) {
  //     case 'userRecord':
  //       return (
  //         <div>
  //           <h3 className="font-semibold text-lg">Patient Information</h3>
  //           <p><strong>Name:</strong></p>
  //           <p><strong>Appointment:</strong> </p>
  //           <p><strong>Counseling:</strong> </p>
  //         </div>
  //       );
  //     case 'labReports':
  //       return <div>Lab Reports Content</div>;
  //     case 'prescriptions':
  //       return <div>Prescriptions Content</div>;
  //     case 'medication':
  //       return <div>   <div className="sm:flex justify-between mb-4">
  //       <div>
  //         <h1 className="text-2xl font-semibold">Prescription Reports</h1>
  //         <p className="text-gray-600">View and manage your prescription reports below.</p>
  //       </div>
  //     </div>

  //     {/* Main content - add your prescription reports here */}
  //     <div className="bg-white rounded-lg shadow-md p-4">
  //       {/* Example placeholder for reports */}
  //       <h2 className="text-xl font-semibold mb-4">Recent Prescriptions</h2>
  //       <table className="min-w-full bg-white">
  //         <thead>
  //           <tr className="w-full bg-gray-200 text-gray-600">
  //             <th className="p-2 text-left">Date</th>
  //             <th className="p-2 text-left">Medication</th>
  //             <th className="p-2 text-left">Dosage</th>
  //             <th className="p-2 text-left">Prescribing Doctor</th>
  //             <th className="p-2 text-left">Status</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {/* Placeholder for dynamic content */}
  //           <tr className="border-t">
  //             <td className="p-2">2024-10-21</td>
  //             <td className="p-2">Amoxicillin</td>
  //             <td className="p-2">500mg X2 </td>
  //             <td className="p-2">Dr. Smith</td>
  //             <td className="p-2 text-secondary">Filled</td>
  //           </tr>
  //           {/* Add more rows dynamically */}
  //         </tbody>
  //       </table>
  //     </div></div>;
  //     case 'diagnosis':
  //       return <div>Diagnosis Content</div>;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
    <SideBarMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}   menuItems={PATIENTSIDEBARMENU}/>

      {/* Main Content */}
      <div className={`flex-1 ml-${isSidebarOpen ? '64 overflow-hidden' : '0 sm:ml-20'}  transition-all duration-300`}>

        {/* Topbar */}
        <PatientHeader/>



        {/* Dashboard Content */}
        <main className="p-6 bg-gray-100 flex-grow mt-[70px] md:mt-0">
          <div className='   sm:flex justify-between mb-0'>
          <div className=' mb-4'>
          <div className="patient-details p-6 bg-white shadow-lg rounded-lg w-full sm:w-[90vw] sm:mx-auto sm:my-6 border-2 border-gray-400 ">
                <div className="border-b-2 border-gray-400 text-primary flex">
                 
                  <p className="font-bold text-xl uppercase">My Medical Records</p>
                </div>

                <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
    {/* Left Column: Patient Info */}
    <div className="lg:col-span-1  flex flex-col items-center">
    <div className='bg-white w-full max-w-sm rounded-lg shadow-md flex flex-col items-center p-3 mx-auto mb-4 h-full'>
  <img
    src={userData?.data?.prof_pics}
    alt={userData?.data?.fullname}
    className="w-32 h-32 rounded-xl mb-4"
  />
  <h2 className="text-lg font-bold">{userData?.data?.fullname}</h2>
  <p className="text-gray-600">Age: {differenceInYears (new Date(),userData?.data?.dob)}</p>
  <p className="text-gray-600">EHR: {userData?.data?.ehr}</p>
<Link to={'/settings'}>
  <button className="mt-4 bg-secondary text-white px-4 py-2 rounded-lg">Update</button>
  </Link>
</div>

      
{/* <div className='bg-white w-full rounded-lg shadow-md p-6 mx-auto'>
  <ul className="text-gray-700 space-y-6 mt-4 p-6">
  <li><strong>EHR:</strong> {userData?.data?.ehr}</li>
    <li><strong>Gender:</strong> {userData?.data?.gender}</li>
    <li><strong>Blood Type:</strong>{userData?.data?.blood_type} (Positive)</li>
    <li><strong>Allergies:</strong> {userData?.data?.allergies}</li>
    <li><strong>Diseases:</strong> <span className='capitalize'>{userData?.data?.current_medication}</span></li>
    <li><strong>Height:</strong>{ userData?.data?.height}ft</li>
    <li><strong>Weight:</strong> {userData?.data?.weight} kg</li>
    <li><strong>Last Visit:</strong> 25th October 2019</li>
  </ul>
</div> */}

     
      
    </div>

    {/* Right Column: Vital Signs, Test Reports, and Prescriptions */}
    <div className="lg:col-span-2 space-y-6">
    <div className="bg-white w-full rounded-lg shadow-md p-6 mx-auto">
  <ul className="text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-4 p-6">
    <li><strong>EHR:</strong> {userData?.data?.ehr}</li>
    <li  className="capitalize"><strong>Gender:</strong> {userData?.data?.gender}</li>
    <li  className="capitalize"><strong>Blood Type:</strong> {userData?.data?.blood_type} (Positive)</li>
    <li  className="capitalize"><strong>Allergies:</strong> {userData?.data?.allergies}</li>
    <li  className="capitalize"><strong>Current Medication:</strong> <span className="capitalize">{userData?.data?.current_medication}</span></li>
    <li><strong>Height:</strong> {userData?.data?.height} ft</li>
    <li><strong>Weight:</strong> {userData?.data?.weight} kg</li>
    <li><strong>Date Registered:</strong> <span className="capitalize mr-2">{formatDate(userData?.data?.created_at)}</span></li>
  </ul>
</div>

      {/* Vital Signs */}
      {/* <div className=" p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center bg-white rounded-2xl shadow-md p-9  mx-3">
        <BsHeartPulseFill size={40} className='mx-auto text-red-500 mb-2' />

          <h3 className="text-xl font-semibold">Heart Rate</h3>
          <p className="text-2xl font-bold text-red-500"><span className='text-4xl'>80</span>bpm</p>
        </div>
        <div className="text-center bg-white rounded-2xl shadow-md p-9  mx-3">
        <FaTemperatureHigh size={40} className='mx-auto text-blue-500 mb-2' />

          <h3 className="text-xl font-semibold">Body Temperature</h3>
          <p className="text-2xl font-bold text-blue-500"><span className='text-4xl'>36.5</span>°C</p>
        </div>
        <div className="text-center bg-white rounded-2xl shadow-md p-9  mx-3">
        <GiHealthCapsule size={40} className='mx-auto text-yellow-500 mb-2' />

          <h3 className="text-xl font-semibold">Glucose</h3>
          <p className="text-2xl font-bold text-yellow-500"><span className='text-4xl'>100</span>mg/dl</p>
        </div>
      
      </div> */}

      {/* Test Reports */}
      {/* <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Test Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-full text-white mr-4">📄</div>
            <div>
              <p className="font-semibold">CT Scan - Full Body</p>
              <p className="text-gray-500">12th February 2020</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-yellow-500 p-2 rounded-full text-white mr-4">🧪</div>
            <div>
              <p className="font-semibold">Creatine Kinase T</p>
              <p className="text-gray-500">12th February 2020</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-red-500 p-2 rounded-full text-white mr-4">👁️</div>
            <div>
              <p className="font-semibold">Eye Fluorescein Test</p>
              <p className="text-gray-500">12th February 2020</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Prescriptions */}
      {/* <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Prescriptions</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Heart Diseases</p>
              <p className="text-gray-500">25th October 2019</p>
            </div>
            <p className="text-gray-600">3 months</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Skin Care</p>
              <p className="text-gray-500">8th August 2019</p>
            </div>
            <p className="text-gray-600">2 months</p>
          </div>
        </div>
      </div> */}
    </div>
  </div>
  {/* <div className="bg-white p-6 rounded-lg shadow-md mt-8">
  <div className="flex justify-around mb-6">
    <button 
      onClick={() => toggleTab('userRecord')} 
      className={`flex-1 p-3 font-semibold hover:bg-secondary rounded-full transition duration-300  mx-3 ease-in-out ${activeTab === 'userRecord' ? 'bg-primary hover:bg-secondary text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    >
      Record
    </button>
    <button 
      onClick={() => toggleTab('diagnosis')} 
      className={`flex-1 p-3 font-semibold  hover:bg-secondary rounded-full transition duration-300 mx-3 ease-in-out ${activeTab === 'diagnosis' ? 'bg-primary hover:bg-secondary text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    >
      Diagnosis
    </button>
    <button 
      onClick={() => toggleTab('labReports')} 
      className={`flex-1 p-3 font-semibold  hover:bg-secondary rounded-full transition duration-300 mx-3 ease-in-out ${activeTab === 'labReports' ? 'bg-primary hover:bg-secondary text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    >
      Lab
    </button>
  
    <button 
      onClick={() => toggleTab('medication')} 
      className={`flex-1 p-3 hover:bg-secondary font-semibold hidden sm:block rounded-full transition duration-300 mx-3 ease-in-out ${activeTab === 'medication' ? 'bg-primary  text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    >
      Medication
    </button>
  </div>
  
</div> */}

</div>
              
              </div>
          </div>
          </div>
          {/* main contnent */}
        
        


        </main>
      </div>
    </div>
  );
};

export default MedicalRecords;
