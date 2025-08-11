import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DoctorDocumentUpload = () => {
  const docNames = [
    "Medical Degree Certificate (MBBS)",
    "Specialist Certificates",
    "Medical Practice License",
    "Training Certificates",
    "Letter of Recommendation",
    "Medical Fitness Report",
    "Proof of National Identification",
    "Full-Size Picture of Yourself",
    "Passport Photograph",
    "Verification Timeline Consent",
  ];

   const [modalVisible, setModalVisible] = useState(false);

  const [uploadedDocuments, setUploadedDocuments] = useState(
    Array(10).fill(null)
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedDocs = [...uploadedDocuments];
      updatedDocs[index] = file;
      setUploadedDocuments(updatedDocs);
    }
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
        "http://api.digitalhospital.com.ng/api/v1/doctor/verify",
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
          title: "Documents uploaded successfully!\n\nWait for verification.\nBadanix verification takes up to 15 days.",
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-[#856443] mb-4">
        Upload Required Documents
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* {uploadedDocuments.map((doc, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Document {index + 1} *
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(index, e)}
              className="mt-1 p-2 border rounded-md"
            />
          </div>
        ))} */}

        {uploadedDocuments.map((doc, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              {docNames[index]} *
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(index, e)}
              className="mt-1 p-2 border rounded-md"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2 rounded-md text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#14361d] hover:bg-[#14361d]"
          }`}
        >
          {loading ? "Uploading..." : "Submit Documents"}
        </button>

        <button
          onClick={() => setModalVisible(true)}
          className="bg-[#14361d] p-2" style={{color: "white"}}
        >
          View Instructions
        </button>

        {/* Modal */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-lg p-6 relative shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">
                REQUIREMENTS FOR e-DOCTORS REGISTRATION
              </h2>

              <h3 className="font-semibold mb-3">
                BADANIX Online Practitioner Registration: Required Documentation
                & Verification Process
              </h3>

              <p className="mb-3">
                Dear Practitioner,
                <br />
                Thank you for your interest in joining BADANIX as an online
                practitioner. To ensure compliance and maintain the highest
                standards of medical practice, we require all applicants to
                upload the following documents for verification.
              </p>

              <h4 className="font-semibold mb-2">
                Required Documents for Registration:
              </h4>

              <ol className="list-decimal list-inside mb-4 space-y-2">
                <li>
                  <b>Medical Degree Certificate (MBBS):</b> A certified copy of
                  your Bachelor of Medicine, Bachelor of Surgery (MBBS) degree
                  or its equivalent from an accredited institution.
                </li>
                <li>
                  <b>Specialist Certificates:</b> A certified copy of any
                  specialist certification you hold (e.g., Fellowship, Board
                  Certification, or Diploma in a medical specialty).
                </li>
                <li>
                  <b>Medical Practice License:</b> A valid practicing license
                  issued by the Medical and Dental Council of your country.
                </li>
                <li>
                  <b>Training Certificates:</b> A Certificate of Completion of
                  Training (CCT) or a Certificate of Eligibility for Specialist
                  Registration (CESR), if applicable.
                </li>
                <li>
                  <b>Letter of Recommendation:</b> A recommendation letter from
                  a former or current supervisor, co-worker, or mentor in the
                  same industry, verifying your competency and ethical standing.
                </li>
                <li>
                  <b>Medical Fitness Report:</b> A medical check-up report
                  issued within the last two (2) months, confirming you are fit
                  to practice medicine.
                </li>
                <li>
                  <b>Proof of National Identification:</b> A copy of any of the
                  following valid national identification documents:
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li>International Passport</li>
                    <li>Driver’s License</li>
                    <li>National Identity Number (NIN)</li>
                    <li>Social Security Number (SSN) (if applicable)</li>
                  </ul>
                </li>
                <li>
                  <b>Full-Size Picture of Yourself:</b> Upload a recent
                  full-size photo of yourself in professional attire.
                </li>
                <li>
                  <b>Passport Photograph:</b> A passport-size photograph
                  ensuring that no cap, scarf, or glasses are worn, and both
                  ears are clearly visible.
                </li>
              </ol>

              <h4 className="font-semibold mb-2">
                Document Verification Timeline:
              </h4>
              <p className="mb-4">
                The BADANIX verification process takes 15 days from the date of
                submission. Ensure that all documents uploaded are clear,
                legible, and certified where required to avoid delays.
              </p>

              <p className="mb-4">
                You will receive an in-app and an email notification once your
                documents have been successfully verified.
              </p>

              <h4 className="font-semibold mb-2">For Assistance:</h4>
              <p className="mb-4">
                For further assistance, please contact BADANIX Support via
                email:{" "}
                <a
                  href="mailto:support@badanix.com"
                  className="text-blue-600 underline"
                >
                  support@badanix.com
                </a>{" "}
                or live chat.
              </p>

              <p className="mb-4">
                We look forward to welcoming you as a BADANIX online
                practitioner!
              </p>
              <p>Best Regards,</p>
              <p>BADANIX Registration Team</p>

              <button
                onClick={() => setModalVisible(false)} style={{backgroundColor: "red"}}
                className="mt-6 px-4 py-2 text-white rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDocumentUpload;
