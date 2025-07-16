import { useEffect, useState } from "react";
import { APIURLS } from "../../../../components/Constants";

export const useInstitutionTransaction
= () => {
  const token = localStorage.getItem("token");
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactionData = async () => {
    setLoading(true);
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(APIURLS.APIINSTITUTIONPAYMENT, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setTransactionData(data.data);
        } else {
          console.error("Unexpected API response structure:", data);
        }
      } else {
        console.error(
          `Failed to fetch Pharmacy Data. Status: ${response.status}, Status Text: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching Pharmacy Data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch data when the hook is used
  useEffect(() => {
    fetchTransactionData();
  }, []);

  return { transactionData, loading };
};