import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { defaultUrls } from "../../../components/Constants";

function SingleEhr() {
  const { ehr } = useParams(); // route param
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${defaultUrls}admin/allRecords/${ehr}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch medical record");
        }
        return res.json();
      })
      .then((data) => {
        console.log("SINGLE EHR RESPONSE:", data);

        // API may return object or array — normalize
        if (Array.isArray(data.data)) {
          setRecord(data.data[0] || null);
        } else {
          setRecord(data.data);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [ehr]);

  if (loading) return <p className="p-6">Loading medical record...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!record) return <p className="p-6">Medical record not found</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary">
          Medical Record Details
        </h2>

        <Link
          to="/admin/allmedicalrecords"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Records
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Detail label="Record ID" value={record.id} />
        <Detail label="Patient ID" value={record.patient_id} />
        <Detail label="Patient EHR" value={record.patient_ehr} />
        <Detail label="Date" value={record.date} />

        <Detail label="Prescription" value={record.prescription} />
        <Detail label="Lab Tests" value={record.prescribed_lab_tests} />

        <div className="md:col-span-2">
          <Detail label="Medical Note" value={record.medical_note} />
        </div>
      </div>
    </div>
  );
}

/* Reusable field */
const Detail = ({ label, value }) => (
  <div className="border rounded-lg p-3">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium break-words">{value || "-"}</p>
  </div>
);

export default SingleEhr;
