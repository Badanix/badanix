import { useState, useEffect } from "react";

const useLiveLocation = () => {
  const [location, setLocation] = useState(null); 
  const [coords, setCoords] = useState(null); 
  const [error, setError] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false); // Track if permission is granted

  const apiKey = "AIzaSyBV8aWcavsOPULlDWzUpw2Ke7zeiD0pSSk"; // Replace with your Google API Key

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    // Check if location is empty and trigger geolocation request
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          setPermissionGranted(true); // Permission granted

          try {
            // Make request to Geocoding API
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const data = await response.json();

            console.log("Geocoding API response:", data); // Log the response for debugging

            if (data.status === "OK" && data.results.length > 0) {
              setLocation(data.results[0].formatted_address);
            } else {
              setError("Unable to retrieve address from coordinates.");
            }
          } catch (err) {
            setError("Error fetching address: " + err.message);
          }
        },
        (err) => {
          setPermissionGranted(false); // If permission denied or error occurred
          setError(err.message || "Unable to retrieve your location.");
        }
      );
    }
  }, [location, apiKey]);

  // If location is empty, prompt the user to allow location access
  useEffect(() => {
    if (location === null && !permissionGranted) {
      setError("Please grant location access to retrieve your current location.");
    }
  }, [location, permissionGranted]);

  return { location, coords, error };
};

export default useLiveLocation;
