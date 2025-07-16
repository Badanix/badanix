import PropTypes from 'prop-types';
import { getUserData } from './Helper';

// Function to mask the email
const maskEmail = (email) => {
  const [localPart, domain] = email.split('@');
  const maskedLocal = localPart.slice(0, 3) + '***';
  const maskedDomain = domain.replace(/[^.]/g, '*');
  return `${maskedLocal}@${maskedDomain}`;
};
const userData=getUserData();
// React component to display the masked email
const MaskedEmail = ({ className }) => {
  const email =userData?.data?.email ; // Make sure this is a valid email string
  const maskedEmail = maskEmail(email);

  return (
    <div>
      {/* Masked Email Display */}
      <p className={className}>{maskedEmail}</p>
    </div>
  );
};

// Define PropTypes for MaskedEmail component
MaskedEmail.propTypes = {
  className: PropTypes.string,
};


export default MaskedEmail;
