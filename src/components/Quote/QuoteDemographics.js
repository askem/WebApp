import React from 'react';
import AGE_GROUPS from 'constants/AGE_GROUPS';
import consolidateAgeGroups from 'utils/array/consolidateAgeGroups';
import Toggle from 'react-input-toggle/dist/react-input-toggle';
require('react-input-toggle/dist/react-input-toggle.css');
import ReactSelectize from 'react-selectize';
require('react-selectize/themes/index.css');
import QuoteFBPages from 'components/Quote/QuoteFBPages';
import QuoteInterests from 'components/Quote/QuoteInterests';
import QuoteBehaviors from 'components/Quote/QuoteBehaviors';

const getFacebookPages = (input) => {
	return fetch(`https://graph.facebook.com/v2.7/search?q=${input.replace(/ /g, '+')}&type=page&fields=picture.type(large),name,fan_count&access_token=1160541464012998|iQI7gMB2GTQ-3oO4A07lzjjgNWE`)
	.then((response) => {
		return response.json();
	}).then((json) => {
		const options = json.data.map(page => ({
			value: page.id,
			label: page.name,
			iconURL: page.picture.data.url,
			fans: page.fan_count
		}));
		return {
			options
		};
	});
}
const renderFacebookPageOption = (option) => <div>
	<img src={option.iconURL} style={{width:30, height: 30}}/>
	<strong>{option.label}</strong>
	{option.fans} fans
</div>;

class QuoteDemographics extends React.Component {
	constructor(props) {
    	super(props);
		this.onGenderChange = this.onGenderChange.bind(this);
		this.onAgeGroupChange = this.onAgeGroupChange.bind(this);
		this.toggleEditingDemo = this.toggleEditingDemo.bind(this);
		this.state = {
			customizing: true
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
			const renderUS = (location) => <div className="quote-location">
				<div className="title">United States</div>
				<img style={{height: 30}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_(states_only).svg/2000px-Blank_US_Map_(states_only).svg.png" />
			</div>;
			demoView = <div>
				<div className="quote-audience">
					<div className="title">
						Location
					</div>
					<div className="value quote-uneditable-select">
						<ReactSelectize.SimpleSelect ref="locationSelector"
							hideResetButton={true}
							filterOptions={(options, search) => options}
							options={['genpop_US']}
							renderOption={renderUS}
							renderValue={renderUS}
							value={'genpop_US'}
						/>
					</div>
				</div>

				<div className="quote-audience">
					<div className="title">Ages</div>
					<div className="value" style={{display: 'flex'}}>
						{AGE_GROUPS.map(g => <div key={g.id}>
							<Toggle data-group={g.id} label={g.title} effect="echo" labelPosition="left"
								onChange={this.onAgeGroupChange}
								checked={this.props.demographics.ageGroups.indexOf(g.id) > -1} />
						</div>)}
					</div>
				</div>

				<div className="quote-audience">
					<div className="title">Gender</div>
					<div className="value">
						<Toggle data-gender="female" label="Female" effect="echo" labelPosition="left"
							onChange={this.onGenderChange} checked={this.props.demographics.gender.female} />
						<Toggle data-gender="male" label="Male" effect="echo" labelPosition="left"
							onChange={this.onGenderChange} checked={this.props.demographics.gender.male}/>
					</div>
				</div>

				<div className="quote-audience">
					<div className="title">Interests</div>
					<div className="value" style={{width: 500}}>
						<QuoteInterests {...this.props} />
					</div>
				</div>

				<div className="quote-audience">
					<div className="title">Behaviors</div>
					<div className="value" style={{width: 500}}>
						<QuoteBehaviors {...this.props} />
					</div>
				</div>

				{/*<div className="quote-audience">
					<div className="title">Your Audience</div>
					<div className="value" style={{width: 500}}>
						<QuoteFBPages {...this.props} />
					</div>
				</div>*/}

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
					United States
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
		const editButton =
			<button onClick={this.toggleEditingDemo}>
				{this.state.customizing ? 'Done' : 'Edit'}
			</button>;
		return (
			<div>
				{demoView}
			</div>
		)
	}
}

QuoteDemographics.propTypes = {

};

export default QuoteDemographics;
