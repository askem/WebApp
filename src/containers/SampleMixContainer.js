import { connect } from 'react-redux';
import SampleMix from 'components/Research/SampleMix';
import approveSampleMix from 'actions/approveSampleMix';

const SampleMixContainer = connect(
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
			onApprove: samplingID => dispatch(approveSampleMix(samplingID))
			// addTodo: text => dispatch(addTodo(text)),
			// toggleTodo: id => dispatch(toggleTodo(id))
		};
	}
)(SampleMix);

export default SampleMixContainer;
