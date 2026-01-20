import React, { useEffect, useState } from "react";
import { defaultUrls } from "../../../components/Constants";
import { useNavigate } from "react-router-dom";

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState(4); // 4 = all
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${defaultUrls}admin/allBookings/4`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        console.log("ALL BOOKINGS RESPONSE:", data);
        const list = Array.isArray(data.data) ? data.data : [];
        setBookings(list);
        setFilteredBookings(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 🔹 Filter when status changes
  useEffect(() => {
    if (statusFilter === 4) {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(bk => bk.status === statusFilter));
    }
  }, [statusFilter, bookings]);

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return { label: "Pending", style: "bg-yellow-100 text-yellow-700" };
      case 1:
        return { label: "Accepted", style: "bg-blue-100 text-blue-700" };
      case 2:
        return { label: "Completed", style: "bg-green-100 text-green-700" };
      case 3:
        return { label: "Cancelled", style: "bg-red-100 text-red-700" };
      default:
        return { label: "Unknown", style: "bg-gray-100 text-gray-700" };
    }
  };

  if (loading) return <p className="p-4">Loading bookings...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-primary">All Bookings</h2>

        {/* 🔹 Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(Number(e.target.value))}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value={4}>All</option>
          <option value={0}>Pending</option>
          <option value={1}>Accepted</option>
          <option value={2}>Completed</option>
          <option value={3}>Cancelled</option>
        </select>
      </div>

      {filteredBookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Patient</th>
                <th className="px-4 py-3 text-left">Doctor</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((bk) => {
                const status = getStatus(bk.status);

                return (
                  <tr key={bk.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{bk.id}</td>
                    <td className="px-4 py-3">{bk.patient_name || "-"}</td>
                    <td className="px-4 py-3">{bk.doctor_name || "-"}</td>
                    <td className="px-4 py-3">{bk.date || "-"}</td>
                    <td className="px-4 py-3">{bk.time || "-"}</td>

                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-sm rounded-full ${status.style}`}>
                        {status.label}
                      </span>
                    </td>

               <td className="px-4 py-3 text-sm text-gray-600">
  {bk.created_at
    ? new Date(bk.created_at).toLocaleString("en-GB", {
        weekday: "short",   
        day: "2-digit",      // e.g., 20
        month: "short",      // e.g., Jan
        year: "numeric",     // e.g., 2026
        hour: "2-digit",     // e.g., 14
        minute: "2-digit",   // e.g., 30
      })
    : "-"}
</td>


                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => navigate(`/admin/bookings/${bk.id}`)}
                        className="px-3 py-1 text-sm rounded bg-primary text-white hover:bg-primaryLight"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllBookings;
