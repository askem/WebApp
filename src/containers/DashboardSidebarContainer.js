import { connect } from 'react-redux';
import DashboardSidebar from 'components/Base/DashboardSidebar';

const DashboardSidebarContainer = connect(
	function mapStateToProps(state, ownProps) {
		//console.info('Sidebar ownprops :: %o, %o', state, ownProps);
		return {

		};
	},
	function mapDispatchToProps(dispatch) {
		return {
		};
	}
)(DashboardSidebar);

export default DashboardSidebarContainer;
