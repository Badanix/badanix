import { useState } from "react";
import axios from "axios";
import { PATIENTSIDEBARMENU, NAMES, TOPBARMENU, APIURLS } from "../../../../components/Constants";
import SideBarMenu from "../../../../components/SideBarMenu";
import UseSideBarMenu from "@hooks/UseSideBarMenu";
import TopBar from "../../../../components/TopBar";

import UseTopMenu from "../../../../hooks/UseTopMenu";

import countries from '../../../../components/country.json'; 
import Swal from "sweetalert2";
import { parse,differenceInYears } from "date-fns";
import PatientHeader from "../../../partials/PatientHeader";
const OnBoarding = () => {
  const userImage = NAMES.userImage;
  const siteTitle = NAMES.SITE_TITLE;
  const APIPatientOnboarding = APIURLS.APIPatientOnboarding;
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const { profileDropdownOpen, toggleTopbar } = UseTopMenu();
  const [errorMessage, setErrorMessage] = useState('');

  const [currentStep, setCurrentStep] = useState(1);
  // const [formData, setFormData] = useState({
  //   dob: "",
  //   gender: "",
  //   pref_language: "",
  //   phone: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   country: "",
  //   zipcode: "",
  //   name_insurance_provider: "",
  //   type_insurance_provider: "",
  //   policy_number: "",
  //   insurance_coverage: "",
  //   insurance_validity_period: "",
  //   weight: "",
  //   height: "",
  //   exercise_routine: "",
  //   nutrition_plan: "",
  //   smoking_habbits: "",
  //   alcohol_consumption: "",
  //   sleep_pattern: "",
  //   blood_type: "",
  //   name_primary_physician: "",
  //   existing_med_condition: "",
  //   current_medication: "",
  //   allergies: "",
  //   past_surgeries: "",
  //   chronic_illness: "",
  //   mental_health: "",
  //   family_health_history: "",
  // });

  const [formData, setFormData] = useState({
  dob: "1990-01-01",
  gender: "Male",
  pref_language: "English",
  phone: "+1234567890",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  country: "USA",
  zipcode: "10001",
  name_insurance_provider: "HealthPlus",
  type_insurance_provider: "Private",
  policy_number: "HP-987654321",
  insurance_coverage: "Full",
  insurance_validity_period: "2025-12-31",
  weight: "70",
  height: "175",
  exercise_routine: "3 times a week",
  nutrition_plan: "Balanced diet",
  smoking_habbits: "Non-smoker",
  alcohol_consumption: "Occasionally",
  sleep_pattern: "7-8 hours per night",
  blood_type: "O+",
  name_primary_physician: "Dr. John Doe",
  existing_med_condition: "Hypertension",
  current_medication: "Atenolol",
  allergies: "Peanuts",
  past_surgeries: "Appendectomy (2010)",
  chronic_illness: "None",
  mental_health: "Stable",
  family_health_history: "Diabetes, Heart Disease",
});

  const handleNext = () => {
    if (currentStep < 30) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const languages = ["Mandarin", "English", "French", "Español"];
  const exerciseRoutines = ["Regularly", "Irregularly"];
  const sleepPatterns = ["Less than 4 hours", "4-6 hours", "6-8 hours", "More than 8 hours"];
  const habits = ["Never", "Occasionally", "Regularly"];
  const alcholConsumption = ["Never", "Occasionally", "Regularly"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'No token found',
        text: 'Please log in.',
      });
      return;
    }
    if (formData.dob) {
      const dob = parse(formData.dob, 'yyyy-MM-dd', new Date()); 
      
      const today = new Date();
      
      const age = differenceInYears(today, dob);
      
      if (age < 16) {
        Swal.fire({
          icon: 'error',
          title: 'Age Restriction',
          text: 'User must be 16 and above.',
        });
        return;
      }
    }
   
    for (let field in formData) {
      if ( !formData[field]) {
        Swal.fire({
          icon: 'warning',
          title: 'Missing Fields',
          text: `Please fill in the ${field} field.`,
        });
        return;
      }
    }

    try {
      const response = await axios.put(
        APIPatientOnboarding,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setErrorMessage('');
      Swal.fire({
        icon: 'success',
        title: 'Profile updated successfully!',
        text: response.data.message || 'Your profile has been updated.',
      });
      window.location.href = '/patients/PatientImageUpload';

      console.log(response.data);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      Swal.fire({
        icon: 'error',
        title: 'Failed to update profile',
        text: 'Please try again.',
      });
    }
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
           className={`flex-1 ml-${isSidebarOpen ? "64" : "0 sm:ml-20"} transition-all duration-300`}
         >
           {/* Topbar */}
           <PatientHeader/>
   
        {/* Dashboard Content */}
        <main className="p-6 bg-gray-100 flex-grow">
        <div className="text-center  mt-[90px] md:mt-9">
            <h4 className="text-2xl md:text-3xl font-[400] font-playwrite-gb-s ">
              Help <span className="text-secondary text-xl md:text-3xl font-bold">{siteTitle}</span> know you more!
            </h4>
          <form onSubmit={handleSubmit}  className="mt-5 md:mt-12 bg-white shadow-md rounded-md w-12/12 md:w-9/12 mx-auto p-8"
            >
          {errorMessage && <div className="text-red-500 text-center whitespace-nowrap overflow-hidden overflow-ellipsis">{errorMessage}</div>}
            {/* Step 1: Date of Birth */}
            {currentStep === 1 && (
              <div className="flex flex-col">
                <label htmlFor="dob" className="block text-gray-700  mb-2 font-medium capitalize">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 2: Gender */}
            {currentStep === 2 && (
              <div className="flex flex-col">
                <label htmlFor="gender" className="font-medium capitalize mb-1">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
                <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 3: Preferred Language */}
            {currentStep === 3 && (
              <div className="flex flex-col">
                <label htmlFor="pref_language" className="font-medium capitalize mb-1">Preferred Language</label>
                <select
                  id="pref_language"
                  name="pref_language"
                  value={formData.pref_language}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                >
                  <option value="">Select Preferred Language</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 4: Phone */}
            {currentStep === 4 && (
              <div className="flex flex-col">
                <label htmlFor="phone" className="font-medium capitalize mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter your phone number"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 5: Address */}
            {currentStep === 5 && (
              <div className="flex flex-col">
                <label htmlFor="address" className="font-medium capitalize mb-1">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter your address"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 6: City */}
            {currentStep === 6 && (
              <div className="flex flex-col">
                <label htmlFor="city" className="font-medium capitalize mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter your city"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 7: State */}
            {currentStep === 7 && (
              <div className="flex flex-col">
                <label htmlFor="state" className="font-medium capitalize mb-1">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter your state"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 8: Country */}
            {currentStep === 8 && (
              <div className="flex flex-col">
                <label htmlFor="country" className="font-medium capitalize mb-1">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                >
                  <option value="" disabled>Select your country</option>
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.value}
                    </option>
                  ))}
                </select>
                <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 9: Zipcode */}
            {currentStep === 9 && (
              <div className="flex flex-col">
                <label htmlFor="zipcode" className="font-medium capitalize mb-1">Zipcode</label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter your zipcode"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 10: Insurance Provider Name */}
            {currentStep === 10 && (
              <div className="flex flex-col">
                <label htmlFor="name_insurance_provider" className="font-medium capitalize mb-1">Insurance Provider Name</label>
                <input
                  type="text"
                  id="name_insurance_provider"
                  name="name_insurance_provider"
                  value={formData.name_insurance_provider}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter insurance provider name"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 11: Type of Insurance Provider */}
            {currentStep === 11 && (
              <div className="flex flex-col">
                <label htmlFor="type_insurance_provider" className="font-medium capitalize mb-1">Type of Insurance Provider</label>
                <input
                  type="text"
                  id="type_insurance_provider"
                  name="type_insurance_provider"
                  value={formData.type_insurance_provider}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter type of insurance provider"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 12: Insurance Policy Number */}
            {currentStep === 12 && (
              <div className="flex flex-col">
                <label htmlFor="policy_number" className="font-medium capitalize mb-1">Policy Number</label>
                <input
                  type="number"
                  id="policy_number"
                  name="policy_number"
                  value={formData.policy_number}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter insurance policy number"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 13: Insurance Coverage */}
            {currentStep === 13 && (
              <div className="flex flex-col">
                <label htmlFor="insurance_coverage" className="font-medium capitalize mb-1">Insurance Coverage</label>
                <input
                  type="text"
                  id="insurance_coverage"
                  name="insurance_coverage"
                  value={formData.insurance_coverage}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter insurance coverage details"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 14: Insurance Validity */}
            {currentStep === 14 && (
              <div className="flex flex-col">
                <label htmlFor="insurance_validity_period" className="font-medium capitalize mb-1">Insurance Validity Period</label>
                <input
                  type="date"
                  id="insurance_validity_period"
                  name="insurance_validity_period"
                  value={formData.insurance_validity_period}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter insurance validity period"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 15: Weight */}
            {currentStep === 15 && (
              <div className="flex flex-col">
                <label htmlFor="weight" className="font-medium capitalize mb-1">Weight</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter your weight"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 16: Height */}
            {currentStep === 16 && (
              <div className="flex flex-col">
                <label htmlFor="height" className="font-medium capitalize mb-1">Height</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter your height"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 17: Exercise Routine */}
            {currentStep === 17 && (
              <div className="flex flex-col">
                <label htmlFor="exercise_routine" className="font-medium capitalize mb-1">Exercise Routine</label>
                <select
                  id="exercise_routine"
                  name="exercise_routine"
                  value={formData.exercise_routine}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                >
                  <option value="">Describe your exercise routine</option>
                  {exerciseRoutines.map((exercise) => (
                    <option key={exercise} value={exercise}>{exercise}</option>
                  ))}
                </select>
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 18: Nutrition Plan */}
            {currentStep === 18 && (
              <div className="flex flex-col">
                <label htmlFor="nutrition_plan" className="font-medium capitalize mb-1">Nutrition Plan</label>
                <input
                  type="text"
                  id="nutrition_plan"
                  name="nutrition_plan"
                  value={formData.nutrition_plan}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Describe your nutrition plan"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 19: Smoking Habits */}
            {currentStep === 19 && (
              <div className="flex flex-col">
                <label htmlFor="smoking_habbits" className="font-medium capitalize mb-1">Smoking Habits</label>
                <select
                  id="smoking_habbits"
                  name="smoking_habbits"
                  value={formData.smoking_habbits}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                >
                  <option value="">Describe your smoking habits</option>
                  {habits.map((habit) => (
                    <option key={habit} value={habit}>{habit}</option>
                  ))}
                </select>
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 20: Alcohol Consumption */}
            {currentStep === 20 && (
              <div className="flex flex-col">
                <label htmlFor="alcohol_consumption" className="font-medium capitalize mb-1">Alcohol Consumption</label>
                <select
                  id="alcohol_consumption"
                  name="alcohol_consumption"
                  value={formData.alcohol_consumption}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                >
                  <option value="">Describe your alcohol consumption</option>
                  {alcholConsumption.map((habit) => (
                    <option key={habit} value={habit}>{habit}</option>
                  ))}
                </select>
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 21: Sleep Pattern */}
            {currentStep === 21 && (
              <div className="flex flex-col">
                <label htmlFor="sleep_pattern" className="font-medium capitalize mb-1">Sleep Pattern</label>
                <select
                  id="sleep_pattern"
                  name="sleep_pattern"
                  value={formData.sleep_pattern}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                >
                  <option value="">Describe your sleep pattern</option>
                  {sleepPatterns.map((sleep) => (
                    <option key={sleep} value={sleep}>{sleep}</option>
                  ))}
                </select>
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 22: Blood Type */}
            {currentStep === 22 && (
              <div className="flex flex-col">
                <label htmlFor="blood_type" className="font-medium capitalize mb-1">Blood Type</label>
                <select
                  id="blood_type"
                  name="blood_type"
                  value={formData.blood_type}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                >
                  <option value="">Select Blood Type</option>
                  {bloodTypes.map((bloodType) => (
                    <option key={bloodType} value={bloodType}>{bloodType}</option>
                  ))}
                </select>
                <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 23: Name of Primary Physician */}
            {currentStep === 23 && (
              <div className="flex flex-col">
                <label htmlFor="name_primary_physician" className="font-medium capitalize mb-1">Name of Primary Physician</label>
                <input
                  type="text"
                  id="name_primary_physician"
                  name="name_primary_physician"
                  value={formData.name_primary_physician}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter primary physician's name"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 24: Existing Medical Conditions */}
            {currentStep === 24 && (
              <div className="flex flex-col">
                <label htmlFor="existing_med_condition" className="font-medium capitalize mb-1">Existing Medical Conditions</label>
                <input
                  type="text"
                  id="existing_med_condition"
                  name="existing_med_condition"
                  value={formData.existing_med_condition}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Describe any existing medical conditions"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 25: Current Medication */}
            {currentStep === 25 && (
              <div className="flex flex-col">
                <label htmlFor="current_medication" className="font-medium capitalize mb-1">Current Medication</label>
                <input
                  type="text"
                  id="current_medication"
                  name="current_medication"
                  value={formData.current_medication}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter your current medication"
                />
                 <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 26: Allergies */}
            {currentStep === 26 && (
              <div className="flex flex-col">
                <label htmlFor="allergies" className="font-medium capitalize mb-1">Allergies</label>
                <input
                  type="text"
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter your allergies"
                /> 
                <div className="flex justify-between mt-4">
                 <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 27: Past Surgeries */}
            {currentStep === 27 && (
              <div className="flex flex-col">
                <label htmlFor="past_surgeries" className="font-medium capitalize mb-1">Past Surgeries</label>
                <input
                  type="text"
                  id="past_surgeries"
                  name="past_surgeries"
                  value={formData.past_surgeries}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter any past surgeries"
                />  <div className="flex justify-between mt-4">
                <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 28: Chronic Illness */}
            {currentStep === 28 && (
              <div className="flex flex-col">
                <label htmlFor="chronic_illness" className="font-medium capitalize mb-1">Chronic Illness</label>
                <input
                  type="text"
                  id="chronic_illness"
                  name="chronic_illness"
                  value={formData.chronic_illness}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter any chronic illnesses"
                />  
                <div className="flex justify-between mt-4">
                <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
              </div>
            )}

            {/* Step 29: Mental Health */}
            {currentStep === 29 && (
              <div className="flex flex-col">
                <label htmlFor="mental_health" className="font-medium capitalize mb-1">Mental Health</label>
                <input
                  type="text"
                  id="mental_health"
                  name="mental_health"
                  value={formData.mental_health}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter mental health history"
                />  <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                  disabled={currentStep === 1}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-primary text-white py-2 px-4 rounded-md"
                >
                  Next
                </button>
              </div>
              </div>
            )}

            {/* Step 30: Family Health History */}
            {currentStep === 30 && (
              <div className="flex flex-col">
                <label htmlFor="family_health_history" className="font-medium capitalize mb-1">Family Health History</label>
                <input
                  type="text"
                  id="family_health_history"
                  name="family_health_history"
                  value={formData.family_health_history}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter your family health history"
                />
                 <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                      disabled={currentStep === 1}
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-white py-2 px-4 rounded-md"
                    >
                      Submit
                    </button>
                  </div>
              </div>
            )}

         
          </form>
          </div>

        </main>
      </div>
    </div>
  );
};

export default OnBoarding;
