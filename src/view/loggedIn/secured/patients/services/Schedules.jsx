import {
  defaultUrl,
  PATIENTSIDEBARMENU,
} from "../../../../../components/Constants";
import SideBarMenu from "../../../../../components/SideBarMenu";
import UseSideBarMenu from "@hooks/UseSideBarMenu";
import { SiTicktick } from "react-icons/si";
import { FaArrowLeft, FaCalendarAlt, FaVideo } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdCancel, MdClose } from "react-icons/md";
import VideoCall from "../../../../../components/VideoCall";
import { useAppointments, useCancelBooking } from "./ServicesForm";
import {
  currentDate,
  currentTime,
  formatDate,
  formatDateWithOrdinalSuffix,
  formatTime,
} from "../../../../../components/Helper";
import { IoAlarmSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PatientHeader from "../../../../partials/PatientHeader";
import Swal from "sweetalert2";

const Schedules = () => {
  const navigate = useNavigate();

  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();

  const appointmentsPerPage = 2;

  const [currentPage, setCurrentPage] = useState(1);

  const { enrichedAppointmentData } = useAppointments();

  const [cancel, setCancel] = useState(false);

  const [activeTab, setActiveTab] = useState("pending");
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [modalType, setModalType] = useState(null);
  const { cancelBooking, loading, error } = useCancelBooking();
  const [reason, setReason] = useState("");

  const paginatedAppointments = enrichedAppointmentData.filter(
    (appointment) => {
      if (activeTab === "pending") return appointment.status === 0;
      if (activeTab === "upcoming") return appointment.status === 1;
      if (activeTab === "completed") return appointment.status === 2;
      if (activeTab === "cancelled") return appointment.status === 3;
      return true;
    }
  );

  const handleToggle = (status) => {
    setActiveTab(status);
  };

  const openModal = (schedule, type) => {
    setSelectedSchedule(schedule);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedSchedule(null);
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const filteredAppointments = paginatedAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const totalPages = Math.ceil(
    paginatedAppointments.length / appointmentsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handleCancelSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSchedule) return;
    try {
      const result = await cancelBooking({
        id: selectedSchedule.id,
        reason,
        status: 3,
      });

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Appointment cancelled Successfully!",
          text: `You have successfully cancelled appointment with ${
            selectedSchedule.fullname
          } with date set on ${formatDate(selectedSchedule.date)}.`,
        });

        setReason("");
        setSelectedSchedule(null);

        closeModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Error: ${result.error}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unexpected Error!",
        text: error.message || "An unexpected error occurred.",
      });
    }
  };

  useEffect(() => {
    if (cancel) {
      handleCancelSubmit();
      setCancel(false);
    }
  }, [cancel]);

  const handleSubmit = () => {
    setCancel(true);
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBarMenu
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={PATIENTSIDEBARMENU}
      />

      <div
        className={`flex-1 ml-${
          isSidebarOpen ? "64" : "0 sm:ml-20"
        } transition-all duration-300`}
      >
        <PatientHeader />

        {/* Dashboard Content */}
        <main className="p-6 bg-gray-100 flex-grow">
          <div className="  md:w-2/3 md:mx-auto mb-0">
            <div className="flex justify-between items-center mb-4 mt-[60px] md:mt-3 text-primary">
              <FaArrowLeft
                className="text-xl cursor-pointer"
                onClick={() => navigate(-1)}
              />

              <h2 className="text-2xl font-semibold flex-grow text-center">
                Appointments
              </h2>
              {/* <FaSearch size={24} className="text-primary cursor-pointer" /> */}
            </div>

            <div className="flex mb-6  space-x-2 p-2  overflow-x-scroll md:overflow-x-auto scrollbar-thin ">
              {["pending", "upcoming", "completed", "cancelled"].map(
                (status) => (
                  <button
                    key={status}
                    className={` rounded-full   flex-1 py-2 px-3 font-semibold ${
                      activeTab === status
                        ? "bg-secondary text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => handleToggle(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                )
              )}
            </div>

            <div>
              {filteredAppointments.length === 0 ? (
                <p>
                  No{" "}
                  {activeTab === "pending"
                    ? "Pending"
                    : activeTab === "upcoming"
                    ? "Upcoming"
                    : activeTab === "completed"
                    ? "Completed"
                    : activeTab === "cancelled"
                    ? "Cancelled"
                    : "Appointments"}{" "}
                  appointments
                </p>
              ) : (
                filteredAppointments
                  .sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    const dateComparison = dateA - dateB;
                    if (dateComparison !== 0) {
                      return dateComparison;
                    }

                    const timeA = a.start_time || "";
                    const timeB = b.start_time || "";
                    return timeA.localeCompare(timeB);
                  })
                  .map((schedule) => {
                    const formattedDate = `${new Date(
                      schedule.date
                    ).getFullYear()}-${(new Date(schedule.date).getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}-${new Date(schedule.date)
                      .getDate()
                      .toString()
                      .padStart(2, "0")}`;

                    return (
                      <div
                        key={schedule.id}
                        className="w-[21rem] custom-xs:w-80  custom-sm:w-full  bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col"
                      >
                        {/* Name, Title, and Image */}
                        <div className="flex justify-between px-9 items-center mb-4">
                          <div className="flex-1 ml-7">
                            <h3 className="text-md font-semibold text-primary capitalize">
                              {schedule.fullname}
                            </h3>
                            <p className="text-gray-400 capitalize">
                              {schedule.specialization?.replace(/s$/, "") ||
                                "No specialization"}
                            </p>
                          </div>
                          <img
                            src={`${defaultUrl}${schedule.prof_pics}`}
                            alt={schedule.name}
                            className="w-[85px] h-[85px] rounded-full object-cover"
                          />
                        </div>

                        {/* Date & Purpose */}
                        {schedule.status !== 3 && (
                          <div
                            className={`${
                              schedule.status === 0
                                ? " w-[21rem] custom-xs:w-80  custom-sm:w-full flex justify-between mb-4 px-9"
                                : "hidden"
                            }`}
                          >
                            <div className="flex mr-2 truncate">
                              <FaCalendarAlt className="text-primary text-xl mr-1" />
                              <p className="text-gray-500">
                                {formatDateWithOrdinalSuffix(schedule.date)}
                              </p>
                            </div>

                            {schedule.status !== 2 && schedule.start_time && (
                              <div className="flex mr-2 truncate">
                                <p className="text-gray-500">
                                  {formatTime(schedule.start_time)}
                                </p>
                              </div>
                            )}
                            <div className="flex flex-col gap-1 mr-2 truncate">
                              {schedule.start_time && (
                                <p className="text-gray-500">
                                  {formatTime(schedule.start_time)}
                                </p>
                              )}

                              {schedule.purpose && (
                                <p className="text-primary">
                                  <span className="capitalize font-bold">
                                    Purpose
                                  </span>
                                  : {schedule.purpose}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {schedule.status === 1 && (
                          <>
                            <div className="flex justify-between mb-4 px-9 w-[21rem] custom-xs:w-80  custom-sm:w-full">
                              <div className="flex mr-2 truncate">
                                <FaCalendarAlt className="text-primary text-xl mr-1" />
                                <p className="text-gray-500">
                                  {formatDateWithOrdinalSuffix(schedule.date)}
                                </p>
                              </div>
                              <div className="flex mr-2 truncate">
                                <IoAlarmSharp className="text-primary text-xl mr-1" />
                                <p className="text-gray-500">
                                  {formatTime(schedule.start_time)}
                                </p>
                              </div>
                              <div className="flex mr-2 truncate">
                                <p className="text-primary">
                                  <span className="capitalize font-bold">
                                    Purpose
                                  </span>
                                  : {schedule.purpose}
                                </p>
                              </div>
                            </div>

                            <div>
                              <button
                                className="bg-primary hover:bg-secondary text-white py-2 px-4 rounded-lg flex items-center justify-center w-full"
                                onClick={() => {
                                  const userType =
                                    localStorage.getItem("userType") ||
                                    "patient";
                                  navigate(
                                    `/video?link=${encodeURIComponent(
                                      schedule.chat_url
                                    )}&userType=${userType}`
                                  );
                                }}
                              >
                                <FaVideo
                                  size={20}
                                  className="mr-2 text-white"
                                />
                                Join Video Call with {schedule?.fullname}
                              </button>
                            </div>
                          </>
                        )}

                        {/* End Session Info */}
                        {schedule.status === 2 && (
                          <>
                            <div className="flex justify-between mb-4 px-9">
                              <div className="flex mr-2 truncate">
                                <FaCalendarAlt className="text-primary text-xl mr-1" />
                                <p className="text-gray-500">
                                  {formatDateWithOrdinalSuffix(schedule.date)}
                                </p>
                              </div>
                              <div className="flex mr-2 truncate">
                                <IoAlarmSharp className="text-primary text-xl mr-1" />
                                <p className="text-gray-500">
                                  Start Session:{" "}
                                  {formatTime(schedule.start_time)}
                                </p>
                              </div>
                              <div className="flex mr-2 truncate">
                                <IoAlarmSharp className="text-primary text-xl mr-1" />
                                <p className="text-gray-500">
                                  End Session: {formatTime(schedule.end_time)}
                                </p>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Cancelled Appointments */}
                        {schedule.status === 3 && (
                          <>
                            <div className="flex justify-between mb-4 px-9">
                              <div className="flex mr-2 truncate">
                                <FaCalendarAlt className="text-primary text-xl mr-1" />
                                <p className="text-gray-500">
                                  {formatDateWithOrdinalSuffix(schedule.date)}
                                </p>
                              </div>
                              <div className="flex mr-2 truncate">
                                <p className="text-gray-500">
                                  Reason for Cancel: {schedule.reason}
                                </p>
                              </div>
                              <div className="flex mr-2 truncate">
                                <p className="text-gray-500">
                                  Cancelled By: {schedule.cancel_by}
                                </p>
                              </div>
                            </div>
                            <p className="text-red-500">Cancelled</p>
                          </>
                        )}
                      </div>
                    );
                  })
              )}

              {/* Cancel Modal */}
              <>
                {modalType === "cancel" && selectedSchedule && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
                      {/* Close Button */}
                      <button
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        onClick={closeModal}
                      >
                        <MdClose size={24} />
                      </button>

                      {/* Cancel Details */}
                      <h2 className="text-xl font-semibold text-primary mb-2">
                        Cancel Appointment
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Are you sure you want to cancel appointment with{" "}
                        {selectedSchedule.fullname}?
                      </p>

                      {/* Cancellation Form */}
                      <form onSubmit={handleSubmit}>
                        {/* Invisible ID Input */}
                        <input
                          type="hidden"
                          name="id"
                          value={selectedSchedule.id}
                        />

                        {/* Reason Input */}
                        <textarea
                          className="w-full border rounded-lg p-2 mt-3 text-gray-700 focus:ring-primary focus:border-primary"
                          placeholder="Enter reason for cancellation..."
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          required
                        ></textarea>

                        {/* Action Buttons */}
                        <div className="flex justify-end mt-4">
                          <button
                            type="button"
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2"
                            onClick={closeModal}
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="bg-secondary text-white py-2 px-4 rounded-lg"
                            disabled={loading}
                          >
                            {loading ? "Cancelling..." : "Confirm Cancel"}
                          </button>
                        </div>
                      </form>

                      {/* Error Message */}
                      {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                  </div>
                )}
              </>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-9">
                  <button
                    className={`px-4 py-2 mx-2 rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary text-white"
                    }`}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 font-semibold text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className={`px-4 py-2 mx-2 rounded-lg ${
                      currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary text-white"
                    }`}
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* main contnent */}
        </main>
      </div>
    </div>
  );
};

export default Schedules;
