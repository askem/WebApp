import React from 'react';
import TextField from 'material-ui/TextField';
import XButton from 'components/Common/XButton';
import MdAdd from 'react-icons/lib/md/add';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'components/Common/Checkbox/Checkbox';
import blobURL from 'utils/Askem/blobURL';
import UploadHiddenControl from 'components/Common/UploadHiddenControl';
import { POPUP_ARRANGEMENT_TYPE, POPUP_ARRANGEMENT_DEFAULT, AutomaticPopupArrangementTypes } from 'utils/Askem/AutoArrangement';
import VariantsEditor from 'components/Editor/VariantsEditor';

const defaultLimits = {
	maxPossibleAnswers: 8,
	maxQuestions: 12,
	maxQuestionTextLength: 150,
	maxPossibleAnswerTextLength: 30
};

const advancedLimits = {
	maxPossibleAnswers: 15,
	maxQuestions: 30,
	maxQuestionTextLength: 200,
	maxPossibleAnswerTextLength: 100
};

class QuestionEditor extends React.Component {
	constructor(props) {
    	super(props);
		this.deleteQuestion = this.deleteQuestion.bind(this);
		this.duplicateQuestion = this.duplicateQuestion.bind(this);
		this.addPA = this.addPA.bind(this);
		this.changeQTextValue = this.changeQTextValue.bind(this);
		this.handleBlurQText = this.handleBlurQText.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.limits = this.limits.bind(this);
		this.addVariant = this.addVariant.bind(this);
		this.deleteVariant = this.deleteVariant.bind(this);
		this.onChangeVariant = this.onChangeVariant.bind(this);
		this.state = {
			errorMessage: ''
		}
	}
	limits() {
		return this.props.limits || 
			(this.props.advanced ? advancedLimits : defaultLimits);
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
	duplicateQuestion() {
		this.props.duplicateQuoteQuestion(this.props.question.questionID);
	}
	changeQTextValue() {
		const textValue = this.refs.questionText.input.value || this.refs.questionText.input.refs.input.value;
		if (textValue.length > this.limits().maxQuestionTextLength) { return; }
		this.props.setQuoteQuestionText(this.props.question.questionID, textValue, this.props.selectedVariant);
	}
	handleBlurQText() {
		const textValue = this.refs.questionText.input.value;
		this.props.finishedEditingQText(this.props.question.questionID, textValue, this.props.selectedVariant);
	}
	addPA() {
		const maxPossibleAnswers = this.limits().maxPossibleAnswers;
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
		const maxPossibleAnswerTextLength = this.limits().maxPossibleAnswerTextLength;
		const textValue = this.refs[`pavalue-${possibleAnswerID}`].input.value;
		if (textValue.length > maxPossibleAnswerTextLength) { return; }
		this.props.setQuotePossibleAnswerText(this.props.question.questionID, possibleAnswerID, textValue, this.props.selectedVariant);
	}
	handleSuggestionClick(suggestion) {
		this.props.setQuoteQuestionImage(this.props.question.questionID, suggestion.imageURL, this.props.selectedVariant);
	}
	uploadImage(dataURI) {
		this.props.setQuoteQuestionImage(this.props.question.questionID, dataURI, this.props.selectedVariant);
	}
	addVariant(variantID) {
		this.props.addQuestionVariant(this.props.question.questionID,
			variantID | this.props.selectedVariant);
	}
	deleteVariant(variantID) {
		variantID = variantID | this.props.selectedVariant;
		let variantToSelect;
		if (this.props.variants.length > 2) {
			// Always minimum 2 variants
			variantToSelect = variantID - 1;
   			if (variantToSelect < 0) { variantToSelect = 0; }
		} else {
			this.setState({editingVariants: false});
		}
		this.props.deleteQuestionVariant(this.props.question.questionID, variantID);
		this.props.onSelectQuestion(this.props.selectedQuestion, variantToSelect);
	}
	onChangeVariant(e) {
		const value = e.target.value;
		if (value === 'edit-variants') {
			this.setState({editingVariants: true});
			return;
		}
		this.props.onSelectQuestion(this.props.selectedQuestion, Number(value));
	}
	render() {
		if (this.state.errorMessage) {
			
		}
		const maxPossibleAnswers = this.limits().maxPossibleAnswers;
		const q = this.props.question;
		const hasVariants = this.props.variants.length > 0;
		const shownObject = hasVariants ?
			this.props.variants.find(v => v.ID === this.props.selectedVariant) : q;
		
		let selectedPopupsArangement;
		if (shownObject.paArrangement) {
			selectedPopupsArangement = AutomaticPopupArrangementTypes.find(type => type.title === shownObject.paArrangement).id;
		} else {
			selectedPopupsArangement = shownObject.autoArrangement || POPUP_ARRANGEMENT_DEFAULT;
		}
		
		const imageURL = blobURL(shownObject.mediaID);
		const imageButtonLabel = shownObject.mediaID ? 'Change Image' : 'Upload Image';
		let imageSuggestionsPicker;
		const imageSuggestions = this.props.imageSuggestions[shownObject.textValue];
		if (!shownObject.mediaID && imageSuggestions && imageSuggestions.suggestions && imageSuggestions.suggestions.length > 0) {
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

		const possibleAnswersCount = q.possibleAnswers.length;
		const addPAButton = possibleAnswersCount >= maxPossibleAnswers ? null :
			<FlatButton onClick={this.addPA} label="Add Answer" icon={<MdAdd />} />;
			
		let advancedImageProperties;
		let duplicateQuestionButton;
		if (this.props.advanced) {
			//duplicateQuestionButton = <FlatButton label="Duplicate" onClick={this.duplicateQuestion} />
			
			let multiAnswersProperties;
			if (q.isMultiAnswerQuestion) {
				const possibleAnswersIndexes = Array.from(Array(possibleAnswersCount).keys());
				multiAnswersProperties = 
				<div>
					<div>
						<label>Min Answers </label>
						<select className="answers-count"
							value={q.minAnswers || 1}
							onChange={(e) => this.props.setQuoteQuestionMinAnswers(q.questionID, Number(e.target.value))}>
							{possibleAnswersIndexes.map(i => <option key={`minopt-${i}`}>
								{i+1}
							</option>)}
						</select>
					</div>
					<div>
						<label>Max Answers </label>
						<select className="answers-count"
							value={q.maxAnswers || 1}
							onChange={(e) => this.props.setQuoteQuestionMaxAnswers(q.questionID, Number(e.target.value))}>
							{possibleAnswersIndexes.map(i => <option key={`maxopt-${i}`}>
								{i+1}
							</option>)}
						</select>
					</div>
				</div>;
			}
			advancedImageProperties = <div>
				<hr />
				<label>Popups</label>
				<select
					value={selectedPopupsArangement}
					onChange={(e) => this.props.setQuoteQuestionAutoArrangement(q.questionID, Number(e.target.value), this.props.selectedVariant)}>
					{AutomaticPopupArrangementTypes.map(t => <option
						key={t.id} value={t.id}>
						{t.title}
					</option>)}
				</select>
				<hr />
				<Checkbox label="Multiple Answers"
					checked={!!q.isMultiAnswerQuestion}
					onChange={(e) => this.props.setQuoteQuestionIsMultiAnswer(q.questionID, e.target.checked)} />
				{multiAnswersProperties}
				
			</div>;
		}
		let nextQuestionsOptions = [];
		if (this.props.questionsCount > q.questionID + 1) {
			for (let i = q.questionID + 1; i < this.props.questionsCount; i++) {
				nextQuestionsOptions.push(
					<option value={`question-${i}`} key={`question-${i}`}>Question {i+1}</option>
				);
			}
		}
		let variantsButton;
		let variantsStrip;
		let variantsEditor;
		if (this.props.showVariants) {
			if (hasVariants) {
				variantsStrip = <select
					value={this.props.selectedVariant}
					onChange={this.onChangeVariant}>
					{this.props.variants.map(v => <option value={v.ID} key={`variant-${v.ID}`}>
						Variant {String.fromCharCode(65 + v.ID)}
					</option>)}
					<option value="edit-variants">Edit Variants</option>
				</select>
			}
			if (hasVariants) {
				//variantsButton = <FlatButton label="Duplicate Variant" onClick={this.addVariant} />
			} else {
				variantsButton = <FlatButton label="Add Variant" onClick={this.addVariant} />
			}
			if (this.state.editingVariants) {
				variantsEditor = <VariantsEditor
					closeVariantsEditor={() => this.setState({editingVariants: false})} 
					addVariant={this.addVariant} deleteVariant={this.deleteVariant}
					{...this.props} />;
			}
		}
		
		return (
			<div className="question-creator">
				{variantsEditor}
				<div className="question-title">
					Question {q.questionID+1}
					{variantsStrip}
					{variantsButton}
					<FlatButton label="Delete Question" onClick={this.deleteQuestion} />
					{duplicateQuestionButton}
				</div>
				<div className="question-inputs">
					<div className="image-upload">
						<UploadHiddenControl ref="imageUploadControl"
							accept="image/jpeg, image/png"
							onFileUpload={this.uploadImage}	/>
						<div title={imageButtonLabel}
							style={{backgroundImage: `url('${imageURL}')`}}
							className={shownObject.mediaID ? "image-preview" : "image-preview empty-overlay"}
							onClick={() => this.refs.imageUploadControl.openUploadDialog()} />
						{advancedImageProperties}
					</div>
					<div className="text-inputs">				
						<TextField value={shownObject.textValue} ref="questionText"
								id={`qvalue-${q.questionID}`}
								hintText="Question Text"
								inputStyle={{color: 'black'}}
								style={{fontWeight: 'bold'}}
								fullWidth={true}
								multiLine={!!this.props.advanced}
								onBlur={this.handleBlurQText}
								onChange={this.changeQTextValue} />
							{q.possibleAnswers.map((pa, paIdx) => {
								let advancedPAProperties;
								if (this.props.advanced) {
									let multiPAProperties;
									let advanceTargetProperties;
									if (q.isMultiAnswerQuestion) {
										multiPAProperties = <div className="properties-row">
											<label>Multiple Selection</label>
											<select 
												value={pa.multiBehavior || 'regular'}
												onChange={(e) => this.props.setQuotePossibleAnswerMultiBehavior(q.questionID, pa.possibleAnswerID, e.target.value)}>
												<option value="regular">Regular</option>
												<option value="all">Selects All</option>
												<option value="none">Selects None</option>
											</select>
										</div>;
									} else {
										let nextEntity = pa.connection ? 
											`${pa.connection.type}-${pa.connection.ID || ''}` :
											'sequential';
										
										advanceTargetProperties = <div className="properties-row">
											<label>Advance to</label>
											<select
												value={nextEntity}
												onChange={(e) => {
													const entityParts = e.target.value.split('-');
													let entity;
													if (entityParts[0] !== 'sequential') {
														entity = {
															type: entityParts[0],
															ID: Number(entityParts[1]) || null
														};
													}
													this.props.setQuotePossibleAnswerConnection(q.questionID, pa.possibleAnswerID, entity);
													
												}}>
												<option value="sequential">(Sequential)</option>
												{nextQuestionsOptions}
												<option value="end-">End Survey</option>
											</select>
										</div>;
									}
									
									advancedPAProperties = <div className="possible-answer-advanced">
										<div className="properties-row">
											<label htmlFor={`random-${pa.possibleAnswerID}`}>Randomize Location</label>
											<Checkbox id={`random-${pa.possibleAnswerID}`}
												checked={!!pa.randomLocation}
												onChange={(e) => this.props.setQuotePossibleAnswerRandomLocation(q.questionID, pa.possibleAnswerID, e.target.checked)} />
										</div>
										{multiPAProperties}
										{advanceTargetProperties}
									</div>
								}
								const paTextValue = shownObject.paTextValues ? shownObject.paTextValues[paIdx] : pa.textValue;
								return <div key={pa.possibleAnswerID}>
									<div className="possible-answer-input">
										<TextField value={paTextValue} ref={`pavalue-${pa.possibleAnswerID}`}
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
									</div>
									{advancedPAProperties}
								</div>})}
							{addPAButton}
					</div>
				</div>
				{imageSuggestionsPicker}
			</div>
		)
	}
}

QuestionEditor.propTypes = {
	advanced: React.PropTypes.bool,
	questionsCount: React.PropTypes.number,
};

export default QuestionEditor;
