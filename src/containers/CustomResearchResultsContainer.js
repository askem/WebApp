import { connect } from 'react-redux';
import CustomResearchResults from 'components/Research/Results/CustomResearchResults';

const segmentsToMap = segments => {
	let segmentsMap = new Map();
	segments.forEach(segment => {
		segment.attributes.forEach(attr => {
			let typeMap = segmentsMap.get(attr.type) || new Map();
			let valueSet = typeMap.get(attr.value) || new Set()
			valueSet.add(segment.ID);
			typeMap.set(attr.value, valueSet);
			segmentsMap.set(attr.type, typeMap);
		});
	});
	return segmentsMap;
};

const CustomResearchResultsContainer = connect(
	function mapStateToProps(state, ownProps) {
		const surveyID = ownProps.params.surveyID;
		let survey = state.getIn(['results', surveyID, 'survey']);
		if (survey) { survey = survey.toJS(); }
		let answers = state.getIn(['results', surveyID, 'results', 'answers']);
		if (answers) { answers = answers.toJS(); }
		let segmentsMap;
		let segments = state.getIn(['results', surveyID, 'results', 'segments']);
		if (segments) {
			segments = segments.toJS();
			segmentsMap = segmentsToMap(segments);
		}
		return {
			survey,
			answers,
			segmentsMap
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
		};
	}
)(CustomResearchResults);

export default CustomResearchResultsContainer;
