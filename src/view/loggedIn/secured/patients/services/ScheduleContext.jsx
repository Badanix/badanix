// ScheduleContext.jsx
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create Context
export const ScheduleContext = createContext();

// Define the Provider component
export const ScheduleProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);

  return (
    <ScheduleContext.Provider value={{ schedules, setSchedules }}>
      {children}
    </ScheduleContext.Provider>
  );
};

// PropTypes for the provider component
ScheduleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
