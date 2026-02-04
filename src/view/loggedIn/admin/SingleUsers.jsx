import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { defaultUrls } from "../../../components/Constants";
import patientimg from "../../../assets/icons/patient.png";

/* =====================
   Helper to handle nulls
===================== */
const formatValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "None";
  }
  return value;
};

function SingleUsers() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${defaultUrls}admin/allUsers/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => {
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
    <div className="p-6 bg-white rounded-xl shadow max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary">User Details</h2>
        <Link to="/admin/users" className="text-sm text-primary hover:underline">
          ← Back to Users
        </Link>
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center mb-8">
        <img
          src={
            user.profile_pics
              ? `${defaultUrls.replace("api/v1/", "")}${user.profile_pics}`
              : patientimg
          }
          alt={user.fullname}
          className="w-32 h-32 rounded-full object-contain border-2 border-primary"
        />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Info */}
        <Detail label="Full Name" value={user.fullname} />
        <Detail label="Email" value={user.email} />
        <Detail label="Phone" value={user.phone} />
        <Detail label="Gender" value={user.gender} />
        <Detail label="Date of Birth" value={user.dob} />
        <Detail label="EHR" value={user.ehr} />
        <Detail label="Preferred Language" value={user.pref_lang} />

        {/* Location */}
        <Detail label="Address" value={user.address} />
        <Detail label="City" value={user.city} />
        <Detail label="State" value={user.state} />
        <Detail label="Country" value={user.country} />
        <Detail label="Zip Code" value={user.zip_code} />

        {/* Health Info */}
        <Detail label="Blood Group" value={user.blood_group} />
        <Detail label="Height" value={user.height} />
        <Detail label="Weight" value={user.weight} />
        <Detail label="Allergies" value={user.allergies} />
        <Detail label="Chronic Illnesses" value={user.chronic_illnesses} />
        <Detail label="Current Medications" value={user.current_medications} />
        <Detail label="Mental Health" value={user.mental_health} />
        <Detail label="Past Surgeries" value={user.past_surgeries} />
        <Detail
          label="Family Health History"
          value={user.family_health_history}
        />

        {/* Lifestyle */}
        <Detail label="Smoking Habit" value={user.smoking_habit} />
        <Detail label="Alcohol Consumption" value={user.alcohol_consumption} />
        <Detail label="Exercise Frequency" value={user.exercise_frequency} />
        <Detail label="Sleep Frequency" value={user.sleep_frequency} />
        <Detail label="Diet Preference" value={user.diet_preference} />

        {/* Insurance */}
        <Detail label="Insurance Provider" value={user.insurance_provider} />
        <Detail
          label="Insurance Policy Number"
          value={user.insurance_policy_number}
        />
        <Detail label="Insurance Coverage" value={user.insurance_coverage} />
        <Detail label="Insurance Validity" value={user.insurance_validity} />
        <Detail
          label="Insurance Validity Period"
          value={user.insurance_validity_period}
        />
        <Detail
          label="Type Insurance Provider"
          value={user.type_insurance_provider}
        />

        {/* Finance */}
        <Detail label="Account Balance" value={user.acctbalance} />
        <Detail label="Current Deposit" value={user.current_deposit} />
        <Detail label="Amount Spent" value={user.spent} />
        <Detail label="Cashback Earned" value={user.cashback_earned} />
        <Detail label="Bonus Earned" value={user.bonus_earned} />
        <Detail label="Referral Earned" value={user.ref_earned} />

        {/* System */}
        <Detail
          label="Status"
          value={user.status === 1 ? "Active" : "Inactive"}
        />
        <Detail
          label="Verified"
          value={user.verified === 1 ? "Yes" : "No"}
        />
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

/* =====================
   Reusable Detail Card
===================== */
const Detail = ({ label, value }) => (
  <div className="border rounded-lg p-3">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{formatValue(value)}</p>
  </div>
);

export default SingleUsers;
