import React from 'react';

import Toggle from 'react-input-toggle/dist/react-input-toggle';
require('react-input-toggle/dist/react-input-toggle.css');

class QuoteDemographics extends React.Component {
	constructor(props) {
    	super(props);
		this.onGenderChange = this.onGenderChange.bind(this);
	}
	onGenderChange(e) {
		const gender = e.target.dataset.gender;
		this.props.setQuoteDemoGender(gender, e.target.checked);
	}
	render() {
		return (
			<div>

				<div>
					General Population (U.S.)
					<img style={{width: 100}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_(states_only).svg/2000px-Blank_US_Map_(states_only).svg.png" />
				</div>

				<div className="quote-demo">
					<div className="title">Ages: </div>
					<div className="value">18-65+</div>
				</div>

				<div className="quote-demo">
					<div className="title">Gender: </div>
					<div className="value">
						<Toggle data-gender="female" label="Female" effect="echo" labelPosition="left"
							onChange={this.onGenderChange} checked={this.props.demographics.gender.female} />
						<Toggle data-gender="male" label="Male" effect="echo" labelPosition="left"
							onChange={this.onGenderChange} checked={this.props.demographics.gender.male}/>
					</div>
				</div>


			</div>
		)
	}
}

QuoteDemographics.propTypes = {

};

export default QuoteDemographics;
