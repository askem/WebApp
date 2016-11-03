import React from 'react';
import Question from 'components/Question/Question';
import AutoArrangement from 'utils/Askem/AutoArrangement';
import blobURL from 'utils/Askem/blobURL';

const questionFromSurveyMetadata = (meta) => {
	if (!meta) return null;
	let q = JSON.parse(JSON.stringify(meta));

	const arrangement = meta._popupsArrangement || AutoArrangement.POPUP_ARRANGEMENT_TYPE.CIRCLE;
	q.popupLocations = AutoArrangement.calcLocations(q.possibleAnswers.length, arrangement);
	q.questionImageURL = blobURL(q.mediaID);
	return q;
};

class CreateSurveyPreview extends React.Component {
	constructor(props) {
    	super(props);
	}

	render() {
		// if (this.props.selectedQuestion === null || this.props.questions.length === 0) {
		// 	return null;
		// }
		let preview;
		const q = questionFromSurveyMetadata(this.props.questions[this.props.selectedQuestion]);
		if (q) {
			preview = <div className="preview">
				<Question question={q}
				onSingleVote={()=>{}}
				onMultiVote={()=>{}} />
			</div>;
		} else {
			preview = <div className="empty-preview" />
		}
		return (
			<div>
				<div className="quote-wizard-side-title">
					Preview
				</div>
				{preview}
			</div>
		)
	}
}

CreateSurveyPreview.propTypes = {

};

export default CreateSurveyPreview;
