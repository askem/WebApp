import React from 'react';
import SurveyEditor from 'components/Editor/SurveyEditor';
import QuestionPreview from 'components/Quote/Preview/QuestionPreview';
import Dialog from 'material-ui/Dialog';
import leadMetadataToSurvey from 'utils/Askem/leadMetadataToSurvey';
import Survey from 'components/Survey/Survey';
import SurveyPreview from 'components/Research/SurveyPreview';

class QuoteSurvey extends React.Component {
	constructor(props) {
    	super(props);
		this.setSelectedQuestion = this.setSelectedQuestion.bind(this);
		this.toggleSurveyPreview = this.toggleSurveyPreview.bind(this);
		this.state = {
			selectedQuestion: null,
			showingSurveyPreview: false
		};
	}
	toggleSurveyPreview() {
		this.setState({
			showingSurveyPreview: !this.state.showingSurveyPreview
		});
	}
	setSelectedQuestion(selectedQuestion) {
		this.setState({
			selectedQuestion
		});
	}
	render() {
		let surveyPreview;
		if (this.state.showingSurveyPreview) {
			const survey = leadMetadataToSurvey(this.props.surveyMetadata);
			surveyPreview = <SurveyPreview
				togglePreview={this.toggleSurveyPreview}
				survey={survey} questions={survey.questions}
				previewURL={`/${this.props.lead.quoteID}/preview`}
				/>;
		}
		let surveyPreviewButton;
		if (this.props.surveyMetadata.questions.length > 0) {
			surveyPreviewButton = <button className="askem-button-white"
				onClick={this.toggleSurveyPreview}>Survey Preview</button>;
		}
		return (
			<div className="quote-wizard-main">
				{surveyPreview}
				<div className="quote-wizard-maincontent">
					<SurveyEditor
					showAdvancedControls={this.props.showAdvancedControls}
					selectedQuestion={this.state.selectedQuestion}
					onChangeSelectedQuestion={this.setSelectedQuestion}
					{...this.props} />
				</div>
				<div className="quote-wizard-side">
					<QuestionPreview
						title={this.props.showAdvancedControls ? 'Question Preview' : 'Preview'}
						selectedQuestion={this.state.selectedQuestion}
						questions={this.props.surveyMetadata.questions}
						setQuotePossibleAnswerLocation={this.props.setQuotePossibleAnswerLocation}
						/>
					{surveyPreviewButton}
				</div>
			</div>
		)
	}
}

QuoteSurvey.propTypes = {

};

export default QuoteSurvey;
