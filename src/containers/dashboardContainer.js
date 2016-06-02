import { connect } from 'react-redux';
import * as components from 'components/testComponents';
import { addTodo, toggleTodo } from 'actions/testActions';

export const TodoList = connect(
	function mapStateToProps(state) {
		return { todos: state.getIn(['data', 'todos']) };
	},
	function mapDispatchToProps(dispatch) {
		return {
			addTodo: text => dispatch(addTodo(text)),
			toggleTodo: id => dispatch(toggleTodo(id))
		};
	}
)(components.TodoList);
