import React, { useEffect, useState } from "react";
import { defaultUrls } from "../../../components/Constants";
import { useNavigate } from "react-router-dom";

function HospitalLists() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${defaultUrls}admin/allUsers/institution`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch institutions");
        }
        return res.json();
      })
      .then((data) => {
        console.log("INSTITUTION API RESPONSE:", data);

        if (!Array.isArray(data.data)) {
          throw new Error(data.message || "Invalid institution response");
        }

        console.log("RAW INSTITUTIONS:", data.data);

        // ✅ NO FILTERING — just set API data
        setHospitals(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleView = (hospital) => {
    navigate(`/admin/hospitals/${hospital.id}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return;

    setHospitals((prev) => prev.filter((item) => item.id !== id));
    console.log("DELETE ID:", id);
  };

  if (loading) return <p className="p-4">Loading institutions...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Institutions List
      </h2>

      {hospitals.length === 0 ? (
        <p>No institutions found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {hospitals.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id}</td>

                  <td className="px-4 py-3 font-medium truncate max-w-xs">
                    {item.name || item.fullname || "-"}
                  </td>

                  <td className="px-4 py-3 truncate max-w-xs">
                    {item.email || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {item.phone || "-"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        item.status === 1
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleView(item)}
                      className="px-3 py-1 text-sm rounded bg-primary text-white hover:bg-primaryLight mb-2"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 text-sm rounded bg-tomato text-white hover:opacity-90"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HospitalLists;
