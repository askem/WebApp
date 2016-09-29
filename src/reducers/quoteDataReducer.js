import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

const quoteDataReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_QUOTE_DEMO_GENDER':
			return state.setIn(['demographics', 'gender', action.payload.gender], action.payload.value);
		case 'TOGGLE_QUOTE_DEMO_AGE_GROUP':
		return state.updateIn(['demographics', 'ageGroups'], groups => {
			const group = action.payload.ageGroup
			const idx = groups.keyOf(group);
			if (idx === undefined) {
				return groups.push(group);
			} else {
				return groups.delete(idx);
			}
		});

		case 'ADD_QUOTE_QUESTION':
			return state.updateIn(['surveyMetadata', 'questions'], questions =>
				questions.push(Immutable.fromJS({
					textValue: '',
					questionID: questions.size,
					possibleAnswers: [{textValue: '', possibleAnswerID: 0}]
				}))
			);
		case 'DELETE_QUOTE_QUESTION':
			return state.updateIn(['surveyMetadata', 'questions'], questions =>
				questions
				.delete(action.payload.questionID)
				.map((q, idx) => q.set('questionID', idx)));
		case 'SET_QUOTE_QUESTION_TEXT':
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID, 'textValue'], action.payload.textValue);
		case 'SET_QUOTE_QUESTION_IMAGE':
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID, 'mediaID'], action.payload.mediaID);
		case 'ADD_QUOTE_POSSIBLE_ANSWER':
			return state.updateIn(['surveyMetadata', 'questions', action.payload.questionID, 'possibleAnswers'], pas =>
				pas.push(Immutable.fromJS({textValue: '', possibleAnswerID: pas.size})));
		case 'DELETE_QUOTE_POSSIBLE_ANSWER':
			return state.updateIn(['surveyMetadata', 'questions', action.payload.questionID, 'possibleAnswers'], pas =>
				pas
				.delete(action.payload.possibleAnswerID)
				.map((pa, idx) => pa.set('possibleAnswerID', idx)));
		case 'SET_QUOTE_POSSIBLE_ANSER_TEXT':
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID,
				'possibleAnswers', action.payload.possibleAnswerID, 'textValue'], action.payload.textValue);
		default:
			return state;
	}
}

export default quoteDataReducer;
