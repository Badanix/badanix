import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { defaultUrls } from "../../../components/Constants";
import hospitalImg from "../../../assets/icons/patient.png";

function SingleInstitution() {
  const { id } = useParams();
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${defaultUrls}admin/allUsers/institutions/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch institution");
        return res.json();
      })
      .then((data) => {
        setInstitution(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading institution...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!institution) return <p className="p-6">Institution not found</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary">
          Institution Details
        </h2>

        <Link
          to="/admin/allinstitutions"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Institutions
        </Link>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src={
            institution.logo
              ? `${defaultUrls.replace("api/v1/", "")}${institution.logo}`
              : hospitalImg
          }
          alt={institution.institution_name}
          className="w-32 h-32 rounded-full object-cover border-2 border-primary"
        />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Detail label="Institution Name" value={institution.institution_name} />
        <Detail label="Email" value={institution.email} />
        <Detail label="Institution Type" value={institution.institution_type} />
        <Detail label="EHR Code" value={institution.ehr} />
        <Detail label="Number of Consultations" value={institution.no_of_consultations} />
        <Detail label="Website" value={institution.website} />
        <Detail label="About Institution" value={institution.about} />

        <Detail label="Bank Name" value={institution.bank_name} />
        <Detail label="Account Name" value={institution.acct_name} />
        <Detail label="Account Number" value={institution.acct_num} />

        <Detail label="Role ID" value={institution.role_id} />

        <Detail
          label="Verified"
          value={institution.verified === 1 ? "Yes" : "No"}
        />

        <Detail
          label="Status"
          value={institution.status === 1 ? "Active" : "Inactive"}
        />

        <Detail
          label="Created At"
          value={new Date(institution.created_at).toLocaleString()}
        />

        <Detail
          label="Updated At"
          value={new Date(institution.updated_at).toLocaleString()}
        />
      </div>
    </div>
  );
}

const Detail = ({ label, value }) => (
  <div className="border rounded-lg p-3">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium break-words">{value || "-"}</p>
  </div>
);

export default SingleInstitution;
