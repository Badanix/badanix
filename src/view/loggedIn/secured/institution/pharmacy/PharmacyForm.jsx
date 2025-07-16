import { useEffect, useState } from "react";
import { APIURLS } from "../../../../../components/Constants";

export const usePharmacyGet = () => {
    const APIURLPHARMACYGETTRANSACTION = APIURLS.APIURLPHARMACYGETTRANSACTION;
    const token = localStorage.getItem("token");
    const [pharmacyData, setPharmacyData] = useState([]);
    const [loading, setLoading] = useState(false);

  
    // Fetch Pharmacy Data Function
    const fetchPharmacyData = async () => {
      setLoading(true);
      if (!token) {
        console.error("Error: User not logged in");
        setLoading(false);
        return;      }
  
      try {
        const response = await fetch(APIURLPHARMACYGETTRANSACTION, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
  
          if (Array.isArray(data.data)) {
            setPharmacyData(data.data);
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
      }
      finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchPharmacyData();
  }, []);
  
  
    return { pharmacyData,loading };
  };

//   get bank account

export const usePharmacyGetBankAccount = () => {
    const APIINSTITUTIONBANKLINKACCOUNT = APIURLS.APIINSTITUTIONBANKLINKACCOUNT;
    const token = localStorage.getItem("token");
    const [PharmacyData, setPharmacyData] = useState([]);
    const [loading, setLoading] = useState(false);

  
    // Fetch Pharmacy Data Function
    const fetchPharmacyBankAccountData = async () => {
      setLoading(true);
      if (!token) {
        console.error("Error: User not logged in");
        setLoading(false);
        return;      }
  
      try {
        const response = await fetch(APIINSTITUTIONBANKLINKACCOUNT, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
  
          if (Array.isArray(data.data)) {
            setPharmacyData(data.data);
          } else {
            console.error("Unexpected API response structure:", data);
          }
        } else {
          console.error(
            `Failed to fetch Bank Data. Status: ${response.status}, Status Text: ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error fetching Bank Data:", error);
      }
      finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchPharmacyBankAccountData();
  }, []);
  
  
    return { PharmacyData,loading };
  };