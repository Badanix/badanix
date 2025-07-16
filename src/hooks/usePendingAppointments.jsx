import { useEffect, useState } from "react";
import { appointmentRequests } from "../components/Constants";

const usePendingAppointments = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [appointments, setAppointments] = useState(appointmentRequests);

  const handleAccept = (index) => {
    const acceptedAppointment = appointments[index];
    setUpcomingAppointments((prev) => [...prev, acceptedAppointment]);

    // Remove from pending appointments
    const newAppointments = [...appointments];
    newAppointments.splice(index, 1);
    setAppointments(newAppointments);
  };

  const handleDecline = (index) => {
    const declinedAppointment = appointments[index];
    setCancelledAppointments((prev) => [...prev, declinedAppointment]);

    // Remove from pending appointments
    const newAppointments = [...appointments];
    newAppointments.splice(index, 1);
    setAppointments(newAppointments);
  };

  const checkForPastAppointments = () => {
    const now = new Date();
    const updatedUpcoming = upcomingAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      if (appointmentDate < now) {
        setPastAppointments((prev) => [...prev, appointment]);
        return false; // Remove from upcoming
      }
      return true;
    });
    setUpcomingAppointments(updatedUpcoming);
  };

  // Call this function at a regular interval or whenever appointments change
  useEffect(() => {
    checkForPastAppointments();
  }, [upcomingAppointments]);

  const groupAppointmentsByMonth = (appointments) => {
    return appointments.reduce((grouped, appointment) => {
      const appointmentDate = new Date(appointment.date);
      const month = appointmentDate.toLocaleString("default", { month: "long" });
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(appointment);
      return grouped;
    }, {});
  };
    // Assuming `currentDate` and `currentMonth` are correctly defined somewhere in your code
    const currentDate = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
    const currentMonth = new Date().toLocaleString("default", { month: "long" });
  
    // Group appointments by month
    const groupedMeetings = groupAppointmentsByMonth(upcomingAppointments);
  
  return {
    appointments,
    upcomingAppointments,
    cancelledAppointments,
    pastAppointments,
    handleAccept,
    handleDecline,groupAppointmentsByMonth,currentDate,currentMonth,groupedMeetings
  };
};

export default usePendingAppointments;
