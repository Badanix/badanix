import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    hospitals: 0,
    pharmacies: 0,
    withdrawals: 0,
  });

  useEffect(() => {
    // 🔁 Replace with real API calls later
    setStats({
      users: 1240,
      doctors: 86,
      hospitals: 14,
      pharmacies: 32,
      withdrawals: 6,
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-primary">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Overview of platform activities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 custom-mini:grid-cols-2 custom-xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Users"
          value={stats.users}
          link="/admin/users"
        />
        <DashboardCard
          title="Doctors"
          value={stats.doctors}
          link="/admin/doctors"
        />
        <DashboardCard
          title="Hospitals"
          value={stats.hospitals}
          link="/admin/hospitals"
        />
        <DashboardCard
          title="Pharmacies"
          value={stats.pharmacies}
          link="/admin/pharmacies"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-custom rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 custom-mini:grid-cols-2 custom-xl:grid-cols-3 gap-4">
          <QuickAction
            label="Verify Doctors"
            to="/admin/doctors"
          />
          <QuickAction
            label="Withdrawal Requests"
            to="/admin/withdrawals"
            badge={stats.withdrawals}
          />
          <QuickAction
            label="Booking Settings"
            to="/admin/settings"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

/* ------------------ Components ------------------ */

const DashboardCard = ({ title, value, link }) => (
  <Link
    to={link}
    className="bg-white shadow-custom rounded-2xl p-6 hover:scale-[1.02] transition-transform"
  >
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-3xl font-bold text-primary mt-2">
      {value}
    </h3>
    <p className="text-tomato text-sm mt-2">View details →</p>
  </Link>
);

const QuickAction = ({ label, to, badge }) => (
  <Link
    to={to}
    className="relative border border-gray-200 rounded-xl p-4 hover:border-primary transition"
  >
    <span className="font-medium text-primary">{label}</span>

    {badge > 0 && (
      <span className="absolute top-2 right-2 bg-text-tomato text-white text-xs px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </Link>
);
