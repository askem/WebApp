import { connect } from 'react-redux';
import fulfill from 'utils/HOC/fulfill';
import Audiences from 'components/Research/Audiences/Audiences';
import addAudience from 'actions/addAudience';

const FulfilledAudiences = fulfill(
	Audiences,
	['audiences'],
	['researchID'],
	props => {
		//props.getAudiences(props.researchID);
	}
);

const AudiencesContainer = connect(
	function mapStateToProps(state, ownProps) {
		const researchID = ownProps.params.researchID;
		let research = state.getIn(['data', 'researchCampaigns', researchID]);
		let audiences = state.getIn(['data', 'audiences', researchID]);
		if (research && audiences) {
			research = research.toJS();
			audiences = audiences.toJS();
		}
		return {
			research,
			researchID,
			audiences
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			onAddAudience: (researchID, audienceSource, audienceIDs) => dispatch(addAudience(researchID, audienceSource, audienceIDs))
		};
	}
)(FulfilledAudiences);

export default AudiencesContainer;
