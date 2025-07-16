import { useState, useEffect } from "react";

const useDistances = (origin, dataArray) => {
  const [distances, setDistances] = useState([]);

  const apiKey = "AIzaSyBV8aWcavsOPULlDWzUpw2Ke7zeiD0pSSk"; // Set your Google API Key here

  useEffect(() => {
    if (!origin || !dataArray || dataArray.length === 0) {
      console.error("Invalid origin or dataArray");
      setDistances([]);
      return;
    }

    async function fetchDistances() {
      const destinations = dataArray.map((item) => item.address).join('|');
      const endpoint = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        origin
      )}&destinations=${encodeURIComponent(destinations)}&units=metric&key=${apiKey}`;

      try {
        const response = await fetch(endpoint);
        const result = await response.json();
        console.log("API Response:", result); // Log the API response for debugging

        if (result.status === "OK" && result.rows.length > 0) {
          const fetchedDistances = result.rows[0].elements.map((element, index) => {
            // Handle case where distance or duration may be missing
            const distance = element.distance ? element.distance.value / 1000 : Infinity; // Convert to km
            const duration = element.duration ? element.duration.text : "N/A";
            return {
              ...dataArray[index],
              distance,
              duration,
            };
          });

          // Sort by closest distance
          setDistances(fetchedDistances.sort((a, b) => a.distance - b.distance));
        } else {
          console.error("Error fetching distances:", result.error_message || result.status);
          setDistances([]); // Reset distances on error
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setDistances([]); // Reset distances on fetch error
      }
    }

    fetchDistances();
  }, [origin, dataArray, apiKey]);

  return distances;
};

export default useDistances;
