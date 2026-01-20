import {
  FaCalendarAlt,
  FaChevronRight,
  FaLocationArrow,
  FaClock,
  FaArrowUp,
  FaArrowRight,
} from "react-icons/fa";
import { IMAGE, NAMES, defaultUrl } from "../../../../../components/Constants";
import Greet from "../../../../../components/Greet";
import UseSideBarMenu from "../../../../../hooks/UseSideBarMenu";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick/lib/slider";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { HiDotsHorizontal, HiOfficeBuilding } from "react-icons/hi";

import { format } from "date-fns";
import {
  formatDateWithOrdinalSuffix,
  getUserData,
  statusMap,
  formatTime,
} from "../../../../../components/Helper";
import { IoCalendar, IoDiamondSharp } from "react-icons/io5";
import { useState } from "react";
import {
  useAppointments,
  useGetDoctorFind,
  useHospitalServices,
  useLaboratoryServices,
  usePharmacyServices,
} from "../services/ServicesForm";
import { MdAccountBalanceWallet } from "react-icons/md";

const Dashboard = () => {
  const userData = getUserData();
  const walletBalance = userData?.data?.acctbal;
  const navigate = useNavigate();

  const { PATIENTSFINDDoctorByRating, loading } = useGetDoctorFind();
  const displayDotorsRatingVerified = PATIENTSFINDDoctorByRating.filter(
    (item) => item.verified === 1 && item.status === 1
  );

  const collectDiamond = () => {
    navigate("/diamondcollection");
  };

  const {
    completedAppointmentsCount,
    upcomingAppointentsCount,
    pendingAppointmentsCount,
    enrichedAppointmentData,
    mostRecentUpcomingAppointment,
  } = useAppointments();

  const UserCardTopData = [
    {
      title: "Wallet Balance",
      count: {
        symbol: NAMES.NairaSymbol,
        balance: parseFloat(walletBalance ?? 0).toLocaleString(),
      },
      description: "Your Total Available Balance",

      icon: <MdAccountBalanceWallet size={24} />,
      iconData: <HiDotsHorizontal />,
      iconArrowUp: <FaArrowUp />,
      textCount: "balance",
      color: "primary",
    },
    {
      title: `Completed Appointment${
        completedAppointmentsCount === 1 ? "" : "s"
      }`,
      count: completedAppointmentsCount,
      description: `Your total completed Appointment${
        completedAppointmentsCount === 1 ? "" : "s"
      }`,
      icon: <RiCalendarScheduleFill size={24} />,
      iconData: <HiDotsHorizontal />,
      iconArrowUp: <FaArrowUp />,
      textCount: `completed appointment${
        completedAppointmentsCount === 1 ? "" : "s"
      }`,
      color: "secondary",
    },

    {
      title: `Total Pending appointent${
        pendingAppointmentsCount === 1 ? "" : "s"
      }`,
      count: pendingAppointmentsCount,
      description: `Your total pending appointment${
        pendingAppointmentsCount === 1 ? "" : "s"
      }`,
      icon: <IoCalendar size={24} />,
      iconData: <HiDotsHorizontal />,
      iconArrowUp: <FaArrowUp />,
      textCount: `awaiting appointment${
        pendingAppointmentsCount === 1 ? "" : "s"
      }`,
      color: "primary",
    },
  ];

  const { LaboratoryData = [], loading: loadingLaboratory } =
    useLaboratoryServices();
  const { pharmacyData = [], loading: loadingPharmacy } = usePharmacyServices();
  const { HospitalData = [], loading: loadingHospital } = useHospitalServices();

  const categories = [
    { title: "Laboratories", data: LaboratoryData, loading: loadingLaboratory },
    { title: "Pharmacies", data: pharmacyData, loading: loadingPharmacy },
    { title: "Hospitals", data: HospitalData, loading: loadingHospital },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one category at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000, // Slides every 2 seconds
    arrows: true, // Show navigation arrows
  };

  return (
    <div className="">
      <main className="flex-grow">
        <div className="font-bold text-[20px]  capitalize flex my-3">
          <Greet className="hidden sm:block" />
          <p className="ml-2 hidden sm:block">
            ,{" "}
            {userData?.data?.fullname
              ? userData?.data?.fullname.split(" ").length > 1
                ? userData?.data?.fullname.split(" ")[0].trim()
                : userData?.data?.fullname
              : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-gray-300 flex flex-col"
                >
                  {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-300 p-2 rounded-full w-10 h-10 shrink-0"></div>
                      <div className="flex flex-col">
                        <div className="bg-gray-300 h-4 w-24 rounded"></div>
                        <div className="bg-gray-300 h-3 w-16 mt-2 rounded"></div>
                      </div>
                    </div>
                  </div> */}

                  {/* Combined Count + Text */}
                  {/* <div className="h-6 bg-gray-300 mt-4 rounded w-3/4 sm:w-2/3"></div> */}
                </div>
              ))
            ) : UserCardTopData.length > 0 ? (
              UserCardTopData.map((data, index) => (
                <div
                  key={index}
                  className={`bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-${data.color} flex flex-col`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    {/* Left Section */}

                    <div className="flex items-center gap-3">
                      <div
                        className={`bg-${data.color} p-2 rounded-full text-white`}
                      >
                        {data.icon}
                      </div>

                      <div>
                        <p className="capitalize font-semibold">{data.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Combined Count and Description */}
                  <p className="font-semibold mt-4">
                    {typeof data.count === "object"
                      ? `${data.count.symbol}${data.count.balance}`
                      : data.count}{" "}
                    {data.textCount}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center flex justify-center items-center w-full">
                <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Patient Status Chart and Best Doctor Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* appointment request */}
            <div className="p-6 mx-[6px] lg:mx-0 rounded-lg shadow-md bg-white">
              <div className="border-b border-gray-300 flex justify-between mb-4">
                <h3 className="font-bold uppercase text-primary dark:text-secondary mb-2">
                  Top E-Specialists
                </h3>
                <Link
                  to={`/doctorsLists`}
                  className="flex mb-2 text-primary dark:text-secondary"
                >
                  <p>See all</p>
                  <FaChevronRight className="mt-[7px] ml-1" size={12} />
                </Link>
              </div>
              {/* Header */}
              {loading ? (
                <div className="text-center flex justify-center items-center">
                  <div className="space-y-4 w-full">
                    {Array.from({ length: 20 }).map((_, index) => (
                      <div
                        key={index}
                        className="skeleton h-4 w-full mx-auto animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              ) : displayDotorsRatingVerified.length > 0 ? (
                <>
                  {/* Appointment List */}
                  <div className="flex flex-col">
                    <ul className="grid lg:grid-cols-1 gap-4 mt-3">
                      {displayDotorsRatingVerified.slice(0, 6).map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center justify-between border lg:border-0 lg:border-b border-gray-200 pb-4 p-2 shadow-sm rounded-md  bg-white"
                        >
                          {/* Doctor Info */}
                          <div className="flex items-center">
                            <img
                              src={`${defaultUrl}${item.prof_pics}`}
                              alt="Doctor"
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="ml-2">
                              <h3 className="font-bold text-sm">
                                {item.fullname}
                              </h3>

                              <p className="text-sm">
                                {item.specialization.endsWith("s")
                                  ? item.specialization.slice(0, -1)
                                  : item.specialization}
                              </p>
                            </div>
                          </div>

                          {/* Book Button */}
                          <div className="flex items-center ml-4">
                            <Link
                              to={`/doctorsBooking?specialization=${item.specialization}&doctor_id=${item.id}`}
                            >
                              <button className="bg-primary dark:bg-secondary text-white py-1 px-2 rounded hover:bg-secondary">
                                Book
                              </button>
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-center flex justify-center items-center">
                  <p>No verified doctors found.</p>
                </div>
              )}
            </div>

            {/*nearby institution  */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              {loading ? (
                <div className="text-center flex justify-center items-center">
                  <div className="space-y-4 w-full">
                    {Array.from({ length: 20 }).map((_, index) => (
                      <div
                        key={index}
                        className="skeleton h-4 w-full mx-auto animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              ) : categories.length > 0 ? (
                <>
                  <Slider {...settings}>
                    {categories.map((category, index) => (
                      <div key={index} className="pb-4">
                        <div className="flex justify-between items-center border-b border-gray-400">
                          <h3 className="font-bold uppercase mb-2 text-primary dark:text-secondary">
                            {category.title}
                          </h3>
                          <Link
                            to={`/${category.title
                              .split(" ")
                              .pop()
                              .toLowerCase()}`}
                            className="flex text-primary dark:text-secondary"
                          >
                            <p>See all</p>
                            <FaChevronRight
                              className="mt-[7px] ml-1"
                              size={10}
                            />
                          </Link>
                        </div>

                        {category.data.length > 0 ? (
                          category.data.slice(0, 4).map((item) => (
                            <Link
                              key={item.id}
                              to={{
                                pathname: `/${encodeURIComponent(
                                  category.title.split(" ").pop().toLowerCase()
                                )}`,
                                search: `?id=${item.id}`,
                                state: { title: category.title },
                              }}
                            >
                              <div className="border-b border-gray-200 flex">
                                <div>
                                  <div className="mt-3 w-full rounded-lg flex items-center justify-between p-4">
                                    <div className="flex-shrink-0 ">
                                      <img
                                        src={`${defaultUrl}${item.logo}`}
                                        alt={item.title}
                                        className="w-17 h-12 rounded-full"
                                      />
                                    </div>

                                    <div className="flex-grow ml-4">
                                      <p className="font-semibold  text-sm text-truncate">
                                        {item.institution_name}
                                      </p>
                                    </div>

                                  </div>
                                    <p className="text-gray-600 text-sm">{item.address || "1A Chime Avenue, Enugu Nigeria"}</p>

                                </div>

                                <div className="bg-secondary mt-9 dark:bg-secondary text-white rounded-full p-2 w-8 h-8 flex items-center justify-center mx-2">
                                  <FaLocationArrow
                                    className="cursor-pointer"
                                    size={20}
                                  />
                                </div>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="text-center items-center ">
                            <p>No Verified Institution </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </Slider>
                </>
              ) : (
                // Show message when no doctors are verified
                <div className="text-center flex justify-center items-center">
                  <p>No Verified Institution </p>
                </div>
              )}
            </div>

            {/* Doctor Info */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="border-b border-gray-300 mb-4 flex justify-between">
                <h3 className="font-bold uppercase mb-2 text-primary dark:text-secondary">
                  {loading ? (
                    <div className="text-center flex justify-center items-center">
                      <div className="space-y-4 w-full">
                        {Array.from({ length: 1 }).map((_, index) => (
                          <div
                            key={index}
                            className="skeleton h-6 w-2/3 mx-auto animate-pulse"
                          ></div>
                        ))}
                      </div>
                    </div>
                  ) : mostRecentUpcomingAppointment ? (
                    "Upcoming Appointment"
                  ) : (
                    "No Upcoming Appointment"
                  )}
                </h3>
                <Link
                  to="/doctors"
                  className="flex text-primary dark:text-secondary"
                >
                  <span className="mr-2 cursor-pointer"></span>
                </Link>
              </div>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div
                      key={index}
                      className="skeleton h-4 w-full mx-auto animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold uppercase">
                      {`You have ${
                        upcomingAppointentsCount === 1
                          ? "1 Appointment"
                          : upcomingAppointentsCount > 1
                          ? `${upcomingAppointentsCount} Appointments`
                          : "No Appointment"
                      }`}
                    </h4>

                    {mostRecentUpcomingAppointment ? (
                      <div className="flex items-center text-secondary">
                        <span
                          className="  rounded-full p-2 font-bold cursor-pointer"
                          onClick={() => navigate("/schedules")}
                        >
                          {" "}
                          See More
                        </span>
                        <FaArrowRight />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="flex justify-center mb-4 h-72">
                    <img
                      src={
                        mostRecentUpcomingAppointment
                          ? `${defaultUrl}${mostRecentUpcomingAppointment.prof_pics}`
                          : IMAGE.DefaultImageBanner
                      }
                      alt={
                        mostRecentUpcomingAppointment
                          ? mostRecentUpcomingAppointment.fullname
                          : "No Image"
                      }
                      className="w-full h-full object-cover rounded-xl"
                      style={{
                        objectPosition: "top",
                      }}
                    />
                  </div>
                  <h4 className="font-bold">
                    {mostRecentUpcomingAppointment && (
                      <div className="flex justify-between">
                        <p>{mostRecentUpcomingAppointment.fullname}</p>
                        <p>
                          {mostRecentUpcomingAppointment?.specialization
                            ? mostRecentUpcomingAppointment.specialization.endsWith(
                                "s"
                              )
                              ? mostRecentUpcomingAppointment.specialization.slice(
                                  0,
                                  -1
                                )
                              : mostRecentUpcomingAppointment.specialization
                            : "No Specialization"}
                        </p>
                      </div>
                    )}
                  </h4>

                  <p className="text-gray-600 mb-4">
                    {mostRecentUpcomingAppointment
                      ? `Medical Attention: ${mostRecentUpcomingAppointment.purpose}`
                      : "No Upcoming Appointment"}
                  </p>

                  <div className="">
                    <div className="flex mb-3">
                      <FaCalendarAlt
                        size={24}
                        className="mr-2 text-primary dark:text-secondary"
                      />
                      <p>
                        {mostRecentUpcomingAppointment
                          ? `Session Date: ${formatDateWithOrdinalSuffix(
                              mostRecentUpcomingAppointment.date
                            )}`
                          : `Today's Date: ${format(new Date(), "eee, d MMM")}`}
                      </p>
                    </div>

                    <div className="flex space-x-1">
                      <FaClock
                        size={20}
                        className="text-primary dark:text-secondary mt-1 rotate"
                      />
                      <p>
                        {mostRecentUpcomingAppointment
                          ? `Time:${formatTime(
                              mostRecentUpcomingAppointment.start_time
                            )}`
                          : ` Time: ${format(new Date(), "hh:mm a")}`}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Recent Patients */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
            {loading ? (
              <div className="text-center flex justify-center items-center">
                <div className="space-y-4 w-full">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div
                      key={index}
                      className="skeleton h-4 w-full mx-auto"
                    ></div>
                  ))}
                </div>
              </div>
            ) : enrichedAppointmentData.length > 0 ? (
              <div>
                {/* Header */}
                <div className="border-b border-gray-200 flex justify-between items-center pb-4">
                  <h3 className="font-bold uppercase text-primary dark:text-secondary">
                    Appointments
                  </h3>
                  <Link
                    to={`/schedules`}
                    className="flex items-center text-primary dark:text-secondary text-sm"
                  >
                    <p>See all</p>
                    <FaChevronRight className="ml-1" size={12} />
                  </Link>
                </div>

                {/* Table Header (hidden on very small screens) */}
                <div className="hidden sm:grid grid-cols-5 font-semibold text-gray-600 border-b pb-2 mt-4 text-left text-sm">
                  <span className="border-r border-gray-200 px-2">Doctor</span>
                  <span className="border-r border-gray-200 px-2">Title</span>
                  <span className="border-r border-gray-200 px-2">Date</span>
                  <span className="border-r border-gray-200 px-2">Purpose</span>
                  <span className="px-2 text-center">Status</span>
                </div>

                {/* Table Data */}
                <ul className="mt-4 space-y-4 text-sm">
                  {enrichedAppointmentData.slice(0, 2).map((doctor, index) => (
                    <li
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-5 sm:items-center border-b border-gray-200 pb-4 gap-y-2"
                    >
                      {/* Doctor */}
                      <div className="flex items-center space-x-3 px-2 border-b sm:border-none sm:border-r border-gray-200">
                        <img
                          src={`${defaultUrl}${doctor.prof_pics}`}
                          alt="doctor"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="font-medium">{doctor.fullname}</div>
                      </div>

                      {/* Title */}
                      <div className="text-gray-600 px-2 border-b sm:border-none sm:border-r border-gray-200">
                        {doctor.specialization?.replace(/s$/, "") || "N/A"}
                      </div>

                      {/* Date */}
                      <div className="text-gray-600 px-2 border-b sm:border-none sm:border-r border-gray-200">
                        {formatDateWithOrdinalSuffix(doctor.date)}
                      </div>

                      {/* Purpose */}
                      <div className="text-gray-600 px-2 border-b sm:border-none sm:border-r border-gray-200">
                        {doctor.purpose || "N/A"}
                      </div>

                      {/* Status */}
                      <div className="flex justify-center items-center px-2">
                        {statusMap[doctor.status]?.icon}
                        <span className="ml-1 font-semibold">
                          {statusMap[doctor.status]?.label}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center flex justify-center items-center">
                <p className="capitalize">No appointment log</p>
              </div>
            )}
          </div>

          {/* Diamonds Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            {/* Header */}
            <div className="border-b border-gray-200 flex justify-between items-center mb-4">
              <h3 className="font-bold uppercase text-primary dark:text-secondary">
                {NAMES.SITE_TITLE} Diamonds
              </h3>
            </div>

            {/* Income Display */}
            <div className="flex flex-col p-4 rounded-lg mb-4 bg-gray-50">
              <div className="flex justify-between">
                <div>
                  <p className="text-2xl font-bold capitalize">
                    {NAMES.DIAMONDS}
                  </p>
                  <p>My diamonds</p>
                </div>
                <div className="text-right">
                  <IoDiamondSharp size={40} className="text-secondary" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <button
                onClick={collectDiamond}
                className="w-full sm:w-auto py-2 px-4 rounded capitalize bg-primary dark:bg-secondary text-white"
              >
                collect diamonds
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
