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
			selectedVariant: null,
			showingSurveyPreview: false
		};
	}
	toggleSurveyPreview() {
		this.setState({
			showingSurveyPreview: !this.state.showingSurveyPreview
		});
	}
	setSelectedQuestion(selectedQuestion, selectedVariant) {
		this.setState({
			selectedQuestion,
			selectedVariant
		});
	}
	render() {
		let surveyPreview;
		let selectedVariant = this.state.selectedVariant;
		const selectedQuestion = this.state.selectedQuestion;
		const questionsVariants = this.props.surveyMetadata.questionsVariants || [];
		if (selectedQuestion !== undefined) {
			const qVariants = questionsVariants.find(qv => qv.questionID === selectedQuestion);
			if (qVariants && qVariants.variants.length > 0) {
				if (!selectedVariant) {
					selectedVariant = 0;
				} else if (selectedVariant > qVariants.variants.length) {
					selectedVariant = qVariants.variants.length - 1;
				}
			}
		}
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
					showVariants={this.props.showVariants}
					selectedQuestion={selectedQuestion}
					selectedVariant={selectedVariant}
					onChangeSelectedQuestion={this.setSelectedQuestion}
					{...this.props} />
				</div>
				<div className="quote-wizard-side">
					<QuestionPreview
						title={this.props.showAdvancedControls ? 'Question Preview' : 'Preview'}
						questions={this.props.surveyMetadata.questions}
						selectedQuestion={selectedQuestion}
						questionsVariants={questionsVariants}
						variants={this.props.surveyMetadata.variants}
						selectedVariant={selectedVariant}
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
