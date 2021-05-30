import React from 'react';
import { fireEvent } from '@testing-library/react';

import { render } from '../../utils/setupTests';
import FieldItem from './FieldItem';

const defaultProps = {
    title: "Test",
    name: "test",
    value: "test value",
    required: true,
};

const renderField= (options = defaultProps) => {
  const changeFn = jest.fn();
  const result = render(
    <FieldItem onChange={changeFn} {...options} />,
  );
  const wrapper = result.queryByDataCy('field-wrapper');
  const title = wrapper.querySelector('.validation-form__field-title');
  const body = wrapper.querySelector('.validation-form__field-body');

  return {
    ...result,
    wrapper,
    title,
    body,
    changeFn,
  };
};

describe('FieldItem Component', () => {
  it('render field correctly', () => {
    const {wrapper, title, body} = renderField();
    expect(wrapper).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(body).toBeRequired();
    expect(title).toHaveTextContent("Test *");
    expect(body.value).toBe("test value");
  });

  it('render input field if name is postcode or suburb', () => {
    const result = renderField({...defaultProps, name: "postcode", title: "Postcode"});
    expect(result.body).toHaveClass("input");
  });

  it('render select field if name is state', () => {
    const result = renderField({...defaultProps, name: "state", title: "State"});
    expect(result.body).toHaveClass("select");
  });

  it('onChange function will be called if change the field value', () => {
    const {body, changeFn} = renderField();
    fireEvent.change(body, {  target: { value: 'new test value' } });
    expect(changeFn).toBeCalledTimes(1);
  });
});