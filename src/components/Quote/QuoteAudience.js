import React from 'react';
import AGE_GROUPS from 'constants/AGE_GROUPS';
import HOUSEHOLD_INCOME from 'constants/HOUSEHOLD_INCOME';
import RELATIONSHIP_STATUS from 'constants/RELATIONSHIP_STATUS';
import consolidateAgeGroups from 'utils/array/consolidateAgeGroups';
import Checkbox from 'components/Common/Checkbox/Checkbox';
import ReactSelectize from 'react-selectize';
require('react-selectize/themes/index.css');
import QuoteFBPages from 'components/Quote/QuoteFBPages';
import QuoteInterests from 'components/Quote/QuoteInterests';
import QuoteBehaviors from 'components/Quote/QuoteBehaviors';
import TargetingList from 'components/Quote/TargetingList';
import TargetingSearch from 'components/Quote/TargetingSearch';
import CollapableSection from 'components/Common/CollapableSection';

const TargetingSearchWithTitle = (props) => (
	<div className="quote-audience">
	<div className="title">{props.title}</div>
	<div className="value" style={{width: 500}}>
		<TargetingSearch {... props} />
	</div>
</div>);

class QuoteAudience extends React.Component {
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
							options={['US']}
							renderOption={()=><span style={{marginLeft: 5}}>United States</span>}
							renderValue={()=><span>United States</span>}
							value={'US'}
						/>
					</div>
				</div>

				<div className="quote-audience">
					<div className="title">Ages</div>
					<div className="value" style={{display: 'flex'}}>
						{AGE_GROUPS.map(g => <div key={g.id}>
							<Checkbox data-group={g.id} label={g.title}
								onChange={this.onAgeGroupChange}
								checked={this.props.audience.demographics.ageGroups.indexOf(g.id) > -1} />
						</div>)}
					</div>
				</div>

				<div className="quote-audience">
					<div className="title">Gender</div>
					<div className="value">
						<Checkbox data-gender="female" label="Female"
							onChange={this.onGenderChange} checked={this.props.audience.demographics.gender.female} />
						<Checkbox data-gender="male" label="Male"
							onChange={this.onGenderChange} checked={this.props.audience.demographics.gender.male}/>
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

					<CollapableSection title="Advanced" useAnalytics={true} eventName="ADVANCED_TOGGLE" {...this.props }>
							<TargetingList title="Relationship Status"
								attributeType="relationship"
								availableAttributes={RELATIONSHIP_STATUS}
								attributes={this.props.audience.relationship || []}
								onToggle={this.props.toggleQuoteAudienceAttribute} />

							<TargetingList title="Household Income"
								attributeType="householdIncome"
								availableAttributes={HOUSEHOLD_INCOME}
								attributes={this.props.audience.householdIncome || []}
								onToggle={this.props.toggleQuoteAudienceAttribute} />

							<TargetingSearchWithTitle title="Education Major"
								attributeType="educationMajors"
								attributes={this.props.audience.educationMajors || []}
								onToggle={this.props.toggleQuoteAudienceAttribute} />

							<CollapableSection title="Employment" useAnalytics={true} eventName="EMPLOYMENT_TOGGLE" {...this.props }>
								<TargetingSearchWithTitle title="Work Industry"
										attributeType="industries"
										attributes={this.props.audience.industries || []}
										onToggle={this.props.toggleQuoteAudienceAttribute} />

								<TargetingSearchWithTitle title="Work Position"
									attributeType="workPositions"
									attributes={this.props.audience.workPositions || []}
									onToggle={this.props.toggleQuoteAudienceAttribute} />

								<TargetingSearchWithTitle title="Employer"
										attributeType="workEmployers"
										attributes={this.props.audience.workEmployers || []}
										onToggle={this.props.toggleQuoteAudienceAttribute} />
							</CollapableSection>
					</CollapableSection>
			</div>
		)
	}
}

QuoteAudience.propTypes = {

};

export default QuoteAudience;
