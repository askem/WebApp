import { connect } from 'react-redux';
import SamplingsList from 'components/Research/SamplingsList';
// import { addTodo, toggleTodo } from 'actions/testActions';

const SamplingsListContainer = connect(
	function mapStateToProps(state, ownProps) {
		const researchID = ownProps.params.researchID;
		let research = state.getIn(['data', 'researchCampaigns', researchID]);
		let samplings;
		if (research) {
			research = research.toJS();
			const samplingsIDs = research.samplings.map(s => s.toString());
			samplings = state.getIn(['data', 'samplings']).filter((v, k) => samplingsIDs.includes(k))
			.toList().toJS();
		}
		return {
			research,
			researchID,
			samplings
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			// addTodo: text => dispatch(addTodo(text)),
			// toggleTodo: id => dispatch(toggleTodo(id))
		};
	}
)(SamplingsList);

export default SamplingsListContainer;
