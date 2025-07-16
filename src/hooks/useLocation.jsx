import { useState, useEffect } from "react";
import useCurrency from "./useCurrency"; 

const useLocation = () => {
  const { getCurrencySymbol } = useCurrency(); 
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState(null);
  const [error, setError] = useState(null);

  const htmlEntityToSymbol = (entity) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = entity; 
    return textarea.value; 
  };

  const getLocationByIP = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      if (data && data.latitude && data.longitude) {
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city,
          region: data.region,
          country: data.country_name,
          currency: data.currency, // Get currency code directly
        });

        // Get the currency symbol using the currency code
        const symbol = getCurrencySymbol(data.currency);
        const readableSymbol = htmlEntityToSymbol(symbol); // Convert if necessary
        setCurrencySymbol(readableSymbol); // Set the readable currency symbol

        await fetchFullAddress(data.latitude, data.longitude);
      } else {
        setError("Unable to fetch location via IP.");
      }
    } catch (err) {
      setError("Failed to get location: " + err.message);
    }
  };

  const fetchFullAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=560612638837-gd7nghtp898giquogtr8gr51aduljsdt.apps.googleusercontent.com`
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        setAddress(data.results[0].formatted_address); // Full address
      } else {
        setError("Failed to fetch the full address.");
      }
    } catch (err) {
      setError("Reverse geocoding failed: " + err.message);
    }
  };

  useEffect(() => {
    getLocationByIP();
  }, []);

  return {
    location,
    address,
    currencySymbol,
    error,
    getLocationByIP,
  };
};

export default useLocation;
