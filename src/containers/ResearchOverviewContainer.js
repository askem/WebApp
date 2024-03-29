import { connect } from 'react-redux';
import fulfill from 'utils/HOC/fulfill';
import ResearchOverview from 'components/Research/ResearchOverview';
import { getResearch, getResearchKPIs } from 'actions/researchActions';

const FulfilledResearchOverview = fulfill(
	ResearchOverview,
	['research'],//, 'results'],
	['researchID'],
	props => {
		props.getResearch(props.researchID);
		props.getResearchKPIs(props.researchID);
	}
);

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
		let model = state.getIn(['data', 'model']);
		if (model) { model = model.toJS(); }
		return {
			research,
			researchID,
			results,
			model,
			businessResults
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			getResearch: researchID => dispatch(getResearch(researchID)),
			getResearchKPIs: researchID => dispatch(getResearchKPIs(researchID)),
		};
	}
)(FulfilledResearchOverview);

export default ResearchOverviewContainer;
