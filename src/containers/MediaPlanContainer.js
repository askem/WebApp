import { connect } from 'react-redux';
import fulfill from 'utils/HOC/fulfill';
import MediaPlan from 'components/Research/Media/MediaPlan';
import { addMediaPlanChannels, getMediaPlan } from 'actions/mediaPlanActions';

const FulfilledMediaPlan = fulfill(
	MediaPlan,
	['mediaPlan'],
	['researchID'],
	props => {
		props.getMediaPlan(props.researchID);
	}
);

const MediaPlanContainer = connect(
	function mapStateToProps(state, ownProps) {
		const researchID = ownProps.params.researchID;
		let research = state.getIn(['data', 'researchCampaigns', researchID]);
		if (research) { research = research.toJS(); }
		let mediaPlan = state.getIn(['data', 'mediaPlans', researchID]);
		if (mediaPlan) { mediaPlan = mediaPlan.toJS(); }
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
)(FulfilledMediaPlan);

export default MediaPlanContainer;
