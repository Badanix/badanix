import React, { useEffect, useState } from "react";
import { defaultUrls } from "../../../components/Constants";
import { useNavigate } from "react-router-dom";

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState({});
  const [doctors, setDoctors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // 🔹 Fetch bookings
    fetch(`${defaultUrls}admin/allBookings/${statusFilter}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data.data) ? data.data : []);
      })
      .catch((err) => setError(err.message));

    // 🔹 Fetch users
    fetch(`${defaultUrls}admin/allUsers/users`)
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        (data.data || []).forEach((c) => {
          map[c.id] = c.fullname;
        });
        setUsers(map);
      });

    // 🔹 Fetch doctors
    fetch(`${defaultUrls}admin/allUsers/doctors`)
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        (data.data || []).forEach((d) => {
          map[d.id] = d.fullname;
        });
        setDoctors(map);
        setLoading(false);
      })
      .catch((err) => setError(err.message));
  }, [statusFilter]);

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

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Patient Name</th>
                <th className="px-4 py-3">Doctor Name</th>
                <th className="px-4 py-3">Purpose</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Start Time</th> {/* new column */}
                <th className="px-4 py-3">End Time</th> {/* new column */}
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((bk) => {
                const status = getStatus(bk.status);

                return (
                  <tr key={bk.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{bk.id}</td>
                    <td className="px-4 py-3">
                      {users[bk.client_id] || `Client #${bk.client_id}`}
                    </td>
                    <td className="px-4 py-3">
                      {doctors[bk.doctor_id] || `Doctor #${bk.doctor_id}`}
                    </td>
                    <td className="px-4 py-3">{bk.purpose || "-"}</td>
                    <td className="px-4 py-3">
                      {bk.date ? new Date(bk.date).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-4 py-3">
                      {bk.start_time
                        ? new Date(
                            `1970-01-01T${bk.start_time}`,
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>

                    <td className="px-4 py-3">
                      {bk.end_time
                        ? new Date(
                            `1970-01-01T${bk.end_time}`,
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>

                    {/* separate end time */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${status.style}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {bk.created_at
                        ? new Date(bk.created_at).toLocaleString("en-GB")
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
