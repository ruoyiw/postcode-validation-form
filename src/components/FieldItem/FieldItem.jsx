  
import React from "react";
import PropTypes from "prop-types";

const FieldItem = ({ title, name, value, onChange }) => (
  <div>
		<label className="validation-form__field-title" htmlFor={name}>{title}</label>
		{name === 'state' ? (
      <select 
        className="validation-form__field-body"
        name="state"
        value={value}
        onChange={onChange}
        required
      >
        <option value="">Choose state...</option>
        <option value="ACT">ACT</option>
        <option value="NSW">NSW</option>
        <option value="NT ">NT</option>
        <option value="QLD">QLD</option>
        <option value="SA ">SA</option>
        <option value="TAS">TAS</option>
        <option value="VIC">VIC</option>
        <option value="WA ">WA</option>
      </select>
    ) : (
    <input
      type={name === 'postcode' ? "number" : "text"}
      className="validation-form__field-body"
      name={name}
      value={value}
      onChange={onChange}
      required 
		/>
  )}
	</div>
);

FieldItem.propTypes = {
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

FieldItem.defaultProps = {
	value: '',
};
export default FieldItem;