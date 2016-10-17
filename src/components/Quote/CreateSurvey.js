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
		// if (this.props.surveyMetadata.questions.length === 1) {
		// 	this.setState({
		// 		errorMessage: `⚠️Survey must contain at least 1 question`
		// 	});
		// 	console.warn(`⚠️Survey must contain at least 1 question`);
		// 	return;
		// }
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

const MiniQuestion = (props) => (
	<div className={`mini-question ${props.selected ? 'selected' : ''}`}
		onClick={props.selected ? null : ()=> {props.onQuestionClick(props.question.questionID)}}>
		<img
			src={props.question.questionImageURL || '/images/emptyMediaID.png'}
			alt={`Question #${props.question.questionID + 1} Image`} />
		<div>Question #{props.question.questionID + 1}</div>
	</div>
);

class CreateSurvey extends React.Component {
	constructor(props) {
    	super(props);
		this.addQuestion = this.addQuestion.bind(this);
		this.onQuestionClick = this.onQuestionClick.bind(this);
		this.state = {
			errorMessage: '',
			selectedQuestion: null
		};
	}
	componentWillReceiveProps(nextProps) {
		const nextQuestionsCount = nextProps.surveyMetadata.questions.length
		if (nextQuestionsCount === 0) {
			this.setState({
				selectedQuestion: null
			});
		} else if (nextQuestionsCount > this.props.surveyMetadata.questions.length) {
			this.setState({
				selectedQuestion: nextQuestionsCount - 1
			});
		} else if (nextQuestionsCount < this.props.surveyMetadata.questions.length) {
			let selectedQuestion = this.state.selectedQuestion;
			if (selectedQuestion) {
				selectedQuestion--;
			} else {
				selectedQuestion = 0;
			}
			this.setState({selectedQuestion});
		}
	}
	addQuestion() {
		this.props.addQuoteQuestion();
	}
	onQuestionClick(questionID) {
		this.setState({
			selectedQuestion: questionID
		});
	}
	render() {
		let currentQ;
		if (this.state.selectedQuestion !== null) {
			currentQ = <QuestionCreator
				question={this.props.surveyMetadata.questions[this.state.selectedQuestion]}
				{...this.props} />;
		}
		return (
			<div className="survey-creator">
				<div className="questions-grid">
					{this.props.surveyMetadata.questions.map(q => <div key={`miniq${q.questionID}`}>
						<MiniQuestion
							question={q}
							selected={this.state.selectedQuestion === q.questionID}
							onQuestionClick={this.onQuestionClick} />
					</div>)}
				</div>

				{currentQ}

				<button onClick={this.addQuestion}>Add Question</button>

				{/*<button onClick={this.props.onCancel}>Cancel</button>*/}
			</div>
		)
	}
}

CreateSurvey.propTypes = {

};

export default CreateSurvey;
