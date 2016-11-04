import React from 'react';
import consolidateAgeGroups from 'utils/array/consolidateAgeGroups';
import numeral from 'numeral';

class QuoteSummary extends React.Component {
	constructor(props) {
    	super(props);
	}
	render() {
		let sampleSize;
		if (this.props.displaySampleSize) {
			sampleSize = <div>
				<div className="title">Sample Size</div>
				<div className="value">{this.props.sample.sampleSize}</div>
			</div>;
		}
		let genderDescription;
		if (this.props.audience.demographics.gender.female && this.props.audience.demographics.gender.male) {
			genderDescription = 'Female and Male';
		} else if (this.props.audience.demographics.gender.female) {
			genderDescription = 'Female';
		}  else if (this.props.audience.demographics.gender.male) {
			genderDescription = 'Male';
		}
		const ageDescription = consolidateAgeGroups(this.props.audience.demographics.ageGroups);
		let interests;
		if (this.props.audience.interests.length > 0) {
			const interestsDescription = this.props.audience.interests
				.map(interest => interest.value).join(', ');
			interests = <div>
				<div className="title">Interests</div>
				<div className="value">{interestsDescription}</div>
			</div>;
		}
		let behaviors;
		if (this.props.audience.behaviors.length > 0) {
			const behaviorsDescription = this.props.audience.behaviors
				.map(behavior => behavior.value).join(', ');
			behaviors = <div>
				<div className="title">Behaviors</div>
				<div className="value">{behaviorsDescription}</div>
			</div>;
		}
		const numberOfQuestions = this.props.surveyMetadata.questions.length;
		const surveyDescription = numberOfQuestions === 1 ? '1 question' : numberOfQuestions > 0 ? `${numberOfQuestions} questions` : 'Not defined';
		const reachDescription = this.props.reachEstimate.reach ? 
			numeral(this.props.reachEstimate.reach).format('a') : 'N/A';
		return (
			<div className="quote-summary">
				<div className="quote-wizard-side-title">
					Summary
				</div>
				<div className="title">Location</div>
				<div className="value">United States</div>
				<div className="title">Demographics</div>
				<div className="value">{genderDescription}<br/>{ageDescription}</div>
				{interests}
				{behaviors}
				<div className="title">Estimated Reach</div>
				<div className="value">{reachDescription}</div>
				<div className="title">Survey</div>
				<div className="value">{surveyDescription}</div>
				{sampleSize}
			</div>
		)
	}
}

QuoteSummary.propTypes = {
	displaySampleSize: React.PropTypes.bool
};

export default QuoteSummary;
