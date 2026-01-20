import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { defaultUrls } from "../../../components/Constants";
import patientimg from "../../../assets/icons/patient.png";

function SingleUsers() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${defaultUrls}admin/allUsers/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        return res.json();
      })
      .then((data) => {
        console.log("SINGLE USER RESPONSE:", data);
        setUser(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading user...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!user) return <p className="p-6">User not found</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary">User Details</h2>

        <Link
          to="/admin/users"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Users
        </Link>
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img
          src={
            user.prof_pics
              ? `${defaultUrls.replace("api/v1/", "")}${user.prof_pics}`
              : patientimg
          }
          alt={user.fullname}
          className="w-32 h-32 rounded-full object-contain border-2 border-primary"
        />
      </div>

      {/* User Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Detail label="Full Name" value={user.fullname} />
        <Detail label="Email" value={user.email} />
        <Detail
          label="Email Verified At"
          value={user.email_verified_at || "Not Verified"}
        />
        <Detail label="Gender" value={user.gender} />
        <Detail label="Date of Birth" value={user.dob} />
        <Detail label="EHR" value={user.ehr} />
        <Detail label="Preferred Language" value={user.pref_language} />
        <Detail label="Role ID" value={user.role_id} />
        <Detail
          label="Status"
          value={user.status === 1 ? "Active" : "Inactive"}
        />
        <Detail label="Verified" value={user.verified === 1 ? "Yes" : "No"} />
        <Detail
          label="Created At"
          value={new Date(user.created_at).toLocaleString()}
        />
        <Detail
          label="Updated At"
          value={new Date(user.updated_at).toLocaleString()}
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

export default SingleUsers;
