import PropTypes from "prop-types";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { defaultUrl } from "./Constants";
import { Link } from "react-router-dom";
import { formatDateWithOrdinalSuffix, formatTime } from "../components/Helper";
import { useAppointments } from "../view/loggedIn/secured/patients/services/ServicesForm";
const Banner = () => {
  const { mostRecentUpcomingAppointment } = useAppointments();
  const renderContent = () => {
    if (mostRecentUpcomingAppointment) {
      return (
        <div className="flex flex-col justify-center  items-center">
          <h3 className="text-sm font-semibold text-white  capitalize">
            Upcoming appointment with
          </h3>

          {/* Doctor Info */}
          <div className="flex  space-x-2 mt-1">
            <img
              src={`${defaultUrl}${mostRecentUpcomingAppointment.prof_pics}`}
              alt={mostRecentUpcomingAppointment.fullname}
              className="w-16 h-16 rounded-full object-cover "
            />
            <div className="mt-3">
              {" "}
              <p className="text-sm font-semibold text-white ">
                {mostRecentUpcomingAppointment.fullname}
              </p>
              <p className="text-sm font-semibold text-white">
                {mostRecentUpcomingAppointment.specialization?.replace(
                  /s$/,
                  ""
                ) || ""}
              </p>
            </div>
          </div>

          {/* Appointment Date & Time */}
          <div className="flex justify-center items-center text-primary dark:text-secondary space-x-2 bg-gray-300 px-4 py-2 rounded-full w-fit mt-2">
            {/* Calendar Section */}
            <div className="flex items-center space-x-1 text-sm">
              <FaCalendarAlt size={12} className="text-secondary" />
              <p>
                {formatDateWithOrdinalSuffix(
                  mostRecentUpcomingAppointment.date
                )}
              </p>
            </div>

            {/* Divider */}
            <div className="h-5 border-l border-gray-400"></div>

            {/* Time Section */}
            <div className="flex items-center space-x-1">
              <FaClock size={12} className="text-secondary" />
              <p>{formatTime(mostRecentUpcomingAppointment.start_time)}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full flex flex-col items-center text-center py-4">
          <h3 className="text-lg font-semibold text-white  capitalize pt-4">
            Speak with A Doctor?
          </h3>
          <p className="text-md text-white mb-4">
            Get a medical consultation with our
            <br /> Medical E-Specialists
          </p>
          <Link to={"/doctors"}>
            <button
              type="button"
              className="bg-white text-primary dark:text-secondary py-1 px-2 mb-5 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              Search Doctors
            </button>
          </Link>
        </div>
      );
    }
  };

  return (
    <div
      className={`bg-primary dark:bg-secondary p-6 py-8 rounded-lg shadow-md flex justify-center  items-center mx-auto w-[95%] my-4 relative ${
        mostRecentUpcomingAppointment ? "h-[180px]" : "h-[160px]"
      }`}
    >
      {/* Left Section */}
      <div
        className={`flex flex-col ${
          !mostRecentUpcomingAppointment ? "items-center text-center" : ""
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

// Define prop types (if needed, otherwise can be removed)
Banner.propTypes = {
  schedule: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
  }),
  prescription: PropTypes.shape({
    name: PropTypes.string,
    dosage: PropTypes.string,
  }),
};

// Default values for props (if needed, otherwise can be removed)
Banner.defaultProps = {
  schedule: null,
  prescription: null,
};

export default Banner;
