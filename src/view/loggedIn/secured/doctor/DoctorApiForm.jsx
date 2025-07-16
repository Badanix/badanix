import { useEffect, useState } from "react";
import { APIURLS } from "../../../../components/Constants";

export const useAppointments = () => {
  const apiDoctors = `${APIURLS.APIURLDOCTORFINDPATIENTSearch}?id=`;
  const apiDoctorAppointments = APIURLS.APIURLDOCTORAPPOINTMENTS;
  const token = localStorage.getItem("token");

  const [appointmentData, setAppointmentData] = useState([]);
  const [patientData, setPatientData] = useState([]);
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
      const response = await fetch(apiDoctorAppointments, {
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

  const fetchPatientData = async (patientId) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiDoctors}${patientId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.data) {
          setPatientData((prevPatientData) => [...prevPatientData, data.data]);

        } else {
          setError("Unexpected API response structure for Patient");
        }
      } else {
        setError(`Failed to fetch Patient Data. Status: ${response.status}`);
      }
    } catch (error) {
      setError(`Error fetching Patient Data: ${error.message}`);
      console.error("Fetch Error:", error);
    }finally {
        setLoading(false); 
      }
  };
  console.error("Fetch Error:", patientData);


  useEffect(() => {
    fetchPatientsAppointmentsData();
  }, []);

  useEffect(() => {
    if (appointmentData.length > 0) {
      Promise.all(appointmentData.map(appointment => fetchPatientData(appointment.client_id)))
        .then(() => {
        });
    }
  }, [appointmentData]);
  
  const enrichedAppointmentData = appointmentData.map((appointment) => {
    const patient = patientData.find(
      (patient) => String(patient.client_id) === String(appointment.client_id)
    );
  
  
    return {
      ...appointment,
      fullname: patient?.fullname || null,
      prof_pics: patient?.prof_pics || null, 
      ehr: patient?.ehr || null, 
      dob: patient?.dob || null,
      gender: patient?.gender || null,
      weight: patient?.weight || null, 
      height: patient?.height || null, 


 


    };
  });
  

  const mostRecentUpcomingAppointment = enrichedAppointmentData
    .filter((appointment) => appointment.status === 1) 
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time)) 
    .pop();


  const completedAppointmentsCount = enrichedAppointmentData.filter((appointment) => appointment.status === 2).length;
  const pendingAppointments = enrichedAppointmentData.filter((appointment) => appointment.status === 0);
  const upcomingAppointents = enrichedAppointmentData.filter((appointment) => appointment.status === 1).length;

  const filterByStatus = (status) => enrichedAppointmentData.filter((appointment) => appointment.status === status);

  const getAppointmentsWithin24Hours = (appointments) => {
    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  
    // Filter the appointments based on the status and within the 24-hour range
    const filteredAppointments = appointments.filter(appointment => {
      // Only consider appointments with status 1 or 3
      if (appointment.status === 1 || appointment.status === 3) {
        if (appointment.start_time && appointment.date) {
          // Extract time from start_time (e.g., '15:00:01')
          const [hours, minutes, seconds] = appointment.start_time.split(':').map(Number);
  
          // Combine today's date with the appointment's start_time
          const appointmentDate = new Date(appointment.date); // Use the provided date for full date info
          appointmentDate.setHours(hours, minutes, seconds);
  
          // Check if the appointment is within the next 24 hours
          return appointmentDate >= now && appointmentDate <= next24Hours;
        }
      }
      return false;
    });
  
    // If no appointments match the filter, return the "No bookings today." message
    // if (filteredAppointments.length === 0) {
    //   return ["No bookings today."];
    // }
  
    // Otherwise, return the array of filtered appointments with the specific details
    return filteredAppointments.map(appointment => ({
      start_time: appointment.start_time,
      date: appointment.date,
      end_time: appointment.end_time,
      fullname: appointment.fullname,
      prof_pics: appointment.prof_pics
    }));
  };
  

  
     const upcomingAppointmentssIn24Hrs = getAppointmentsWithin24Hours(filterByStatus(1));
  const completedAppointmentssIn24Hrs = getAppointmentsWithin24Hours(filterByStatus(2));
  const cancelledAppointmentssIn24Hrs = getAppointmentsWithin24Hours(filterByStatus(4));

  return {
    enrichedAppointmentData,
    mostRecentUpcomingAppointment,
    completedAppointmentsCount,
    pendingAppointments,
    upcomingAppointents,
   
    upcomingAppointmentssIn24Hrs,
    completedAppointmentssIn24Hrs,
    cancelledAppointmentssIn24Hrs,
    loading,
    error,
  };
};
export const useDoctorTransaction = () => {
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
      const response = await fetch(APIURLS.APIDOCTORPAYMENT, {
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

