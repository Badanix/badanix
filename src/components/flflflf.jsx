import { NAMES, PATIENTSIDEBARMENU} from '../../../../components/Constants';
import SideBarMenu from '../../../../components/SideBarMenu';
import UseSideBarMenu from '../../../../hooks/UseSideBarMenu';

import { FaPencilAlt } from 'react-icons/fa';
import { useState } from 'react'; // Import useState to manage edit state
import PatientHeader from '../../../partials/PatientHeader';
import { getUserData } from '../../../../components/Helper';
import Swal from 'sweetalert2';

const Settings = () => {
  const userData= getUserData()

  const defaultUserImage = '/path/to/default-image.jpg'; // Default image path
  const [userImage, setUserImage] = useState(NAMES.userImage || defaultUserImage); // Ensure a default image if userImage is undefined
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();

  // State to track if editing is enabled for each section
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [ formData, setFormData] = useState(true);


  // State to track edited profile values
  const [profileData] = useState({
    name: NAMES.FULLNAME,
    title: 'Team Manager',
    location: 'Leeds, United Kingdom',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Function to handle profile form input changes
  // const handleProfileChange = (e) => {
  //   const { name, value } = e.target;
  //   setProfileData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result); // Set the new image to state
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };

  // Function to handle edit button click
  const handleEditClick = (section) => {
    if (section === 'Profile') {
      setIsEditingProfile(!isEditingProfile); // Toggle the state for Profile section
    } else if (section === 'Personal Information') {
      setIsEditingPersonalInfo(!isEditingPersonalInfo); // Toggle the state for Personal Information section
    } else if (section === 'Address') {
      setIsEditingAddress(!isEditingAddress); // Toggle the state for Address section
    }
  };
  const token = localStorage.getItem('token'); 
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
      const apiUrl = "https://api.digitalhospital.com.ng/api/v1/user/password";
  
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
      setIsEditingProfile(false);
    } catch (err) {
      // Handle errors
      console.error("Error during password change:", err);
      Swal.fire("Error", err.message || "An unexpected error occurred.", "error");
    }
  };
  
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBarMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} menuItems={PATIENTSIDEBARMENU} />

      {/* Main Content */}
      <div className={`flex-1 ml-${isSidebarOpen ? '64' : '0 sm:ml-20'} transition-all duration-300`}>
        {/* Topbar */}
        <PatientHeader/>


        {/* Dashboard Content */}
        <main className="p-6 bg-gray-100 flex-grow">
          <div className="flex-1 p-6">
            {/* My Profile Section */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center">
      <div className="relative">
        <img
          src={userImage}
          alt="User Profile"
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <label
          htmlFor="profileImage"
          className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
        >
          <FaPencilAlt size={12} />
        </label>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <div>
        {isEditingProfile ? (
       <div className="flex flex-row items-center space-y-4">
       <div className="flex flex-row justify-center space-x-9   mx-9 items-center space-y-4">
       <form className="flex justify-center space-x-9" autoComplete="off" onSubmit={handlePasswordChange}>     
        <div>
                    <p className="text-gray-600">Old Password</p>
                    <input
                  type="password"
                  id="password"
                  name="oldpassword"
                  required
                  value={formData.oldpassword || ""}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none"
                  placeholder="Enter your password"
                />                  </div>
                  <div>
                    <p className="text-gray-600">New Password</p>
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
                  <div>
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
                 <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Save
                </button>
     </form>
       </div>
     </div>
     
        ) : (
          <div>
            <h2 className="text-lg font-bold">{profileData.name}</h2>
            <p className="text-gray-600">
              {profileData.title}, {profileData.location}
            </p>
          </div>
        )}
      </div>
    </div>
    <button
      className="text-blue-600 flex items-center"
      onClick={() => handleEditClick('Profile')}
    >
      <FaPencilAlt className="mr-2" /> {isEditingProfile ? 'Save' : 'Edit'}
    </button>
  </div>
</section>


            {/* Personal Information Section */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-bold">Personal Information</h3>
                <button
                  className="text-blue-600 flex items-center"
                  onClick={() => handleEditClick('Personal Information')}
                >
                  <FaPencilAlt className="mr-2" /> {isEditingPersonalInfo ? 'Save' : 'Edit'}
                </button>
              </div>
              {isEditingPersonalInfo ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">First Name</p>
                    <input className="border p-2" defaultValue={userData?.data?.fullname}/>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Name</p>
                    <input className="border p-2" defaultValue="Rahman" />
                  </div>
                  <div>
                    <p className="text-gray-600">Email Address</p>
                    <input className="border p-2" defaultValue={userData?.data?.email} />
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <input className="border p-2" defaultValue={userData?.data?.phone}/>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Full Name</p>
                    <p>{userData?.data?.fullname}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Gender</p>
                    <p>{userData?.data?.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email Address</p>
                    <p>{userData?.data?.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p>{userData?.data?.phone}</p>
                  </div>
                </div>
              )}
            </section>

            {/* Address Section */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-bold">Address</h3>
                <button
                  className="text-blue-600 flex items-center"
                  onClick={() => handleEditClick('Address')}
                >
                  <FaPencilAlt className="mr-2" /> {isEditingAddress ? 'Save' : 'Edit'}
                </button>
              </div>
              {isEditingAddress ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Country</p>
                    <input className="border p-2" defaultValue={userData?.data?.country} />
                  </div>
                  
                  <div>
                    <p className="text-gray-600">State</p>
                    <input className="border p-2" defaultValue={userData?.data?.state} />
                  </div>
                  <div>
                    <p className="text-gray-600"> City</p>
                    <input className="border p-2" defaultValue={userData?.data?.city} />
                  </div>
                  <div>
                    <p className="text-gray-600">Address</p>
                    <input className="border p-2" defaultValue={userData?.data?.address} />
                  </div>
                  <div>
                    <p className="text-gray-600">[Postal/Zip Code]</p>
                    <input className="border p-2" defaultValue={userData?.data?.zipcode} />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Country</p>
                    <p>United Kingdom</p>
                  </div>
                  <div>
                    <p className="text-gray-600">City</p>
                    <p>Leeds, East London</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Postal Code</p>
                    <p>ERT 2354</p>
                  </div>
                  <div>
                    <p className="text-gray-600">TAX ID</p>
                    <p>AS546654</p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
