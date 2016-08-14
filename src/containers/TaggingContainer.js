import { connect } from 'react-redux';
import Tagging from 'components/Research/Media/Tagging';

const TaggingContainer = connect(
	function mapStateToProps(state, ownProps) {
		const researchID = ownProps.params.researchID;
		let research = state.getIn(['data', 'researchCampaigns', researchID]);
		let mediaPlan = state.getIn(['data', 'mediaPlans', researchID]);
		let taggingStatus = state.getIn(['data', 'taggingStatus', researchID]);
		if (research && mediaPlan && taggingStatus) {
			research = research.toJS();
			mediaPlan = mediaPlan.toJS();
			taggingStatus = taggingStatus.toJS();
		}
		return {
			research,
			researchID,
			mediaPlan,
			taggingStatus
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			//onApprove: samplingID => dispatch(approveSampleMix(samplingID))
		};
	}
)(Tagging);

export default TaggingContainer;
