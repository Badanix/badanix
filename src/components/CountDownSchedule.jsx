import { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

const CountdownTimer = ({ appointmentDate, onTimeExpired, onReschedule, onChat }) => {
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const difference = targetDate - now;
    return Math.max(Math.floor(difference / 1000), 0); // Return seconds left
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(appointmentDate));
  const [buttonText, setButtonText] = useState("Check Appointment");
  const [isTimePassed, setIsTimePassed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(appointmentDate);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        clearInterval(timer);
        setIsTimePassed(true);
        setButtonText("Reschedule");
        onTimeExpired(); // Trigger time expired callback
      } else if (newTimeLeft <= 300) { // 5 minutes left
        setButtonText("Enter Chat");
      } else {
        setButtonText("Check Appointment");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [appointmentDate, onTimeExpired]);

  // Check if an hour has passed since the appointment date
  useEffect(() => {
    const now = new Date();
    const hourPassed = appointmentDate.getTime() + 3600000; // Add 1 hour (3600000 ms)
    if (now > hourPassed) {
      setIsTimePassed(true);
      setButtonText("Reschedule");
    }
  }, [appointmentDate]);

  const handleButtonClick = () => {
    if (buttonText === "Check Appointment") {
      console.log("Checking appointment...");
    } else if (buttonText === "Enter Chat") {
      onChat(); // Trigger chat action
    } else if (buttonText === "Reschedule") {
      onReschedule(); // Trigger reschedule action
    }
  };

  const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 text-gray-500" />
          <span style={{ color: isTimePassed ? 'red' : 'black' }}>
            {appointmentDate.toLocaleString()}
          </span>
        </div>
        <div className={`bg-red-500 text-white rounded-md p-1 ${isTimePassed ? 'text-red-500' : ''}`}>
          <span>Countdown: {isTimePassed ? "Time Passed" : formatTimeLeft(timeLeft)}</span>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button className="bg-blue-500 text-white rounded-md px-4 py-2">Preview Patient</button>
        <button 
          className={`rounded-md px-4 py-2 ${isTimePassed ? 'bg-gray-500' : 'bg-green-500'} text-white`} 
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

CountdownTimer.propTypes = {
  appointmentDate: PropTypes.instanceOf(Date).isRequired,
  onTimeExpired: PropTypes.func.isRequired,
  onReschedule: PropTypes.func.isRequired,
  onChat: PropTypes.func.isRequired,
};

export default CountdownTimer;
