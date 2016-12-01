import React from 'react';
import Question from 'components/Question/Question';
import leadMetadataToQuestion from 'utils/Askem/leadMetadataToQuestion';
import { POPUP_ARRANGEMENT_TYPE } from 'utils/Askem/AutoArrangement';

class QuestionPreview extends React.Component {
	constructor(props) {
    	super(props);
	}

	render() {
		// if (this.props.selectedQuestion === null || this.props.questions.length === 0) {
		// 	return null;
		// }
		let preview;
		const q = leadMetadataToQuestion(this.props.questions[this.props.selectedQuestion]);
		if (q) {
			const isCustomLocations = q.autoArrangement === POPUP_ARRANGEMENT_TYPE.CUSTOM;
			preview = <div className="preview">
				<Question question={q}
				onDragStop={this.props.setQuotePossibleAnswerLocation}
				draggable={isCustomLocations}
				onSingleVote={()=>{}}
				onMultiVote={()=>{}} />
			</div>;
		} else {
			preview = <div className="empty-preview" />
		}
		let debugButton;
		if (__DEV__) {
			debugButton = <button onClick={()=>console.info(q)}>Print JSON</button>
		}
		return (
			<div>
				<div className="quote-wizard-side-title">
					{this.props.title || 'Preview'}
				</div>
				{preview}
				{debugButton}
			</div>
		)
	}
}

QuestionPreview.propTypes = {

};

export default QuestionPreview;
