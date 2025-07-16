import currencySymbol from 'currency-symbol';

const useCurrency = () => {
  const getCurrencySymbol = (currencyCode) => {
    return currencySymbol.symbol(currencyCode) || currencyCode; // Returns the actual symbol directly
  };

  return {
    getCurrencySymbol,
  };
};

export default useCurrency;
