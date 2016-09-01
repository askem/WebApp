import { List, Map } from 'immutable';
import Immutable from 'immutable';

const initialState = Map({});
const inProgress = Map({inProgress: true});
const success = Map({inProgress: false, success: true});
const fail = error => Map({inProgress: false, success: false, error});

export default function(state=initialState, action) {
	switch(action.type) {
	case 'COMMIT_RESEARCH_DATA':
		return state.setIn(['commitResearchData', action.payload.researchID], inProgress);
	case 'COMMIT_RESEARCH_DATA_SUCCESS':
		return state.setIn(['commitResearchData', action.payload.researchID], success);
	case 'COMMIT_RESEARCH_DATA_FAIL':
		return state.setIn(['commitResearchData', action.payload.researchID], fail(action.payload.error));
	default:
		return state
	}
}
