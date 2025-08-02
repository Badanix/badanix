import AuthHeader from '../../partials/AuthHeader';
// import { IMAGE } from '../../../components/constants';


import { IoIosArrowDown, IoIosArrowUp, IoIosCloseCircle } from "react-icons/io";

import styles from '../../../components/styles';
import {   useState } from 'react';

import countriesData from '../../../components/country.json';
import { useFormValidation } from "./formValidation";
import { IoArrowBackCircle } from 'react-icons/io5';
import { fieldConfigs, UserTypeIcons, UserTypeImage } from '../../../components/Constants';
import AuthChat from '../../../components/AuthChat';
import { Link } from 'react-router-dom';




const AuthPatientRegister = () => {
  const [userType, setUserType] = useState('patient');

  const {
    formData,setErrors,errors,emailSuggestions,handleChange,handleSubmit,getEmailMessage,getEmailMessageClass,handleEmailSuggestionClick,handleFocus,handleBlur,emailInputRef,setActionType} = useFormValidation(true, userType);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countriesData[0]);
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const fields = fieldConfigs[userType] || [];
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentFields = fields.slice(startIndex, endIndex);
  const currentFields = fieldConfigs.patient; // Get only the patient fields


  const validateCurrentPage = () => {
    // Example validation logic; adjust based on your requirements
    const isValid = currentFields.every(field => {
      if (field.required && !formData[field.name]) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [field.name]: 'This field is required',
        }));
        return false;
      }
      setErrors(prevErrors => ({
        ...prevErrors,
        [field.name]: '',
      }));
      return true;
    });
    return isValid;
  };
  
  const handleNext=(e) => {
    if (e) e.preventDefault(); 
    const isValid = validateCurrentPage();

    if (isValid) {
      // Proceed to the next page
      setCurrentPage((prev) => prev + 1);
    } else {
      console.log('Form is not valid. Please correct errors before proceeding.');
    }  }
  // Handler to navigate to the previous page
  const handlePrevious = () => setCurrentPage((prev) => prev - 1);
  

  // Count the buttons to display
  const buttonCount = currentPage > 0 && endIndex < fields.length ? 2 : 1;


  const buttonClasses = (totalButtons) => {
    return totalButtons === 1 
      ? 'w-full p-3 rounded-[20px] bg-transparent border-2 text-primary dark:text-secondary border-primary dark:border-secondary border-b-[9px]  ' 
      : 'w-9/12 p-3 rounded-[20px] bg-transparent border-2 mr-7 text-red-800 primary-border-color border-b-[9px]  mt-9';
  };
  


  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredCountries = countriesData.filter(country =>
    country.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearSearch = () => setSearchQuery("");

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };



 

  const handleGoBack = () => {
    setUserType('');
    setShowUserTypeSelector(true);
    setCurrentPage(0); 
    
  };

 
 
 
  
  
  return (
    <div
    className={`relative w-full min-h-screen bg-cover bg-center `}
  >
      <AuthHeader />
      <main className={styles.mainContainer} >
        <>
        

        <section className={`${styles.mainImage} flex flex-col items-center justify-center h-screen`} >
  {/* Image Section */}
  <div className="flex-grow" >
            <img
              src={UserTypeImage[userType==='patient'] || UserTypeImage.default}
              alt=""
              className='inset-0 w-full max-h-full object-cover -mt-[170px]'
            />
          </div>
          </section>

          <section className={`${styles.mainRegister} relative z-10 ` } >
      <div className='flex justify-between border-b border-gray-200 sm:max-w-[30rem] mr-7 mb-4 text-primary dark:text-secondary'>
      {!showUserTypeSelector && (
              <button onClick={handleGoBack} className="text-blue-500 hover:text-blue-700">
               <IoArrowBackCircle size={24} className='text-primary dark:text-secondary mt-5 sm:mt-4 ' />

              </button>
            )}
     <h1
  className={` ${styles.subHeading} -ml-4 capitalize  text-primary dark:text-secondary`}
>
 Registration Form
</h1>

       
        <span
      className={`text-primary dark:text-secondary ${styles.userImg}`} 
      size={25}
    >
                   {UserTypeIcons.find(icon => icon.type === 'patient').icon}

      </span>
      </div>


        <>
         
        <form  className="w-full max-w-lg" autoComplete="off" onSubmit={handleSubmit}>
  <div className="flex flex-wrap -mx-3 mb-6 mt-9">
    {currentFields.map((field, index) => (
      <div key={index} className="w-full px-3">
        <label
          className="block uppercase tracking-wide text-gray-700 dark:text-white text-[14px] font-bold mb-2 font-[DM Serif Text] font-[500]"
          htmlFor={field.name}
        >
          {field.label}
        </label>

        {field.additionalProps?.countryCode ? (
          <div className="relative w-full mb-6">
            <div className="flex">
              <button
                id="dropdown-button"
                className="w-2/12 mr-1 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-200 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:text-white"
                type="button"
                onClick={toggleDropdown}
              >
                +{selectedCountry["data-mobile_code"]}
                {isDropdownOpen ? <IoIosArrowUp className="ml-2" /> : <IoIosArrowDown className="ml-2" />}
              </button>
              <input
  type="tel"
  id={field.name}
  className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded-r-lg leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-50 flex-shrink-0 w-10/12 p-2.5 z-20 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 no-arrows"
  placeholder={field.placeholder}
  name={field.name}
  value={formData[field.name] || ''} // Ensure formData[field.name] is used here
  onChange={handleChange}
/>

            </div>
            {isDropdownOpen && (
              <div className="absolute mt-1 left-0 w-80 max-h-96 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-600 dark:border-gray-500 overflow-auto">
                <div className="relative px-4 py-2 border-b border-gray-300 dark:border-gray-500">
                  <input
                    type="text"
                    placeholder="Search countries"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-[#a5e6e9] focus:border-[#a5e6e9] focus:bg-[#e8f3f3]"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {searchQuery && (
                    <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={clearSearch}>
                      <IoIosCloseCircle className="text-primary dark:text-secondary  mr-6" size={20} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-1 px-2 py-1">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <button
                        key={country["data-code"]}
                        type="button"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500"
                        onClick={() => selectCountry(country)}
                      >
                        <span className="mr-2">{country["data-mobile_code"]}</span>
                        {country["value"]}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {searchQuery ? "No results found" : "Please enter a search term"}
                    </div>
                  )}
                </div>
              </div>
            )}
            {errors[field.name] && <p className="text-red-500 text-xs italic">{errors[field.name]}</p>}
            {!errors[field.name] && formData[field.name] && (
              <p className="text-green-500 text-xs italic">Your phone number looks good!</p>
            )}
          </div>
        ) : field.renderSuggestions ? (
          <>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type={field.type}
              placeholder={field.placeholder}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={field.name === 'email' ? emailInputRef : null}
            />
            <span className={`block mt-2 text-sm ${getEmailMessageClass()}`}>
              {getEmailMessage()}
            </span>
            {emailSuggestions.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-md bg-white shadow-md">
                {emailSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleEmailSuggestionClick(suggestion)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) :
        (
          <div>
          <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type={field.type}
              placeholder={field.placeholder}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            
            </div>
        )}




  
        {errors[field.name] && <p className="text-red-500 text-xs italic">{errors[field.name]}</p>}
      </div>
    ))}
  </div>
  
  <div className="flex items-center mb-7">
    <input
      type="checkbox"
      name="agreement"
      id="agreement-checkbox"
      className="mr-2"
      checked={formData.agreement}
      onChange={handleChange}
    />
      <p className="text-sm">
      I have read and agree to the{' '}
      <Link to={'/terms'} className="text-primary dark:text-secondary">user agreement</Link> and{' '}
      <Link to={"/privacy"} className="text-primary dark:text-secondary">privacy policy</Link>.
    </p>
  </div>

  <div className="w-full -mt-5 ml-7">
    {!formData.agreement && (
      <p className="text-red-500 text-xs italic">You must agree to the terms and conditions of this agreement</p>
    )}
    
    {formData.agreement && !errors.agreement && (
      <p className="text-green-500 text-xs italic">You have successfully agreed to the terms and conditions</p>
    )}
  </div>

  <div className="flex justify-between mt-4">
    {currentPage > 0 && (
      <button
        type="button"
        className={`${buttonClasses(buttonCount)} bg-gray-300 text-primary dark:text-secondary font-bold py-2 px-4 rounded mx-3`}
        onClick={handlePrevious}
      >
        Previous
      </button>
    )}
    {endIndex < fields.length ? (
      <button
        type="button"
        className={`${buttonClasses(buttonCount)} bg-gray-300 text-primary dark:text-secondary font-bold py-2 px-4 rounded`}
        onClick={handleNext}
      >
        Next
      </button>
    ) : (
      <button
        type="submit"
        className={`${buttonClasses(buttonCount)} text-primary dark:text-secondary bg-gray-300 font-bold py-2 px-4 rounded`} onClick={() => setActionType('register')}
      >
        Submit
      </button>
    )}
  </div>
    {/* Conditional Rendering for Patient */}
    {userType === 'patient' ? (
    <>
      <div className="flex items-center my-9">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">or Sign Up with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="block text-center text-lg text-gray-600 font-[600]">
        <p>
          Already have an account?{' '}
          <a href="auth-login" className="text-primary dark:text-secondary font-[700]">
            Log in
          </a>
        </p>
      </div>
    </>
  ) : (
    <div className="block text-center text-lg text-gray-600 font-[600]">
      <p>
        Already have an account?{' '}
        <a href="auth-login" className="text-primary dark:text-secondary font-[700]">
          Log in
        </a>
      </p>
    </div>
  )}
</form>



        </>
    
    </section>
        </>
      </main>
      <div className="relative">
      
    
      <AuthChat/>


    </div>
    </div>
    
  );
};

export default AuthPatientRegister;
