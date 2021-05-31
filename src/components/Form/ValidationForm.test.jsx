import React from 'react';
import { fireEvent, waitFor, act } from '@testing-library/react';

import { render, getLocalitiesAPI } from '../../utils/setupTests';
import ValidationForm from './ValidationForm';

const renderForm = () => {
  const result = render(
    <ValidationForm />,
  );
  const container = result.queryByDataCy('validation-form-container');
  const header = container.querySelector('.validation-form__header');
  const formBody = container.querySelector('.validation-form__body');
  const postcodeField = result.queryByDataCy('postcode-field');
  const suburbField = result.queryByDataCy('suburb-field');
  const stateField = result.queryByDataCy('state-field');
  const submitBtn = container.querySelector('.validation-form__actions--submit');
  const clearBtn = container.querySelector('.validation-form__actions--clear');
  const message = result.queryByDataCy('validation-message');
 
  return {
    ...result,
    container,
    header,
    formBody,
    postcodeField,
    suburbField,
    stateField,
    submitBtn,
    clearBtn,
    message,
  };
};

describe('ValidationForm Component', () => {
  it('render validation form correctly', () => {
    // render form elements
    const result = renderForm();
    expect(result.container).toBeInTheDocument();
    expect(result.header).toBeInTheDocument();
    expect(result.formBody).toBeInTheDocument();
    expect(result.submitBtn).toBeInTheDocument();
    expect(result.clearBtn).toBeInTheDocument();
    expect(result.postcodeField).toBeInTheDocument();
    expect(result.suburbField).toBeInTheDocument();
    expect(result.stateField).toBeInTheDocument();

    // should not show the validation message before submit the form
    expect(result.message).not.toBeInTheDocument();
  });

  it('call proxy getLocalities API correctly', async () => {
    // should return success response if parsing correct queries
    let response = await fetch(getLocalitiesAPI('Sydney', 'NSW'));
    expect(response.ok).toBeTruthy();

    // should return error response if not parsing queries correctly
    response = await fetch(getLocalitiesAPI('', 'NSW'));
    expect(response.ok).toBeFalsy();
  });

  it('call onsubmit function correct when submit the form', async () => {
    const {formBody} =  renderForm();
    const handleSubmit = jest.fn();
    formBody.onsubmit = handleSubmit;
    fireEvent.submit(formBody);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  // FIXME: This test is failed currently as the message component is show
  // in the DOM but fail the assert of toBeInTheDocument(), 
  // need to further investigate the problem
  xit('if the entered postcode not matches the suburb', async () => {
    const result =  renderForm();
    fireEvent.change(result.postcodeField, { target: { value: 2222 } });
    fireEvent.change(result.suburbField, { target: { value: 'Sydney' } });
    fireEvent.change(result.stateField, { target: { value: 'NSW' } });
    // fireEvent.click(result.submitBtn);
    const handleSubmit = jest.fn();
    result.formBody.onsubmit = handleSubmit;
    act(() => {fireEvent.submit(result.formBody);});
    await waitFor(() => {
      expect(result.message).toBeInTheDocument();
      expect(result.message).toHaveClass("error");
    });
  });

  // FIXME: This test is failed currently as the message component is show
  // in the DOM but fail the assert of toBeInTheDocument(), 
  // need to further investigate the problem
  xit('if the entered surburb not matches the state', async () => {
    const result =  renderForm();
    fireEvent.change(result.postcodeField, { target: { value: 2000 } });
    fireEvent.change(result.suburbField, { target: { value: 'Sydney' } });
    fireEvent.change(result.stateField, { target: { value: 'ACT' } });
    fireEvent.click(result.submitBtn);
    expect(result.message).toBeInTheDocument();
    expect(result.message).toHaveClass("error");
  });

  // FIXME: This test is failed currently as the message component is show
  // in the DOM but fail the assert of toBeInTheDocument(), 
  // need to further investigate the problem
  xit('if the postcode, suburb and state match', async() => {
    const result =  renderForm();
    fireEvent.change(result.postcodeField, { target: { value: 2000 } });
    fireEvent.change(result.suburbField, { target: { value: 'Sydney' } });
    fireEvent.change(result.stateField, { target: { value: 'NSW' } });
    fireEvent.click(result.submitBtn);
    expect(result.message).toBeInTheDocument();
    expect(result.message).toHaveClass("success");
  });
});

