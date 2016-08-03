import { connect } from 'react-redux';
import Brief from 'components/Research/Brief/Brief';
import * as actions from 'actions/briefActions';

const BriefContainer = connect(
	function mapStateToProps(state, ownProps) {
		const researchID = ownProps.params.researchID;
		let research = state.getIn(['data', 'researchCampaigns', researchID]);
		if (research) { research = research.toJS(); }
		let model = state.getIn(['data', 'model']);
		if (model) { model = model.toJS(); }
		let modelData = state.getIn(['data', 'researchModelData', researchID]);
		if (modelData) { modelData = modelData.toJS(); }

		return {
			model,
			modelData,
			research,
			researchID
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			setResearchKPIs: (researchID, kpis) => dispatch(actions.setResearchKPIs(researchID, kpis)),
			toggleResearchKPI: (researchID, kpi) => dispatch(actions.toggleResearchKPI(researchID, kpi)),
			onModelVariableChange: (researchID, variableID, value) => dispatch(actions.setModelVariable(researchID, variableID, value)),
		};
	}
)(Brief);

export default BriefContainer;
