import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Patients = () => {
  const [recentPatients, setRecentPatients] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const fetchUserDetails = async (client_id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "No authentication token found", "error");
      return;
    }

    try {
      const res = await fetch(
        `https://api.digitalhospital.com.ng/api/v1/doctor/find/user?id=${client_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.status === 200 && data?.data) {
        setUsers((prev) => ({ ...prev, [client_id]: data.data }));
      }
    } catch (err) {
      console.error("User fetch error:", err);
      Swal.fire("Error", "Error fetching user details", "error");
    }
  };

  const fetchAppointments = async () => {
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
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();

      if (res.status === 401) {
        Swal.fire("Unauthorized", result.message || "Please login again", "warning");
        return;
      }

      if (res.status === 200 && Array.isArray(result.data)) {
        const completed = result.data
          .filter((item) => item.status === 2)
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setRecentPatients(completed);
        completed.forEach((appt) => fetchUserDetails(appt.client_id));
      } else {
        Swal.fire("Info", result.message || "No bookings available.", "info");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const formatDate = (str) => {
    const date = new Date(str);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (timeStr) => {
    const time = new Date(`1970-01-01T${timeStr}`);
    return time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

if (loading) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#14361D]" />
      <p className="mt-4 text-[#14361D] text-lg">Loading appointments...</p>
    </div>
  );
}

return (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-[#14361D]">Recent Patients</h1>
      {recentPatients.length > 1 && (
        <button
          className="text-sm text-[#14361D] hover:text-[#856443] hover:underline"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "See Less" : "See More"}
        </button>
      )}
    </div>

    {recentPatients.length > 0 ? (
      <div className="overflow-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-[#14361D] text-white text-sm">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Purpose</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          
          <tbody>
            {(showMore ? recentPatients : recentPatients.slice(0, 10)).map((appt) => {
              const user = users[appt.client_id];
              return (
                <tr key={appt.id} className="border-b hover:bg-[#f4f1ef] text-sm">
                  <td className="py-2 px-4 flex items-center gap-2">
                    {user?.prof_pics && (
                      <img
                        src={`https://api.digitalhospital.com.ng/${user.prof_pics}`}
                        alt="profile"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    {user?.fullname || "N/A"}
                  </td>
                  <td className="py-2 px-4">{appt.purpose || "N/A"}</td>
                  <td className="py-2 px-4">{formatDate(appt.date)}</td>
                  <td className="py-2 px-4">{formatTime(appt.start_time || "")}</td>
                  <td className="py-2 px-4 text-[#14361D] font-medium">Completed</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-center text-gray-500 mt-4">No recent patients found.</p>
    )}
  </div>
);

};

export default Patients;
