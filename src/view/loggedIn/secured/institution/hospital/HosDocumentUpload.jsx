import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const HosDocumentUpload = () => {
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
    if (uploadedDocuments.some((doc) => doc === null)) {
      Swal.fire({
        icon: "error",
        title: "Missing Documents",
        text: "All required documents (*) must be uploaded.",
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: "You are not logged in.",
        });
        return;
      }

      const formData = new FormData();
      uploadedDocuments.forEach((doc, index) => {
        formData.append("docs[]", doc, doc.name || `document_${index}.jpg`);
      });

      const response = await fetch(
        "http://api.digitalhospital.com.ng/api/v1/institution/verify",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      // Check if message contains "success" (case-insensitive)
      if (response.ok && data.message?.toLowerCase().includes("success")) {
        Swal.fire({
          icon: "success",
          title:
            "Documents uploaded successfully!\n\nWait for verification.\nBadanix verification takes up to 15 days.",
          text: data.message,
        }).then(() => navigate("/auth-login"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: data.message || "Failed to upload documents.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: error.message || "Something went wrong. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const documentFields = [
    "Hospital Registration Certificate",
    "Operating License",
    "Business Registration Certificate",
    "Medical Director’s License",
    "Accreditation Certificates",
    "List of Licensed Medical Practitioners",
    "Medical Equipment Certification",
    "Proof of National Identification",
    "Hospital Facility Photos",
    "Official Hospital Seal or Stamp",
    "Picture of the Principal Owner of the Company",
    "Front Pictures of the Company with Signage",
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-[#856443] mb-4">
        Upload Required Documents
      </h2>

      <button
        onClick={() => setModalVisible(true)}
        className="bg-[#14361d] text-white px-4 py-2 rounded mb-6"
      >
        View Instructions
      </button>

      <div className="space-y-4">
        {documentFields.map((name, index) => (
          <div key={index} className="flex flex-col gap-2">
            <label className="font-semibold capitalize">
              {name.replace(/_/g, " ")}
            </label>
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
        className="bg-[#14361d]  text-white px-6 py-2 mt-6 rounded hover:bg-[#14361d] disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Submit Documents"}
      </button>

      {/* Modal Instructions */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl w-full p-6 rounded-md shadow-md overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4 text-green-800">
              BADANIX Online Registration for Hospitals
            </h2>

            <div className="space-y-4 text-sm text-gray-800">
              <p>Dear Healthcare Provider,</p>
              <p>
                Thank you for your interest in registering your hospital on
                BADANIX. To ensure high standards in medical practice and
                patient care, all hospitals must upload the required documents
                for verification.
              </p>
              <p>
                To operate and be recognized as a registered hospital with
                BADANIX, your facility must be licensed by the Ministry of
                Health, Medical Regulatory Body, or an Accrediting Agency in
                your country. Additionally, your hospital must be officially
                registered as a business with the relevant regulatory authority,
                such as:
              </p>

              <div>
                <h3 className="font-semibold">
                  Company Registration Authorities:
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>USA: Secretary of State (varies by state) & U.S. SEC</li>
                  <li>UK: Companies House</li>
                  <li>Canada: Corporations Canada & Provincial Registrars</li>
                  <li>Australia: ASIC</li>
                  <li>India: MCA</li>
                  <li>South Africa: CIPC</li>
                  <li>Ghana: Registrar General's Department (RGD)</li>
                  <li>Kenya: Business Registration Service (BRS)</li>
                  <li>
                    UAE: Department of Economic Development (DED) & Free Zones
                  </li>
                  <li>
                    China: State Administration for Market Regulation (SAMR)
                  </li>
                  <li>Nigeria: Corporate Affairs Commission (CAC)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">
                  Required Documents for Hospital Registration:
                </h3>
                <ul className="list-decimal pl-6 space-y-1">
                  <li>
                    <strong>Hospital Registration Certificate:</strong> Proof of
                    registration with the Ministry of Health or Accrediting
                    Body.
                  </li>
                  <li>
                    <strong>Business Registration Certificate:</strong>{" "}
                    Certified copy of business registration.
                  </li>
                  <li>
                    <strong>Medical Director’s License:</strong> Issued by your
                    country’s medical council.
                  </li>
                  <li>
                    <strong>Accreditation Certificates (Optional):</strong> From
                    JCI, NHRA, COHSASA, or similar agencies.
                  </li>
                  <li>
                    <strong>List of Licensed Medical Practitioners:</strong>{" "}
                    Names and license numbers of doctors, nurses, etc.
                  </li>
                  <li>
                    <strong>
                      Medical Equipment Certification (If Applicable):
                    </strong>{" "}
                    For major hospital equipment.
                  </li>
                  <li>
                    <strong>Proof of National Identification:</strong> Valid ID
                    of the hospital’s authorized representative.
                  </li>
                  <li>
                    <strong>Hospital Facility Photos:</strong> Exterior,
                    reception, rooms, and equipment.
                  </li>
                  <li>
                    <strong>Official Hospital Seal or Stamp:</strong> Scanned
                    copy of the seal/stamp.
                  </li>
                  <li>
                    <strong>Picture of the Principal Owner:</strong> Clear photo
                    of the owner.
                  </li>
                  <li>
                    <strong>Front Pictures of the Company:</strong> Showing
                    signage with registered name.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">
                  Document Verification Timeline:
                </h3>
                <p>
                  The BADANIX verification process takes 15 days from the date
                  of submission. Ensure all documents are clear and certified to
                  avoid delays.
                </p>
              </div>

              <p>
                You will receive an email notification once your hospital has
                been successfully verified.
              </p>

              <div>
                <h3 className="font-semibold">For Assistance:</h3>
                <p>
                  Please contact BADANIX Support via email at{" "}
                  <a
                    href="mailto:support@badanix.com"
                    className="text-blue-600 underline"
                  >
                    support@badanix.com
                  </a>{" "}
                  or via live chat.
                </p>
              </div>

              <p>
                We look forward to welcoming your hospital to the BADANIX
                network!
              </p>
              <p>
                Best Regards,
                <br />
                BADANIX Registration Team
              </p>
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

export default HosDocumentUpload;
