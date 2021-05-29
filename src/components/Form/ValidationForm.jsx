import React, {useState} from "react";

import FieldItem from "../FieldItem/FieldItem";
import "./ValidationForm.scss";

const ValidationForm = () => {
  const [postcode, setPostcode] = useState('');
  const [suburb, setSuburb] = useState('');
  const [state, setState] = useState('');

  return (		
		<div className="container">
			<h1 className="validation-form__header">Validate your location</h1>
			<div className="validation-form__wrapper">
				<form className="validation-form__body">
					<FieldItem
						title="Postcode"
						name="postcode"
						value={postcode}
						onChange={e => setPostcode(e.target.value)}
					/>
					<FieldItem
						title="Suburb"
						name="suburb"
						value={suburb}
						onChange={e => setSuburb(e.target.value)}
					/>
					<FieldItem
						title="State"
						name="state"
						value={state}
						onChange={e => setState(e.target.value)}
					/>
				</form>	
			</div>
		</div> 
	);
};

export default ValidationForm;
