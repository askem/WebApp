import React from 'react';
import Question from 'components/Question/Question';
import leadMetadataToQuestion from 'utils/Askem/leadMetadataToQuestion';
import { POPUP_ARRANGEMENT_TYPE } from 'utils/Askem/AutoArrangement';

class QuestionPreview extends React.Component {
	constructor(props) {
    	super(props);
	}

	render() {
		let preview = <div className="empty-preview" />;
		if (this.props.selectedQuestion !== null) {
			let variants;
			const qVariants = this.props.questionsVariants
				.find(qv => qv.questionID === this.props.selectedQuestion);
			if (qVariants) {
				variants = qVariants.variants;
			}
			const hasVariants = variants && variants.length > 0;
			let shownObject;
			let isCustomLocations;
			if (hasVariants) { 
				shownObject = variants.find(v => v.ID === this.props.selectedVariant);
				// Normalize
				shownObject.popupLocations = shownObject.paLocations;
				shownObject.possibleAnswers = shownObject.paTextValues.map(textValue => {
					return { textValue }
				});
				isCustomLocations = shownObject.paArrangement === 'Custom';
			} else {
				shownObject = this.props.questions[this.props.selectedQuestion];
				isCustomLocations = shownObject.autoArrangement === POPUP_ARRANGEMENT_TYPE.CUSTOM;
			}
			let q = leadMetadataToQuestion(shownObject);
			q.questionID = this.props.selectedQuestion;
			if (q) {
				preview = <div className="preview">
					<Question question={q}
					selectedVariant={this.props.selectedVariant}
					onDragStop={this.props.setQuotePossibleAnswerLocation}
					draggable={isCustomLocations}
					onSingleVote={()=>{}}
					onMultiVote={()=>{}} />
				</div>;
			}
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
