import { connect } from 'react-redux';
import ResearchResults from 'components/Research/Results/ResearchResults';

const ResearchResultsContainer = connect(
	function mapStateToProps(state, ownProps) {
		const researchID = ownProps.params.researchID;
		const samplingID = ownProps.params.samplingID;
		let research = state.getIn(['data', 'researchCampaigns', researchID]);
		let sampling = state.getIn(['data', 'samplings', samplingID]);
		if (research && sampling) {
			research = research.toJS();
			sampling = sampling.toJS();
		}
		return {
			research,
			researchID,
			samplingID,
			sampling
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			//onApprove: samplingID => dispatch(approveSampleMix(samplingID))
		};
	}
)(ResearchResults);

export default ResearchResultsContainer;
