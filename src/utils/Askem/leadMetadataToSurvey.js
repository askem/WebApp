import leadMetadataToQuestion from 'utils/Askem/leadMetadataToQuestion';

const leadMetadataToSurvey = (meta, keepIDsIntact) => {
	if (!meta.questions || meta.questions.length === 0) { return; }
	let survey = {
		connections: {
			start: {
				type: 'question',
				ID: meta.questions[0].questionID
			},
			possibleAnswers: {},
			questions: {},
			questionSets: {},
		},
		questions: {},
	};
	const questionsCount = meta.questions.length;
	meta.questions.forEach((metaQ, idx) => {
		const q = leadMetadataToQuestion(metaQ, keepIDsIntact);
		survey.questions[idx] = q;
		q.possibleAnswers.forEach(pa => {
			let connection = pa.connection;
			if (!connection && idx < questionsCount - 1) {
				// Sequential flow
				const connectedQuestionID = meta.questions[idx + 1].questionID;
				connection = { type: 'question', ID: connectedQuestionID };
			}
			if (connection && !(connection.type === 'end' && connection.ID === null)) {
				survey.connections.possibleAnswers[pa.possibleAnswerID] = connection;
			}
		})
	});
	if (meta.questionsVariants) {
		survey.questionsVariants = meta.questionsVariants;
	}
	console.info(survey);
	return survey;
}

export default leadMetadataToSurvey;
