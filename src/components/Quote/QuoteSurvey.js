import React from 'react';
import SurveyEditor from 'components/Editor/SurveyEditor';
import QuestionPreview from 'components/Quote/Preview/QuestionPreview';

class QuoteSurvey extends React.Component {
	constructor(props) {
    	super(props);
		this.setSelectedQuestion = this.setSelectedQuestion.bind(this);
		this.state = {
			selectedQuestion: null
		};
	}
	setSelectedQuestion(selectedQuestion) {
		this.setState({
			selectedQuestion
		});
	}
	render() {
		return (
			<div className="quote-wizard-main">
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
						questions={this.props.surveyMetadata.questions} />
				</div>
			</div>
		)
	}
}

QuoteSurvey.propTypes = {

};

export default QuoteSurvey;
