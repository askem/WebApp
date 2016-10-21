import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';

const initialState = Immutable.fromJS({});

const quoteReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_QUOTE_DEMO_GENDER':
			return state.setIn(['audience', 'demographics', 'gender', action.payload.gender], action.payload.value);
		case 'TOGGLE_QUOTE_DEMO_AGE_GROUP':
		return state.updateIn(['audience', 'demographics', 'ageGroups'], groups => {
			const group = action.payload.ageGroup
			const idx = groups.keyOf(group);
			if (idx === undefined) {
				return groups.push(group);
			} else {
				return groups.delete(idx);
			}
		});

		case 'ADD_QUOTE_AUDIENCE_PAGE':
			return state.updateIn(['audience', 'facebookPages'], pages =>
			pages.push(Immutable.fromJS(action.payload.fbPage)));
		case 'TOGGLE_QUOTE_AUDIENCE_PAGE_CONNECTED':
			return state.updateIn(['audience', 'facebookPages', action.payload.pageIndex], page =>
			page.set('targetConnected', !page.get('targetConnected')));
		case 'REMOVE_QUOTE_AUDIENCE_PAGE':
			return state.updateIn(['audience', 'facebookPages'], pages =>
			pages.delete(action.payload.pageIndex));
		case 'ADD_QUOTE_AUDIENCE_INTEREST':
			return state.updateIn(['audience', 'interests'], interests =>
			interests.push(Immutable.fromJS(action.payload.interest)));
		case 'REMOVE_QUOTE_AUDIENCE_INTEREST':
			return state.updateIn(['audience', 'interests'], interests =>
			interests.delete(action.payload.interestIndex));
		case 'ADD_QUOTE_AUDIENCE_BEHAVIOR':
			return state.updateIn(['audience', 'behaviors'], behaviors =>
			behaviors.push(Immutable.fromJS(action.payload.behavior)));
		case 'REMOVE_QUOTE_AUDIENCE_BEHAVIOR':
			return state.updateIn(['audience', 'behaviors'], behaviors =>
			behaviors.delete(action.payload.behaviorIndex));

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
		case 'SET_QUOTE_SAMPLE_SIZE':
			return state.setIn(['sample', 'sampleSize'], action.payload.sampleSize);
		default:
			return state;
	}
}

const reachEstimateReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'REACH_ESTIMATE_FETCH':
			return state.merge({
				reach: null,
				error: false,
				fetching: true
			});
		case 'REACH_ESTIMATE_FETCH_SUCCESS':
			return state.merge({
				reach: action.payload.reach,
				error: false,
				fetching: false
			});
		case 'REACH_ESTIMATE_FETCH_FAIL':
			return state.merge({
				reach: null,
				error: true,
				fetching: false
			});
		default:
			return state;
	}
};

const imageSuggestionsReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'QUESTION_IMAGE_SUGGESTIONS_SUCCESS':
			return state.setIn([action.payload.textValue], Immutable.fromJS({
				suggestions: action.payload.suggestions,
				searchTerm: action.payload.searchTerm,
				fromQuestionID: action.payload.questionID
			}));
		case 'QUESTION_IMAGE_SUGGESTIONS_FAIL':
			return state.setIn([action.payload.textValue], Immutable.fromJS({
				loadingFail: true,
				error: action.payload.error
			}));
		default:
			return state;
	}
}

const dataReducer = combineReducers({
	quote: quoteReducer,
	reachEstimate: reachEstimateReducer,
	imageSuggestions: imageSuggestionsReducer
});

export default dataReducer;
