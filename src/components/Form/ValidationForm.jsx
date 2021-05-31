import React, {useState, useEffect} from "react";
import axios from 'axios';

import FieldItem from "../FieldItem/FieldItem";
import ValidationMessage from "../ValidateMessage/ValidationMessage";
import "../../App.scss";

/**
  This is the validation form component includes operations for validation
*/
const ValidationForm = () => {
  const [postcode, setPostcode] = useState('');
  const [suburb, setSuburb] = useState('');
  const [state, setState] = useState('');
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [mounted, setMounted] = useState(false);

  // this is for React useEffect warning when running test: 
  // Can't perform a React state update on an unmounted component
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [message]);

  // clear all inputs and message when click clear button
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

  // check if the input values match the corresponsing data in a locality 
  const checkLocality = (locality) => {
    let postcodeMatchesSuburb = false;
    let suburbMatchesState = false;    
    if (state === locality.state) { // state match
      if (suburb.toUpperCase() === locality.location) { // suburb matches state
        suburbMatchesState = true;
        if (Number(postcode) === locality.postcode) {  // postcode matches suburb
          postcodeMatchesSuburb = true;
        }
      }
    }
    return {postcodeMatchesSuburb, suburbMatchesState};
  };

  // set validation message content based on the result of matches
  const handleValidationMessage = (isValidPostcode, isValidSuburb) => {
    if (!isValidPostcode) { // if postcode does not match the suburb
      setMessage(messages.postcodeError);
      setIsValid(false);
    } else if (!isValidSuburb) { // if suburb does not match the state
      setMessage(messages.suburbError);
      setIsValid(false);
    } else {
      setMessage(messages.success);
      setIsValid(true);
    }
  };

  // submit the form to our own '/getLocalities' GET endpoint by parsing suburb and state value
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.get(`http://localhost:8100/getLocalities?suburb=${suburb}&state=${state}`).then(
      ({data: {localities}}) => {
        let isValidPostcode; // variable for postcode match suburb check
        let isValidSuburb;  // variable for suburb match state check

        // if the localities result is not empty, set the match values
        if (localities !== "" && mounted) {
          // if there are multiple localities returned, check each locality for matches
          if (Array.isArray(localities.locality)) {
            localities.locality.some((item) => {
              isValidPostcode = checkLocality(item).postcodeMatchesSuburb;
              isValidSuburb = checkLocality(item).postcodeMatchesSuburb;
              // if a success match is found, just jump out of the loop
              // else, keep matching
              if (isValidPostcode && isValidSuburb)
                return true;
              return false;
            });
          } else { // if there are multiple localities returned
            isValidPostcode = checkLocality(localities.locality).postcodeMatchesSuburb;
            isValidSuburb = checkLocality(localities.locality).postcodeMatchesSuburb;
          }
          handleValidationMessage(isValidPostcode, isValidSuburb);
        } else { 
          // if the localities result is empty, show the surburb not match state error
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
		<div className="container" data-cy="validation-form-container">
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
