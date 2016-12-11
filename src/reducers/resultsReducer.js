import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';

const initialState = Immutable.fromJS({});

const resultsReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_SURVEY':
			return state.setIn([action.payload.surveyID, 'survey'], Immutable.fromJS(action.payload.survey));
		case 'SET_SURVEY_RESULTS':
			const results = action.payload.results;
			return state.setIn([action.payload.surveyID, 'results'], Immutable.fromJS(results));
		default:
			return state;
	}
}

export default resultsReducer;
