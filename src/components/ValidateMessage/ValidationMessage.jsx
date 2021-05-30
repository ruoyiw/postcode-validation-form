import React from "react";
import PropTypes from "prop-types";

const ValidationMessage = ({ isValid, message }) => (
  message !== '' ? (
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