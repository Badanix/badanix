import { APIURLS, DOCTORSIDEBARMENU } from "../../../../components/Constants";
import SideBarMenu from "../../../../components/SideBarMenu";
import UseSideBarMenu from "../../../../hooks/UseSideBarMenu";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-multi-date-picker";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { FaUserDoctor } from "react-icons/fa6";
import DoctorsHeader from "../../../partials/DoctorsHeader";
import { getUserData } from "../../../../components/Helper";

const Calendar = () => {
  const userData = getUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalEvents, setModalEvents] = useState([]);
  const [eventDays, setEventDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const apiCalendarSubmit = APIURLS.APIDOCTORCALENDARSUBMIT;
  const token = localStorage.getItem("token");

  const [newEvent, setNewEvent] = useState({ days: [], user_role: "doctor" });
  const today = new Date();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const getDoctorCalendar = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiCalendarSubmit, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const text = await response.text();
      if (!text) throw new Error("Empty response");

      const result = JSON.parse(text);
      const filteredEvents = result.data.filter((event) => new Date(event.day) >= today);
      const sortedEvents = filteredEvents.sort((a, b) => new Date(a.day) - new Date(b.day));

      setModalEvents(sortedEvents);
      setEventDays(sortedEvents.map((e) => new Date(e.day).toLocaleDateString()));
      setError(null);
    } catch (err) {
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctorCalendar();
  }, []);

const submitEvent = async (e) => {
  e.preventDefault();

  if (!newEvent.days.length) {
    Swal.fire("No dates selected", "Please pick at least one date.", "warning");
    return;
  }

  try {
    const response = await fetch("https://api.digitalhospital.com.ng/api/v1/doctor/available", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_role: newEvent.user_role,
        day: newEvent.days,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Submission error:", errorData);
      throw new Error(errorData.message || "Submission failed");
    }

    Swal.fire("Success", "Availability submitted.", "success");
    setNewEvent({ days: [], user_role: "doctor" });
    getDoctorCalendar();
    setIsModalOpen(false);
  } catch (err) {
    Swal.fire("Error", err.message || "Could not save availability.", "error");
  }
};



  const generateCalendarDays = () => {
    let days = [];
    let currentDay = startDate;
    while (currentDay <= endDate) {
      days.push(currentDay);
      currentDay = addDays(currentDay, 1);
    }
    return days;
  };

  const isEventDay = (day) => eventDays.includes(new Date(day).toLocaleDateString());
  const isPastDate = (day) => isBefore(day, today);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBarMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} menuItems={DOCTORSIDEBARMENU} />

      <div className={`flex-1 ml-${isSidebarOpen ? "64" : "0 sm:ml-20"} transition-all duration-300`}>
        <DoctorsHeader />

        <main className="p-4 sm:p-6 bg-gray-100 flex-grow">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="w-full lg:w-8/12 space-y-4">
              <div className="shadow-xl rounded-xl p-4 bg-white">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800">Set your Availability</h2>
                  <button
                    className="mt-2 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Set Now
                  </button>
                </div>
              </div>

              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                    <h2 className="text-xl font-semibold text-center mb-4">Create Availability</h2>
                    <form onSubmit={submitEvent}>
                      <DatePicker
                        multiple
                        value={newEvent.days}
                        onChange={(dates) => {
                          const formatted = dates.map((d) => d.toDate().toISOString().split("T")[0]);
                          setNewEvent({ ...newEvent, days: formatted });
                        }}
                        minDate={new Date()}
                        format="YYYY-MM-DD"
                        className="w-full mb-4"
                      />
                      <div className="flex justify-end">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 mr-2 bg-gray-200 rounded-lg">
                          Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-secondary text-white rounded-lg">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="font-bold text-lg mb-4">
                  Dr. {userData?.data?.fullname?.split(" ")[0] || ""} availability table
                </h2>
                {loading ? (
                  <div className="text-center text-gray-500">Loading...</div>
                ) : error ? (
                  <div className="text-center text-red-500">{error}</div>
                ) : modalEvents.length === 0 ? (
                  <p className="text-gray-500">No events scheduled.</p>
                ) : (
                  <ul className="list-disc pl-4">
                    {modalEvents.map((e, i) => (
                      <li key={i}>{e.day}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="w-full lg:w-4/12 space-y-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <header className="flex justify-between items-center mb-4">
                  <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}><FaChevronCircleLeft /></button>
                  <h1 className="text-xl font-semibold">{format(currentMonth, "MMMM yyyy")}</h1>
                  <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}><FaChevronCircleRight /></button>
                </header>
                <div className="grid grid-cols-7 text-center text-gray-600 font-medium mb-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <div key={day}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays().map((day, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg text-sm border text-center ${
                        isEventDay(day) ? "bg-primary text-white" : "bg-white"
                      } ${isPastDate(day) ? "text-gray-400" : "text-black"}`}
                    >
                      {format(day, "d")}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calendar;