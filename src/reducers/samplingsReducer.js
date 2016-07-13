import { List, Map } from 'immutable';

const initialState = Map({samplings: Map()});

export default function(state=initialState, action) {
	switch(action.type) {
		case 'APPROVE_SAMPLE_MIX':
		return state.setIn(['sampleMixes', action.payload.samplingID, 'status'], 'approved');
    default:
		return state;
	}
}
