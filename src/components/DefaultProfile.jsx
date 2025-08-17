import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Swal from "sweetalert2";

import axios from "axios";

// import { FaArrowTrendUp } from 'react-icons/fa6';
import { APIURLS, defaultUrl, NAMES } from "./Constants";
import { HiPencilAlt } from "react-icons/hi";
import { getUserData } from "./Helper";

const DefaultProfile = ({ initialAccountSettings }) => {
  const userData = getUserData();

  const walletBalance = NAMES.WALLETBALANCE;
  const currencySymbol = NAMES.NairaSymbol;
  const fullName = userData?.data?.institution_name;
  const userEmail = userData?.data?.email;
  // const title =NAMES.TITLE ;
  const prof_pics = userData?.data?.logo;

  const [activeTab, setActiveTab] = useState("account");
  const [accountSettings, setAccountSettings] = useState(
    initialAccountSettings || {
      institution_name: userData?.data?.institution_name,
      email: userData?.data?.email,
      phoneNumber: userData?.data?.phone,
      Electronic_Health_Record: userData?.data?.ehr,
      address: userData?.data?.address,
      city: userData?.data?.city,
      state: userData?.data?.state,
      country: userData?.data?.country,
      // postalCode: userData?.data?.zip_code,
    }
  );
  const [newCompany, setNewCompany] = useState({
    license_type: userData?.data?.license_type,
    license_no: userData?.data?.license_no,
    issuing_authority: userData?.data?.issuing_authority,
    expiry_date: userData?.data?.expiry_date,
    accreditation: userData?.data?.accreditations,
    institution_type: userData?.data?.institution_type,
  });

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountSettings((prev) => ({ ...prev, [name]: value }));
  };
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      Swal.fire(
        "No Image Selected",
        "Please select an image to upload.",
        "warning"
      );
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire(
        "Authentication Error",
        "No token found. Please log in.",
        "error"
      );
      return;
    }

    const formData = new FormData();
    formData.append("prof_pics", imageFile);

    try {
      console.log("Uploading image..."); // Log when starting upload
      const response = await axios.post(
        APIURLS.APIURLINSTITUTIONAVATAR,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response); // Log the full response

      // Check if response contains a success message
      if (response && response.data && response.data.message) {
        Swal.fire("Success", response.data.message, "success");
      } else {
        Swal.fire(
          "Upload Failed",
          "Something went wrong, please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error during image upload:", error); // Log the error
      Swal.fire(
        "Upload Failed",
        error.response?.data?.message ||
          "An error occurred while uploading the image.",
        "error"
      );
    }
  };

  return (
    <main className="p-6 bg-gray-100 flex-grow -mt-9">
      <div className="mb-4">
        <div className="font-bold text-[24px] italic capitalize flex ml-2 mb-4">
          <p>My profile</p>
        </div>

        <div className="block sm:flex justify-between space-x-3 w-full">
          <div className="md:w-3/12 shadow-xl ml-3 bg-white items-center mx-auto my-auto p-8 rounded-md">
            <div className="relative w-[120px] h-[120px] mx-auto">
              <img
                src={`${defaultUrl}${prof_pics}`}
                alt="Profile"
                className="w-[120px] h-[120px] rounded-full"
              />
              <div>
                {/* <label
                  htmlFor="prof_pics"
                  className="block text-center cursor-pointer text-primary"
                >
                  <HiPencilAlt
                    className="absolute top-0 right-0 bg-white p-1 rounded-full text-primary cursor-pointer"
                    size={30}
                  />
                </label> */}
                <input
                  type="file"
                  id="prof_pics"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                    handleImageUpload();
                  }}
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="font-bold">{fullName}</p>
              <p className="text-primary font-semibold">{userEmail}</p>
            </div>
          </div>

          <div className="md:w-9/12 shadow-xl ml-3 bg-white rounded-xl p-3">
            <div className="flex space-x-4 border-b">
              <button
                className={`py-2 px-4 ${
                  activeTab === "account" ? "border-b-2 border-primary" : ""
                }`}
                onClick={() => setActiveTab("account")}
              >
                Account Settings
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "company" ? "border-b-2 border-primary" : ""
                }`}
                onClick={() => setActiveTab("company")}
              >
                Company Documents
              </button>
            </div>

            {activeTab === "account" && (
              <div className="p-4">
                <h3 className="text-lg font-bold mb-4">Account Settings</h3>
                <form>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(accountSettings).map((field) => (
                      <div key={field} className="flex flex-col">
                        <label className="font-semibold capitalize">
                          {field
                            .replace(/_/g, " ")
                            .replace(/([A-Z])/g, " $1")
                            .trim()}
                        </label>
                        <input
                          type="text"
                          name={field}
                          value={accountSettings[field]}
                          onChange={handleAccountChange}
                          className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded-r-lg leading-tight focus:outline-none focus:ring-blue-500   flex-shrink-0 w-10/12 p-2.5 z-20 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 no-arrows"
                          readOnly
                        />
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            )}

            {activeTab === "company" && (
              <div className="p-4">
                <h3 className="text-lg font-bold mb-4">Company Documents</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(newCompany).map((field) => (
                    <div key={field} className="flex flex-col">
                      <label className="font-semibold capitalize">
                        {" "}
                        {field
                          .replace(/_/g, " ")
                          .replace(/([A-Z])/g, " $1")
                          .trim()}{" "}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={newCompany[field]}
                        readOnly
                        onChange={(e) =>
                          setNewCompany({
                            ...newCompany,
                            [e.target.name]: e.target.value,
                          })
                        }
                        className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded-r-lg leading-tight focus:outline-none focus:ring-blue-500   flex-shrink-0 w-10/12 p-2.5 z-20 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 no-arrows"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add other tabs content similarly */}
          </div>
        </div>
      </div>
    </main>
  );
};

// PropTypes validation
DefaultProfile.propTypes = {
  officeName: PropTypes.string,
  initialAccountSettings: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    postalCode: PropTypes.string,
  }).isRequired,
  initialCompanyDetails: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postalCode: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DefaultProfile;
