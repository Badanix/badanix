import {
  defaultUrl,
  DOCTORSIDEBARMENU,
} from "../../../../components/Constants";
import SideBarMenu from "../../../../components/SideBarMenu";
import UseSideBarMenu from "../../../../hooks/UseSideBarMenu";
import { SiTicktick } from "react-icons/si";
import { FaArrowLeft, FaCalendarAlt, FaUser, FaVideo } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdCancel, MdClose } from "react-icons/md";
import VideoCall from "../../../../components/VideoCall";
import {
  currentDate,
  currentTime,
  formatDate,
  formatDateWithOrdinalSuffix,
  formatTime,
} from "../../../../components/Helper";
import { IoAlarmSharp, IoCheckmarkDoneSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAppointments } from "./DoctorApiForm";
import {
  useAcceptBooking,
  useCancelBooking,
} from "../patients/services/ServicesForm";
import DoctorsHeader from "../../../partials/DoctorsHeader";
import { LiaTimesSolid } from "react-icons/lia";
import { differenceInYears, parseISO } from "date-fns";
import Swal from "sweetalert2";

const Appointments = () => {
  const navigate = useNavigate();

  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();

  const [currentPage, setCurrentPage] = useState(1);

  const { enrichedAppointmentData } = useAppointments();

  const [activeTab, setActiveTab] = useState("pending");
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [modalType, setModalType] = useState(null);
  const { cancelBooking, loading, error } = useCancelBooking();
  const { acceptBooking } = useAcceptBooking();
  const [reason, setReason] = useState("");
  const [time, setTime] = useState("");
  const [accept, setAccept] = useState(false);
  const [cancel, setCancel] = useState(false);

  const paginatedAppointments = enrichedAppointmentData.filter(
    (appointment) => {
      if (activeTab === "pending") return appointment.status === 0;
      if (activeTab === "upcoming") return appointment.status === 1;
      if (activeTab === "completed") return appointment.status === 2;
      if (activeTab === "cancelled") return appointment.status === 3;
      return true;
    }
  );
  const appointmentsPerPage = activeTab === "pending" ? 6 : 2;

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

  const handleCancel = async (e) => {
    e.preventDefault();
    if (!selectedSchedule) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://api.digitalhospital.com.ng/api/v1/booking/cancel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: selectedSchedule.id,
            reason,
            status: 3,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Appointment cancelled Successfully!",
          text: `You have successfully cancelled appointment with ${selectedSchedule.fullname}`,
        });

        setTime("");
        setReason("");
        setSelectedSchedule(null);
        closeModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Error: ${data.message || "Something went wrong"}`,
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
      handleCancel();
      setCancel(false);
    }
  }, [cancel]);

  const handleCancelSubmit = () => {
    setCancel(true);
  };

  const handleAccept = async (e) => {
    if (e) e.preventDefault();

    if (!selectedSchedule) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://api.digitalhospital.com.ng/api/v1/booking/accept",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: selectedSchedule.id,
            time,
            status: 1,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Appointment set Successfully!",
          text: `The appointment has been set successfully at ${formatTime(
            time
          )}.`,
        });

        setTime("");
        setSelectedSchedule(null);
        closeModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Error: ${data.message || "Something went wrong"}`,
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
    if (accept) {
      handleAccept();
      setAccept(false);
    }
  }, [accept]);

  const handleAcceptSubmit = () => {
    setAccept(true);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBarMenu
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={DOCTORSIDEBARMENU}
      />

      <div
        className={`flex-1 ml-${
          isSidebarOpen ? "64" : "0 sm:ml-20"
        } transition-all duration-300`}
      >
        <DoctorsHeader />

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

            <div className="container w-full lg:w-[70vw] mx-auto p-4">
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
            </div>

            <div
              className={`${
                activeTab === "pending" || activeTab === 0
                  ? "border-primary w-full lg:w-[70vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
                  : "w-[21rem] custom-xs:w-80  custom-sm:w-full   rounded-lg p-4 mb-4 flex flex-col"
              }`}
            >
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
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
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
                      <div key={schedule.id}>
                        {schedule.status !== 0 && 3 && (
                          <div
                            className={`${
                              schedule.status === 0 ? " " : "hidden"
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
                            <div className="flex mr-2 truncate">
                              <p className="text-primary">
                                <span className="font-bold">Purpose:</span>{" "}
                                {schedule.purpose}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Cancel Button (Pending Appointments) */}
                        {schedule.status === 0 && (
                          <div className="bg-white text-primary p-4 shadow-md rounded-xl border-secondary">
                            <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200 pb-2">
                              <div className="flex space-x-2 ">
                                <div className=" border-2 border-gray-200 rounded-full p-1">
                                  {" "}
                                  <FaUser className="" />
                                </div>
                                <p>{schedule.ehr}</p>
                              </div>
                              <div></div>
                            </div>
                            <div className=" border-b-2 border-gray-200 ">
                              <div className="flex justify-between px-5 ">
                                <div className="flex">
                                  <div className="rounded-full">
                                    <img
                                      src={`${defaultUrl}${schedule.prof_pics}`}
                                      alt=""
                                      className="rounded-full w-12 h-12"
                                    />
                                  </div>
                                  <div className="space-x-4 text-sm">
                                    <h3 className="ml-4 "> Name</h3>
                                    <h4 className="  ">{schedule.fullname}</h4>
                                  </div>
                                </div>

                                <div className="space-x-4 text-sm text-center">
                                  <h3 className="ml-4 "> Date</h3>
                                  <h4 className="   ">
                                    {" "}
                                    {formatDate(schedule.date)}
                                  </h4>
                                </div>
                              </div>
                              <div className="flex justify-around mb-3 flex-wrap">
                                <div className="text-sm mt-3 text-center">
                                  <h3 className="">Age</h3>
                                  <h4 className="">
                                    {schedule.dob
                                      ? `${differenceInYears(
                                          new Date(),
                                          parseISO(schedule.dob)
                                        )} Years`
                                      : null}
                                  </h4>
                                </div>

                                <div className="text-sm mt-3 text-center">
                                  <h3 className="">Gender</h3>
                                  <h4 className="capitalize">
                                    {schedule.gender}
                                  </h4>
                                </div>

                                <div className="text-sm mt-3 text-center">
                                  <h3 className="">Weight</h3>
                                  <h4 className="capitalize">
                                    {schedule.weight}
                                  </h4>
                                </div>

                                <div className="text-sm mt-3 text-center">
                                  <h3 className="">Height</h3>
                                  <h4 className="capitalize">
                                    {schedule.height}
                                  </h4>
                                </div>
                              </div>
                            </div>
                            <div className=" border-b-2 border-gray-200 flex space-x-4">
                              <p className="mt-3">Purpose:</p>
                              <p
                                className={` ${
                                  !isExpanded ? "line-clamp-3 py-3" : ""
                                }`}
                              >
                                {schedule.purpose}
                              </p>

                              {/* Toggle Button */}
                              {schedule.purpose.length > 100 && (
                                <button
                                  className="text-blue-500 mt-2"
                                  onClick={toggleReadMore}
                                >
                                  {isExpanded ? "Read Less" : "Read More"}
                                </button>
                              )}
                            </div>
                            <div className="mt-5 flex justify-around py-3">
                              <button
                                className="border-2 border-secondary text-secondary hover:bg-primary hover:text-white flex px-4 py-1 rounded-lg"
                                onClick={() => openModal(schedule, "cancel")}
                              >
                                <LiaTimesSolid className="mt-1  mr-1 " />
                                <p>Decline</p>
                              </button>
                              <button
                                className="ml-4 bg-primary hover:bg-secondary text-white px-3 py-1 rounded-md flex  hover:text-white"
                                onClick={() => openModal(schedule, "accept")}
                              >
                                <IoCheckmarkDoneSharp className="mt-1 mr-1" />
                                <p>Approve</p>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Video Call Button (Upcoming Appointments) */}
                        {schedule.status === 1 && (
                          <div className="bg-white my-3 rounded-xl">
                            <div className="flex justify-between px-9 py-4 items-center mb-4">
                              <div className="flex-1 ml-7">
                                <h3 className="text-primary capitalize">
                                  {schedule.fullname}
                                </h3>
                                <p className=" capitalize">{schedule.ehr}</p>
                              </div>
                              <img
                                src={`${defaultUrl}${schedule.prof_pics}`}
                                alt={schedule.name}
                                className="w-[85px] h-[85px] rounded-full object-cover"
                              />
                            </div>

                            {/* Appointment details */}
                            <div className="flex justify-between mb-4 px-9 w-[21rem] custom-xs:w-80  custom-sm:w-full">
                              <div className="flex mr-2 truncate">
                                <FaCalendarAlt className="text-primary text-xl mr-1" />
                                <p className="text-gray-500">
                                  {formatDateWithOrdinalSuffix(schedule.date)}
                                </p>
                              </div>
                              <div className="flex mr-2 truncate">
                                <IoAlarmSharp className="text-primary text-xl mr-1" />
                                <p className="text-secondary">
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

                            {/* Always-visible video button */}
                            <div className="pb-6">
                              <button
                                className="bg-primary hover:bg-secondary text-white py-2 px-4 rounded-lg flex items-center justify-center w-10/12 mx-auto animate-pulse"
                                onClick={() => {
                                  localStorage.setItem("userType", "doctor"); 
                                  navigate(
                                    `/video?link=${encodeURIComponent(
                                      schedule.chat_url
                                    )}&userType=doctor`
                                  );
                                }}
                              >
                                <FaVideo
                                  size={20}
                                  className="mr-2 text-white"
                                />
                                Join Video Call with {schedule.fullname}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* End Session Info */}
                        {schedule.status === 2 && (
                          <div className="w-[21rem] custom-xs:w-80  custom-sm:w-full  bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col">
                            <div className="flex justify-between px-9 items-center mb-4">
                              <div className="flex-1 ml-7">
                                <h3 className="text-primary capitalize">
                                  {schedule.fullname}
                                </h3>
                                <p className=" capitalize">{schedule.ehr}</p>
                              </div>
                              <img
                                src={`${defaultUrl}${schedule.prof_pics}`}
                                alt={schedule.fullname}
                                className="w-[85px] h-[85px] rounded-full object-cover"
                              />
                            </div>
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
                          </div>
                        )}

                        {/* Cancelled Appointments */}
                        {schedule.status === 3 && (
                          <div className="rounded-xl w-[21rem] custom-xs:w-80  custom-sm:w-full  bg-white shadow-md p-4 mb-4 flex flex-col">
                            <div className="flex justify-between px-9 items-center mb-4">
                              <div className="flex-1 ml-7">
                                <h3 className="text-primary capitalize">
                                  {schedule.fullname}
                                </h3>
                                <p className=" capitalize">{schedule.ehr}</p>
                              </div>
                              <img
                                src={`${defaultUrl}${schedule.prof_pics}`}
                                alt={schedule.name}
                                className="w-[85px] h-[85px] rounded-full object-cover"
                              />
                            </div>
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
                          </div>
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
                      {/* <p className="text-lg font-semibold text-gray-800">{selectedSchedule.fullname}</p> */}

                      {/* Cancellation Form */}
                      <form onSubmit={handleCancel}>
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
              <>
                {modalType === "accept" && selectedSchedule && (
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
                      <h2 className="text-xl font-semibold text-primary mb-2 text-center">
                        Accept Appointment
                      </h2>

                      {/* Patient Name */}
                      <div className="w-full lg:w-10/12 mx-auto my-3 flex items-center space-x-3">
                        <p className="text-gray-600 w-1/3">Patient Name</p>
                        <input
                          value={selectedSchedule.fullname}
                          className="block border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none w-2/3"
                          readOnly
                        />
                      </div>

                      {/* Time Input */}
                      <form onSubmit={handleAccept}>
                        {/* Invisible ID Input */}
                        <input
                          type="hidden"
                          name="id"
                          value={selectedSchedule.id}
                        />

                        {/* Set Time */}
                        <div className="w-full lg:w-10/12 mx-auto my-3 flex items-center space-x-3">
                          <p className="text-gray-600 w-1/3">Set Time</p>
                          <input
                            type="time"
                            name="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="block border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none w-2/3"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end mt-8 w-full space-x-4">
                          <button
                            type="button"
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg w-full"
                            onClick={closeModal}
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="bg-secondary text-white py-2 px-4 rounded-lg w-full"
                            disabled={loading}
                          >
                            {loading ? "Submitting..." : "Confirm Acceptance"}
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

export default Appointments;
