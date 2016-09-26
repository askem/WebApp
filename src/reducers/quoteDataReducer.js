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
		default:
			return state;
	}
}

export default quoteDataReducer;
