import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LabDocumentUpload = () => {
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
    "Bachelor’s Degree in Medical Laboratory Science (MLS)",
    "Practice License",
    "Certification",
    "Medical Fitness Report",
    "Proof of National Identification",
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
        className="bg-[#14361d] p-2 mb-4"
        style={{ color: "white" }}
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
              BADANIX Online Registration for e-Medical Laboratory Scientists
            </h2>

            <div className="space-y-4 text-sm text-gray-800">
              <p>Dear e-Medical Laboratory Scientist,</p>

              <p>
                Thank you for your interest in registering as an online medical
                laboratory scientist on BADANIX. To ensure high standards in
                medical laboratory practice, all applicants must upload the
                following documents for verification.
              </p>

              <p>
                To practice as a Medical Laboratory Scientist with BADANIX, you
                must be registered with the Medical Laboratory Science Council
                or the equivalent regulatory body in your country. You may also
                need to register your laboratory facility with the appropriate
                business registration agency in your country, such as:
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
                <p>
                  Ensure you register your laboratory business with the
                  appropriate authority in your country.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Required Documents for Registration:
                </h3>
                <ul className="list-decimal pl-6 space-y-1">
                  <li>
                    <strong>
                      Bachelor’s Degree in Medical Laboratory Science (MLS):
                    </strong>{" "}
                    Certified copy from an accredited institution.
                  </li>
                  <li>
                    <strong>Practice License:</strong> Valid license issued by
                    your country’s Medical Laboratory Science Council or
                    equivalent.
                  </li>
                  <li>
                    <strong>Certification (Optional):</strong> Specialist
                    certifications like ASCP (USA), HCPC (UK), or equivalent.
                  </li>
                  <li>
                    <strong>Medical Fitness Report:</strong> Issued within the
                    last two months.
                  </li>
                  <li>
                    <strong>Proof of National Identification:</strong>
                    <ul className="list-disc pl-6">
                      <li>International Passport</li>
                      <li>Driver’s License</li>
                      <li>National Identity Number (NIN)</li>
                      <li>Social Security Number (SSN) – if applicable</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Full-Size Picture of Yourself:</strong> Recent photo
                    in professional attire.
                  </li>
                  <li>
                    <strong>Passport Photograph:</strong> No cap, scarf, or
                    glasses; both ears visible.
                  </li>
                  <li>
                    <strong>Picture of the Principal Owner:</strong> Clear image
                    of the company’s principal owner.
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
                  of submission. Ensure all documents uploaded are clear,
                  legible, and certified to avoid delays.
                </p>
              </div>

              <p>
                You will receive an email notification once your documents have
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
                We look forward to welcoming you as a BADANIX online medical
                laboratory scientist!
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

export default LabDocumentUpload;
