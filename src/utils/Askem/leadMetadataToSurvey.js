import leadMetadataToQuestion from 'utils/Askem/leadMetadataToQuestion';

const leadMetadataToSurvey = (meta) => {
	let survey = {
		connections: {
			start: {
				type: 'question',
				ID: 0
			},
			possibleAnswers: {},
			questions: {},
			questionSets: {},
		},
		questions: {}
	};
	const questionsCount = meta.questions.length;
	meta.questions.forEach((metaQ, idx) => {
		const q = leadMetadataToQuestion(metaQ);
		survey.questions[idx] = q;
		q.possibleAnswers.forEach(pa => {
			let connection = pa.connection;
			if (!connection && idx < questionsCount - 1) {
				// Sequential flow
				connection = { type: 'question', ID: idx + 1 }
			}
			if (connection) {
				survey.connections.possibleAnswers[pa.possibleAnswerID] = connection;
			}
		})
	});
	return survey;
}

export default leadMetadataToSurvey;
