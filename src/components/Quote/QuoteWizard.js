import React from 'react';
import QuoteSurvey from 'components/Quote/QuoteSurvey';
import QuoteAudience from 'components/Quote/QuoteAudience';
import SampleSize from 'components/Quote/SampleSize';
import QuoteReach from 'components/Quote/QuoteReach';
import QuoteSummary from 'components/Quote/QuoteSummary';
import QuoteLeadForm from 'components/Quote/QuoteLeadForm';
import QuoteSubmitDialog from 'components/Quote/QuoteSubmitDialog';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import MdCheck from 'react-icons/lib/md/check';
import Loading from 'components/Common/Loading';

const stages = {
	AUDIENCE: 0,
	SURVEY: 1,
	SAMPLE_SIZE: 2,
	GET_QUOTE: 3
};

const stageTitles = [
	'Select Audience',
	'Define Survey',
	'Sample Size',
	'Get Quote'
];

class QuoteWizard extends React.Component {
	constructor(props) {
    	super(props);
		this.nextStage = this.nextStage.bind(this);
		this.submitLead = this.submitLead.bind(this);
		this.onNewSubmission = this.onNewSubmission.bind(this);
		this.state = {
			stage: stages.AUDIENCE
		};
	}
	handleStageClick(stage) {
		if (this.state.stage === stage) {
			return;
		}
		this.setState({
			stage
		});
		this.props.quoteUIAction('WIZARD_CLICK_STAGE', stageTitles[stage]);
	}
	nextStage() {
		this.setState({
			stage: this.state.stage + 1,
		});
		this.props.quoteUIAction('WIZARD_CLICK_NEXT', stageTitles[stage]);
	}
	submitLead() {
		this.props.quoteUIAction('WIZARD_CLICK_SUBMIT');
		const valid = this.refs.leadForm.onSubmit();
		if (!valid) {
			this.props.quoteUIAction('WIZARD_SUBMIT_MISSING_FIELDS');
			return;
		}
		this.props.submitLead();
	}
	onNewSubmission() {
		this.setState({
			stage: 0
		});
		this.props.quoteUIAction('WIZARD_AFTER_SUBMIT_START_NEW');
		this.props.newSubmission();
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
		
		let stageComponent;
		let sideComponent;
		let advanceButtonTitle;
		let advanceButton;
		switch (this.state.stage) {
			case stages.AUDIENCE:
				advanceButtonTitle = 'Define Survey';
				stageComponent = <QuoteAudience {...this.props} />;
				sideComponent = <QuoteReach reach={this.props.reachEstimate.reach} />;
				break;
			case stages.SURVEY:
				advanceButtonTitle = 'Set Sample Size';
				stageComponent = <QuoteSurvey
					showAdvancedControls={true}
					{...this.props} />;
				// sideComponent = <CreateSurveyPreview
				// 	selectedQuestion={this.state.selectedQuestion}
				// 	questions={this.props.surveyMetadata.questions} />;
				break;
			case stages.SAMPLE_SIZE:
				advanceButtonTitle = 'Get Quote';
				stageComponent = <SampleSize
					onAdvance={this.nextStage}
					sampleSize={this.props.sample.sampleSize}
					setSampleSize={this.props.setQuoteSampleSize} />;
				sideComponent = <QuoteSummary {...this.props} />;
				break;
			case stages.GET_QUOTE:
				stageComponent = <QuoteLeadForm {...this.props} ref="leadForm"/>;
				sideComponent = <QuoteSummary {...this.props} displaySampleSize={true} />;
				advanceButton =
						<button onClick={this.submitLead} className="askem-button confirmed">
							Submit
						</button>
				break;
			default:
				break;
		}
		let mainComponent;
		if (sideComponent) {
			mainComponent = <div className="quote-wizard-main">
				<div className="quote-wizard-maincontent">
					{stageComponent}
				</div>
				<div className="quote-wizard-side">
					{sideComponent}
				</div>
			</div>;
		} else {
			mainComponent = stageComponent;
		}
		advanceButton = advanceButton || (advanceButtonTitle ?
			<button onClick={this.nextStage} className="askem-button">
				{advanceButtonTitle} <MdArrowForward size={16}/>
			</button> : null);
		return (
			<div>
				<QuoteSubmitDialog {...this.props}
					onNewSubmission={this.onNewSubmission} />
				<div className="quote-wizard-header">
					{stageTitles.map((s, idx) => {
						let className = (idx === this.state.stage) ? 'stage active' : 'stage';
						return <div className={className} key={s}
							onClick={()=> this.handleStageClick(idx)}>
							<div className="number">Step {idx+1}</div>
							<div className="title">{s}</div>
						</div>
					})}
				</div>
				<div className="quote-wizard-border">
					{mainComponent}
					<div className="button-container">
						{advanceButton}
					</div>
				</div>
			</div>
		)
	}
}

QuoteWizard.propTypes = {

};

export default QuoteWizard;
