import { connect } from 'react-redux';
import DashboardSidebar from 'components/Base/DashboardSidebar';
// import { addTodo, toggleTodo } from 'actions/testActions';

const DashboardSidebarContainer = connect(
	function mapStateToProps(state, ownProps) {

		console.info('Sidebar ownprops :: %o, %o', state, ownProps);
		// const researchID = ownProps.params.researchID;
		// let research = state.getIn(['data', 'researchCampaigns', researchID]);
		// if (research) { research = research.toJS(); }
		// return {
		// 	research,
		// 	researchID
		// };
		return {

		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			// addTodo: text => dispatch(addTodo(text)),
			// toggleTodo: id => dispatch(toggleTodo(id))
		};
	}
)(DashboardSidebar);

export default DashboardSidebarContainer;
