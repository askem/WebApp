import { connect } from 'react-redux';
import ResearchOverview from 'components/Research/ResearchOverview';
// import { addTodo, toggleTodo } from 'actions/testActions';

const ResearchOverviewContainer = connect(
	function mapStateToProps(state, ownProps) {
		const researchID = ownProps.params.researchID;
		let research = state.getIn(['data', 'researchCampaigns', researchID]);
		if (research) { research = research.toJS(); }
		return {
			research,
			researchID
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			// addTodo: text => dispatch(addTodo(text)),
			// toggleTodo: id => dispatch(toggleTodo(id))
		};
	}
)(ResearchOverview);

export default ResearchOverviewContainer;
