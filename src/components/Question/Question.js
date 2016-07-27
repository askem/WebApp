import React from 'react';
import AskemUserText from 'components/Common/AskemUserText';
import QuestionMedia from 'components/Question/QuestionMedia';

class Question extends React.Component {
	constructor(props) {
    	super(props);
		this.onClick = this.onClick.bind(this);
		this.state = {};
	}
	onClick(group) {
		this.props.onToggle(group);
	}
	render() {
		const q = this.props.question;
		let continueButton = null;
		// if (q.isMultiAnswerQuestion) {
		// 	ASKEM.trackEvent('Survey', 'ViewMultiAQuestion', q.questionID) + ',20150625');
		// 	const canContinue = this.canMultiAQContinue();
		// 	continueButton = <MultiAQContinueButton key="submitAnswersButton"
		// 			canContinue={canContinue}
		// 			cantContinueReasonHandler={this.multiAQCantContinueReason}
		// 			onClick={this.handleMultiAQContinue}
		// 			/>;
		// }
		// if (q.popupIndexes.size !== 1) { ASKEM.trackEvent('Survey', 'ViewMoreThanQuestion', q.questionID); }
		return <div className="col-md-7 col-md-offset-2 question">
			<div className="row">
				<div className="col-md-4 col-md-push-8 content-wrapper">
					<div className="media question-text selectable">
						<div className="clearfix visible-md visible-lg"></div>
						<AskemUserText>{q.textValue}</AskemUserText>
						{continueButton}
					</div>
				</div>
				<QuestionMedia ref="questionMedia"
					question={q}
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
}

export default Question;
