import React from 'react';
import Loading from 'components/Common/Loading';
import QuoteSurvey from 'components/Quote/QuoteSurvey';
import QuoteAudience from 'components/Quote/QuoteAudience';
import QuoteReach from 'components/Quote/QuoteReach';
import consolidateAgeGroups from 'utils/array/consolidateAgeGroups';
import numeral from 'numeral';
import quoteContactFields from 'constants/quoteContactFields';

const renderContactValue = (field, contact) => {
	let value = contact[field.id];
	if (!value) { return '(Not Provided)' }
	if (field.type === 'email') { value = <a href={`mailto:${value}`}>{value}</a>; }
	return value;
}

class ManageQuote extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			selectedQuestion: null,
			editing: null
		};
	}
	render() {
		if (!this.props.lead.loaded) {
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
					<button className="askem-button-white" onClick={()=>this.setState({editing: null})}>Done Editing</button>
				</div>
				<QuoteSurvey {...this.props} showAdvancedControls={true} />
			</div>;
		} else if (this.state.editing === 'audience') {
			return <div className="quote-manage">
				<div className="done-botton-container">
					<button className="askem-button-white" onClick={()=>this.setState({editing: null})}>Done Editing</button>
				</div>
				<div className="quote-wizard-main">
					<div className="quote-wizard-maincontent">
						<QuoteAudience {...this.props} />
					</div>
					<div className="quote-wizard-side">
						<QuoteReach reach={this.props.reachEstimate.reach}
							showCostEstimate={true} costEstimate={this.props.costEstimate}
							requestCostEstimates={this.props.requestCostEstimates} />
					</div>
				</div>
				
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
			numeral(this.props.reachEstimate.reach).format('a') : 'Fetching ...';
		// const costDescription = this.props.costEstimate && this.props.costEstimate.estimates ?
		// 	numeral(this.props.costEstimate.estimates[this.props.sample.sampleSize].costPerSample).divide(100).format('$0,0.00') : 'Fetching ...';
		const createDateDescription = this.props.lead.dateCreated ? 
			<div>Created {this.props.lead.dateCreated.toDateString()}</div> : null;
		
		return (
			<div className="quote-manage">
			
			<div className="manage-summary">
				<div className="manage-pane">
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
					{/*<div className="title">Estimated Cost</div>
					<div className="value">{costDescription}</div>*/}
					<div className="title">Sample Size</div>
					<div className="value">{this.props.sample.sampleSize}</div>
					<div className="title">Margin of Error</div>
					<div className="value">Approx. {numeral(this.props.sample.moe).format('0[.]0a%')}</div>
				</div>
				
				<div className="manage-pane">
					<div className="quote-wizard-side-title">
						Survey 
						<button className="askem-button-white edit-button"
							onClick={()=>this.setState({editing: 'survey'})}>Edit</button>
					</div>
					<div className="title">Survey</div>
					<div className="value">{surveyDescription}</div>
					<a style={{padding: 0}} href={`/${this.props.lead.quoteID}/preview`} target="_blank">Preview</a>
				</div>
				
				<div className="manage-pane">
					<div className="quote-wizard-side-title">
						Contact Details
					</div>
					{quoteContactFields.map((f, idx) => <div className="contact-field" key={f.id}>
						<div className="title">{f.label}</div>
						<div className="value">{renderContactValue(f, this.props.contact)}</div>
					</div>)}
					<div className="quote-wizard-side-title">Status</div>
					<div className="value"><strong>{this.props.lead.status}</strong> </div>
					{createDateDescription}
					<div className="quote-wizard-side-title">Description</div>
					<div className="value">{this.props.lead.description}</div>
					<div className="quote-wizard-side-title">Internal Description</div>
					<div className="value">{this.props.lead.intenralDescription}</div>
				</div>
			</div>
			
			
		
			</div>
		)
	}
}

ManageQuote.propTypes = {

};

export default ManageQuote;
