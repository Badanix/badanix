import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("primestonept1@gmail.com");
  const [password, setPassword] = useState("Password@27");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://api.digitalhospital.com.ng/api/v1/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
      } else {
        setError("");
        // Optional: save token to localStorage/sessionStorage
        if (data.token) localStorage.setItem("adminToken", data.token);

        navigate("/admin/dashboard"); // Go to dashboard
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-Roboto px-4">
      <div className="w-full max-w-md bg-white shadow-custom rounded-2xl p-6 custom-xs:p-7 custom-md:p-8 m-5">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">Enter your credentials to access your account</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 text-center p-2 rounded mb-4">{error}</div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              className="input input-bordered w-full focus:border-primary focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="1234"
                className="input input-bordered w-full pr-10 focus:border-primary focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            className="btn w-full primary-bgcolor text-black transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/admin/register" className="text-tomato font-medium hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
