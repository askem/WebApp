import React from 'react';
import TextField from 'material-ui/TextField';

const maxPossibleAnswers = 5;
const maxQuestions = 8;
const maxQuestionTextLength = 100;
const maxPossibleAnswerTextLength = 30;

class QuestionCreator extends React.Component {
	constructor(props) {
    	super(props);
		this.deleteQuestion = this.deleteQuestion.bind(this);
		this.addPA = this.addPA.bind(this);
		this.changeQTextValue = this.changeQTextValue.bind(this);
		this.state = {
			errorMessage: ''
		}
	}
	deleteQuestion() {
		if (this.props.surveyMetadata.questions.length === 1) {
			this.setState({
				errorMessage: `⚠️Survey must contain at least 1 question`
			});
			console.warn(`⚠️Survey must contain at least 1 question`);
			return;
		}
		this.props.deleteQuoteQuestion(this.props.question.questionID);
	}
	changeQTextValue() {
		const textValue = this.refs.questionText.input.value;
		if (textValue.length > maxQuestionTextLength) { return; }
		this.props.setQuoteQuestionText(this.props.question.questionID, textValue);
	}
	addPA() {
		if (this.props.question.possibleAnswers.length >= maxPossibleAnswers) {
			this.setState({
				errorMessage: `⚠️Please add up to a maximum of ${maxPossibleAnswers} answers`
			});
			console.warn(`⚠️Please add up to a maximum of ${maxPossibleAnswers} answers`);
			return;
		}
		this.props.addQuotePossibleAnswer(this.props.question.questionID);
	}
	deletePA(possibleAnswerID) {
		if (this.props.question.possibleAnswers.length === 1) {
			this.setState({
				errorMessage: `⚠️The question must have at least 1 answer`
			});
			console.warn(`⚠️The question must have at least 1 answer`);
			return;
		}
		this.props.deleteQuotePossibleAnswer(this.props.question.questionID, possibleAnswerID);
	}
	changePATextValue(possibleAnswerID) {
		const textValue = this.refs[`pavalue-${possibleAnswerID}`].input.value;
		if (textValue.length > maxPossibleAnswerTextLength) { return; }
		this.props.setQuotePossibleAnswerText(this.props.question.questionID, possibleAnswerID, textValue);
	}
	render() {
		if (this.state.errorMessage) {
		}
		return (
			<div>
				<h1>Question #{this.props.question.questionID+1}</h1>
				<TextField value={this.props.question.textValue} ref="questionText"
						id={`qvalue-${this.props.question.questionID}`}
						hintText="Question Text"
						onChange={this.changeQTextValue} />
				<button onClick={this.deleteQuestion}>x</button>
				{this.props.question.possibleAnswers.map(pa =>
					<div key={pa.possibleAnswerID}>
						<TextField value={pa.textValue} ref={`pavalue-${pa.possibleAnswerID}`}
							id={`pavalue-${pa.possibleAnswerID}`}
							hintText={`Answer #${pa.possibleAnswerID + 1}`}
							onChange={() => this.changePATextValue(pa.possibleAnswerID)} />
						<button onClick={() => this.deletePA(pa.possibleAnswerID)}>x</button>
					</div>)}
				<button onClick={this.addPA}>Add Answer</button>
			</div>
		)
	}
}

QuestionCreator.propTypes = {

};

class CreateSurvey extends React.Component {
	constructor(props) {
    	super(props);
		this.addQuestion = this.addQuestion.bind(this);
		this.state = {
			errorMessage: ''
		};
	}
	addQuestion() {
		this.props.addQuoteQuestion();
	}
	render() {
		return (
			<div>
				{this.props.surveyMetadata.questions.map(q => <div key={`q${q.questionID}`}>
					<QuestionCreator question={q} {...this.props} />

				</div>)}

				<button onClick={this.addQuestion}>Add Question</button>

				{/*<button onClick={this.props.onCancel}>Cancel</button>*/}
			</div>
		)
	}
}

CreateSurvey.propTypes = {

};

export default CreateSurvey;
