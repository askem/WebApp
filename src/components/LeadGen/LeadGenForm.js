import React, { Component } from 'react';
import TextField from 'material-ui/TextField';


class LeadgenForm extends Component {
	constructor(props) {
		super(props);
		this.onFinishClick = this.onFinishClick.bind(this);
		this.onTextChange = this.onTextChange.bind(this);

		this.state = {
			disabled : true
		}
	}
	
	onFinishClick() {
		console.log('Finished....');
	}

	onTextChange(event, fieldType) {
		let { firstName, lastName, email } = this.state;

		switch(fieldType) {
			case 'firstName' :
				firstName = event.target.value;
				break;
			case 'lastName' :
				lastName = event.target.value;
				break;
			case 'email' :
				email = event.target.value;
				break;
		}

		const disabled = !this.isValid(firstName) || !this.isValid(lastName) || !this.isValid(email);

		this.setState({
			[fieldType] : event.target.value,
			disabled
		})
	}

	isValid(element) {
		if (typeof element === 'undefined')
			return false;

		return element === '' ? false : true;	
	}

	render() {
		const buttonClass = this.state.disabled ? 'disabled-form-button' : 'askem-button';

		return (
				<div className="quote-wizard-border">
					<div className="quote-wizard-main" style={{ borderTop:'50px' }}>
						<div className="quote-wizard-maincontent">
							<div>
								<div className="quote-audience">
									<div className="title">
										Please leave your details below so we can reach you 
									</div>
								</div>
								<div className="quote-audience">
									<TextField
										hintText="First Name"
										id="firstName"
										onChange={ (event) => { this.onTextChange(event, 'firstName') }}
									/>
								</div>
								<div className="quote-audience">
									<TextField
										hintText="Last Name"
										id="lastName"
										onChange={ (event) => { this.onTextChange(event, 'lastName') }}
									/>
								</div>
								<div className="quote-audience">
									<TextField
										hintText="Email"
										id="email"
										onChange={ (event) => { this.onTextChange(event, 'email') }}
									/>
								</div>
								<div className="quote-audience">
									<button
										className={buttonClass}
										onClick={ this.onFinishClick }
										disabled={ this.state.disabled }>
											Thanks! 
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
		);
	}	
}

export default LeadgenForm;