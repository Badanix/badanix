import { useEffect, useState } from "react";
import { APIURLS } from "../../../../../components/Constants";

export const useLaboratoryGet = () => {
    const APIURLLABORATORYGETTRANSACTION = APIURLS.APIURLLABORATORYGETTRANSACTION;
    const token = localStorage.getItem("token");
    const [LaboratoryData, setLaboratoryData] = useState([]);
    const [loading, setLoading] = useState(false);

  
    // Fetch Laboratory Data Function
    const fetchLaboratoryData = async () => {
      setLoading(true);
      if (!token) {
        console.error("Error: User not logged in");
        setLoading(false);
        return;      }
  
      try {
        const response = await fetch(APIURLLABORATORYGETTRANSACTION, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
  
          if (Array.isArray(data.data)) {
            setLaboratoryData(data.data);
          } else {
            console.error("Unexpected API response structure:", data);
          }
        } else {
          console.error(
            `Failed to fetch Laboratory Data. Status: ${response.status}, Status Text: ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error fetching Laboratory Data:", error);
      }
      finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchLaboratoryData();
  }, []);
  
  
    return { LaboratoryData,loading };
  };

//   get bank account

export const useLaboratoryGetBankAccount = () => {
    const APIINSTITUTIONBANKLINKACCOUNT = APIURLS.APIINSTITUTIONBANKLINKACCOUNT;
    const token = localStorage.getItem("token");
    const [LaboratoryData, setLaboratoryData] = useState([]);
    const [loading, setLoading] = useState(false);

  
    // Fetch Laboratory Data Function
    const fetchLaboratoryBankAccountData = async () => {
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
            setLaboratoryData(data.data);
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
    fetchLaboratoryBankAccountData();
  }, []);
  
  
    return { LaboratoryData,loading };
  };