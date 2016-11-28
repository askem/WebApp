import { connect } from 'react-redux';
import AdminHome from 'components/Quote/Admin/AdminHome';

const QuoteAdminHomeContainer = connect(
	function mapStateToProps(state, ownProps) {
		return {
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			manageNewQuote: () => dispatch({type: 'ROUTING_MANAGE_CREATE_NEW'}),
		};
	}
)(AdminHome);

export default QuoteAdminHomeContainer;
