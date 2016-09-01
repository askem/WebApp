import { connect } from 'react-redux';
import fulfill from 'utils/HOC/fulfill';
import Tagging from 'components/Research/Media/Tagging';
import { getMediaPlan } from 'actions/mediaPlanActions';

const FulfilledTagging = fulfill(
	Tagging,
	['mediaPlan', 'taggingStatus'],
	['researchID'],
	props => {
		props.getMediaPlan(props.researchID);
	}
);

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
			getMediaPlan: researchID => dispatch(getMediaPlan(researchID)),
		};
	}
)(FulfilledTagging);

export default TaggingContainer;
