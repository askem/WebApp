import React from 'react';
import Loading from 'components/Common/Loading';
import QuoteSurvey from 'components/Quote/QuoteSurvey';
import QuoteAudience from 'components/Quote/QuoteAudience';
import QuoteReach from 'components/Quote/QuoteReach';
import consolidateAgeGroups from 'utils/array/consolidateAgeGroups';
import numeral from 'numeral';
import quoteContactFields from 'constants/quoteContactFields';
import genGUID from 'utils/Askem/genGUID';
import AdCreatives from 'components/Quote/AdCreatives';
import RESEARCH_OBJECTIVE_CATEGORIES from 'constants/RESEARCH_OBJECTIVE_CATEGORIES';

const renderContactValue = (field, contact) => {
	let value = contact[field.id];
	if (!value) { return '(Not Provided)' }
	if (field.type === 'email') { value = <a href={`mailto:${value}`}>{value}</a>; }
	return value;
}

class ManageQuote extends React.Component {
	constructor(props) {
    	super(props);

		this.getReseachObjectiveTitle = this.getReseachObjectiveTitle.bind(this);

		this.state = {
			selectedQuestion: null,
			editing: null,
			creatingSurvey: false,
			duplicatingLead: false,
		};
	}


	getReseachObjectiveTitle(id) {
		let title = 'Custom';

		RESEARCH_OBJECTIVE_CATEGORIES.forEach(item => {
			let tempValue = item.items.find(elm => elm.id === id);
			if (tempValue) { title = tempValue.title };
		});

		return title;
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
				<QuoteSurvey {...this.props}
					showAdvancedControls={true}
					showVariants={true} />
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
		else if (this.state.editing === 'creatives') {
			return <div className="quote-manage">
				<div className="done-botton-container">
					<button className="askem-button-white" onClick={()=>this.setState({editing: null})}>Done Editing</button>
				</div>
				<div className="quote-wizard-main">
					<div className="quote-wizard-maincontent">
						<AdCreatives {...this.props} />
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

		const reserachObjectiveTitle = this.getReseachObjectiveTitle(this.props.researchObjective.id);

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


					<div className="quote-wizard-side-title">
						ad creatives
						<button className="askem-button-white edit-button"
							onClick={()=>this.setState({editing: 'creatives'})}>Edit</button>
					</div>
					<div className="title">creative</div>
					{ (this.props.surveyMetadata.adCreatives &&  this.props.surveyMetadata.adCreatives.imageAdCreatives.images) &&
							<div className="value">{` ${this.props.surveyMetadata.adCreatives.imageAdCreatives.images.length} images `}</div>
					}
					{ this.props.surveyMetadata.adCreatives &&  this.props.surveyMetadata.adCreatives.imageAdCreatives.headlines && 
							<div className="value">{` ${this.props.surveyMetadata.adCreatives.imageAdCreatives.headlines.length} headlines`}</div>
					}
					{ this.props.surveyMetadata.adCreatives &&  this.props.surveyMetadata.adCreatives.imageAdCreatives.texts && 
							<div className="value">{` ${this.props.surveyMetadata.adCreatives.imageAdCreatives.texts.length} texts`}</div>
					}
					{ this.props.surveyMetadata.adCreatives &&  this.props.surveyMetadata.adCreatives.imageAdCreatives.descriptions && 
							<div className="value">{` ${this.props.surveyMetadata.adCreatives.imageAdCreatives.descriptions.length} descriptions`}</div>
					}
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
					<div className="quote-wizard-side-title" style={{ marginTop:15 + 'px'}}>Research Objective</div>
					<div className="value"><strong>{ reserachObjectiveTitle }</strong></div>
					<div className="value">{this.props.researchObjective.description}</div>
					<div className="quote-wizard-side-title">Description</div>
					<div className="value">{this.props.lead.description}</div>
					<div className="quote-wizard-side-title">Internal Description</div>
					<div className="value">{this.props.lead.intenralDescription}</div>
				</div>
			</div>

			<div>
				<button
					disabled={this.state.creatingSurvey}
					onClick={() => {
						this.setState({creatingSurvey: true});
						api.createSurvey(this.props.surveyMetadata.questions, this.props.surveyMetadata.questionsVariants, this.props.lead.quoteID)
						.then(results => {
							this.setState({creatingSurvey: false});
							console.info(results);
							alert(`Created survey with ID: ${results.surveyID}`);
						}).catch(error => {
							this.setState({creatingSurvey: false});
							console.error(error);
							alert('Error, see console for details');
						});
					}
				}>{this.state.creatingSurvey ? 'Please Wait ...' : 'Create Survey'}</button>
			</div>
			<div>
				<button
					disabled={this.state.duplicatingLead}
					onClick={() => {
						this.setState({duplicatingLead: true});
						const newLeadID = genGUID();
						console.info(`Creating new lead: ${newLeadID}`);
						api.createQuote(newLeadID, {
							surveyMetadata: this.props.surveyMetadata,
							audience: this.props.audience,
							reachEstimate: this.props.reachEstimate,
							sample: this.props.sample,
						}, `Duplicated lead from ${this.props.lead.quoteID}`)
						.then(results => {
							this.setState({duplicatingLead: false});
							console.info(results);
							alert(`Created duplicate lead with ID: ${newLeadID}`);
						}).catch(error => {
							this.setState({duplicatingLead: false});
							console.error(error);
							alert('Error, see console for details');
						});
					}}
				>{this.state.duplicatingLead ? 'Please Wait...' : 'Duplicate Quote'}</button>
			</div>

			</div>
		)
	}
}

ManageQuote.propTypes = {

};

export default ManageQuote;
