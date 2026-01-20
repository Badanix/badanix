import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PatientEhr = () => {
  const [ehr, setEhr] = useState("");
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    document.title = "Patient EHR Record";
  }, []);

  const fetchEhrRecord = async () => {
    if (!ehr) {
      return Swal.fire("Error", "Please enter a valid EHR", "error");
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return Swal.fire("Error", "Authentication token not found", "error");
      }

      const res = await fetch(
        `https://api.digitalhospital.com.ng/api/v1/doctor/record/${encodeURIComponent(ehr)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (err) {
        setLoading(false);
        return Swal.fire("Error", "Invalid response from server", "error");
      }

      setHasSearched(true);

      if (res.ok && Array.isArray(data?.data) && data.data.length > 0) {
        const sortedData = data.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        setRecord({ ...data, data: sortedData });
      } else if (
        res.ok &&
        Array.isArray(data?.data) &&
        data.data.length === 0
      ) {
        setRecord(null);
      } else {
        setRecord(null);
      }
    } catch (err) {
      Swal.fire("Error", "No record found for this EHR", "error");
    }

    setLoading(false);
    setEhr("");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <svg
            className="w-6 h-6 text-[#856443]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-[#14361D]">
          Enter Patient EHR:
        </h1>
      </div>

      {/* Input */}
      <input
        type="text"
        value={ehr}
        onChange={(e) => setEhr(e.target.value)}
        placeholder="Enter EHR ID"
        className="w-full p-3 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Button */}
      <button
        onClick={fetchEhrRecord}
        disabled={loading}
        className="px-6 py-2 bg-[#856443] text-white rounded hover:bg-[#14361D] disabled:opacity-50"
      >
        {loading ? "Loading..." : "VIEW MEDICAL RECORD"}
      </button>

      {/* Record Table */}
      {record && record.data?.length > 0 && (
        <div className="overflow-auto mt-8">
          <table className="min-w-full table-auto border border-gray-300 text-sm text-gray-700">
            <thead className="bg-[#14361D] text-white">
              <tr>
                <th className="p-2 border">EHR</th>
                <th className="p-2 border">Medication</th>
                <th className="p-2 border">Lab</th>
                <th className="p-2 border">Medical Notes</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
              </tr>
            </thead>
            <tbody>
              {record.data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 border text-center">{item.ehr}</td>
                  <td className="p-2 border">
                    {item.medication
                      ? item.medication
                          .split(",")
                          .map((med, i) => <div key={i}>{med.trim()}</div>)
                      : "No medication"}
                  </td>
                  <td className="p-2 border">
                    {item.lab
                      ? item.lab
                          .split(",")
                          .map((lab, i) => <div key={i}>{lab.trim()}</div>)
                      : "No lab result"}
                  </td>
                  <td className="p-2 border">{item.note}</td>
                  <td className="p-2 border text-center">
                    {new Date(item.created_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-2 border text-center">
                    {new Date(item.created_at).toLocaleTimeString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {hasSearched && !record && (
        <p className="mt-6 text-red-600 text-center">
          No record found for this EHR
        </p>
      )}
    </div>
  );
};

export default PatientEhr;
