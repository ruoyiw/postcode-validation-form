import React from "react";
import PropTypes from "prop-types";

/**
  This is the component for validation message of error or success status
*/
const ValidationMessage = ({ isValid, message }) => (
  message !== '' ? (// show message component only if the message is not empty
    <div
      className={isValid ? 'validation-form__message success' : 'validation-form__message error'}
      role="alert"
      data-cy="validation-message"
    >
      {message}
    </div>
  ) : null
);

ValidationMessage.propTypes = {
  isValid: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
};

export default ValidationMessage;