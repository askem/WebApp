import React from 'react';
import blobURL from 'utils/Askem/blobURL';
import QuestionEditor from 'components/Editor/QuestionEditor';
import QuestionsStrip from 'components/Editor/QuestionsStrip';
import Checkbox from 'components/Common/Checkbox/Checkbox';

class SurveyEditor extends React.Component {
	constructor(props) {
    	super(props);
		this.addQuestion = this.addQuestion.bind(this);
		this.selectQuestion = this.selectQuestion.bind(this);
		this.state = {
			advanced: false,
			errorMessage: ''
		};
	}
	componentWillReceiveProps(nextProps) {
		const nextQuestionsCount = nextProps.surveyMetadata.questions.length;
		const currentQuestionsCount = this.props.surveyMetadata.questions.length;
		if (nextQuestionsCount === currentQuestionsCount) { return; }
		if (nextQuestionsCount === 0) {
			this.selectQuestion(null);
		} else if (nextQuestionsCount > currentQuestionsCount) {
			this.selectQuestion(nextQuestionsCount - 1);
		} else if (nextQuestionsCount < currentQuestionsCount) {
			let selectedQuestion = this.props.selectedQuestion;
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
	selectQuestion(selectedQuestion, selectedVariant) {
		this.props.onChangeSelectedQuestion(selectedQuestion, selectedVariant);
	}
	render() {
		const hasQuestions = this.props.surveyMetadata.questions.length > 0;
		let currentQ;
		if (this.props.selectedQuestion !== null) {
			const q = this.props.surveyMetadata.questions[this.props.selectedQuestion];
			let variants = [];
			const qVariants = (this.props.surveyMetadata.questionsVariants || [])
				.find(qv => qv.questionID === this.props.selectedQuestion);
			if (qVariants) {
				variants = qVariants.variants;
			}
			if (q) {
				currentQ = <QuestionEditor
					onSelectQuestion={this.selectQuestion}
					advanced={this.state.advanced}
					showVariants={this.props.showVariants}
					variants={variants}
					selectedVariant={this.props.selectedVariant}
					question={q}
					questionsCount={this.props.surveyMetadata.questions.length}
					{...this.props} />;
			}
		}
		let questionsGrid;
		if (hasQuestions) {
			let numberOfVariantsPerQuestion = {};
			this.props.surveyMetadata.questions.forEach(q => {
				let count = 0;
				const qVariants = (this.props.surveyMetadata.questionsVariants || [])
					.find(qv => qv.questionID === q.questionID);
				if (qVariants) {
					count = qVariants.variants.length;
				}
				numberOfVariantsPerQuestion[q.questionID] = count;
			});
			questionsGrid = <QuestionsStrip
				onSelectQuestion={this.selectQuestion}
				swapQuoteQuestions={this.props.swapQuoteQuestions}
				questions={this.props.surveyMetadata.questions}
				numberOfVariantsPerQuestion={numberOfVariantsPerQuestion}
				selectedQuestion={this.props.selectedQuestion} />;
		}
		let advancedToggle;
		if (this.props.showAdvancedControls) {
			advancedToggle = <Checkbox label="Advanced"
			checked={!!this.state.advanced}
			onChange={() => this.setState({advanced: !this.state.advanced})} />;
		}
		return (
			<div className="survey-creator">
				<div className="header-row">
					<button onClick={this.addQuestion} className="askem-button-white">Add Question</button>
					{advancedToggle}
				</div>
				{questionsGrid}
				{currentQ}
			</div>
		)
	}
}

SurveyEditor.propTypes = {
	showAdvancedControls: React.PropTypes.bool,
};

export default SurveyEditor;
