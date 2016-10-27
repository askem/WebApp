import React from 'react';
import AGE_GROUPS from 'constants/AGE_GROUPS';
import consolidateAgeGroups from 'utils/array/consolidateAgeGroups';
import Checkbox from 'components/Common/Checkbox/Checkbox';
import ReactSelectize from 'react-selectize';
require('react-selectize/themes/index.css');
import QuoteFBPages from 'components/Quote/QuoteFBPages';
import QuoteInterests from 'components/Quote/QuoteInterests';
import QuoteBehaviors from 'components/Quote/QuoteBehaviors';

class QuoteDemographics extends React.Component {
	constructor(props) {
    	super(props);
		this.onGenderChange = this.onGenderChange.bind(this);
		this.onAgeGroupChange = this.onAgeGroupChange.bind(this);
	}
	onGenderChange(e) {
		const gender = e.target.dataset.gender;
		this.props.setQuoteDemoGender(gender, e.target.checked);
	}
	onAgeGroupChange(e) {
		const group = e.target.dataset.group;
		this.props.toggleQuoteDemoAgeGroup(group);
	}

	render() {
		const renderUS = (location) => <div className="quote-location">
			<div className="title">United States</div>
		</div>;
		return (
			<div>
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
							<Checkbox data-group={g.id} label={g.title}
								onChange={this.onAgeGroupChange}
								checked={this.props.demographics.ageGroups.indexOf(g.id) > -1} />
						</div>)}
					</div>
				</div>

				<div className="quote-audience">
					<div className="title">Gender</div>
					<div className="value">
						<Checkbox data-gender="female" label="Female"
							onChange={this.onGenderChange} checked={this.props.demographics.gender.female} />
						<Checkbox data-gender="male" label="Male"
							onChange={this.onGenderChange} checked={this.props.demographics.gender.male}/>
					</div>
				</div>

				<div className="quote-audience">
					<div className="title">Interests</div>
					<div className="value">
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

			</div>
		)
	}
}

QuoteDemographics.propTypes = {

};

export default QuoteDemographics;
