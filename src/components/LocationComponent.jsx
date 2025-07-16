import { useState } from "react";
import useLocation from "../hooks/useLocation"; // Import the custom hook
import { FiMapPin } from "react-icons/fi"; // Location icon from react-icons

const LocationComponent = () => {
  const { location, address, currencySymbol, error, getLocationByIP } = useLocation();
  const [manualInput, setManualInput] = useState("");

  const handleManualSubmit = (e) => {
    e.preventDefault();
    // Handle manual location (you can expand this logic to support manual address input)
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <FiMapPin className="text-4xl text-green-500 mb-4" />
      <h2 className="text-xl font-semibold">What is your location?</h2>
      <p className="text-gray-600">We need to know your location in order to suggest nearby services.</p>

      {/* Display current location if available */}
      {location && (
        <div className="mt-4">
          <p className="text-green-600">
            <strong>Your current location:</strong>
            {`${location.city}, ${location.region}, ${location.country}`}
          </p>
          {currencySymbol && (
            <p className="text-blue-600">
              <strong>Currency:</strong> {currencySymbol}
            </p>
          )}
          {address && (
            <p className="text-blue-600">
              <strong>Full Address:</strong> {address}
            </p>
          )}
        </div>
      )}

      {/* Display error if location access failed */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Button to allow location access via IP */}
      <button
        onClick={getLocationByIP}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-6"
      >
        Allow Location Access via IP
      </button>

      {/* Divider */}
      <p className="mt-4 text-gray-500">or</p>

      {/* Manual input for location */}
      <form onSubmit={handleManualSubmit} className="mt-4">
        <input
          type="text"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          placeholder="Enter your address manually"
          className="border p-2 rounded-lg w-full text-center"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
        >
          Set Location Manually
        </button>
      </form>
    </div>
  );
};

export default LocationComponent;
