import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

const quoteDataReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_QUOTE_DEMO_GENDER':
			return state.setIn(['demographics', 'gender', action.payload.gender], action.payload.value);
		case 'SET_QUOTE_DEMO_AGE_GROUPS':
			return state.setIn(['demographics', 'ageGroups'], Immutable.fromJS(action.payload.value));
		default:
			return state;
	}
}

export default quoteDataReducer;
