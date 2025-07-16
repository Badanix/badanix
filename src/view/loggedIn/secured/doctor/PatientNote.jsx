import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
 import { useNavigate } from "react-router-dom";

export default function PatientNote() {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [medication, setMedication] = useState("");
  const [lab, setLab] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const fetchUserDetails = async (client_id) => {
    if (users[client_id]) return;

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "No authentication token found", "error");
      return;
    }

    try {
      const response = await fetch(
        `https://api.digitalhospital.com.ng/api/v1/doctor/find/user?id=${client_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setUsers((prev) => ({ ...prev, [client_id]: result.data }));
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch user details", "error");
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "No authentication token found", "error");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://api.digitalhospital.com.ng/api/v1/doctor/booking",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();

      if (res.status === 401) {
        Swal.fire("Unauthorized", result.message || "Login again", "error");
        return;
      }

      if (res.ok && Array.isArray(result.data)) {
        const upcoming = result.data
          .filter((a) => a.status === 1)
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setAppointments(upcoming);

        upcoming.forEach((a) => fetchUserDetails(a.client_id));
      } else {
        Swal.fire("Error", result.message || "No bookings found", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch appointments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async () => {
    if (!selectedAppointment || !note) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "https://api.digitalhospital.com.ng/api/v1/doctor/record",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_id: selectedAppointment,
            medication,
            lab,
            note,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        Swal.fire("Success", "Note submitted successfully", "success");
        setMedication("");
        setLab("");
        setNote("");
        setSelectedAppointment("");
        navigate("/doctor/Dashboard");
      } else {
        Swal.fire("Error", data.message || "Submission failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Patient Notes</h1>

      {loading && (
        <div className="text-center text-blue-600 font-medium">Loading...</div>
      )}

      <div className="bg-white shadow-md rounded-md p-6 space-y-4">
        <div>
          <label className="block font-medium mb-1">Select Appointment:</label>
          <select
            className="w-full border border-gray-300 rounded p-2"
            value={selectedAppointment}
            onChange={(e) => setSelectedAppointment(e.target.value)}
          >
            <option value="">-- Select --</option>
            {appointments.map((a) => (
              <option key={a.id} value={a.id}>
                {users[a.client_id]?.fullname || "Unknown"} - {formatDate(a.date)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Medication:</label>
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            placeholder="Enter medication prescribed"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Lab Test Ordered:</label>
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            value={lab}
            onChange={(e) => setLab(e.target.value)}
            placeholder="Enter lab test details"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Doctor's Note / Diagnosis:</label>
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter diagnosis"
            rows={4}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#14361D]  text-white px-4 py-2 rounded hover:bg-[#856443] disabled:opacity-50 w-full"
        >
          {loading ? "Submitting..." : "Submit Note"}
        </button>
      </div>
    </div>
  );
}
