import React from 'react';
import CreateSurvey from 'components/Quote/CreateSurvey';
import CreateSurveyPreview from 'components/Quote/CreateSurveyPreview';

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
					<CreateSurvey
					selectedQuestion={this.state.selectedQuestion}
					onChangeSelectedQuestion={this.setSelectedQuestion}
					{...this.props} />
				</div>
				<div className="quote-wizard-side">
					<CreateSurveyPreview
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
