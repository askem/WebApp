import React from 'react';
import consolidateAgeGroups from 'utils/array/consolidateAgeGroups';

class QuoteSummary extends React.Component {
	constructor(props) {
    	super(props);
	}
	render() {
		let sampleSize;
		if (this.props.displaySampleSize) {
			sampleSize = <li><strong>Sample Size:</strong> {this.props.sample.sampleSize}</li>;
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
			interests = <li><strong>Interests:</strong> {interestsDescription}</li>
		}
		let behaviors;
		if (this.props.audience.behaviors.length > 0) {
			const behaviorsDescription = this.props.audience.behaviors
				.map(behavior => behavior.value).join(', ');
			behaviors = <li><strong>Behaviors:</strong> {behaviorsDescription}</li>
		}
		const numberOfQuestions = this.props.surveyMetadata.questions.length;
		const surveyDescription = numberOfQuestions > 0 ? `${numberOfQuestions} questions` : 'Not defined';
		return (
			<div>
				<div className="quote-wizard-side-title">
					Summary
				</div>
				<ul style={{padding: '10px 20px'}}>
					<li><strong>Location:</strong> U.S.</li>
					<li><strong>Demographics:</strong> {genderDescription}, {ageDescription}</li>
					{interests}
					{behaviors}
					<li><strong>Estimated Reach:</strong> {this.props.reachEstimate.reach || 'N/A'}</li>
					<li><strong>Survey:</strong> {surveyDescription}</li>
					{sampleSize}
				</ul>
			</div>
		)
	}
}

QuoteSummary.propTypes = {
	displaySampleSize: React.PropTypes.bool
};

export default QuoteSummary;
