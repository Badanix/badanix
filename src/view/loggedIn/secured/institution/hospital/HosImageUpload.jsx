import React, { useState } from "react";
import Swal from "sweetalert2";
 import { useNavigate } from "react-router-dom";

const HosImageUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

const navigate = useNavigate();
  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadProfilePicture = async () => {
    if (!imageFile) {
      Swal.fire("No Image Selected", "Please select an image.", "warning");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "User not authenticated.", "error");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("prof_pics", imageFile);

    try {
      const response = await fetch(
        "https://api.digitalhospital.com.ng/api/v1/institution/avatar",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type! Let browser set multipart/form-data boundary
          },
          body: formData,
        }
      );

      if (response.ok) {
        Swal.fire("Success", "Profile picture uploaded successfully!", "success");
        navigate("/institution/hospital/HosDocumentUpload");
      } else {
        const errorData = await response.json();
        Swal.fire("Upload Failed", errorData.message || "Something went wrong.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while uploading the image.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 relative">
      {/* Decorative top-left circle */}
      <div className="bg-[#14361D] rounded-full w-36 h-16 absolute top-4 left-4"></div>

      <h2 className="text-2xl font-semibold mb-8 z-10">Upload Profile Image</h2>

      <div className="flex flex-col items-center z-10">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-36 h-36 rounded-full object-cover mb-4 border border-gray-300"
          />
        ) : (
          <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center mb-4 text-gray-500">
            No Image Selected
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="mb-4"
        />

        <button
          onClick={uploadProfilePicture}
          disabled={loading}
          className={`bg-[#14361D] text-white px-6 py-2 rounded-lg flex items-center justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#856443]"
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          )}
          Upload Image
        </button>
      </div>

      {/* Decorative bottom-right circle */}
      <div className="bg-[#856443] rounded-full w-36 h-16 absolute bottom-4 right-4"></div>
    </div>
  );
};

export default HosImageUpload;
