import React, { useEffect, useState } from "react";
import { defaultUrls } from "../../../components/Constants";
import { useNavigate } from "react-router-dom";
import doctorImg from "../../../assets/icons/patient.png"; // fallback image

function AdminDoctorsLists() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${defaultUrls}admin/allUsers/doctors`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data);
        console.log("DOCTORS DATA:", data.data);
        setDoctors(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleView = (doctor) => {
    console.log("VIEW DOCTOR:", doctor);
    navigate(`/admin/doctors/${doctor.id}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    setDoctors((prev) => prev.filter((doc) => doc.id !== id));

    console.log("DELETE DOCTOR ID:", id);
  };

  if (loading) return <p className="p-4">Loading doctors...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-primary mb-4">Doctors List</h2>

      {doctors.length === 0 ? (
        <p>No doctors found</p>
      ) : (
        <div className="p-6 bg-white rounded-xl shadow">
          {doctors.length === 0 ? (
            <p>No doctors found</p>
          ) : (
            <div className="">
              <table className="border border-gray-200 rounded-lg">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    {/* <th className="px-2 py-3 text-left">Profile</th> */}
                    <th className="px-4 py-3 text-left">Full Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Gender</th>
                    <th className="px-4 py-3 text-left">Specialization</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Created At</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {doctors.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{doc.id}</td>

                      {/* <td className="px-2 py-3">
                        <img
                          src={
                            doc.prof_pics
                              ? `${defaultUrls.replace("api/v1/", "")}${doc.prof_pics}`
                              : doctorImg
                          }
                          alt={doc.fullname}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                      </td> */}

                      <td className="px-4 py-3 font-medium truncate max-w-xs">
                        {doc.fullname}
                      </td>
                      <td className="px-4 py-3 truncate max-w-xs">
                        {doc.email}
                      </td>

                      <td className="px-4 py-3">{doc.gender}</td>
                      <td className="px-4 py-3 truncate max-w-xs">
                        {doc.specialization}
                      </td>
                  

                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 text-sm rounded-full ${
                            doc.status === 1
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {doc.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>

                  

                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() => handleView(doc)}
                          className="px-3 py-1 text-sm rounded bg-primary text-white hover:bg-primaryLight mb-2"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
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
      )}
    </div>
  );
}

export default AdminDoctorsLists;
