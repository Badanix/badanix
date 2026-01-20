import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function HomeLayout() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="">
    
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default HomeLayout;
