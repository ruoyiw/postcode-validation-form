import React, {useState} from "react";
import axios from 'axios';

import FieldItem from "../FieldItem/FieldItem";
import ValidationMessage from "../ValidateMessage/ValidationMessage";
import "../../App.scss";

const ValidationForm = () => {
  const [postcode, setPostcode] = useState('');
  const [suburb, setSuburb] = useState('');
  const [state, setState] = useState('');
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

	const handleClear = () => {
		setPostcode('');
		setSuburb('');
		setState('');
    setMessage('');
    setIsValid(false);
	};

  const fullStateName = {
    ACT: "Australian Capital Territory",
    NSW: "New South Wales",
    NT: "Northern Territory",
    QLD: "Queensland",
    SA: "South Australia",
    TAS: "Tasmania",
    VIC: "Victoria",
    WA: "Western Australia",
  };

  const messages = {
    postcodeError: `The postcode ${postcode} does not match the suburb ${suburb}`,
    suburbError: `The suburb ${suburb} does not exist in the state of ${fullStateName[state]}`,
    success: "The postcode, suburb and state entered are valid"
  };

  const checkLocality = (locality) => {
    let postcodeMatchesSuburb = false;
    let suburbMatchesState = false;    
    if (state === locality.state) {  
      // state match
      if (suburb.toUpperCase() === locality.location) { // suburb matches state
        suburbMatchesState = true;
        if (Number(postcode) === locality.postcode) {  // postcode matches suburb
          postcodeMatchesSuburb = true;
        }
      }
    }
    return {postcodeMatchesSuburb, suburbMatchesState};
  };

  const handleValidationMessage = (isValidPostcode, isValidSuburb) => {
    if (!isValidPostcode) {
      setMessage(messages.postcodeError);
      setIsValid(false);
    } else if (!isValidSuburb) {
      setMessage(messages.suburbError);
      setIsValid(false);
    } else {
      setMessage(messages.success);
      setIsValid(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.get(`http://localhost:8100/getLocalities?suburb=${suburb}&state=${state}`).then(
      ({data: {localities}}) => {
        let isValidPostcode; let isValidSuburb;
        if (localities !== "") {
          if (Array.isArray(localities.locality)) {
            localities.locality.some((item) => {
              isValidPostcode = checkLocality(item).postcodeMatchesSuburb;
              isValidSuburb = checkLocality(item).postcodeMatchesSuburb;
              if (isValidPostcode && isValidSuburb)
                return true;
              return false;
            });
          } else {
            isValidPostcode = checkLocality(localities.locality).postcodeMatchesSuburb;
            isValidSuburb = checkLocality(localities.locality).postcodeMatchesSuburb;
          }
          handleValidationMessage(isValidPostcode, isValidSuburb);
        } else {
          setMessage(messages.suburbError);
        }
      }).catch(error => {
        setIsValid(false);
        if (error.response && error.response.data.error){
          setMessage(error.response.data.error.errorMessage);
        } else if (error.response) {
          setMessage(error.response.data);
        } else {
          throw new Error(error);
        }
      });
  };

  return (		
		<div className="container">
      <div className="validation-form__header-wrapper">
        <h1 className="validation-form__header">
          Validate your location
        </h1>
        <div className="validation-form__req-text">
          Fields marked with 
          <span className="validation-form__req-symbol"> *</span> are required
        </div>
      </div>
			<div className="validation-form__form-wrapper">
				<form className="validation-form__body" onSubmit={handleSubmit}>
					<FieldItem
						title="Postcode"
						name="postcode"
						value={postcode}
						onChange={e => {
              setPostcode(e.target.value);
              setMessage('');
              setIsValid(false);
            }}
            placeholder="e.g. 2000"
						required
					/>
					<FieldItem
						title="Suburb"
						name="suburb"
						value={suburb}
						onChange={e => {
              setSuburb(e.target.value);
              setMessage('');
              setIsValid(false);
            }}
            placeholder="e.g. Sydney"
						required
					/>
					<FieldItem
						title="State"
						name="state"
						value={state}
						onChange={e => {
              setState(e.target.value);
              setMessage('');
              setIsValid(false);
            }}
						required
					/>
          <ValidationMessage
            isValid={isValid}
            message={message}
          />
					<div className="validation-form__actions">
        		<input
							className="validation-form__actions--submit"
							type="submit"
							value="Submit"
							title="Submit to validate all fields"
						/>
						<button
							className="validation-form__actions--clear"
							type="button"
							title="Clear field contents"
							onClick={handleClear}
						>
							Clear
						</button>
    			</div>
				</form>	
			</div>
		</div> 
	);
};

export default ValidationForm;
