import React, { useState, useEffect } from "react";
import { PATIENTSIDEBARMENU } from "../../../../components/Constants";
import UseSideBarMenu from "../../../../hooks/UseSideBarMenu";
import SideBarMenu from "../../../../components/SideBarMenu";
import PatientHeader from "../../../partials/PatientHeader";
import { getUserData } from "../../../../components/Helper";
import Swal from "sweetalert2";

// Import diamond day icons
import day1 from "../../../../assets/diamond/day1.png";
import day2 from "../../../../assets/diamond/day2.png";
import day3 from "../../../../assets/diamond/day3.png";
import day4 from "../../../../assets/diamond/day4.png";
import day5 from "../../../../assets/diamond/day5.png";
import day6 from "../../../../assets/diamond/day6.png";
import day7 from "../../../../assets/diamond/day7.png";

const DiamondCollection = () => {
  const userData = getUserData();
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const token = localStorage.getItem("token");

  const [days, setDays] = useState([
    { id: 1, image: day1, status: "pending" },
    { id: 2, image: day2, status: "pending" },
    { id: 3, image: day3, status: "pending" },
    { id: 4, image: day4, status: "pending" },
    { id: 5, image: day5, status: "pending" },
    { id: 6, image: day6, status: "pending" },
    { id: 7, image: day7, status: "pending" },
  ]);
  const [countdown, setCountdown] = useState(null);

  // ✅ check localStorage on load
  useEffect(() => {
    const lastCollected = localStorage.getItem("diamond_last_collected");
    const streak = localStorage.getItem("diamond_streak");

    if (lastCollected && streak) {
      const lastTime = new Date(parseInt(lastCollected, 10));
      const now = new Date();
      const diff = now - lastTime;

      if (diff < 24 * 60 * 60 * 1000) {
        // still within 24 hrs → lock current day
        setDays((prev) =>
          prev.map((d) =>
            d.id <= parseInt(streak, 10) ? { ...d, status: "collected" } : d
          )
        );
        startCountdown(24 * 60 * 60 * 1000 - diff);
      } else if (diff < 48 * 60 * 60 * 1000) {
        // allow next day collection
        setDays((prev) =>
          prev.map((d) =>
            d.id <= parseInt(streak, 10) ? { ...d, status: "collected" } : d
          )
        );
      } else {
        // missed more than 1 day → reset streak
        resetStreak();
      }
    }
  }, []);

  // ✅ reset streak function
  const resetStreak = () => {
    localStorage.removeItem("diamond_last_collected");
    localStorage.removeItem("diamond_streak");
    setDays((prev) => prev.map((d) => ({ ...d, status: "pending" })));
    setCountdown(null);
    Swal.fire("Missed a day!", "Your streak has been reset to Day 1.", "info");
  };

  // ⏳ start countdown
  const startCountdown = (ms) => {
    let remaining = ms;
    const interval = setInterval(() => {
      remaining -= 1000;
      if (remaining <= 0) {
        clearInterval(interval);
        resetStreak(); // ⬅️ auto reset when timer hits 0
      } else {
        const h = Math.floor(remaining / (1000 * 60 * 60));
        const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((remaining % (1000 * 60)) / 1000);
        setCountdown(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
  };

  // 🎯 handle collection
  const handleCollect = async (dayId) => {
    try {
      const response = await fetch(
        "https://api.digitalhospital.com.ng/api/v1/user/reward",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            day: dayId,
            user_id: userData?.data?.id,
          }),
        }
      );

      const data = await response.json();

      if (
        response.ok &&
        (data.status === "200" || data.message === "Check-in successful!")
      ) {
        Swal.fire({
          title: `Diamond Collected!`,
          html: `<div style="font-size:2rem;">Day ${dayId} 💎</div>`,
          icon: "success",
          showConfirmButton: false,
          timer: 1800,
          background: "#14361d",
          color: "white",
        });

        setDays((prev) =>
          prev.map((day) =>
            day.id === dayId ? { ...day, status: "collected" } : day
          )
        );

        // save streak + time
        localStorage.setItem("diamond_last_collected", Date.now().toString());
        localStorage.setItem("diamond_streak", dayId.toString());

        // start 24h countdown
        startCountdown(24 * 60 * 60 * 1000);
      } else {
        Swal.fire(
          "Error",
          data.message || "Failed to collect diamond",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="md:flex h-screen bg-gray-100">
      <SideBarMenu
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={PATIENTSIDEBARMENU}
      />

      <div
        className={`flex-1 ${
          isSidebarOpen ? "ml-64 " : "ml-0 sm:ml-20"
        } transition-all duration-300`}
      >
        <PatientHeader />

        <main className="p-4 sm:p-6 bg-gray-100 flex-grow">
          <h2 className="text-2xl font-bold mb-6">Diamond Collection</h2>

          {countdown && (
            <div className="text-red-500 font-bold mb-4">
              Next collection in {countdown}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
            {days.map((day) => (
              <div
                key={day.id}
                className="flex flex-col items-center p-4 bg-white shadow-md rounded-xl"
              >
                <img
                  src={day.image}
                  alt={`Day ${day.id}`}
                  className={`w-40 h-20 mb-2 transition-transform duration-300 ${
                    day.status === "collected" ? "scale-110 opacity-80" : ""
                  }`}
                />
                <p className="font-semibold">Day {day.id}</p>

                <button
                  disabled={day.status === "collected" || countdown}
                  onClick={() => handleCollect(day.id)}
                  className={`mt-2 px-4 py-2 rounded-lg btn-sm text-white font-medium transition-all ${
                    day.status === "collected" || countdown
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-secondary"
                  }`}
                >
                  {day.status === "collected" ? "Collected" : "Collect"}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DiamondCollection;
