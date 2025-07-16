import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PharmDocumentUpload = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (index, file) => {
    const updatedDocs = [...uploadedDocuments];
    updatedDocs[index] = file;
    setUploadedDocuments(updatedDocs);
  };

  const handleSubmit = async () => {
  const missingDocuments = documentFields
    .map((name, index) => (!uploadedDocuments[index] ? name.replace(/_/g, " ") : null))
    .filter((doc) => doc !== null);

  if (missingDocuments.length > 0) {
    Swal.fire(
      "Missing Documents",
      `Please upload the following required document(s):\n- ${missingDocuments.join("\n- ")}`,
      "error"
    );
    return;
  }

  setLoading(true);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Unauthorized", "Please login to continue.", "error");
      return;
    }

    const formData = new FormData();
    uploadedDocuments.forEach((doc) => {
      formData.append("documents[]", doc);
    });

    const response = await fetch("http://api.digitalhospital.com.ng/api/v1/doctor/verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire("Success", "Documents uploaded successfully. Verification takes up to 15 days.", "success");
      setUploadedDocuments([]);
       navigate("/auth-login");
    } else {
      Swal.fire("Error", data.message || "Failed to upload documents.", "error");
    }
  } catch (error) {
    Swal.fire("Error", error.message || "An error occurred.", "error");
  } finally {
    setLoading(false);
  }
};


  const documentFields = [
    "pharmacy_degree",
    "practice_license",
    "specialist_certificates",
    "fitness_report",
    "national_id",
    "full_size_picture",
    "passport_photo",
    "principal_owner",
    "front_picture"
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Upload Required Documents</h2>

      <button
        onClick={() => setModalVisible(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        View Instructions
      </button>

      <div className="space-y-4">
        {documentFields.map((name, index) => (
          <div key={index} className="flex flex-col gap-2">
            <label className="font-semibold capitalize">{name.replace(/_/g, " ")}</label>
            <input
              type="file"
              name={name}
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(index, e.target.files[0])}
              className="border p-2 rounded"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 mt-6 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Submit Documents"}
      </button>

          {/* Modal Instructions */}
    {modalVisible && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white max-w-3xl w-full p-6 rounded-md shadow-md overflow-y-auto max-h-[90vh]">
      <h2 className="text-xl font-bold mb-4 text-green-800">
        BADANIX Online Registration for Pharmacy Practitioners
      </h2>

      <div className="space-y-4 text-sm text-gray-800">
        <p>Dear Pharmacist,</p>
        <p>
          Thank you for your interest in registering as an online pharmacy practitioner on BADANIX. To maintain high standards of pharmaceutical practice, all applicants must upload the following documents for verification.
        </p>

        <div>
          <h3 className="font-semibold">Company Registrations:</h3>
          <p>Documentation or business registrations in your country may include the following agencies:</p>
          <ul className="list-decimal pl-6 space-y-1">
            <li>USA – Secretary of State (SOS) Offices & U.S. SEC.</li>
            <li>UK – Companies House.</li>
            <li>Canada – Corporations Canada & Provincial Registrars.</li>
            <li>Australia – Australian Securities and Investments Commission (ASIC).</li>
            <li>India – Ministry of Corporate Affairs (MCA).</li>
            <li>South Africa – Companies and Intellectual Property Commission (CIPC).</li>
            <li>Ghana – Registrar General's Department (RGD).</li>
            <li>Kenya – Business Registration Service (BRS).</li>
            <li>UAE – Department of Economic Development (DED) & Free Zone Authorities.</li>
            <li>China – State Administration for Market Regulation (SAMR).</li>
            <li>Nigeria – Corporate Affairs Commission (CAC).</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Required Documents for Registration:</h3>
          <ul className="list-decimal pl-6 space-y-1">
            <li><strong>Pharmacy Degree Certificate (BPharm, PharmD, or Equivalent):</strong> A certified copy from an accredited institution.</li>
            <li><strong>Pharmacist Practice License:</strong> A valid license issued by the regulatory body in your country.</li>
            <li><strong>Specialist Certificates (If Applicable – Optional):</strong> Certification in Clinical Pharmacy, Industrial Pharmacy, etc.</li>
            <li><strong>Medical Fitness Report:</strong> Issued within the last two months.</li>
            <li><strong>Proof of National Identification:</strong> 
              <ul className="list-disc pl-6 mt-1">
                <li>International Passport</li>
                <li>Driver’s License</li>
                <li>National Identity Number (NIN)</li>
                <li>Social Security Number (SSN) (if applicable)</li>
              </ul>
            </li>
            <li><strong>Full-Size Picture of Yourself:</strong> In professional attire.</li>
            <li><strong>Passport Photograph:</strong> No cap, scarf, or glasses; both ears visible.</li>
            <li><strong>Picture of the Principal Owner:</strong> A clear image of the company’s principal owner.</li>
            <li><strong>Front Pictures of the Company:</strong> Clearly showing the signage with the registered company name.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Document Verification Timeline:</h3>
          <p>The BADANIX verification process takes 15 days from submission. Ensure all documents are clear and certified to avoid delays.</p>
        </div>

        <p>You will receive an email notification once your documents have been successfully verified.</p>

        <div>
          <h3 className="font-semibold">For Assistance:</h3>
          <p>
            For further assistance, please contact BADANIX Support via email:{" "}
            <a href="mailto:support@badanix.com" className="text-blue-600 underline">
              support@badanix.com
            </a>{" "}
            or live chat.
          </p>
        </div>

        <p>We look forward to welcoming you as a BADANIX online pharmacy practitioner!</p>
        <p>Best Regards,<br />BADANIX Registration Team</p>
      </div>

      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={() => setModalVisible(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default PharmDocumentUpload;
