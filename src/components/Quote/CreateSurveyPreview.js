import React from 'react';
import Question from 'components/Question/Question';
import AutoArrangement from 'utils/Askem/AutoArrangement';
import blobURL from 'utils/Askem/blobURL';

const questionFromSurveyMetadata = (meta) => {
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
		if (this.props.selectedQuestion === null || this.props.questions.length === 0) {
			return null;
		}
		const q = questionFromSurveyMetadata(this.props.questions[this.props.selectedQuestion]);
		if (!q) { return null; }
		return (
			<div>
				<div className="quote-estimated-reach-title">
					Preview
				</div>
				<div className="preview animated fadeIn"
				style={{animationDuration: '4s'}}>
					<Question question={q}
					onSingleVote={()=>{}}
					onMultiVote={()=>{}} />
				</div>
			</div>
		)
	}
}

CreateSurveyPreview.propTypes = {

};

export default CreateSurveyPreview;
