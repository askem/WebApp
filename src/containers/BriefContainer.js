import { connect } from 'react-redux';
import fulfill from 'utils/HOC/fulfill';
import Brief from 'components/Research/Brief/Brief';
import * as actions from 'actions/briefActions';
import { getResearch, commitResearchData } from 'actions/researchActions';

const FulfilledBrief = fulfill(
	Brief,
	['research'],
	['researchID'],
	props => {
		// TODO
		props.getResearch(props.researchID);
	}
);

const BriefContainer = connect(
	function mapStateToProps(state, ownProps) {
		const researchID = ownProps.params.researchID;
		let research = state.getIn(['data', 'researchCampaigns', researchID]);
		if (research) { research = research.toJS(); }
		let model = state.getIn(['data', 'model']);
		if (model) { model = model.toJS(); }
		let researchCommits = state.getIn(['commits', 'commitResearchData', researchID]);
		if (researchCommits) { researchCommits = researchCommits.toJS(); }
		return {
			model,
			research,
			researchID,
			researchCommits,
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			getResearch: researchID => dispatch(getResearch(researchID)),
			setResearchKPIs: (researchID, kpis) => dispatch(actions.setResearchKPIs(researchID, kpis)),
			toggleResearchKPI: (researchID, kpi) => dispatch(actions.toggleResearchKPI(researchID, kpi)),
			onModelVariableChange: (researchID, variableID, value) => dispatch(actions.setModelVariable(researchID, variableID, value)),
			commitResearchData: researchID => dispatch(commitResearchData(researchID)),
		};
	}
)(FulfilledBrief);

export default BriefContainer;
