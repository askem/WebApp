import { Map } from 'immutable';

const initialState = Map({});

const modelReducer = (state=initialState, action) => {
	switch(action.type) {
		case 'SET_MODEL':
		return Map(action.payload);
    default:
		return state;
	}
}

export default modelReducer;
