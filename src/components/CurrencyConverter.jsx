import { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [balance, setBalance] = useState(20); // User's balance in Naira (N20)
  const [currencies, setCurrencies] = useState([]); // List of currencies to display
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Default to USD
  const [convertedBalance, setConvertedBalance] = useState(0); // Converted balance
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling

  const apiKey = '81801b7c8e563d1c1575143a78a51e4a'; // Replace with your Fixer.io API key

  // Fetch currencies and conversion rates on component mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.apilayer.com/fixer/latest?base=NGN`, {
          method: 'GET',
          headers: {
            'apikey': apiKey, // Fixer.io API key
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }

        const data = await response.json();
        setCurrencies(Object.keys(data.rates)); // Available currencies
        convertBalance(data.rates[selectedCurrency]); // Convert balance based on selected currency
        setLoading(false);
      } catch (error) {
        setError(error.message); // Error handling
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, [selectedCurrency]);

  // Convert balance to the selected currency
  const convertBalance = (rate) => {
    const converted = balance * rate;
    setConvertedBalance(converted.toFixed(2)); // Set converted balance with 2 decimal places
  };

  // Handle currency selection
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value); // Update selected currency
  };

  return (
    <div>
      <h1>Balance Conversion</h1>
      <div>
        <p>Your Balance: N{balance}</p>
        {loading && <p>Loading currencies...</p>}
        {error && <p>Error: {error}</p>}
        <select onChange={handleCurrencyChange} value={selectedCurrency}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p>Converted Balance: {selectedCurrency} {convertedBalance}</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
