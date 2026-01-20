import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-30 h-full w-64 bg-primary text-white p-6
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col space-y-4">
          <Link to="/admin/users" className="hover:text-secondary">
            Users
          </Link>
          <Link to="/admin/doctors" className="hover:text-secondary">
            Doctors
          </Link>
          <Link to="/admin/hospitals" className="hover:text-secondary">
            Hospitals
          </Link>
          <Link to="/admin/pharmacies" className="hover:text-secondary">
            Pharmacies
          </Link>
          <Link to="/admin/withdrawals" className="hover:text-secondary">
            Withdrawals
          </Link>
          <Link to="/admin/transactions" className="hover:text-secondary">
            Transactions
          </Link>
          <Link to="/admin/bookings" className="hover:text-secondary">
            Bookings
          </Link>
          <Link to="/admin/settings" className="hover:text-secondary">
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 hover:bg-red-700 py-2 rounded"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-4 md:px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-primary focus:outline-none"
          >
            {/* Hamburger */}
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <h1 className="text-lg font-semibold text-primary">
            Admin Dashboard
          </h1>

          <div className="text-sm text-gray-600">
            Welcome, Admin
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
