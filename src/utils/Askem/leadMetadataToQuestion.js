import { POPUP_ARRANGEMENT_TYPE, POPUP_ARRANGEMENT_DEFAULT, calcLocations } from 'utils/Askem/AutoArrangement';
import blobURL from 'utils/Askem/blobURL';

const leadMetadataToQuestion = (meta) => {
	if (!meta) return null;
	let q = JSON.parse(JSON.stringify(meta));
	const arrangement = q.autoArrangement || POPUP_ARRANGEMENT_DEFAULT;
	const possibleAnswersCount = q.possibleAnswers.length;
	q.popupLocations = calcLocations(possibleAnswersCount, arrangement);
	q.questionImageURL = blobURL(q.mediaID);
	q.possibleAnswers.forEach(pa => pa.possibleAnswerID =  q.questionID * 100 + pa.possibleAnswerID);
	return q;
};

export default leadMetadataToQuestion;
