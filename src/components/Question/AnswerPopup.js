import React from 'react';
import AskemUserText from 'components/Common/AskemUserText';

class AnswerPopup extends React.Component {


	onPopupClick(event) {
		const uiTypeID = this.props.uiTypeID;
		const paIndex = this.props.paIndex;
		const paID = this.props.possibleAnswerID;
		const isOpenText = (uiTypeID >= 100 && uiTypeID < 200);

		if (this.props.isMultiAnswerQuestion) {
			if (this.props.isChecked) {
				if (this.props.onUncheck) {
					this.props.onUncheck(paIndex);
				}
			} else {
				if (isOpenText) {
					this.props.toggleTextInput(paIndex);
				} else {
					if (this.props.onCheck) {
						this.props.onCheck(paIndex, this.props.questionID, paID);
					}
				}
			}
		} else if (isOpenText) {
			// Open text PA
			this.props.toggleTextInput(paIndex);
		} else {
			this.props.onSingleVote(this.props.questionID, paID);
		}
	}

	render() {
		const paIndex = this.props.paIndex;
		const idString = `answer-${paIndex}`;
		let className = 'answer';
		let checkmark = null;
		if (this.props.isMultiAnswerQuestion) {
			checkmark = <PopupCheckmark isChecked={this.props.isChecked} onClick={onPopupClick} />;
			if (this.props.isChecked) {
				className += ' checked';
			}
		}
		return <div
			className={className}
			alt={this.props.textValue}
			data-id={this.props.possibleAnswerID}
			onClick={this.props.onSingleVote ? this.onPopupClick : null}>
				<AskemUserText>{this.props.textValue}</AskemUserText>
				{checkmark}
			</div>;
	}
}

AnswerPopup.propTypes = {
	paIndex: React.PropTypes.number.isRequired,		// index of Possible Answer in Question object
	uiTypeID: React.PropTypes.number.isRequired,	// Type of Possible Answer
	isMultiAnswerQuestion: React.PropTypes.bool.isRequired,
	isChecked: React.PropTypes.bool,				// Relevant only if (isMultiAnswerQuestion)
	questionID: React.PropTypes.number.isRequired,
	onSingleVote: React.PropTypes.func.isRequired,
	onCheck: React.PropTypes.func,
	onUncheck: React.PropTypes.func,
};

export default AnswerPopup;
