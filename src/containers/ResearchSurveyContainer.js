import { connect } from 'react-redux';
import ResearchSurvey from 'components/Research/ResearchSurvey';

const ResearchSurveyContainer = connect(
	function mapStateToProps(state, ownProps) {
		const researchID = ownProps.params.researchID;
		let research = state.getIn(['data', 'researchCampaigns', researchID]);
		let mediaPlan = state.getIn(['data', 'mediaPlans', researchID]);
		if (research && mediaPlan) {
			research = research.toJS();
			mediaPlan = mediaPlan.toJS();
		}
		return {
			research,
			researchID,
			mediaPlan
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			//onApprove: samplingID => dispatch(approveSampleMix(samplingID))
		};
	}
)(ResearchSurvey);

export default ResearchSurveyContainer;
