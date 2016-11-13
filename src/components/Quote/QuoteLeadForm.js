import React from 'react';
import TextField from 'material-ui/TextField';
import quoteContactFields from 'constants/quoteContactFields';

class QuoteLeadForm extends React.Component {
	constructor(props) {
    	super(props);
		this.onFocusField = this.onFocusField.bind(this);
		this.onBlurField = this.onBlurField.bind(this);
		this.validateField = this.validateField.bind(this);
		this.state = {
		}
	}
	onFocusField(field) {
		const errorKey = `error-${field.id}`;
		this.setState({
			[errorKey]: null
		});
	}
	onBlurField(field, evt) {
		evt.preventDefault();
		const value = evt.target.value;
		this.props.finishedEditingContactValue(field.id, value);
		//this.validateField(field, value);
	}
	validateField(field, value) {
		const errorKey = `error-${field.id}`;
		if (field.required && !value) {
			this.setState({
				[errorKey]: `Please enter a value`
			});
			return false;
		}
		if (field.type === 'email') {
			const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    		if (!emailRegex.test(value)) {
				this.setState({
					[errorKey]: `Please enter a valid email`
				});
				return false;
			}
		}
		return true;
	}
	onSubmit() {
		let valid = true;
		quoteContactFields.map(f => {
			if (!this.validateField(f, this.props.contact[f.id])) {
				valid = false;
			}
		});
		return valid;
	}
	render() {
		return (
			<div className="lead-form">
				{quoteContactFields.map((f, idx) => <div key={f.id}><TextField fullWidth={true}
					ref={f.id}
					floatingLabelText={`${f.required ? '* ' : ''}${f.label}`}
					autoFocus={idx === 0}
					errorText={this.state[`error-${f.id}`]}
					type={f.type}
					value={this.props.contact[f.id] || ''}
					onFocus={(e) => this.onFocusField(f)}
					onBlur={(e) => this.onBlurField(f, e)}
					onChange={(e) => this.props.setQuoteContactValue(f.id, e.target.value)} />
				</div>)}
				
			</div>
		)
	}
}

QuoteLeadForm.propTypes = {

};

export default QuoteLeadForm;
