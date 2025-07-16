import PropTypes from 'prop-types';
const Greet = ({className}) => {
  // Get the current hour
  const hour = new Date().getHours();

  // Determine the greeting based on the hour
  const getGreeting = () => {
    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    }
    if (hour >= 12 && hour < 18) {
      return 'Good Afternoon';
    }
    if (hour >= 18 && hour < 21) {
      return 'Good Evening';
    }
    return 'Good Night';
  };

  // Log the greeting to the console
  const greeting = getGreeting();
  console.log(greeting);

  return (
    <div className={className}>{greeting}</div>
  );
};
Greet.propTypes = {
  className: PropTypes.string,
};
export default Greet;
