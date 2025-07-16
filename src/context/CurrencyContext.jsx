import  { createContext, useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import useLocation from '../hooks/useLocation'; // Import your hook

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const locationData = useLocation(); // Use your custom hook

  return (
    <CurrencyContext.Provider value={locationData}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Define prop types for CurrencyProvider
CurrencyProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
};

export const useCurrencyContext = () => {
  return useContext(CurrencyContext);
};
