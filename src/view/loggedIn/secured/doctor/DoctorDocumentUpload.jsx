import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const DoctorDocumentUpload = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState(Array(10).fill(null));
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
        icon: 'error',
        title: 'Missing Documents',
        text: 'All required documents (*) must be uploaded.',
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'You are not logged in.',
        });
        return;
      }

      const formData = new FormData();
      uploadedDocuments.forEach((doc, index) => {
        formData.append(`file${index}`, doc, doc.name || `document_${index}.jpg`);
      });

      const response = await fetch('http://api.digitalhospital.com.ng/api/v1/doctor/verify', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful',
          text: 'Documents uploaded successfully! Wait for verification (up to 15 days).',
        }).then(() => navigate('/auth-login'));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: data.message || 'Failed to upload documents.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: error.message || 'Something went wrong. Try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Upload Required Documents</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {uploadedDocuments.map((doc, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Document {index + 1} *</label>
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
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Uploading...' : 'Submit Documents'}
        </button>

        <button
          onClick={() => Swal.fire({
            title: 'Instructions',
            html: `
              <p class="text-left">
                Upload the following documents:<br/>
                - Medical Degree<br/>
                - Specialist Certificate<br/>
                - Practice License<br/>
                - Training Certificate<br/>
                - Recommendation Letter<br/>
                - Fitness Report<br/>
                - National ID<br/>
                - Full-size Photo<br/>
                - Passport Photo
              </p>
            `,
            confirmButtonText: 'Close',
          })}
          className="text-blue-600 underline"
        >
          View Instructions
        </button>
      </div>
    </div>
  );
};

export default DoctorDocumentUpload;
