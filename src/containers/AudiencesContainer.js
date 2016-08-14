import { connect } from 'react-redux';
import Audiences from 'components/Research/Audiences/Audiences';
import addAudience from 'actions/addAudience';

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
)(Audiences);

export default AudiencesContainer;
