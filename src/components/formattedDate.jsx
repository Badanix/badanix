import PropTypes from "prop-types";

const FormattedDate = ({ date }) => {
  const formattedDate = `${new Date(date).getFullYear()}-${(new Date(date).getMonth() + 1).toString().padStart(2, '0')}-${new Date(date).getDate().toString().padStart(2, '0')}`;

  return <span>{formattedDate}</span>;
};

FormattedDate.propTypes = {
  date: PropTypes.string.isRequired, 
};

export default FormattedDate;
