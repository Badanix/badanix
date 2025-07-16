import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import { HOSPITALSIDEBARMENU}from "../../../../../components/Constants";
import DefaultProfile from "../../../../../components/DefaultProfile";
import SideBarMenu from "../../../../../components/SideBarMenu";
import UseSideBarMenu from "../../../../../hooks/UseSideBarMenu";
import HospitalHeader from "../../../../partials/HospitalHeader";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../../../../../components/Helper";

const Profile = () => {
  const userData = getUserData();
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
    match: false,
  });

  useEffect(() => {
    const profileUpdated = userData?.data?.profile_updated;
    if (profileUpdated !== 1) {
      navigate("/institution/hospital/onboarding");
    }
  }, [userData]);

  const validatePassword = (password) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const number = /\d/.test(password);
    const specialChar = /[@$!%*?&]/.test(password);

    setErrors((prev) => ({
      ...prev,
      length,
      uppercase,
      number,
      specialChar,
    }));
  };

  const validateConfirmPassword = (password, confirm) => {
    setErrors((prev) => ({
      ...prev,
      match: password === confirm,
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    validatePassword(newPassword);
    validateConfirmPassword(newPassword, confirmPassword);

    const isValid = Object.values(errors).every((val) => val);
    if (!isValid) {
      Swal.fire("Error", "Password validation failed. Check your inputs.", "error");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Unauthorized", "Please login again", "warning");
      return;
    }

    try {
      const res = await fetch("https://api.digitalhospital.com.ng/api/v1/institution/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldpassword: oldPassword,
          password: newPassword,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", "Password changed successfully!", "success").then(() => {
          navigate("/auth-login");
        });
      } else {
        Swal.fire("Error", data.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Error", "Unexpected error. Try again.", "error");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBarMenu
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={HOSPITALSIDEBARMENU}
      />

      {/* Main Content */}
      <div
        className={`flex-1 ml-${isSidebarOpen ? "64" : "0 sm:ml-20"} transition-all duration-300`}
      >
        <HospitalHeader />

        <main className="p-6 bg-gray-100 flex-grow">
          <Link to="/institution/hospital/Dashboard" className="underline flex space-x-2 text-secondary my-4">
            <FaArrowLeft className="mt-1 text-primary" />
            <span>Back to Home</span>
          </Link>

          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary-dark transition"
            >
              Change Password
            </button>
          </div>

          <DefaultProfile officeName={userData?.data?.institution_name} />
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form className="space-y-4" onSubmit={handleResetPassword}>
              <div>
                <label className="block text-sm font-medium">Current Password</label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border rounded"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">New Password</label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border rounded"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border rounded"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(newPassword, e.target.value);
                  }}
                />
              </div>

              <div className="text-sm text-red-500 space-y-1">
                {!errors.length && <div>Password must be at least 8 characters</div>}
                {!errors.uppercase && <div>Must include an uppercase letter</div>}
                {!errors.number && <div>Must include a number</div>}
                {!errors.specialChar && <div>Must include a special character (@$!%*?&)</div>}
                {!errors.match && <div>Passwords do not match</div>}
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
