import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: "Prime",
    name: "Prime Stone",
    email: "primestonept1@gmail.com",
    password: "Password@27",
    confirmPassword: "Password@27",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(
      "https://api.digitalhospital.com.ng/api/v1/admin/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    // Read response as text first
    const text = await response.text();
    console.log("Raw response:", text);

    let data;
    try {
      // Try to parse JSON
      data = JSON.parse(text);
    } catch {
      // If not JSON, fallback to plain text
      data = { message: text };
    }

    if (!response.ok) {
      setError(data.message || "Registration failed");
    } else {
      setSuccess("Admin registered successfully!");
      setFormData({
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setError(err.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-Roboto px-4">
      <div className="w-full max-w-md bg-white shadow-custom rounded-2xl p-6 custom-xs:p-7 custom-md:p-8 m-5">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">
            Admin Registration
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create an administrator account
          </p>
        </div>

        {/* Error/Success messages */}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="admin123"
              className="input input-bordered w-full focus:border-primary focus:outline-none"
              required
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="input input-bordered w-full focus:border-primary focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="input input-bordered w-full focus:border-primary focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input input-bordered w-full pr-10 focus:border-primary focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="input input-bordered w-full pr-10 focus:border-primary focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn w-full primary-bgcolor text-black transition-all duration-300"
          >
            {loading ? "Registering..." : "Register Admin"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/admin/login"
              className="text-tomato font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
