import { List, Map } from 'immutable';

const initialState = Map({todos: List()});

export default function(state=initialState, action) {
	switch(action.type) {
		case 'ADD_TODO':
		return state.update('todos', todos => todos.push(Map(action.payload)));
	case 'TOGGLE_TODO':
		return state.update('todos', todos => todos.map(t => {
			if(t.get('id') === action.payload) {
				return t.update('isDone', isDone => !isDone);
 			} else {
				return t;
			}
		}));
    default:
		return state;
	}
}
