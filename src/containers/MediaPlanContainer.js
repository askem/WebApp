import { connect } from 'react-redux';
import MediaPlan from 'components/Research/Media/MediaPlan';
import { addMediaPlanChannels, getMediaPlan } from 'actions/mediaPlanActions';

const MediaPlanContainer = connect(
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
			getMediaPlan: researchID => dispatch(getMediaPlan(researchID)),
			addChannels: (researchID, channels) => dispatch(addMediaPlanChannels(researchID, channels))
		};
	}
)(MediaPlan);

export default MediaPlanContainer;
