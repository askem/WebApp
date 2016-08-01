import AutoArrangement from 'utils/Askem/AutoArrangement';
import extractTemplateVars from 'utils/Askem/extractTemplateVars';

const questionFromTemplate = (questionTemplate, vars, varValues) => {
	let q = JSON.parse(JSON.stringify(questionTemplate)); //Object.assign({}, questionTemplate);
	let possibleAnswersChanged = false;

	vars.forEach((v, idx) => {
		const value = varValues[idx];
		const varTemplateString = `{{${v.id}}}`;
		switch (v.type) {
			case 'string':
			case 'category':
				q.textValue = q.textValue.replace(varTemplateString, value || '');
				q.possibleAnswers.forEach(pa => {
					pa.textValue = pa.textValue.replace(varTemplateString, value || '');
				});
				break;
			case 'string[]':
				const paIdx = q.possibleAnswers.findIndex(pa => pa.textValue === varTemplateString);
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
				break;
			default:
				//console.error(`Unsupported type ${v.type}`);
		}
	});
	if (possibleAnswersChanged) {
		q.possibleAnswers.forEach((pa, paIdx) => {
			pa.possibleAnswerID = q.questionID * 100 + paIdx;
		})
	}
	q.popupLocations = AutoArrangement.calcLocations(q.possibleAnswers.length, AutoArrangement.POPUP_ARRANGEMENT_TYPE.CIRCLE);
	q.questionImageURL = q.questionImageURL || '/images/emptyMediaID.png';
	return q;
}

export default questionFromTemplate;
