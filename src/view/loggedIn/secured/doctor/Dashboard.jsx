import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaVideo,
  FaArrowRight,
  FaClock,
  FaChevronRight,
} from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { SiTicktick } from "react-icons/si";
import {
  defaultUrl,
  DOCTORSIDEBARMENU,
  NAMES,
  IMAGE,
} from "../../../../components/Constants";
import Greet from "../../../../components/Greet";
import UseSideBarMenu from "../../../../hooks/UseSideBarMenu";
import SideBarMenu from "../../../../components/SideBarMenu";
import {
  currentDate,
  currentTime,
  formatDateWithOrdinalSuffix,
  getUserData,
  formatTime,
  statusMap,
} from "../../../../components/Helper";
import DoctorsHeader from "../../../partials/DoctorsHeader";
import { useAppointments } from "./DoctorApiForm";
import { MdAccountBalanceWallet, MdCancel } from "react-icons/md";
import { HiBanknotes } from "react-icons/hi2";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import Swal from "sweetalert2";

const Dashboard = () => {
  const siteName = NAMES.SITE_TITLE;
  const currencySymbol = NAMES.NairaSymbol;
  const navigate = useNavigate();
  const userData = getUserData();
  const userProfile = userData?.data;
  const availableBalance = userProfile?.acctbal || 0;
  const withdrawnAmount = userProfile?.spent || 0;

  const [appointments, setAppointments] = useState([]);

  const [users, setUsers] = useState(new Map());

  const fetchUserDetails = async (client_id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `https://api.digitalhospital.com.ng/api/v1/doctor/find/user?id=${client_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        console.error("User fetch error:", response.status);
        return;
      }

      const result = await response.json();
      if (result?.data) {
        setUsers((prev) => new Map(prev).set(client_id, result.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return loading(false);

      const response = await fetch(
        "https://api.digitalhospital.com.ng/api/v1/doctor/booking",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      if (response.status === 200 && Array.isArray(result.data)) {
        const isSameLocalDay = (dateStr1, dateStr2) => {
          const d1 = new Date(dateStr1);
          const d2 = new Date(dateStr2);
          return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
          );
        };

        const allPending = result.data.filter((appt) => appt.status === 2);
        pendingAppointments(allPending);

        const todayPending = allPending.filter((appt) =>
          isSameLocalDay(appt.date, new Date()),
        );
        setAppointments(todayPending);

        const uniqueClientIds = [
          ...new Set([...allPending.map((a) => a.client_id)]),
        ];
        uniqueClientIds.forEach((client_id) => fetchUserDetails(client_id));
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      loading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleClick = () => {
    try {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        const parsedData = JSON.parse(userData);

        const statusValue = parsedData.data
          ? parsedData.data.status
          : parsedData.status;
        const profileUpdatedValue = parsedData.data
          ? (parsedData.data.profile_updated ??
            parsedData.data.setting?.profile_updated)
          : (parsedData.profile_updated ?? parsedData.setting?.profile_updated);

        console.log("Raw values:", { statusValue, profileUpdatedValue });

        const isStatusUpdated = Number(statusValue);
        const isProfileUpdated = Number(profileUpdatedValue);

        console.log("Parsed from storage:", {
          isStatusUpdated,
          isProfileUpdated,
        });
        console.log("isStatusUpdated === 1 ?", isStatusUpdated === 1);
        console.log("isStatusUpdated !== 1 ?", isStatusUpdated !== 1);
        console.log("isProfileUpdated === 1 ?", isProfileUpdated === 1);

        if (isStatusUpdated === 1 && isProfileUpdated === 1) {
          navigate("/doctor/Calendar");
        } else if (isStatusUpdated !== 1 && isProfileUpdated === 1) {
          Swal.fire({
            title: "Not Verified",
            text: "You are not verified yet. Please wait for admin approval.",
            icon: "warning",
            confirmButtonText: "Close",
            confirmButtonColor: "#3085d6",
          });
        } else {
          navigate("/doctor/OnBoarding");
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "User not found. Please log in again.",
          icon: "error",
          confirmButtonText: "Close",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error reading user data:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "#d33",
      });
    }
  };
  const totalIncome =
    parseFloat(availableBalance) + parseFloat(withdrawnAmount);

  const {
    enrichedAppointmentData,
    loading,
    completedAppointmentsCount,
    upcomingAppointents,
    pendingAppointments,
    mostRecentUpcomingAppointment,
    upcomingAppointmentssIn24Hrs,
    completedAppointmentssIn24Hrs,
    cancelledAppointmentssIn24Hrs,
  } = useAppointments();

  const upcomingAppointentsCount = upcomingAppointents;

  const recentAppointmentDate = mostRecentUpcomingAppointment
    ? mostRecentUpcomingAppointment.date
    : format(new Date(), "eee, d MMM");
  const formattedDate = `${new Date(recentAppointmentDate).getFullYear()}-${(
    new Date(recentAppointmentDate).getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${new Date(recentAppointmentDate)
    .getDate()
    .toString()
    .padStart(2, "0")}`;

  const todayAppointment = [
    ...upcomingAppointmentssIn24Hrs,
    ...completedAppointmentssIn24Hrs,
    ...cancelledAppointmentssIn24Hrs,
  ];

  console.log("Today's Appointments:", todayAppointment);

  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();

  const [toggle, setToggle] = useState(false);

  const PatientWaitingCount = upcomingAppointentsCount;

  const getPatientWaitingCount = (patient) => {
    if (patient < 2) {
      return `patient`;
    } else {
      return `patients`;
    }
  };
  //

  const cardTopData = [
    {
      title: "Total Available Balance",
      count: `${NAMES.NairaSymbol} ${(
        Number(availableBalance) || 0
      ).toLocaleString()}`,
      description: "Your sum Total Balance",
      icon: <MdAccountBalanceWallet size={24} />,
      iconData: <HiDotsHorizontal />,
      iconArrowUp: <FaArrowUp />,
      textCount: "Sum total Balance made",
      color: "primary",
    },
    {
      title: "Total Patients Count",
      count: completedAppointmentsCount,
      description: "Total of patients attended to",
      icon: <FaUsers size={24} />,
      iconData: <HiDotsHorizontal />,
      iconArrowUp: <FaArrowUp />,
      textCount: "List of patients count",
      color: "primary",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBarMenu
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={DOCTORSIDEBARMENU}
      />

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-0 sm:ml-20"
        }  transition-all duration-300`}
      >
        {/* Topbar */}
        <DoctorsHeader />

        {/* Dashboard Content */}
        <main className="p-2 sm:p-6 bg-gray-100 flex-grow">
          <div className="  sm:flex justify-between mb-0">
            <div className=" mb-4">
              <div className="font-bold text-[24px] italic capitalize flex ml-2">
                <Greet className="hidden sm:block" />
                <span className="hidden sm:block">,</span>
                <p className="ml-2 hidden sm:block">
                  {" "}
                  <span>Dr.</span>{" "}
                  {userData?.data?.fullname
                    ? userData?.data?.fullname.split(" ").length > 1
                      ? userData?.data?.fullname.split(" ")[0].trim() + "!"
                      : userData?.data?.fullname
                    : ""}{" "}
                </p>
              </div>
              <p className="ml-2 mt-[70px]  md:mt-4 text-gray-600 block sm:flex text-center sm:ml-2">
                How are you doing today?{" "}
                <p>
                  <span className="hidden sm:inline">You have </span>
                  <span className="font-bold primary-color  ">
                    {PatientWaitingCount}{" "}
                    {getPatientWaitingCount(PatientWaitingCount)}
                  </span>
                  <span> waiting for you.</span>
                </p>
              </p>
            </div>
          </div>

          {/** set availabilty */}
          <div
            onClick={handleClick}
            className="cursor-pointer lg:w-full bg-primary text-white p-6 rounded-lg shadow-md border-l-4 border-secondary hover:bg-secondary transition duration-300 mb-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-white text-primary p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3M16 7V3M3 11h18M5 19h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="font-bold text-md uppercase">
                    Set Availability
                  </p>
                  <p className="text-sm text-white opacity-90">
                    Tap to set your calendar
                  </p>
                </div>
              </div>

              <div className="text-white font-semibold text-sm">📅</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 px-2 sm:px-4">
            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
              {cardTopData.map((data, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-lg shadow-sm border-l-4 text-center min-h-[160px]"
                  style={{ borderColor: data.color }}
                >
                  {/* Icon, Title, IconData */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="p-2 rounded-full text-white text-lg"
                      style={{ backgroundColor: data.color }}
                    >
                      {data.icon}
                    </div>

                    <p className="capitalize font-semibold text-md">
                      {data.title}
                    </p>

                    <div
                      className="px-2 py-0.5 rounded text-sm font-medium shadow-sm border"
                      style={{ borderColor: data.color, color: data.color }}
                    >
                      {data.iconData}
                    </div>
                  </div>

                  {/* Count */}
                  <div className="mt-3">
                    <h3 className="text-2xl font-bold text-primary">
                      {data.count.toLocaleString()}
                    </h3>
                  </div>

                  {/* Growth */}
                  <div className="flex justify-center items-center mt-2 gap-2 flex-wrap">
                    <div
                      className="text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm"
                      style={{ backgroundColor: data.color }}
                    >
                      {data.iconArrowUp}
                    </div>
                    <p className="text-gray-500 text-sm">{data.growthText}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart & Appointment Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Upcoming Appointment Section */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b border-gray-300 mb-4 flex justify-between flex-wrap items-center gap-2">
                  <h3 className="font-bold uppercase text-primary dark:text-secondary">
                    {loading ? (
                      <div className="text-center w-full animate-pulse h-6 bg-gray-200 rounded" />
                    ) : mostRecentUpcomingAppointment ? (
                      "Upcoming Appointment"
                    ) : (
                      "No Upcoming Appointment"
                    )}
                  </h3>
                  <Link
                    to="/doctors"
                    className="text-primary dark:text-secondary text-sm"
                  >
                    View All
                  </Link>
                </div>

                {loading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="skeleton h-4 w-full animate-pulse bg-gray-200 rounded"
                      ></div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between flex-wrap items-center gap-2 mb-4">
                      <h4 className="font-semibold uppercase text-sm sm:text-base text-red-500">
                        {`You have ${
                          upcomingAppointentsCount > 0
                            ? `${upcomingAppointentsCount} Appointment${
                                upcomingAppointentsCount > 1 ? "s" : ""
                              }`
                            : "No Appointment"
                        }`}
                      </h4>

                      {mostRecentUpcomingAppointment && (
                        <div
                          className="flex items-center text-secondary cursor-pointer"
                          onClick={() => navigate("/doctor/appointments")}
                        >
                          <span className="rounded-full px-2 py-1 text-sm font-bold">
                            See More
                          </span>
                          <FaArrowRight />
                        </div>
                      )}
                    </div>

                    <div className="w-full h-64 sm:h-72 mb-4">
                      <img
                        src={
                          mostRecentUpcomingAppointment
                            ? `${defaultUrl}${mostRecentUpcomingAppointment.prof_pics}`
                            : IMAGE.DefaultImageBanner
                        }
                        alt={
                          mostRecentUpcomingAppointment?.fullname || "No Image"
                        }
                        className="w-full h-full object-cover rounded-xl"
                        style={{ objectPosition: "top" }}
                      />
                    </div>

                    <h4 className="font-bold text-base flex justify-between flex-wrap">
                      <span>{mostRecentUpcomingAppointment?.fullname}</span>
                      <span>
                        {mostRecentUpcomingAppointment?.specialization ||
                          "No Specialization"}
                      </span>
                    </h4>

                    <p className="text-gray-600 text-sm mb-4">
                      {mostRecentUpcomingAppointment
                        ? `Medical Attention: ${mostRecentUpcomingAppointment.purpose}`
                        : "Status: No Upcoming Appointment Today"}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <FaCalendarAlt
                          size={18}
                          className="mr-2 text-primary dark:text-secondary"
                        />
                        <span>
                          {mostRecentUpcomingAppointment
                            ? `Session Date: ${formatDateWithOrdinalSuffix(
                                mostRecentUpcomingAppointment.date,
                              )}`
                            : `Today: ${format(new Date(), "eee, d MMM")}`}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <FaClock
                          size={18}
                          className="mr-2 text-primary dark:text-secondary"
                        />
                        <span>
                          {mostRecentUpcomingAppointment
                            ? `Time: ${formatTime(
                                mostRecentUpcomingAppointment.start_time,
                              )}`
                            : `Time: ${format(new Date(), "hh:mm a")}`}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        className={`w-full flex items-center justify-center text-white rounded-md px-4 py-2 text-sm sm:text-base ${
                          mostRecentUpcomingAppointment
                            ? currentDate === formattedDate
                              ? currentTime >
                                mostRecentUpcomingAppointment.end_time
                                ? "bg-gray-500 cursor-not-allowed"
                                : currentTime <
                                    mostRecentUpcomingAppointment.start_time
                                  ? "bg-secondary hover:bg-primary cursor-pointer"
                                  : "bg-primary hover:bg-secondary animate-wiggle cursor-pointer"
                              : "bg-gray-500 cursor-not-allowed"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                      >
                        {currentDate === formattedDate ? (
                          currentTime >
                          mostRecentUpcomingAppointment.end_time ? (
                            <>
                              <SiTicktick className="mr-2 text-white" />
                              Finished Video Call with{" "}
                              {mostRecentUpcomingAppointment.fullname}
                            </>
                          ) : currentTime <
                            mostRecentUpcomingAppointment.start_time ? (
                            <>
                              <MdCancel className="mr-2 text-white" />
                              Cancel Appointment with{" "}
                              {mostRecentUpcomingAppointment.fullname}
                            </>
                          ) : (
                            <>
                              <FaVideo className="mr-2 text-white" />
                              Join Video Call with{" "}
                              {mostRecentUpcomingAppointment.fullname}
                            </>
                          )
                        ) : (
                          "No Appointment Today"
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Appointment Requests */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="border-b border-gray-300 mb-4 flex justify-between items-center flex-wrap gap-2">
                  <h3 className="font-bold uppercase">Appointment Requests</h3>
                  <p
                    className="text-primary cursor-pointer text-sm"
                    onClick={() => navigate("/doctor/appointments")}
                  >
                    See All
                  </p>
                </div>

                {pendingAppointments.length === 0 ? (
                  <p className="text-red-600 font-bold text-center">
                    No Appointment Requests
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {pendingAppointments.slice(0, 6).map((appointment) => (
                      <li
                        key={appointment.id}
                        className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 border-b pb-4"
                      >
                        {/* Patient image and name */}
                        <div className="flex items-center space-x-3 w-full sm:w-2/5">
                          <img
                            src={
                              appointment?.prof_pics
                                ? `${defaultUrl}${appointment.prof_pics}`
                                : IMAGE.DefaultUser
                            }
                            alt={appointment?.fullname || "Patient"}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <p className="font-semibold capitalize truncate">
                            {appointment?.fullname
                              ? appointment.fullname.split(" ")[0]
                              : "Unknown"}
                          </p>
                        </div>

                        {/* Purpose */}
                        <p className="text-sm text-gray-500 capitalize w-1/4 text-center">
                          {appointment?.purpose || "N/A"}
                        </p>

                        {/* Date */}
                        <p className="text-sm text-gray-500 w-1/4 text-center">
                          {appointment?.date
                            ? formatDateWithOrdinalSuffix(appointment.date)
                            : "N/A"}
                        </p>

                        {/* Status */}
                        <div className="w-full md:w-1/4 flex justify-end text-sm">
                          {appointment.status === "1" ? (
                            <span className="text-green-600 font-bold">
                              Accepted
                            </span>
                          ) : appointment.status === "0" ? (
                            <span className="text-red-600 font-bold">
                              Declined
                            </span>
                          ) : (
                            <button
                              className="bg-secondary px-2 py-1 rounded-xl text-white hidden md:block"
                              onClick={() => navigate("/doctor/appointments")}
                            >
                              View User
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Payment History and Recent Patients */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 px-2 sm:px-4">
            {/* Recent Patients Section */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full">
              {loading ? (
                <div className="text-center flex justify-center items-center">
                  <div className="space-y-4 w-full">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <div
                        key={index}
                        className="skeleton h-4 w-full mx-auto animate-pulse bg-gray-200 rounded"
                      ></div>
                    ))}
                  </div>
                </div>
              ) : enrichedAppointmentData.length > 0 ? (
                <div>
                  {/* Header */}
                  <div className="border-b border-gray-200 flex justify-between items-center pb-4 flex-wrap gap-2">
                    <h3 className="font-bold uppercase text-primary dark:text-secondary">
                      Appointments
                    </h3>
                    <Link
                      to={`/doctor/appointments`}
                      className="flex items-center text-primary dark:text-secondary text-sm"
                    >
                      <p>See all</p>
                      <FaChevronRight className="ml-1" size={12} />
                    </Link>
                  </div>

                  {/* Table Header */}
                  <div className="hidden md:grid grid-cols-5 font-semibold text-gray-600 border-b pb-2 mt-4 text-left">
                    <span className="border-r border-gray-200 px-2">
                      Patients
                    </span>
                    <span className="border-r border-gray-200 px-2">
                      EHR No
                    </span>
                    <span className="border-r border-gray-200 px-2">Date</span>
                    <span className="border-r border-gray-200 px-2">
                      Purpose
                    </span>
                    <span className="px-2 text-center">Status</span>
                  </div>

                  {/* Table Data */}
                  <ul className="mt-4 space-y-4">
                    {enrichedAppointmentData
                      .slice(0, 2)
                      .map((patient, index) => (
                        <li
                          key={index}
                          className="flex flex-col md:grid md:grid-cols-5 border-b border-gray-200 pb-4 text-left gap-2"
                        >
                          {/* Patient Info */}
                          <div className="flex items-center space-x-3 border-r border-gray-200 px-2">
                            <img
                              src={`${defaultUrl}${patient.prof_pics}`}
                              alt="patient"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <p className="text-sm font-medium truncate">
                              {patient.fullname}
                            </p>
                          </div>

                          {/* EHR No */}
                          <div className="text-sm text-gray-500 border-r border-gray-200 px-2">
                            {patient.ehr}
                          </div>

                          {/* Date */}
                          <div className="text-sm text-gray-500 border-r border-gray-200 px-2">
                            {formatDateWithOrdinalSuffix(patient.date)}
                          </div>

                          {/* Purpose */}
                          <div className="text-sm text-gray-500 border-r border-gray-200 px-2">
                            {patient.purpose || "N/A"}
                          </div>

                          {/* Status */}
                          <div className="text-sm font-semibold flex items-center justify-center gap-2 px-2">
                            {statusMap[patient.status]?.icon}
                            <span>{statusMap[patient.status]?.label}</span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center flex justify-center items-center">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Wallet Overview Section */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full">
              <div className="border-b border-gray-200 flex justify-between items-center mb-4 flex-wrap gap-2">
                <h3 className="font-bold uppercase">Wallet Overview</h3>
              </div>

              {/* Total Income Display */}
              <div className="flex flex-col p-4 rounded-lg mb-4 bg-gray-50 space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <p className="text-2xl font-bold">
                      {currencySymbol}
                      {totalIncome.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 hidden md:block">
                      Total Income
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm hidden md:block">
                      Total Money made in {siteName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Toggle Option */}
              <div className="flex items-center mb-4 bg-gray-100 p-2 rounded justify-between">
                <label className="mr-2 text-sm">
                  Total Money made in {siteName}
                </label>
                <div
                  className="cursor-pointer"
                  onClick={() => setToggle(!toggle)}
                ></div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-between">
                {["See Wallet", "Withdrawal History"].map((action) => (
                  <button
                    key={action}
                    onClick={() =>
                      navigate(
                        action === "See Wallet"
                          ? "/doctor/Payment"
                          : "/doctor/Transactions",
                      )
                    }
                    className={`py-2 px-4 rounded w-full sm:w-auto text-sm ${
                      action === "See Wallet"
                        ? "bg-primary text-white"
                        : "bg-secondary text-white"
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
