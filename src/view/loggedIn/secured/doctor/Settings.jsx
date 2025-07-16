import {APIURLS, defaultUrl,  PATIENTSIDEBARMENU,  } from '../../../../components/Constants';

import SideBarMenu from '../../../../components/SideBarMenu';

import UseSideBarMenu from '@hooks/UseSideBarMenu';

import PatientHeader from '../../../partials/PatientHeader';
import Swal from 'sweetalert2';
import { HiPencilAlt } from 'react-icons/hi';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {  getUserData } from '../../../../components/Helper';
import { differenceInYears, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const userData = getUserData();
const navigate= useNavigate();

  const fullName= userData?.data?.institution_name ;
  const userEmail = userData?.data?.email ;
  const ehr =userData?.data?.ehr
  const profPics = userData?.data?.prof_pics
  const defaultUserImage =`${defaultUrl}${profPics}`;
  const token = localStorage.getItem("token");
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const [selectedFile, setSelectedFile] = useState(null);  
  const [userImage, setUserImage] = useState(defaultUserImage || null);
  const [ formData, setFormData] = useState(true);



const [activeTab, setActiveTab] = useState('account');
const [accountSettings, setAccountSettings] = useState({
 fullName:  userData?.data?.fullname,
 email: userData?.data?.email,
 phoneNumber: userData?.data?.phone,
  gender: userData?.data?.gender,
   age : userData?.data?.dob
  ? `${differenceInYears(new Date(), parseISO(userData.data.dob))} Years`: null, 
  city: userData?.data?.city,
 state: userData?.data?.state,
 country: userData?.data?.country,
 postalCode: userData?.data?.zip_code,
 preferredLanguage: userData?.data?.pref_language,

});
const [newCompany, setNewCompany] = useState({
  specialization:userData?.data?.specialization,
  experience:userData?.data?.experience,
  noOfConsultations:userData?.data?.  no_of_consultations,
  license_type: userData?.data?.license_type,
  licenseNumber: userData?.data?.license_no,
  issuingAuthority: userData?.data?.issuing_authority,
  expiryDate: userData?.data?.expiry_date,
  accreditation: userData?.data?.accreditations,
 

});


const handleAccountChange = (e) => {
  const { name, value } = e.target;
  setAccountSettings((prev) => ({
    ...prev,
    [name]: value,
  }));
}


const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedFile(file);
    setUserImage(URL.createObjectURL(file)); 
  }
};

const handleImageUpload = async () => {
  if (!selectedFile) {
    Swal.fire("No Image Selected", "Please select an image to upload.", "warning");
    return;
  }

  if (!token) {
    Swal.fire("Authentication Error", "No token found. Please log in.", "error");
    return;
  }

  const formData = new FormData();
  formData.append("prof_pics", selectedFile);

  try {
    const response = await axios.post(APIURLS.APIURLDOCTORAVATAR, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.message) {
      Swal.fire("Success", response.data.message, "success");
      const existingUserData = JSON.parse(localStorage.getItem("user_data")) || {};

      const updatedUserData = {
        ...existingUserData,      
        data: {
          ...existingUserData.data, 
          prof_pics: response.data.prof_pics , 
        },
      };
    

  
      console.log("Merged Data:", updatedUserData);

  localStorage.setItem("user_data", JSON.stringify(updatedUserData));

      const updatedUserDataFromStorage = JSON.parse(localStorage.getItem("user_data"));
      const newProfPics = updatedUserDataFromStorage?.data?.prof_pics;
      
      setUserImage(newProfPics ? `${defaultUrl}${newProfPics}` : defaultUserImage);
      console.log("Merged Data:", updatedUserData);

      localStorage.setItem("user_data", JSON.stringify(updatedUserData));

      setUserImage(`${defaultUrl}${response.data.prof_pics}`);
      setSelectedFile(null);


      setSelectedFile(null);
    } else {
      Swal.fire("Upload Failed", "Something went wrong, please try again.", "error");
    }
  } catch (error) {
    console.error("Error during upload:", error);
    Swal.fire(
      "Upload Failed",
      error.response?.data?.message || "An error occurred while uploading the image.",
      "error"
    );
  }
};

useEffect(() => {
  return () => {
    if (selectedFile) {
      URL.revokeObjectURL(userImage); 
    }
  };
}, [selectedFile, userImage]);



 const handlePasswordChange = async (e) => {
    e.preventDefault();
  
    // Validate input fields
    if (!formData.oldpassword || !formData.password || !formData.password_confirmation) {
      Swal.fire("Error", "All fields are required.", "error");
      return;
    }
  
    if (formData.password !== formData.password_confirmation) {
      Swal.fire("Error", "New passwords do not match.", "error");
      return;
    }
  
    try {
      // Prepare data to send
      const passwordChangeData = {
        oldpassword: formData.oldpassword,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      };
  
      // API URL
      const apiUrl = APIURLS.APIURLDOCTORSCHANGEPASSWORD;
  
      // Debugging: Log the variables
      console.log("Password Change Data:", passwordChangeData);
      console.log("API URL:", apiUrl);
      console.log("Authorization Token:", token);
  
      // Make the request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordChangeData),
      });
  
      // Debugging: Log the raw response
      console.log("Raw Response:", response);
  
      // Get response text
      const text = await response.text();
      console.log("Raw Response Text:", text);
  
      // Parse JSON if response is not empty
      const data = text ? JSON.parse(text) : {};
  
      // Check for errors in response
      if (!response.ok) {
        throw new Error(data.message || "Failed to change password.");
      }
  
      // Success message
      Swal.fire("Success", "Password changed successfully.", "success");
      window.location.href = '/auth-login';

    } catch (err) {
      // Handle errors
      console.error("Error during password change:", err);
      Swal.fire("Error", err.message || "An unexpected error occurred.", "error");
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
    <SideBarMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}   menuItems={PATIENTSIDEBARMENU}/>

      {/* Main Content */}
      <div className={`flex-1 ml-${isSidebarOpen ? '64' : '0 sm:ml-20'}  transition-all duration-300`}>

        {/* Topbar */}
       <PatientHeader/>


        {/* Dashboard Content */}
        <main className="p-6 bg-gray-100 flex-grow">
          <div className='   sm:flex justify-between mb-0'>
          <div className=' mb-4'>
             

            </div>
   
          </div>
          {/* main contnent */}
        
      <main className="px-0 py-8 md:p-6 bg-gray-100 flex-grow -mt-9">
          <div className="mb-4">
            <div className="font-bold text-[24px] italic capitalize flex ml-2 mb-4">
              <p>My profile</p>
            </div>

            <div className="block lg:flex justify-between space-x-3 w-full mt-4 lg:mt-0 rounded-xl">
              <div className="rounded-3xl lg:mt-3 lg:w-3/12 shadow-xl ml-3 bg-white items-center mx-auto my-auto p-8 ">
              <div className="relative w-[120px] h-[120px] mx-auto ">
  <img
 src={userImage || defaultUserImage}
     alt="Profile"
    className="w-[120px] h-[120px] rounded-full object-cover"
  />
  <div> 
  <label htmlFor="prof_pics" className="block text-center cursor-pointer text-primary">
  <HiPencilAlt className="absolute top-0 right-0 bg-white p-1 rounded-full text-primary cursor-pointer" size={30} />
</label>
<input
        type="file"
        id="prof_pics"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          handleImageChange(e);
        }}
      />

<button 
  type="button" 
  className={`mt-5 w-full text-white py-1 rounded-md ${selectedFile ? 'bg-primary border-secondary hover:bg-secondary' : 'bg-secondary border-primary hover:bg-primary'}`}
  onClick={selectedFile ? handleImageUpload : () => document.getElementById('prof_pics').click()} 
>
  {selectedFile ? 'Submit Image' : 'Change Image'}
</button>


  </div>
  
</div>

               
                <div className="mt-[70px] text-center">
                  <p className="font-bold">{fullName}</p>
                  <p className="text-primary font-semibold">{ehr}</p>

                  <p className="text-primary font-semibold">{userEmail}</p>
                 
                
                  
                </div>
              </div>
<div className="lg:w-9/12 shadow-xl ml-3 bg-white rounded-3xl p-3 mt-5 lg:mt-0 " >
<div className="flex items-center border-b">
  <div className="flex space-x-1 font-semibold">
    <button
      className={`py-2 px-2 ${activeTab === 'account' ? 'border-b-2 border-primary' : ''}`}
      onClick={() => setActiveTab('account')}
    >
      Settings
    </button>

    <button
      className={`py-2 px-2 ${activeTab === 'company' ? 'border-b-2 border-primary' : ''}`}
      onClick={() => setActiveTab('company')}
    >
      Records
    </button>
    <button
      className={`py-2 px-2 ${activeTab === 'password' ? 'border-b-2 border-primary' : ''}`}
      onClick={() => setActiveTab('password')}
    >
      Change Password
    </button>
  </div>

</div>


                {activeTab === 'account' && (
                  <div className="p-4">
                    {/* <h3 className="text-lg font-bold mb-4">Settings</h3> */}
                    <form>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {Object.keys(accountSettings).map((field) => (
      <div key={field} className="flex flex-col">
        <label className="font-semibold capitalize">
          {field
            .replace(/_/g, ' ')
            .replace(/([A-Z])/g, ' $1') 
            .trim()} 
        </label>
        <input
          type="text"
          name={field}
          value={accountSettings[field]}
          onChange={handleAccountChange}
          className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded-r-lg leading-tight focus:outline-none focus:ring-blue-500   flex-shrink-0 w-full lg:w-10/12 p-2.5 z-20 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 no-arrows" readOnly
        />
      </div>
    ))}
  </div>
</form>

                  </div>
                )}

                {activeTab === 'company' && (
                  <div className="p-4">
                    {/* <h3 className="text-lg font-bold mb-4">Records</h3> */}
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                      {Object.keys(newCompany).map((field) => (
                        <div key={field} className="flex flex-col">
                          <label className="font-semibold capitalize"> {field .replace(/_/g, ' ') .replace(/([A-Z])/g, ' $1') .trim()} </label>
                          <input
                            type="text"
                            name={field}
                            value={newCompany[field]}
                            readOnly
                            onChange={(e) => setNewCompany({ ...newCompany, [e.target.name]: e.target.value })}
  className="capitalize appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded-r-lg leading-tight focus:outline-none focus:ring-blue-500   flex-shrink-0 w-full md:w-10/12 p-2.5 z-20 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 no-arrows"/>
                        </div>
                      ))}
                    </div>
                   
                  </div>
                )}

{activeTab === 'password' && (
                  <div className="p-4">
                
                <div className=" justify-center w-full lg:w-11/12 mx-auto   items-center space-y-4">
       <form className="" autoComplete="off" onSubmit={handlePasswordChange}>     
        <div className='my-3'>
                    <p className="text-gray-600  w-full lg:w-10/12 mx-auto">Old Password</p>
                    <input
                  type="password"
                  id="password"
                  name="oldpassword"
                  required
                  value={formData.oldpassword || ""}
                  onChange={handleChange}
                  className="   lg:w-10/12 mx-auto block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none"
                  placeholder="Enter your password"
                />                  </div>
                  <div className='flex flex-col  w-full lg:w-10/12 mx-auto my-3' >
                    <p className="text-gray-600 ">New Password</p>
                    <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password || ""}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none"
                  placeholder="Enter your password"
                />                  </div>
                  <div className=' w-full lg:w-10/12 mx-auto my-3'> 
                    <p className="text-gray-600">Confirm Password</p>
                    <input
                  type="password"
                  id="password"
                  name="password_confirmation"
                  
                  value={formData.password_confirmation || ""}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none"
                  placeholder="Enter your password"
                />                  </div>
               <div className="w-full lg:w-10/12 mx-auto mt-5 flex justify-center">
    <button
      type="submit"
      className="bg-primary text-white py-2 px-4 rounded-xl w-full sm:w-9/12 lg:w-11/12"
    >
      Save
    </button>
  </div>
     </form>
       </div>
                   
                  </div>
                )}      
                {(activeTab === 'company' || activeTab === 'account') && (
  <button 
    className="py-2 px-4 ml-auto flex justify-end mr-4 bg-secondary text-white rounded-xl mb-2" 
    onClick={() => navigate('/doctor/onboarding')}
  >
    Edit Profile
  </button>
)}

                        </div>

                        
            </div>
          </div>
        </main>


        </main>
      </div>
    </div>
  );
};

export default Settings;
