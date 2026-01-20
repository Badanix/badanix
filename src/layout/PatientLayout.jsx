import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import PatientMenu from "../view/partials/PatientMenu";
import { NAMES, IMAGE } from "../components/Constants";
import { Link } from "react-router-dom";

function PatientLayout() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="">
      <div className="flex sm:hidden items-center justify-between bg-white p-4 shadow sticky top-0 z-50">
        <button onClick={() => setMobileOpen(true)}>
          <FaBars size={22} className="text-primary" />
        </button>
        <Link to="/">
          <img
            src={IMAGE.site_logo || NAMES.LOGO}
            alt="Logo"
            className="h-10 w-40"
          />
        </Link>
      </div>

      <PatientMenu
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main
        className={`
    transition-all duration-300 p-4
    ml-0
    ${collapsed ? "sm:ml-20" : "sm:ml-[200px]"}
  `}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default PatientLayout;
