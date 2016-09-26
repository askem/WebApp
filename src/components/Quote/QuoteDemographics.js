import React from 'react';
import AGE_GROUPS from 'constants/AGE_GROUPS';
import consolidateAgeGroups from 'utils/array/consolidateAgeGroups';
import Toggle from 'react-input-toggle/dist/react-input-toggle';
require('react-input-toggle/dist/react-input-toggle.css');

class QuoteDemographics extends React.Component {
	constructor(props) {
    	super(props);
		this.onGenderChange = this.onGenderChange.bind(this);
		this.onAgeGroupChange = this.onAgeGroupChange.bind(this);
		this.toggleEditingDemo = this.toggleEditingDemo.bind(this);
		this.state = {
			customizing: false
		}
	}
	onGenderChange(e) {
		const gender = e.target.dataset.gender;
		this.props.setQuoteDemoGender(gender, e.target.checked);
	}
	onAgeGroupChange(e) {
		const group = e.target.dataset.group;
		this.props.toggleQuoteDemoAgeGroup(group);
	}
	toggleEditingDemo() {
		this.setState({
			customizing: !this.state.customizing
		});
	}
	render() {
		let demoView;
		if (this.state.customizing) {
			demoView = <div>
				<div>
					General Population (U.S.)
					<img style={{width: 100}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_(states_only).svg/2000px-Blank_US_Map_(states_only).svg.png" />
				</div>

				<div className="quote-demo">
					<div className="title">Ages: </div>
					<div className="value">
						{AGE_GROUPS.map(g => <div key={g.id}>
							<Toggle data-group={g.id} label={g.title} effect="echo" labelPosition="right"
								onChange={this.onAgeGroupChange}
								checked={this.props.demographics.ageGroups.indexOf(g.id) > -1} />
						</div>)}
					</div>
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
			</div>;
		} else {
			let genderText = '';
			if (this.props.demographics.gender.female) {
				genderText += 'Famale';
			}
			if (this.props.demographics.gender.male) {
				if (genderText) {
					genderText += ' and ';
				}
				genderText += 'Male';
			}
			demoView = <div>
				<div>
					General Population (U.S.)
				</div>

				<div className="quote-demo">
					<div className="title">Ages: </div>
					<div className="value">
						{consolidateAgeGroups(this.props.demographics.ageGroups)}
					</div>
				</div>

				<div className="quote-demo">
					<div className="title">Gender: </div>
					<div className="value">
						{genderText}
					</div>
				</div>
			</div>;
		}
		return (
			<div>
				<button onClick={this.toggleEditingDemo}>
					{this.state.customizing ? 'Done' : 'Edit'}
				</button>
				{demoView}
			</div>
		)
	}
}

QuoteDemographics.propTypes = {

};

export default QuoteDemographics;
