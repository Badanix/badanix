import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaRegWindowClose,
  FaStar,
  FaWallet,
} from "react-icons/fa";
import {
  PATIENTSIDEBARMENU,
  NAMES,
  ScheduleLists,
  APIURLS,
  defaultUrl,
} from "../../../../../components/Constants";
import SideBarMenu from "../../../../../components/SideBarMenu";
import UseSideBarMenu from "../../../../../hooks/UseSideBarMenu";
import { FaUserDoctor } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdSick,
  MdOutlineWorkOutline,
  MdOutlineDoubleArrow,
} from "react-icons/md";
import { useState, useEffect } from "react";
import styles from "../../../../../components/styles";
import Swal from "sweetalert2";
import { calculateAge, getUserData } from "../../../../../components/Helper";
import PatientHeader from "../../../../partials/PatientHeader";
import moment from "moment";

const DoctorsBooking = () => {
  const userData = getUserData();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get("doctor_id");
  const navigate = useNavigate();
  const [isBooking, setIsBooking] = useState(false);
  const [previewBooking, setPreviewBooking] = useState(false);
  // const nairaSymbol =  NAMES.NairaSymbol;
  const walletBalance = NAMES.WALLETBALANCE || 0;
  const [bookingData, setBookingData] = useState({});

  const [doctorDetails, setDoctorDetails] = useState(null);
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(null);
  const [isReadMore, setIsReadMore] = useState(false);
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const formattedDate = date
    ? `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`
    : "";

  const [availability, setAvailability] = useState({});

  const isoFormattedDate = date
    ? `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
    : "";

  useEffect(() => {
    const fetchDoctorSlots = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authorization token is missing.");

        const response = await fetch(
          `https://api.digitalhospital.com.ng/api/v1/user/doctor/available?id=${doctorId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Error fetching availability.");
        }

        const today = moment().format("YYYY-MM-DD");
        const availableDays = {};

        result.message.forEach((entry) => {
          const date = entry.day;
          availableDays[date] = {
            customStyles: {
              container: {
                backgroundColor: moment(date).isBefore(today) ? "red" : "green",
              },
              text: { color: "#ffffff" },
            },
            disabled: moment(date).isBefore(today),
            start_time: entry.start_time,
            end_time: entry.end_time,
          };
        });

        for (let i = 0; i < 30; i++) {
          const date = moment().add(i, "days").format("YYYY-MM-DD");
          if (!availableDays[date]) {
            availableDays[date] = {
              customStyles: {
                container: { backgroundColor: "red" },
                text: { color: "#ffffff" },
              },
              disabled: true,
            };
          }
        }

        setAvailability(availableDays);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorSlots();
  }, [doctorId]);

  const isDateAvailable = (date) => {
    const formatted = moment(date).format("YYYY-MM-DD");
    if (!availability[formatted]) return "neutral"; // Not in range
    return availability[formatted].disabled ? "red" : "green";
  };

  const daysInMonth = (date) => {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return new Date(nextMonth - 1).getDate();
  };

  const fetchDoctorData = async () => {
    const token = localStorage.getItem("token");
    if (token && doctorId) {
      try {
        const response = await fetch(
          `${APIURLS.APIURLPATIENTSFINDDoctorSpecializationSearch}?id=${doctorId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doctor data");
        }
        const data = await response.json();

        const doctor = data.data.find(
          (doctor) => doctor.id.toString() === doctorId
        );

        setDoctorDetails(doctor);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError("Failed to fetch doctor data");
        setLoading(false);
      }
    }
  };

  if (doctorId && loading) {
    fetchDoctorData();
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">{error}</div>
    );
  }

  useEffect(() => {
    const fetchBookingPrice = async () => {
      try {
        const response = await fetch(
          "https://api.digitalhospital.com.ng/api/v1/admin/settings"
        );
        const result = await response.json();

        if (response.ok) {
          setBookingData(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch booking settings");
        }
      } catch (err) {
        console.error("Error fetching booking price:", err.message);
      }
    };

    fetchBookingPrice();
  }, []);

  const handleBookingClick = () => {
    const userData = getUserData();

    if (!userData) {
      console.log("No user data found.");
      return;
    }

    const profileUpdated = userData?.data?.profile_updated;
    console.log("Profile Updated:", profileUpdated);

    if (profileUpdated !== 1) {
      console.log(
        "Redirecting to /onboarding because the profile is not updated."
      );
      window.location.href = "/onboarding";
      return;
    }

    console.log("Profile is updated. Proceeding with booking...");
    setIsBooking(true);
    setPreviewBooking(false);
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    setIsBooking(false);
    setPreviewBooking(true);
  };

  const calculateTotal = () => {
    const price = bookingData?.booking_amount
      ? parseFloat(bookingData.booking_amount)
      : doctorDetails?.price
      ? parseFloat(doctorDetails.price)
      : 250;

    const vat = NAMES?.VAT ? parseFloat(NAMES.VAT) : 0;
    const discount = NAMES?.DISCOUNT ? parseFloat(NAMES.DISCOUNT) : 0;
    const total = price + vat - discount;
    return total;
  };

  const navToWallet = () => {
    navigate("/wallet");
  };
  const confirmBooking = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    const totalAmount = parseFloat(calculateTotal());
    const balance = parseFloat(walletBalance || 0);

    const token = localStorage.getItem("token");

    const booking_type = 0;

    if (booking_type !== 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Booking Type",
        text: "Booking can only be submitted to a E-doctor.",
        customClass: {
          title: "text-xl font-bold text-red-600",
          popup: "bg-white rounded-lg shadow-lg p-6",
          content: "text-gray-600",
          confirmButton: "bg-primary text-white py-2 px-4 rounded-lg mt-4",
        },
      });
      setIsProcessing(false);
      return;
    }

    if (balance >= totalAmount) {
      try {
        const doctorId = new URLSearchParams(window.location.search).get(
          "doctor_id"
        );

        const bookingData = {
          id: doctorId,
          date: isoFormattedDate,
          purpose: description,
          booking_type: booking_type,
        };

        const response = await fetch(APIURLS.APIPATIENTBOOKING, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        });

        const data = await response.json();

        if (response.ok && data.status === "201") {
          setPaymentSuccess(true);
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: data.message,
            customClass: {
              title: "text-xl font-bold text-primary",
              popup: "bg-white rounded-lg shadow-lg p-6",
              content: "text-gray-600",
              confirmButton: "bg-primary text-white py-2 px-4 rounded-lg mt-4",
            },
            timer: 2000,
            showConfirmButton: false,
          });
          setTimeout(() => {
            const newSchedule = {
              img: doctorDetails.img,
              title: doctorDetails.title,
              name: doctorDetails.name,
              date: formattedDate,
            };
            ScheduleLists.push(newSchedule);
            setPreviewBooking(false);
            window.location.href = "/schedules";
          }, 2000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Booking Failed",
            text:
              data.message ||
              "There was an issue processing your booking. Please try again.",
            customClass: {
              title: "text-xl font-bold text-red-600",
              popup: "bg-white rounded-lg shadow-lg p-6",
              content: "text-gray-600",
              confirmButton: "bg-primary text-white py-2 px-4 rounded-lg mt-4",
            },
          });
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("Error submitting booking:", error);
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "An unexpected error occurred. Please try again later.",
          customClass: {
            title: "text-xl font-bold text-red-600",
            popup: "bg-white rounded-lg shadow-lg p-6",
            content: "text-gray-600",
            confirmButton: "bg-primary text-white py-2 px-4 rounded-lg mt-4",
          },
        });
        setIsProcessing(false);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Insufficient Balance",
        text: `Your wallet balance is only ${
          NAMES.NairaSymbol
        }${balance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}. Please add funds to complete your appointment fee.`,
        customClass: {
          title: "text-xl font-bold text-red-600",
          popup: "bg-white rounded-lg shadow-lg p-6",
          content: "text-gray-600",
          confirmButton: "bg-primary text-white py-2 px-4 rounded-lg mt-4",
        },
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-700">
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

        <main className="p-6 bg-gray-100 flex-grow">
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <FaUserDoctor
                  size={48}
                  className="text-secondary mb-4 mx-auto animate-bounce"
                />
                <p className="text-gray-600 font-semibold">Loading...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="sm:flex justify-between mb-0">
                <div className="mb-4"></div>
              </div>

              <FaArrowLeft
                className="text-xl cursor-pointer mt-[60px] md:mt-0 mb-2 md:mb-5 text-primary"
                onClick={() => navigate(-1)}
              />

              {/* Image section with arrow */}
              {!isBooking && !previewBooking && (
                <div className="relative w-full flex flex-col lg:flex-row lg:space-x-5">
                  {doctorDetails && (
                    <img
                      src={`${defaultUrl}${doctorDetails.prof_pics}`}
                      alt={doctorDetails.fullname}
                      className="w-full lg:w-[45%] h-[250px] lg:h-[80vh] object-cover object-top rounded-tl-xl rounded-bl-xl"
                    />
                  )}

                  <div
                    className="bg-gray-50 p-4 w-full relative"
                    style={{
                      borderTopLeftRadius: "20% 20px",
                      borderTopRightRadius: "20% 20px",
                      marginTop: "-25px",
                      zIndex: 10,
                    }}
                  >
                    <div className="mt-6 mb-[50px]">
                      <h3 className="text-xl font-bold capitalize">
                        {doctorDetails ? doctorDetails.fullname : ""}
                      </h3>

                      {doctorDetails && (
                        <p className="text-gray-600 capitalize">
                          {doctorDetails.specialization?.replace(/s$/, "") ||
                            "No specialization"}{" "}
                        </p>
                      )}

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="bg-gray-100 rounded-md p-4 shadow-xl text-center">
                          <p className="font-bold text-primary capitalize">
                            Patients
                          </p>
                          <div className="flex justify-center items-center mt-2">
                            <MdSick
                              className="hidden md:inline-block mr-1 text-primary font-bold"
                              size={20}
                            />
                            {doctorDetails && (
                              <p className="captialize">
                                {doctorDetails.no_of_consultations}
                                <span className="hidden md:inline-block">
                                  {" "}
                                  Attended
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="bg-gray-100 rounded-md p-4 shadow-xl text-center">
                          <p className="font-bold text-primary capitalize truncate w-full">
                            Experience
                          </p>

                          <div className="flex justify-center items-center mt-2">
                            <MdOutlineWorkOutline
                              className="mr-1 text-primary font-bold hidden md:inline-block"
                              size={20}
                            />
                            {doctorDetails && (
                              <p>
                                {doctorDetails.experience
                                  ? doctorDetails.experience
                                  : "0 "}
                                Years
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="bg-gray-100 rounded-md p-4 shadow-xl text-center">
                          <p className="font-bold text-primary capitalize">
                            Rating
                          </p>
                          <div className="flex justify-center items-center mt-2">
                            <FaStar
                              className="hidden md:inline-block mr-1 text-primary font-bold"
                              size={20}
                            />
                            {doctorDetails && <p>{doctorDetails.rating}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-bold uppercase text-primary">
                          About
                        </h3>
                        {doctorDetails && (
                          <p className="text-gray-600">
                            {doctorDetails.about &&
                            doctorDetails.about.length > 0
                              ? doctorDetails.about.length > 150
                                ? isReadMore
                                  ? doctorDetails.about
                                  : doctorDetails.about.slice(0, 150) + "..."
                                : doctorDetails.about
                              : "No information available"}
                          </p>
                        )}

                        <button
                          className="text-primary underline mt-2 font-semibold"
                          onClick={() => setIsReadMore(!isReadMore)}
                        >
                          <div className="flex">
                            <p>{isReadMore ? "Read Less" : "Read More"}</p>
                            <MdOutlineDoubleArrow
                              className="mt-[4px] ml-[3px]"
                              size={20}
                            />
                          </div>
                        </button>
                      </div>

                      {!isBooking && !previewBooking && (
                        <button
                          className={`mt-6 py-2 px-4 rounded-lg w-full bg-primary text-white cursor-pointer`}
                          onClick={handleBookingClick}
                        >
                          Book Appointment
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Render Booking Form when isBooking is true */}
              {isBooking && (
                <div className="relative w-full flex flex-col lg:flex-row lg:space-x-5">
                  <img
                    src={`${defaultUrl}${doctorDetails.prof_pics}`}
                    alt={doctorDetails.fullname}
                    className="w-full lg:w-[45%] h-[250px] lg:h-[80vh] object-cover object-top rounded-tl-xl rounded-bl-xl"
                  />

                  <div
                    className="bg-gray-50 p-4 w-full relative "
                    style={{
                      borderTopLeftRadius: "20% 20px",
                      borderTopRightRadius: "20% 20px",
                      marginTop: "-25px",
                      zIndex: 10,
                    }}
                  >
                    <div className="mt-6 lg:mt-[70px] mb-[50px]">
                      <h3 className="text-xl font-bold capitalize text-center">
                        {" "}
                        Book{" "}
                        <span className="mr-1 text-secondary">
                          Dr. {doctorDetails.fullname}
                        </span>{" "}
                        Now
                      </h3>

                      <div className="tablet:w-[50vw] lg:w-[34vw] md:w-[60vw] mx-auto">
                        <form onSubmit={handleBookingSubmit}>
                          <div className="mb-4">
                            <label className="block text-gray-700 mb-2 font-semibold">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={userData?.data?.fullname}
                              className={styles.inputStyle}
                              readOnly
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 mb-2 font-semibold">
                              Age
                            </label>
                            <input
                              type="text"
                              name="age"
                              value={`${
                                userData?.data?.dob
                                  ? calculateAge(userData?.data?.dob)
                                  : null
                              } Years`}
                              className={styles.inputStyle}
                              readOnly
                            />
                          </div>

                          <div className="mb-4">
                            {/* Preferred Date Input and Icon */}
                            <label className="block text-gray-700 mb-2 font-semibold">
                              Preferred Date
                            </label>
                            <div className="flex items-center space-x-2 relative">
                              <input
                                type="text"
                                readOnly
                                value={formattedDate}
                                className={`${styles.inputStyle}`}
                                placeholder="Select a date"
                                onClick={() => setShowModal(true)}
                              />
                              <button
                                onClick={() => setShowModal(true)} // Open modal on icon click
                                className="absolute  right-3 top-2 p-2   rounded-full hover:bg-primary hover:text-white"
                              >
                                <FaCalendarAlt />
                              </button>
                            </div>

                            {/* Modal */}
                            {showModal && (
                              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-11/12 md:w-full">
                                  <div className="flex justify-between">
                                    <h3 className="text-lg font-semibold mb-4">
                                      Select a Date
                                    </h3>
                                    <FaRegWindowClose
                                      size={27}
                                      onClick={() => setShowModal(false)}
                                      className="cursor-pointer"
                                    />
                                  </div>

                                  {/* Month Navigation */}
                                  <div className="flex justify-between items-center mb-4">
                                    <button
                                      className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                                      onClick={() =>
                                        setCurrentMonth(
                                          new Date(
                                            currentMonth.setMonth(
                                              currentMonth.getMonth() - 1
                                            )
                                          )
                                        )
                                      }
                                    >
                                      <FaChevronLeft />
                                    </button>
                                    <span className="font-semibold">
                                      {currentMonth.toLocaleString("default", {
                                        month: "long",
                                      })}{" "}
                                      {currentMonth.getFullYear()}
                                    </span>
                                    <button
                                      className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                                      onClick={() =>
                                        setCurrentMonth(
                                          new Date(
                                            currentMonth.setMonth(
                                              currentMonth.getMonth() + 1
                                            )
                                          )
                                        )
                                      }
                                    >
                                      <FaChevronRight />
                                    </button>
                                  </div>

                                  {/* Error Message */}
                                  {errors && (
                                    <div className="col-span-7 text-center text-red-500 p-2 rounded mb-4 w-full">
                                      {errors}
                                    </div>
                                  )}

                                  <div className="grid grid-cols-7 gap-2">
                                    {[
                                      "Sun",
                                      "Mon",
                                      "Tue",
                                      "Wed",
                                      "Thu",
                                      "Fri",
                                      "Sat",
                                    ].map((day, index) => (
                                      <div
                                        key={index}
                                        className="text-center font-semibold"
                                      >
                                        {day}
                                      </div>
                                    ))}

                                    {(() => {
                                      const firstDayOfMonth = new Date(
                                        currentMonth.getFullYear(),
                                        currentMonth.getMonth(),
                                        1
                                      );
                                      const startingDay =
                                        firstDayOfMonth.getDay();
                                      const daysArray = [];

                                      for (let i = 0; i < startingDay; i++) {
                                        daysArray.push(
                                          <div key={`empty-${i}`} />
                                        );
                                      }

                                      for (
                                        let i = 0;
                                        i < daysInMonth(currentMonth);
                                        i++
                                      ) {
                                        const day = new Date(
                                          currentMonth.getFullYear(),
                                          currentMonth.getMonth(),
                                          i + 1
                                        );
                                        daysArray.push(
                                          <div
                                            key={i}
                                            className={`text-center w-10 h-8 p-1 rounded-full flex items-center justify-center
                                                ${
                                                  isDateAvailable(day) ===
                                                  "green"
                                                    ? "bg-green-500 cursor-pointer text-white hover:bg-green-600"
                                                    : isDateAvailable(day) ===
                                                      "red"
                                                    ? "bg-red-500 text-white cursor-not-allowed hover:bg-gray-200"
                                                    : "text-gray-700" // Past or outside 30-day range (no background)
                                                }`}
                                            onClick={() => {
                                              if (
                                                isDateAvailable(day) === "green"
                                              ) {
                                                setDate(day);
                                                setShowModal(false);
                                                setErrors("");
                                              } else if (
                                                isDateAvailable(day) === "red"
                                              ) {
                                                setErrors(
                                                  "Date Unavailable, please select ones in green!"
                                                );
                                              }
                                            }}
                                          >
                                            {day.getDate()}
                                          </div>
                                        );
                                      }

                                      return daysArray;
                                    })()}
                                  </div>

                                  <div className="mt-7 flex justify-around">
                                    <div className="flex items-center">
                                      <div className="w-4 h-4 bg-green-500 mr-2 rounded-sm"></div>
                                      <p>Available</p>
                                    </div>
                                    <div className="flex items-center">
                                      <div className="w-4 h-4 bg-red-500 mr-2 rounded-sm"></div>
                                      <p>Not Available</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">
                              Purpose
                            </label>
                            <textarea
                              name="purpose"
                              className={styles.inputStyle}
                              rows="4"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-4 flex justify-between items-center mt-8">
                            <button
                              type="submit"
                              className="bg-primary text-white py-2 px-4 rounded-lg w-full"
                            >
                              Confirm Booking
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview section when previewBooking is true */}
              {previewBooking && (
                <div className="relative w-full flex flex-col lg:flex-row lg:space-x-5">
                  <img
                    src={`${defaultUrl}${doctorDetails.prof_pics}`}
                    alt={doctorDetails.fullname}
                    className="w-full lg:w-[45%] h-[250px] lg:h-[80vh] object-cover object-top rounded-tl-xl rounded-bl-xl"
                  />

                  <div
                    className="bg-gray-50 p-4 w-full relative"
                    style={{
                      borderTopLeftRadius: "20% 20px",
                      borderTopRightRadius: "20% 20px",
                      marginTop: "-25px",
                      zIndex: 10,
                    }}
                  >
                    <div className="mt-6 lg:mt-[70px] mb-[50px]">
                      <h3 className="text-xl font-bold capitalize text-center pb-3 text-primary">
                        Preview Your Booking
                      </h3>

                      <div className="tablet:w-[50vw] lg:w-[34vw] md:w-[60vw] mx-auto">
                        {/* Date Section */}
                        <div className="border-b-2 border-t-2 border-gray-200 py-4 lg:mx-5 tablet:mx-5 md:mx-5">
                          <div className="flex justify-between">
                            <h3 className="font-bold text-primary">Date</h3>
                            <div
                              className="flex text-primary mt-1 cursor-pointer"
                              onClick={() => {
                                setPreviewBooking(false);
                                setIsBooking(true);
                              }}
                            >
                              <FaEdit />
                              <p>Edit</p>
                            </div>
                          </div>
                          <div className="flex p-4 -mr-8 sm:mr-0 -mx-4 sm:mx-0">
                            <FaCalendarAlt className="text-primary mt-1 mr-3 text-xl" />
                            <p className="text-gray-600 mt-1 lg:mx-7">
                              {date
                                ? new Intl.DateTimeFormat("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }).format(new Date(date))
                                : "No date selected"}
                            </p>
                          </div>
                        </div>

                        {/* Purpose Section */}
                        <div className="border-b-2 border-gray-200 py-4 lg:mx-7 tablet:mx-5 md:mx-5">
                          <div className="flex justify-between">
                            <h3 className="font-bold text-primary">Purpose</h3>
                            <div
                              className="flex text-primary mt-1 cursor-pointer"
                              onClick={() => {
                                setPreviewBooking(false);
                                setIsBooking(true);
                              }}
                            >
                              <FaEdit />
                              <p>Edit</p>
                            </div>
                          </div>
                          <div className="py-4">
                            <div className="flex items-start space-x-4">
                              <p className="text-gray-700">
                                {description
                                  ? description
                                  : "No reason provided."}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Payment Information Section */}
                        <div className="border-b-2 border-gray-200 py-4 lg:mx-7 tablet:mx-5 md:mx-5">
                          <div className="flex justify-between">
                            <h3 className="font-bold text-primary capitalize">
                              Payment Information
                            </h3>
                          </div>

                          {/* ✅ Added block to show booking amount */}
                          <div className="mt-4 flex justify-between">
                            <p className="text-gray-700 font-medium">
                              Booking Fee
                            </p>
                            <p className="text-primary font-bold">
                              {NAMES.NairaSymbol}
                              {parseFloat(
                                bookingData?.booking_amount || 0
                              ).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Payment Method Section */}
                        <div className="border-b-2 border-gray-200 py-4 lg:mx-7">
                          <div className="flex justify-between items-center mt-4">
                            <h3 className="font-bold text-primary">
                              Payment Method
                            </h3>
                            <div
                              className="flex text-primary cursor-pointer"
                              onClick={navToWallet}
                            >
                              <FaEdit className="mt-1" />
                              <p>Edit</p>
                            </div>
                          </div>
                          <div className="py-4">
                            {parseFloat(walletBalance || 0) >=
                            parseFloat(calculateTotal()) ? (
                              <div className="flex justify-between border-2 border-gray-200 mx-2 p-4 rounded-xl">
                                <div className="flex text-primary">
                                  <FaWallet size={40} />
                                  <p className="ml-4 mt-2">
                                    Wallet Balance ({NAMES.NairaSymbol}
                                    {parseFloat(walletBalance).toLocaleString(
                                      "en-US",
                                      {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }
                                    )}
                                    )
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-between border-2 border-gray-200 mx-2 p-4 rounded-xl mt-2 opacity-80">
                                <div className="flex">
                                  <FaWallet
                                    size={40}
                                    className="text-primary"
                                  />
                                  <div className="ml-4">
                                    <p>
                                      Wallet Balance ({NAMES.NairaSymbol}
                                      {parseFloat(walletBalance).toLocaleString(
                                        "en-US",
                                        {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        }
                                      )}
                                      )
                                    </p>
                                    <p className="text-red-500 -mt-1">
                                      Insufficient funds
                                    </p>
                                  </div>
                                </div>
                                <div className="ml-4 mt-3">
                                  <a
                                    href="/wallet"
                                    className="bg-primary rounded-lg p-2 text-white"
                                  >
                                    Add Money
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Confirm Booking Button */}
                        <div className="mb-4 flex justify-between items-center">
                          <button
                            type="button"
                            disabled={isProcessing || paymentSuccess}
                            className="bg-primary text-white py-2 px-4 rounded-lg w-full"
                            onClick={confirmBooking}
                          >
                            {isProcessing
                              ? "Processing..."
                              : paymentSuccess
                              ? "Payment Successful"
                              : "Book Now"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorsBooking;
