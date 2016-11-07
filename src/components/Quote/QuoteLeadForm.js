import React from 'react';
import TextField from 'material-ui/TextField';

class QuoteLeadForm extends React.Component {
	constructor(props) {
    	super(props);
	}
	render() {
		return (
			<div className="lead-form">
				<TextField fullWidth={true} floatingLabelText="First Name" /><br/>
				<TextField fullWidth={true} floatingLabelText="Last Name" /><br/>
				<TextField fullWidth={true} floatingLabelText="Phone Number" /><br/>
				<TextField fullWidth={true} floatingLabelText="Email" type="email" /><br/>
				<TextField fullWidth={true} floatingLabelText="Company" /><br/>
			</div>
		)
	}
}

QuoteLeadForm.propTypes = {

};

export default QuoteLeadForm;
