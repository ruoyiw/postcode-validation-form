import React from 'react';

import { render } from '../../utils/setupTests';
import ValidationMesage from './ValidationMessage';

const defaultProps = {
    isValid: false,
    message: '',
};

const renderMessage= (props = defaultProps) => {
  const result = render(
    <ValidationMesage {...props} />,
  );
  const message = result.queryByDataCy('validation-message');
  return {
    ...result,
    message,
  };
};

describe('ValidationMessage Component', () => {
  it('not render validation message if message is empty', () => {
    const {message} = renderMessage();
    expect(message).not.toBeInTheDocument();
  });

  it('render error message if isValid is false', () => {
    const {message} = renderMessage({isValid: false, message: 'Testing error message'});
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass("error");
  });

  it('render suucess message if isValid is true', () => {
    const {message} = renderMessage({isValid: true, message: 'Testing success message'});
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass("success");
  });
});