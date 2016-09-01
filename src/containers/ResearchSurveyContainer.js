import { connect } from 'react-redux';
import ResearchSurvey from 'components/Research/ResearchSurvey';
import questionFromTemplate from 'utils/Askem/questionFromTemplate';

const ResearchSurveyContainer = connect(
	function mapStateToProps(state, ownProps) {
		const researchID = ownProps.params.researchID;
		let research = state.getIn(['data', 'researchCampaigns', researchID]);
		let survey = state.getIn(['data', 'model', 'survey']);

		let questions = {};
		if (research && survey) {
			research = research.toJS();
			survey = survey.toJS();

			const vars = state.getIn(['data', 'model', 'variables']).toJS();
			const researchVarValues = state.getIn(['data', 'researchCampaigns', researchID, 'modelData', 'variableValues']).toJS();
			const valueFinder = v => {
				let value = researchVarValues.find(val => val.id === v.id);
				if (value) { value = value.value; }
				return value;
			};
			const varValues = vars.map(valueFinder);

			survey.questions.forEach(q => {
				questions[q.questionID] = questionFromTemplate(q, vars, varValues);
			});

			const entitiesToMap = ar => {
				let map = {};
				for (let idx in ar) {
					const entity = ar[idx];
					map[entity.ID] = entity.destination;
				}
				return map;
			};
			survey.connections.possibleAnswers = entitiesToMap(survey.connections.possibleAnswers);
			survey.connections.questionSets = entitiesToMap(survey.connections.questionSets);
			survey.connections.questions = entitiesToMap(survey.connections.questions);
		}
		return {
			research,
			researchID,
			survey,
			questions
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			//onApprove: samplingID => dispatch(approveSampleMix(samplingID))
		};
	}
)(ResearchSurvey);

export default ResearchSurveyContainer;
