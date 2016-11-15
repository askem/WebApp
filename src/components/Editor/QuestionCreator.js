import React from 'react';
import TextField from 'material-ui/TextField';
import XButton from 'components/Common/XButton';
import MdAdd from 'react-icons/lib/md/add';
import FlatButton from 'material-ui/FlatButton';
import blobURL from 'utils/Askem/blobURL';
import UploadHiddenControl from 'components/Common/UploadHiddenControl';

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
			imageSuggestionsPicker = <div className="image-suggestions">
				<div>Suggested Images</div>
				{imageSuggestions.suggestions.map((suggestion, idx) => <img
					onClick={() => this.handleSuggestionClick(suggestion)}
					src={suggestion.previewURL}
					key={`imgsuggest-${idx}`}
					alt="Image Suggestion, powered by Pixabay"
					/>)}
			</div>
		}

		const possibleAnswersCount = this.props.question.possibleAnswers.length;
		const addPAButton = possibleAnswersCount === maxPossibleAnswers ? null :
			<FlatButton onClick={this.addPA} label="Add Answer" icon={<MdAdd />} />;
		return (
			<div className="question-creator">
				<div className="question-title">
					Question {this.props.question.questionID+1}
					<FlatButton label="Delete Question" onClick={this.deleteQuestion} />
				</div>
				<div className="question-inputs">
					<div className="image-upload">
						<UploadHiddenControl ref="imageUploadControl"
							accept="image/jpeg, image/png"
							onFileUpload={this.uploadImage}	/>
						<div title={imageButtonLabel}
							style={{backgroundImage: `url('${imageURL}')`}}
							className={this.props.question.mediaID ? "image-preview" : "image-preview empty-overlay"}
							onClick={() => this.refs.imageUploadControl.openUploadDialog()} />
					</div>
					<div className="text-inputs">				
						<TextField value={this.props.question.textValue} ref="questionText"
								id={`qvalue-${this.props.question.questionID}`}
								hintText="Question Text"
								inputStyle={{color: 'black'}}
								style={{fontWeight: 'bold'}}
								fullWidth={true}
								onBlur={this.handleBlurQText}
								onChange={this.changeQTextValue} />
						{this.props.question.possibleAnswers.map(pa =>
							<div key={pa.possibleAnswerID} className="possible-answer-input">
								<TextField value={pa.textValue} ref={`pavalue-${pa.possibleAnswerID}`}
									id={`pavalue-${pa.possibleAnswerID}`}
									inputStyle={{color: 'black'}}
									fullWidth={true}
									hintText={`Answer ${pa.possibleAnswerID + 1}`}
									onChange={() => this.changePATextValue(pa.possibleAnswerID)}>
								</TextField>
								{possibleAnswersCount === 1 ? null :
								<div className="possible-answer-delete">
									<XButton onClick={() => this.deletePA(pa.possibleAnswerID)} />
								</div>
								}
								
							</div>)}
							{addPAButton}
					</div>
				</div>
				{imageSuggestionsPicker}
			</div>
		)
	}
}

QuestionCreator.propTypes = {

};

export default QuestionCreator;
