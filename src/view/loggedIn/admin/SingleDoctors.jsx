import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { defaultUrls } from "../../../components/Constants";
import doctorImg from "../../../assets/icons/patient.png"; // fallback image

function SingleDoctors() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${defaultUrls}admin/allUsers/doctors/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch doctor");
        return res.json();
      })
      .then((data) => {
        console.log("SINGLE DOCTOR RESPONSE:", data);
        setDoctor(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading doctor...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!doctor) return <p className="p-6">Doctor not found</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary">Doctor Details</h2>

        <Link
          to="/admin/doctors"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Doctors
        </Link>
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img
          src={
            doctor.prof_pics
              ? `${defaultUrls.replace("api/v1/", "")}${doctor.prof_pics}`
              : doctorImg
          }
          alt={doctor.fullname}
          className="w-32 h-32 rounded-full object-cover border-2 border-primary"
        />
      </div>

      {/* Doctor Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Detail label="Full Name" value={doctor.fullname} />
        <Detail label="Email" value={doctor.email} />
        <Detail label="Gender" value={doctor.gender} />
        <Detail label="Date of Birth" value={doctor.dob} />
        <Detail label="EHR" value={doctor.ehr} />
        <Detail label="Specialization" value={doctor.specialization} />
        <Detail label="Experience" value={doctor.experience} />
        <Detail label="No. of Consultations" value={doctor.no_of_consultations} />
        <Detail label="About" value={doctor.about} />
        <Detail label="Preferred Language" value={doctor.pref_language} />
        <Detail label="Bank Name" value={doctor.bank_name} />
        <Detail label="Account Name" value={doctor.acct_name} />
        <Detail label="Account Number" value={doctor.acct_num} />
        <Detail label="Role ID" value={doctor.role_id} />
        <Detail
          label="Status"
          value={doctor.status === 1 ? "Active" : "Inactive"}
        />
        <Detail
          label="Verified"
          value={doctor.verified === 1 ? "Yes" : "No"}
        />
        <Detail
          label="Created At"
          value={new Date(doctor.created_at).toLocaleString()}
        />
        <Detail
          label="Updated At"
          value={new Date(doctor.updated_at).toLocaleString()}
        />
      </div>
    </div>
  );
}

// Reusable detail component
const Detail = ({ label, value }) => (
  <div className="border rounded-lg p-3">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value || "-"}</p>
  </div>
);

export default SingleDoctors;
