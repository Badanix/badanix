import  { useState } from 'react';

const RegistrationForm = () => {
  const [userType, setUserType] = useState('');
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(true);

  // Handle user type selection
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setShowUserTypeSelector(false); // Hide the selector once a user type is selected
  };

  // Go back to user type selection
  const handleGoBack = () => {
    setUserType('');
    setShowUserTypeSelector(true); // Show the selector again
  };

  // Handle input changes for form fields
  const handleInputChange = () => {
    // Form data handling logic
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data logic
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold flex-grow">
          {userType ? `Register as ${userType.charAt(0).toUpperCase() + userType.slice(1)}` : 'Registration Form'}
        </h2>
        {!showUserTypeSelector && (
          <button onClick={handleGoBack} className="text-blue-500 hover:text-blue-700">
            ← Back
          </button>
        )}
      </div>

      {showUserTypeSelector ? (
        // User type selection
        <div className="mb-4">
          <label className="block text-gray-700">Select User Type:</label>
          <select
            value={userType}
            onChange={handleUserTypeChange}
            className="mt-2 p-2 border rounded w-full"
          >
            <option value="">Choose User Type</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="patient">Patient</option>
          </select>
        </div>
      ) : (
        // Registration form based on user type
        <form onSubmit={handleSubmit}>
          {userType === 'doctor' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Specialization:</label>
                <input
                  type="text"
                  name="specialization"
                  onChange={handleInputChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </div>
            </>
          )}

          {userType === 'pharmacy' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Pharmacy Name:</label>
                <input
                  type="text"
                  name="pharmacyName"
                  onChange={handleInputChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">License Number:</label>
                <input
                  type="text"
                  name="licenseNumber"
                  onChange={handleInputChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </div>
            </>
          )}

          {userType === 'patient' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Full Name:</label>
                <input
                  type="text"
                  name="patientFullName"
                  onChange={handleInputChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Age:</label>
                <input
                  type="number"
                  name="age"
                  onChange={handleInputChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
