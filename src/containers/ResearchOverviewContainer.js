import { connect } from 'react-redux';
import ResearchOverview from 'components/Research/ResearchOverview';

const ResearchOverviewContainer = connect(
	function mapStateToProps(state, ownProps) {
		const researchID = ownProps.params.researchID;
		let research = state.getIn(['data', 'researchCampaigns', researchID]);
		if (research) { research = research.toJS(); }
		let results = state.getIn(['data', 'resultsByResearch', researchID]);
		if (results) {
			results = results.toJS();
			// ASSUMPTION :: Currently - only 1 sampling per research
			if (results.length === 1) {
				results = results[0];
			}
		}
		let businessResults = state.getIn(['data', 'businessDashboardsByResearch', researchID]);
		if (businessResults) { businessResults = businessResults.toJS(); }
		return {
			research,
			researchID,
			results,
			businessResults
		};
	},
	function mapDispatchToProps(dispatch) {
		return {

		};
	}
)(ResearchOverview);

export default ResearchOverviewContainer;