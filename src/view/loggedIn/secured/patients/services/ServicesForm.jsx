import { useEffect, useState } from "react";
import { APIURLS } from "../../../../../components/Constants";
import specialization from '../../../../../components/specialization.json';
import Swal from "sweetalert2";


export  const doctorSpecializationOptions = Object.keys(specialization).map((title) => {return {title: title,description: specialization[title].description, 
    // img: <FaUserDoctor />
  };});

  export const usePharmacyServices = () => {
    const APIURLPATIENTSFINDPHARMACY = APIURLS.APIURLPATIENTSFINDPHARMACY;
    const token = localStorage.getItem("token");
    const [pharmacyData, setPharmacyData] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const fetchPharmacyData = async () => {
      setLoading(true);
      if (!token) {
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch(APIURLPATIENTSFINDPHARMACY, {
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
      } finally {
        setLoading(false);
      }
    };
  
    // Automatically fetch data when the hook is used
    useEffect(() => {
      fetchPharmacyData();
    }, []);
  
    return { pharmacyData, loading };
  };
// laboratory


export const useLaboratoryServices = () => {
    const APIURLPATIENTSFINDLABORATORY = APIURLS.APIURLPATIENTSFINDLABORATORY;
    const token = localStorage.getItem("token");
    const [LaboratoryData, setLaboratoryData] = useState([]);
    const [loading, setLoading] = useState(false);

  
    // Fetch Laboratory Data Function
    const fetchLaboratoryData = async () => {
      setLoading(true);
      if (!token) {
        setLoading(false);
        return;      }
  
      try {
        const response = await fetch(APIURLPATIENTSFINDLABORATORY, {
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


  export const useHospitalServices = () => {
    const APIURLPATIENTSFINDHOSPITAL = APIURLS.APIURLPATIENTSFINDHOSPITAL;
    const token = localStorage.getItem("token");
    const [HospitalData, setHospitalData] = useState([]);
    const [loading, setLoading] = useState(false);

  
    // Fetch Hospital Data Function
    const fetchHospitalData = async () => {
      setLoading(true);
      if (!token) {
        console.error("Error: User not logged in");
        setLoading(false);
        return;      }
  
      try {
        const response = await fetch(APIURLPATIENTSFINDHOSPITAL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
  
          if (Array.isArray(data.data)) {
            setHospitalData(data.data);
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
      fetchHospitalData();
    }, []);
    
    return { HospitalData,loading };
  };


// find by rating

export const useGetDoctorFind = () => {
  const APIPATIENTSFINDDoctorByRating = APIURLS.APIURLPATIENTSFINDDoctorSpecializationSearch;
  const token = localStorage.getItem("token");
  const [PATIENTSFINDDoctorByRating, setPATIENTSFINDDoctorByRating] = useState([]);
  const [loading, setLoading] = useState(false);

  
  // Fetch Laboratory Data Function
  const fetchPATIENTSFINDDoctorByRating = async () => {
    setLoading(true);
    if (!token) {
      console.error("Error: User not logged in");
      setLoading(false);
      return;      }

    try {
      const response = await fetch(`${APIPATIENTSFINDDoctorByRating}rating`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setPATIENTSFINDDoctorByRating(data.data);
        } else {
          console.error("Unexpected API response structure:", data);
        }
      } else {
        console.error(
          `Failed to fetch doctor by rating Data. Status: ${response.status}, Status Text: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching doctor by rating Data:", error);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
      fetchPATIENTSFINDDoctorByRating();
}, []);


  return { PATIENTSFINDDoctorByRating,loading };
};




export const useAppointments = () => {
  const apiDoctors = `${APIURLS.APIURLPATIENTSFINDDoctorSpecializationSearch}id=`;
  const apiPatientsAppointments = APIURLS.APIURLPATIENTSAPPOINTMENTS;
  const token = localStorage.getItem("token");

  const [appointmentData, setAppointmentData] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch appointments data
  const fetchPatientsAppointmentsData = async () => {
    setLoading(true);
    if (!token) {
      setError("Error: User not logged in");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(apiPatientsAppointments, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setAppointmentData(data.data);
        } else {
          setError("Unexpected API response structure for appointments");
        }
      } else {
        setError(`Failed to fetch Appointments Data. Status: ${response.status}`);
      }
    } catch (error) {
      setError("Error fetching Appointments Data", error);
    }
  };

  const fetchDoctorsData = async (doctorId) => {
    try {
      const response = await fetch(`${apiDoctors}${doctorId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        if (data.data) {
          setDoctorData(prevDoctorData => [...prevDoctorData, data.data]);
        } else {
          setError("Unexpected API response structure for doctor");
        }
      } else {
        setError(`Failed to fetch Doctor Data. Status: ${response.status}`);
      }
    } catch (error) {
      setError("Error fetching Doctor Data", error);
    }
  };
  useEffect(() => {
    fetchPatientsAppointmentsData();
  }, []);

  useEffect(() => {
    if (appointmentData.length > 0) {
      appointmentData.forEach((appointment) => {
        fetchDoctorsData(appointment.doctor_id);
      });
    }
  }, [appointmentData]);

  const enrichedAppointmentData = appointmentData.map((appointment) => {
    const doctor = doctorData.find((doc) => doc.id === appointment.doctor_id);
    const doctorInfo = doctor ? {
      fullname: doctor.fullname,
      prof_pics: doctor.prof_pics,
      specialization: doctor.specialization,
    } : { fullname: null, prof_pics: null, specialization: null };

    return {
      ...appointment,
      fullname: doctorInfo.fullname,
      prof_pics: doctorInfo.prof_pics,
      specialization: doctorInfo.specialization,
    };
  });


  const mostRecentUpcomingAppointment = enrichedAppointmentData
    .filter((appointment) => appointment.status === 1) 
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time)) 
    .pop();
    
  const completedAppointmentsCount = enrichedAppointmentData.filter((appointment) => appointment.status === 2).length;
  const pendingAppointmentsCount = enrichedAppointmentData.filter((appointment) => appointment.status === 0).length;
  const upcomingAppointentsCount = enrichedAppointmentData.filter((appointment) => appointment.status === 1).length;

  return {
    enrichedAppointmentData,
    mostRecentUpcomingAppointment,
    completedAppointmentsCount,
    pendingAppointmentsCount,
    upcomingAppointentsCount,
    loading,
    setLoading,
    error,
  };
};
 



export const useCancelBooking = () => { 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelBooking = async ({ id, reason }) => {
    if (!reason.trim()) {
      Swal.fire("Oops!", "Please enter a reason before proceeding.", "warning");
      return { success: false };
    }

    const confirm = await Swal.fire({
      title: "Preview Cancellation",
      html: `
        <p><strong>Reason:</strong> ${reason}</p>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Continue",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) {
      return { success: false }; 
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch(APIURLS.APICANCELBOOKING, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, reason }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel booking.");
      }

      Swal.fire("Success!", "Your appointment has been cancelled.", "success");
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      Swal.fire("Error!", err.message, "error");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { cancelBooking, loading, error };
};


export const useAcceptBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null); 

  const acceptBooking = async ({ id, time }) => {
    if (!time) {
      Swal.fire("Oops!", "Please select a time before proceeding.", "warning");
      return { success: false };
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch(APIURLS.APIACCEPTBOOKING, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, time }), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to accept booking.");
      }

      setAppointmentDetails(data); 
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {setError,acceptBooking, loading, error, appointmentDetails };
};



export const usePatientTransaction
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
      const response = await fetch("https://api.digitalhospital.com.ng/api/v1/user/transactions", {
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