import React from 'react';
import Loading from 'components/Common/Loading';
import QuoteSurvey from 'components/Quote/QuoteSurvey';
import QuoteAudience from 'components/Quote/QuoteAudience';
import consolidateAgeGroups from 'utils/array/consolidateAgeGroups';
import numeral from 'numeral';
import quoteContactFields from 'constants/quoteContactFields';

class ManageQuote extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			selectedQuestion: null,
			editing: null
		};
	}
	render() {
		if (!this.props.audience) {
			if (this.props.lead && this.props.lead.loadingFail) {
				return <div className="quote-wizard-loading">
					<strong>Error: Quote could not load</strong>
				</div>;
			}
			return <div className="quote-wizard-loading">
				<Loading className="loading-3bounce-green loading-3bounce-lg" />
			</div>;
		}
		
		if (this.state.editing === 'survey') {
			return <div className="quote-manage">
				<div className="done-botton-container">
					<a href={`/${this.props.lead.quoteID}/preview`} target="_blank">Survey Preview</a> 
					<button className="askem-button-white" onClick={()=>this.setState({editing: null})}>Done Editing</button>
				</div>
				<QuoteSurvey {...this.props} showAdvancedControls={true} />
			</div>;
		} else if (this.state.editing === 'audience') {
			return <div className="quote-manage">
				<div style={{textAlign: 'right'}}>
					<button onClick={()=>this.setState({editing: null})}>Done</button>
				</div>
				<QuoteAudience {...this.props} />
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
		const surveyDescription = numberOfQuestions === 1 ? 
			'1 question' : 
			numberOfQuestions > 0 ? `${numberOfQuestions} questions` : 'Not defined';
		const reachDescription = this.props.reachEstimate.reach ? 
			numeral(this.props.reachEstimate.reach).format('a') : 'N/A';
		
		return (
			<div className="quote-manage">
				<h1>Manage Quote</h1>
				<div className="quote-wizard-side-title">
					Audience <button className="askem-button-white edit-button"
						onClick={()=>this.setState({editing: 'audience'})}>Edit</button>
				</div>
				<div className="title">Location</div>
				<div className="value">United States</div>
				<div className="title">Demographics</div>
				<div className="value">{genderDescription}<br/>{ageDescription}</div>
				{interests}
				{behaviors}
				<div className="title">Estimated Reach</div>
				<div className="value">{reachDescription}</div>
				<div className="title">Sample Size</div>
				<div className="value">{this.props.sample.sampleSize}</div>
				<div className="title">Margin of Error</div>
				<div className="value">Approx. {numeral(this.props.sample.moe).format('0[.]0a%')}</div>
				<div className="quote-wizard-side-title">
					Survey 
					<button className="askem-button-white edit-button"
						onClick={()=>this.setState({editing: 'survey'})}>Edit</button>
					<a href={`/${this.props.lead.quoteID}/preview`} target="_blank">Preview</a>
				</div>
				<div className="title">Survey</div>
				<div className="value">{surveyDescription}</div>
				
				<div className="quote-wizard-side-title">
					Contact Details
				</div>
				{quoteContactFields.map((f, idx) => <div key={f.id}>
					<div className="title">{f.label}</div>
					<div className="value">{this.props.contact[f.id] || '(Not Provided)'}</div>
				</div>)}
			</div>
		)
	}
}

ManageQuote.propTypes = {

};

export default ManageQuote;
