import React, { useEffect, useState } from "react";
import { defaultUrls } from "../../../components/Constants";
import { useNavigate } from "react-router-dom";

function AllMedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${defaultUrls}admin/allRecords`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch medical records");
        return res.json();
      })
      .then((data) => {
        console.log("ALL MEDICAL RECORDS:", data);
        setRecords(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleView = (record) => {
    navigate(`/admin/medical-record/${record.patient_ehr}`);
  };

  if (loading) return <p className="p-6">Loading medical records...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Medical Records
      </h2>

      {records.length === 0 ? (
        <p>No medical records found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Patient ID</th>
                <th className="px-4 py-3 text-left">Patient EHR</th>
                <th className="px-4 py-3 text-left">Prescription</th>
                <th className="px-4 py-3 text-left">Lab Tests</th>
                <th className="px-4 py-3 text-left">Medical Note</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{record.id}</td>
                  <td className="px-4 py-3">{record.patient_id}</td>
                  <td className="px-4 py-3 font-medium">
                    {record.patient_ehr}
                  </td>
                  <td className="px-4 py-3 truncate max-w-xs">
                    {record.prescription || "-"}
                  </td>
                  <td className="px-4 py-3 truncate max-w-xs">
                    {record.prescribed_lab_tests || "-"}
                  </td>
                  <td className="px-4 py-3 truncate max-w-xs">
                    {record.medical_note || "-"}
                  </td>
                  <td className="px-4 py-3">
                    {record.date
                      ? new Date(record.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleView(record)}
                      className="px-3 py-1 text-sm rounded bg-primary text-white hover:bg-primaryLight"
                    >
                      View
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

export default AllMedicalRecords;
