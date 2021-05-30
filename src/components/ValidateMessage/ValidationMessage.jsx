import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const ValidationMessage = ({ isValid, message }) => {
  const className = cx(
    'validation-form__message',
    isValid ? '-success' : '-error'
  );
  
  return (
    message !== '' ? (
      <div className={className} role="alert">{message}</div>
    ) : null
    );
  };

ValidationMessage.propTypes = {
  isValid: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
};

export default ValidationMessage;