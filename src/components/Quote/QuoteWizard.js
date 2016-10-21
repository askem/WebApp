import React from 'react';
import CreateSurvey from 'components/Quote/CreateSurvey';
import CreateSurveyPreview from 'components/Quote/CreateSurveyPreview';
import QuoteDemographics from 'components/Quote/QuoteDemographics';
import SampleSize from 'components/Quote/SampleSize';
import QuoteReach from 'components/Quote/QuoteReach';
import TextField from 'material-ui/TextField';
import QuoteSummary from 'components/Quote/QuoteSummary';

const stages = {
	AUDIENCE: 0,
	SURVEY: 1,
	SAMPLE_SIZE: 2,
	GET_QUOTE: 3
};

const stageTitles = [
	'Audience',
	'Survey',
	'Sample Size',
	'Get Quote'
];

class QuoteWizard extends React.Component {
	constructor(props) {
    	super(props);
		this.nextStage = this.nextStage.bind(this);
		this.setSelectedQuestion = this.setSelectedQuestion.bind(this);
		this.state = {
			stage: stages.AUDIENCE,
			selectedQuestion: null	// Coordinate selection between sub-components
		};
	}
	componentDidMount() {
		this.props.requestReach();
	}
	handleStageClick(stage) {
		if (this.state.stage === stage) {
			return;
		}
		this.setState({
			stage,
			selectedQuestion: null
		});
	}
	nextStage() {
		this.setState({
			stage: this.state.stage + 1,
			selectedQuestion: null
		});
	}
	setSelectedQuestion(selectedQuestion) {
		this.setState({
			selectedQuestion
		});
	}
	render() {
		let stageComponent;
		let sideComponent;
		let advanceButtonTitle;
		switch (this.state.stage) {
			case stages.AUDIENCE:
				advanceButtonTitle = 'Define Survey';
				stageComponent = <QuoteDemographics {...this.props} />;
				sideComponent = <QuoteReach reach={this.props.reachEstimate.reach} />;
				break;
			case stages.SURVEY:
				advanceButtonTitle = 'Set Sample Size';
				stageComponent = <CreateSurvey
					onChangeSelectedQuestion={this.setSelectedQuestion}
					{...this.props} />;
				sideComponent = <CreateSurveyPreview
					selectedQuestion={this.state.selectedQuestion}
					questions={this.props.surveyMetadata.questions} />;
				break;
			case stages.SAMPLE_SIZE:
				advanceButtonTitle = 'Get Quote';
				stageComponent = <SampleSize
					advanceButton={<button onClick={this.nextStage} className="askem-button selected">
						{advanceButtonTitle} ➜
					</button>}
					sampleSize={this.props.sample.sampleSize}
					setSampleSize={this.props.setQuoteSampleSize} />;
				sideComponent = <QuoteSummary {...this.props} />;
				break;
			case stages.GET_QUOTE:
				stageComponent = <div>
					<TextField floatingLabelText="First Name" /><br/>
					<TextField floatingLabelText="Last Name" /><br/>
					<TextField floatingLabelText="Phone Number" /><br/>
					<TextField floatingLabelText="Email" /><br/>
					<TextField floatingLabelText="Company" /><br/>
					<button className="askem-button">
						Submit
					</button>
				</div>;
				sideComponent = <QuoteSummary {...this.props} displaySampleSize={true} />;
				break;
			default:
				break;
		}
		let advanceButton = advanceButtonTitle ?
			<button onClick={this.nextStage} className="askem-button">
				{advanceButtonTitle} ➜
			</button> : null;
		return (
			<div>
				<div className="quote-wizard-header">
					{stageTitles.map((s, idx) => {
						let className = (idx === this.state.stage) ? 'stage active' : 'stage';
						return <div className={className} key={s}
							onClick={()=> this.handleStageClick(idx)}>
							<div className="number">0{idx+1}</div>
							<div className="title">{s}</div>
						</div>
					})}
				</div>
				<div className="quote-wizard-main">
					<div style={{width: '70%', marginRight: 'auto', marginLeft: 'auto'}}>
						<div className="quote-wizard-maincontent" style={{width: '100%'}}>
							{stageComponent}
						</div>
						<div style={{textAlign: 'right', marginTop: 10}}>
							{advanceButton}
						</div>
					</div>
					<div className="quote-wizard-side">
						{sideComponent}
					</div>
				</div>

			</div>
		)
	}
}

QuoteWizard.propTypes = {

};

export default QuoteWizard;
