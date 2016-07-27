import { connect } from 'react-redux';
import Brief from 'components/Research/Brief/Brief';
import * as actions from 'actions/briefActions';

const BriefContainer = connect(
	function mapStateToProps(state, ownProps) {
		const researchID = ownProps.params.researchID;
		let research = state.getIn(['data', 'researchCampaigns', researchID]);
		if (research) { research = research.toJS(); }
		let model = state.get('model');
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
			toggleResearchKPI: (researchID, kpi, allKPIs) => dispatch(actions.toggleResearchKPI(researchID, kpi, allKPIs)),
		};
	}
)(Brief);

export default BriefContainer;