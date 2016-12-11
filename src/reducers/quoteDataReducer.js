import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import emptyQuote from 'data/emptyQuote';
import { POPUP_ARRANGEMENT_TYPE, POPUP_ARRANGEMENT_DEFAULT, calcLocations } from 'utils/Askem/AutoArrangement';

const initialState = Immutable.fromJS({});

const quoteReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'CREATE_NEW_QUOTE':
			return Immutable.fromJS(emptyQuote);
		case 'LOAD_QUOTE_REQUEST_SUCCESS':
			return Immutable.fromJS(action.payload.quote);
		
		case 'REACH_ESTIMATE_FETCH':
			return state.mergeIn(['reachEstimate'], {
				reach: null,
				error: false,
				fetching: true
			});
		case 'REACH_ESTIMATE_FETCH_SUCCESS':
			return state.mergeIn(['reachEstimate'], {
				reach: action.payload.reach,
				error: false,
				fetching: false
			});
		case 'REACH_ESTIMATE_FETCH_FAIL':
			return state.mergeIn(['reachEstimate'], {
				reach: null,
				error: true,
				fetching: false
			});
		case 'COST_ESTIMATE_FETCH':
			return state.mergeIn(['costEstimate'], {
				estimates: null,
				error: false,
				fetching: true
			});
		case 'COST_ESTIMATE_FETCH_SUCCESS':
			return state.mergeIn(['costEstimate'], {
				estimates: action.payload.estimates,
				error: false,
				fetching: false
			});
		case 'COST_ESTIMATE_FETCH_FAIL':
			return state.mergeIn(['costEstimate'], {
				estimates: null,
				error: true,
				fetching: false
			});
			
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
		case 'SWAP_QUOTE_QUESTION':
			return state.updateIn(['surveyMetadata', 'questions'], questions => {
				const item = questions.get(action.payload.oldIndex);
				return questions
					.delete(action.payload.oldIndex)
					.insert(action.payload.newIndex, item)
					.map((q, idx) => q.set('questionID', idx));
			});
		case 'SET_QUOTE_QUESTION_TEXT':
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID, 'textValue'], action.payload.textValue);
		case 'SET_QUOTE_QUESTION_IS_MULTI_ANSWER':
			return state.updateIn(['surveyMetadata', 'questions', action.payload.questionID], q => {
				if (action.payload.isMultiAnswer) {
					return q.set('isMultiAnswerQuestion', true)
					.set('minAnswers', 1)
					.set('maxAnswers', q.get('possibleAnswers').size);
				} else {
					return q.delete('isMultiAnswerQuestion')
					.delete('minAnswers')
					.delete('maxAnswers');
				}	
			});
		case 'SET_QUOTE_QUESTION_MIN_ANSWERS':
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID, 'minAnswers'], action.payload.minAnswers);
		case 'SET_QUOTE_QUESTION_MAX_ANSWERS':
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID, 'maxAnswers'], action.payload.maxAnswers);
		case 'SET_QUOTE_QUESTION_AUTO_ARRANGEMENT':
			return state.updateIn(['surveyMetadata', 'questions', action.payload.questionID], q => {
				const newArrangement = action.payload.autoArrangement;
				if (newArrangement === POPUP_ARRANGEMENT_TYPE.CUSTOM) {
					const arrangement = q.get('autoArrangement') || POPUP_ARRANGEMENT_DEFAULT;
					const possibleAnswersCount = q.get('possibleAnswers').size;
					const currentLocations = Immutable.fromJS(calcLocations(possibleAnswersCount, arrangement));
					return q.set('popupLocations', currentLocations).set('autoArrangement', newArrangement);
				} else {
					return q.delete('popupLocations').set('autoArrangement', newArrangement);
				}
			});
		case 'SET_QUOTE_QUESTION_IMAGE':
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID, 'mediaID'], action.payload.mediaID);
		case 'UPLOAD_IMAGE_REQUEST_SUCCESS':
			const { originalMediaID, newMediaID } = action.payload;
			return state.updateIn(['surveyMetadata', 'questions'], questions => {
				const key = questions.findKey(q => q.get('mediaID') === originalMediaID);
				if (key !== undefined) {
					return questions.setIn([key, 'mediaID'], newMediaID);
				}
				return questions;
			});	
		case 'ADD_QUOTE_POSSIBLE_ANSWER':
			return state.updateIn(['surveyMetadata', 'questions', action.payload.questionID], q => {
				const possibleAnswerID = q.get('possibleAnswers').size;
				q = q.update('possibleAnswers', pas => pas.push(Immutable.fromJS({textValue: '', possibleAnswerID})));
				if (q.get('autoArrangement') === POPUP_ARRANGEMENT_TYPE.CUSTOM && q.get('popupLocations')) {
					const newLocation = calcLocations(possibleAnswerID + 1, POPUP_ARRANGEMENT_DEFAULT)[possibleAnswerID];
					q = q.update('popupLocations', locations => locations.push(Immutable.fromJS(newLocation)));
				}
				return q;
			});
		case 'DELETE_QUOTE_POSSIBLE_ANSWER':
			return state.updateIn(['surveyMetadata', 'questions', action.payload.questionID, 'possibleAnswers'], pas =>
				pas
				.delete(action.payload.possibleAnswerID)
				.map((pa, idx) => pa.set('possibleAnswerID', idx)))
				.updateIn(['surveyMetadata', 'questions', action.payload.questionID, 'popupLocations'], locations => {
				if (locations) { 
					return locations.delete(action.payload.possibleAnswerID);
				}});
		case 'SET_QUOTE_POSSIBLE_ANSWER_TEXT':
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID,
				'possibleAnswers', action.payload.possibleAnswerID, 'textValue'], action.payload.textValue);
		case 'SET_QUOTE_POSSIBLE_ANSWER_LOCATION':
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID,
				'popupLocations', action.payload.possibleAnswerID], action.payload.location);
		case 'SET_QUOTE_POSSIBLE_ANSWER_RANDOM_LOCATION':
			if (action.payload.randomLocation) {
				return state.setIn(['surveyMetadata', 'questions', action.payload.questionID,
					'possibleAnswers', action.payload.possibleAnswerID, 'randomLocation'], true);
			} else {
				return state.deleteIn(['surveyMetadata', 'questions', action.payload.questionID,
					'possibleAnswers', action.payload.possibleAnswerID, 'randomLocation']);
			}
		case 'SET_QUOTE_POSSIBLE_ANSWER_CONNECTION':
			const { entity } = action.payload;
			if (entity) {
				return state.setIn(['surveyMetadata', 'questions', action.payload.questionID,
					'possibleAnswers', action.payload.possibleAnswerID, 'connection'], Immutable.fromJS(entity));
			} else {
				return state.deleteIn(['surveyMetadata', 'questions', action.payload.questionID,
					'possibleAnswers', action.payload.possibleAnswerID, 'connection']);
			}
		case 'SET_QUOTE_POSSIBLE_ANSWER_MULTI_BEHAVIOR':
			const { multiBehavior } = action.payload;
			if (multiBehavior && multiBehavior !== 'regular') {
				return state.setIn(['surveyMetadata', 'questions', action.payload.questionID,
					'possibleAnswers', action.payload.possibleAnswerID, 'multiBehavior'], multiBehavior);
			} else {
				// Don't save 'regular' values
				return state.deleteIn(['surveyMetadata', 'questions', action.payload.questionID,
					'possibleAnswers', action.payload.possibleAnswerID, 'multiBehavior']);
			}
		case 'SET_QUOTE_SAMPLE_SIZE':
			return state.set('sample', Immutable.fromJS({
				sampleSize: action.payload.sampleSize,
				moe: action.payload.moe
			}));
		default:
			return state;
	}
}

const leadReducer = (state = initialState, action) => {
	switch(action.type) {
	case 'CREATE_NEW_QUOTE':
		return Immutable.fromJS({
			quoteID: action.payload.quoteID
		});
	case 'LOAD_QUOTE':
		return state.set('quoteID', action.payload.quoteID);
	case 'LOAD_QUOTE_REQUEST_START':
		return state.set('loadingFail', false);
	case 'LOAD_QUOTE_REQUEST_FAIL':
		return state.set('loadingFail', true);
	case 'SUBMIT_LEAD_REQUEST_START':
		return state.set('submitInProgress', true);
	case 'SUBMIT_LEAD_REQUEST_SUCCESS':
		return state.set('submitSuccess', true).set('submitInProgress', false);
	case 'SUBMIT_LEAD_REQUEST_FAIL':
		return state.set('submitFail', true).set('submitInProgress', false);
	case 'SUBMIT_LEAD_CLOSE_SUCCESS':
		return state.delete('submitSuccess');
	case 'SUBMIT_LEAD_CANCEL_FAILED':
		return state.delete('submitFail');
	default:
		return state;
	}
}

const contactReducer = (state = initialState, action) => {
	switch(action.type) {
	case 'SET_QUOTE_CONTACT_VALUE':
		return state.set(action.payload.field, action.payload.value);
	case 'CREATE_NEW_QUOTE':
		return initialState;
	default:
		return state;
	}
}

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
	imageSuggestions: imageSuggestionsReducer,
	lead: leadReducer,
	contact: contactReducer
});

export default dataReducer;
