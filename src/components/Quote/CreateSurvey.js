import React from 'react';
import TextField from 'material-ui/TextField';
import XButton from 'components/Common/XButton';
import blobURL from 'utils/Askem/blobURL';
import UploadButton from 'components/Common/UploadButton';

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
		this.handleBlurQText = this.handleBlurQText.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
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
	handleBlurQText() {
		const textValue = this.refs.questionText.input.value;
		this.props.finishedEditingQText(this.props.question.questionID, textValue);
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
	handleSuggestionClick(suggestion) {
		this.props.setQuoteQuestionImage(this.props.question.questionID, suggestion.imageURL);
	}
	uploadImage(dataURI) {
		this.props.setQuoteQuestionImage(this.props.question.questionID, dataURI);
	}
	render() {
		if (this.state.errorMessage) {
		}
		const imageURL = blobURL(this.props.question.mediaID);
		const imageButtonLabel = this.props.question.mediaID ? 'Change Image' : 'Upload Image';
		let imageSuggestionsPicker;
		const imageSuggestions = this.props.imageSuggestions[this.props.question.textValue];
		if (!this.props.question.mediaID && imageSuggestions && imageSuggestions.suggestions && imageSuggestions.suggestions.length > 0) {
			imageSuggestionsPicker = <div style={{marginTop: 20}}>
				<div>Suggested Images:</div>
				{imageSuggestions.suggestions.map((suggestion, idx) => <img
					onClick={() => this.handleSuggestionClick(suggestion)}
					src={suggestion.previewURL}
					key={`imgsuggest-${idx}`}
					alt="Image Suggestion, powered by Pixabay"
					style={{width: 70, height: 70, objectFit: 'cover', cursor: 'pointer'}}
					/>)}
			</div>
		}
		return (
			<div className="question-creator">
				<div style={{display: 'flex'}}>
					<h1>Question #{this.props.question.questionID+1}</h1>
					<XButton onClick={this.deleteQuestion} />
				</div>
				<TextField value={this.props.question.textValue} ref="questionText"
						id={`qvalue-${this.props.question.questionID}`}
						hintText="Question Text"
						style={{fontWeight: 'bold'}}
						onBlur={this.handleBlurQText}
						onChange={this.changeQTextValue} />

				{this.props.question.possibleAnswers.map(pa =>
					<div key={pa.possibleAnswerID}>
						<TextField value={pa.textValue} ref={`pavalue-${pa.possibleAnswerID}`}
							id={`pavalue-${pa.possibleAnswerID}`}
							hintText={`Answer #${pa.possibleAnswerID + 1}`}
							onChange={() => this.changePATextValue(pa.possibleAnswerID)} />
						<XButton onClick={() => this.deletePA(pa.possibleAnswerID)} />
					</div>)}
				<button onClick={this.addPA} className="askem-button">Add Answer</button>
				<div className="image-upload">
					<img src={imageURL} alt="Question Image" style={{objectFit: 'cover'}}
						onClick={() => this.refs.imageUploadButton.openUploadDialog()} />
					<UploadButton ref="imageUploadButton"
						label={imageButtonLabel}
						accept="image/jpeg, image/png"
						onFileUpload={this.uploadImage} />
					{imageSuggestionsPicker}
				</div>

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
			style={{objectFit: 'cover'}}
			src={blobURL(props.question.mediaID)}
			alt={`Question #${props.question.questionID + 1} Image`} />
		<div>Question #{props.question.questionID + 1}</div>
	</div>
);

class CreateSurvey extends React.Component {
	constructor(props) {
    	super(props);
		this.addQuestion = this.addQuestion.bind(this);
		this.selectQuestion = this.selectQuestion.bind(this);
		this.state = {
			errorMessage: '',
			selectedQuestion: null
		};
	}
	componentWillReceiveProps(nextProps) {
		const nextQuestionsCount = nextProps.surveyMetadata.questions.length
		if (nextQuestionsCount === 0) {
			this.selectQuestion(null);
		} else if (nextQuestionsCount > this.props.surveyMetadata.questions.length) {
			this.selectQuestion(nextQuestionsCount - 1);
		} else if (nextQuestionsCount < this.props.surveyMetadata.questions.length) {
			let selectedQuestion = this.state.selectedQuestion;
			if (selectedQuestion) {
				selectedQuestion--;
			} else {
				selectedQuestion = 0;
			}
			this.selectQuestion(selectedQuestion);
		}
	}
	addQuestion() {
		this.props.addQuoteQuestion();
	}
	selectQuestion(selectedQuestion) {
		this.setState({selectedQuestion});
		this.props.onChangeSelectedQuestion(selectedQuestion);
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
							onQuestionClick={this.selectQuestion} />
					</div>)}
					<div className="button-container">
						<button onClick={this.addQuestion} className="askem-button">Add Question</button>
					</div>
				</div>

				{currentQ}



				{/*<button onClick={this.props.onCancel}>Cancel</button>*/}
			</div>
		)
	}
}

CreateSurvey.propTypes = {

};

export default CreateSurvey;
