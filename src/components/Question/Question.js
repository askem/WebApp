import React from 'react';
import AskemUserText from 'components/Common/AskemUserText';
import QuestionMedia from 'components/Question/QuestionMedia';
import MultiAQContinueButton from 'components/Question/MultiAQContinueButton';

class Question extends React.Component {
	constructor(props) {
    	super(props);
		this.onClick = this.onClick.bind(this);
		this.canMultiAQContinue = this.canMultiAQContinue.bind(this);
		this.multiAQCantContinueReason = this.multiAQCantContinueReason.bind(this);
		this.checkAnswer = this.checkAnswer.bind(this);
		this.uncheckAnswer = this.uncheckAnswer.bind(this);
		this.state = {
			checks: new Set(),
			popupsGroupsSeen: []
		};
	}
	checkAnswer() {
		
	}
	uncheckAnswer() {
		
	}
	onClick(group) {
		this.props.onToggle(group);
	}
	canMultiAQContinue() {
		return true;
		
		
		const checks = this.state.checks;
		const q = this.props.question;
		return (checks.size >= q.minAnswers && checks.size <= q.maxAnswers);
	}
	multiAQCantContinueReason() {
		const questionID = this.props.question.questionID;
		if (this.state.popupsGroupsSeen.length !== this.props.question.popupIndexes.length) {
			const qMedia = this.refs.questionMedia;
			//this.setTimeout(() => {
				qMedia.advancePopupsGroup();
			//}, 400);
			//return AskemLocalize('Please check out all available options before you continue');
			return null;
		}
		const checks = this.state.checks.size;
		const minAnswers = this.props.question.minAnswers;
		const maxAnswers = this.props.question.maxAnswers;
		let message;
		if (checks > maxAnswers) {
			message = AskemLocalize('Please select up to {0} answers', maxAnswers);
		} else {
			if (maxAnswers === this.props.question.possibleAnswers.length) {
				if (minAnswers === 1) {
					message = 'Please select at least 1 answer';
				} else {
					message = `Please select at least ${minAnswers} answers`;
				}
			} else if (minAnswers === maxAnswers) {
				message = `Please select ${minAnswers} answers`;
			} else {
				message = `Please select between ${minAnswers} and ${maxAnswers} answers`;
			}
		}
		return message;
	}
	render() {
		const q = this.props.question;
		let continueButton;
		if (q.isMultiAnswerQuestion && this.props.inSurvey) {
			const canContinue = this.canMultiAQContinue();
			continueButton = <MultiAQContinueButton key="submitAnswersButton"
					canContinue={canContinue}
					cantContinueReasonHandler={this.multiAQCantContinueReason}
					onClick={() => this.props.onMultiVote(q.questionID, this.state.checks)}
					/>;
		}
		return <div className="question">
			<div className="row">
				<div >
					<div className="question-text">
						<AskemUserText>{q.textValue}</AskemUserText>
						{continueButton}
					</div>
				</div>
				<QuestionMedia ref="questionMedia"
					question={q}
					draggable={this.props.draggable}
					onDragStop={this.props.onDragStop}
					checks={this.state.checks}
					checkAnswer={this.checkAnswer} uncheckAnswer={this.uncheckAnswer}
					reportPopupsGroupSeen={this.reportPopupsGroupSeen}
					onSingleVote={this.props.onSingleVote} onMultiVote={this.props.onMultiVote}
					/>
			</div>
		</div>;
	}
}

Question.propTypes = {
	question: React.PropTypes.object.isRequired,
	inSurvey: React.PropTypes.bool,
}

export default Question;
