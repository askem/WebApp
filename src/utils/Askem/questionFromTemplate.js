import { POPUP_ARRANGEMENT_TYPE, calcLocations } from 'utils/Askem/AutoArrangement';
import extractTemplateVars from 'utils/Askem/extractTemplateVars';
import blobURL from 'utils/Askem/blobURL';

const questionFromTemplate = (questionTemplate, vars, varValues) => {
	let q = JSON.parse(JSON.stringify(questionTemplate)); //Object.assign({}, questionTemplate);
	let possibleAnswersChanged = false;
	let duplicatedPossibleAnswers = {};

	vars.forEach((v, idx) => {
		let value = varValues[idx];
		const varTemplateString = `{{${v.id}}}`;
		switch (v.type) {
			case 'string':
			case 'category':
				value = value || '';
				q.textValue = q.textValue.replace(varTemplateString, value);
				q.possibleAnswers.forEach(pa => {
					pa.textValue = pa.textValue.replace(varTemplateString, value);
				});
				break;
			case 'string[]':
				value = value || [];
				const paIdx = q.possibleAnswers.findIndex(pa => pa.textValue === varTemplateString);
				if (paIdx > -1) {
					const pa = q.possibleAnswers[paIdx];
					possibleAnswersChanged = true;
					q.possibleAnswers.splice(paIdx, 1);
					if (value) {
						const newPAs = value.map(text => {
							let newPA = JSON.parse(JSON.stringify(pa));
							newPA.textValue = text;
							return newPA;
						})
						q.possibleAnswers.push(...newPAs);
					}
				}
				break;
			case 'image':
				if (value && value.mediaID && q._imageFileName === varTemplateString) {
					q.mediaID = value.mediaID;
					q.questionImageURL = blobURL(value.mediaID);
				}
				break;
			default:
				console.error(`Unsupported type ${v.type}`);
		}
	});
	if (possibleAnswersChanged) {
		q.possibleAnswers.forEach((pa, paIdx) => {
			pa.possibleAnswerID = q.questionID * 100 + paIdx;
		})
	}
	const arrangement = q._popupsArrangement || POPUP_ARRANGEMENT_TYPE.CIRCLE;
	q.popupLocations = calcLocations(q.possibleAnswers.length, arrangement);
	q.questionImageURL = q.questionImageURL || '/images/emptyMediaID.png';
	return q;
}

export default questionFromTemplate;
