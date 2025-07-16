import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const [appointments, setAppointments] = useState([]);
const [refresh, setRefresh] = useState(false); // State to trigger re-fetching

const handleCancelSubmit = async (e) => {
  e.preventDefault();
  if (!selectedSchedule) return;

  try {
    const result = await cancelBooking({
      id: selectedSchedule.id,
      reason,
      status: 3,
    });

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Appointment Cancelled Successfully!",
        text: `You have successfully cancelled appointment with ${selectedSchedule.fullname} set on ${formatDate(selectedSchedule.date)}.`,
      });

      setReason("");
      setSelectedSchedule(null);
      closeModal();
      setRefresh((prev) => !prev); // Trigger re-fetch
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Error: ${result.error}`,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Unexpected Error!",
      text: error.message || "An unexpected error occurred.",
    });
  }
};

const handleAcceptSubmit = async (e) => {
  e.preventDefault();
  if (!selectedSchedule) return;

  try {
    const result = await acceptBooking({
      id: selectedSchedule.id,
      time,
      status: 1,
    });

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Appointment Set Successfully!",
        text: `The appointment has been set successfully at ${formatTime(time)}.`,
      });

      setTime("");
      setSelectedSchedule(null);
      closeModal();
      setRefresh((prev) => !prev); // Trigger re-fetch
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Error: ${result.error}`,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Unexpected Error!",
      text: error.message || "An unexpected error occurred.",
    });
  }
};

// ✅ useEffect to re-fetch appointments when an action is taken
useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const result = await getAppointments(); // Replace with actual fetch function
      if (result.success) {
        setAppointments(result.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  fetchAppointments();
}, [refresh]); // Runs when `refresh` changes
