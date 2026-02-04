import React, { useEffect, useState } from "react";
import { defaultUrls } from "../../../components/Constants";
import { useNavigate } from "react-router-dom";
import hospitalImg from "../../../assets/icons/patient.png";

function AllInstitutions() {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${defaultUrls}admin/allUsers/institutions`)
      .then((res) => res.json())
      .then((data) => {
        console.log("INSTITUTIONS API RESPONSE:", data);
        setInstitutions(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleView = (institution) => {
    navigate(`/admin/institutions/${institution.id}`);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this institution?"))
      return;

    const previousInstitutions = institutions;

    // optimistic UI update
    setInstitutions((prev) => prev.filter((item) => item.id !== id));

    try {
      const res = await fetch(
        `${defaultUrls}admin/delete-user/institutions/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (!res.ok || data.status === false) {
        throw new Error(data.message || "Failed to delete institution");
      }

      alert("Institution deleted successfully");
    } catch (err) {
      // rollback
      setInstitutions(previousInstitutions);
      alert(err.message || "Error deleting institution");
      console.error("DELETE ERROR:", err);
    }
  };

  /* ================= TOGGLE STATUS ================= */
  const handleToggleStatus = async (id) => {
    const previousInstitutions = institutions;

    // optimistic toggle
    setInstitutions((prev) =>
      prev.map((inst) =>
        inst.id === id
          ? { ...inst, status: inst.status === 1 ? 0 : 1 }
          : inst
      )
    );

    try {
      const res = await fetch(
        `${defaultUrls}admin/toggle-account/institutions/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (!res.ok || data.status === false) {
        throw new Error(data.message || "Failed to toggle institution status");
      }
    } catch (err) {
      // rollback
      setInstitutions(previousInstitutions);
      alert(err.message || "Error updating institution status");
      console.error("TOGGLE ERROR:", err);
    }
  };

  if (loading) return <p className="p-4">Loading institutions...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Institutions List
      </h2>

      {institutions.length === 0 ? (
        <p>No institutions found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="border border-gray-200 rounded-lg min-w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Institution Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {institutions.map((inst) => (
                <tr key={inst.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{inst.id}</td>

                  <td className="px-4 py-3 font-medium truncate max-w-xs">
                    {inst.institution_name || "-"}
                  </td>

                  <td className="px-4 py-3 truncate max-w-xs">
                    {inst.email || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {inst.institution_type || "-"}
                  </td>

                  {/* STATUS TOGGLE */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleStatus(inst.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition
                          ${
                            inst.status === 1
                              ? "bg-green-600"
                              : "bg-gray-300"
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition
                            ${
                              inst.status === 1
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                        />
                      </button>

                      <span
                        className={`text-sm font-medium ${
                          inst.status === 1
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        {inst.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                      {inst.status === 1
                        ? "Institution is ACTIVE on the platform"
                        : "Institution is DISABLED"}
                    </p>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {inst.created_at
                      ? new Date(inst.created_at).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleView(inst)}
                      className="px-3 py-1 text-sm rounded bg-primary text-white hover:bg-primaryLight mb-2"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDelete(inst.id)}
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

export default AllInstitutions;
