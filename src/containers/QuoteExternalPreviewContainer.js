import { connect } from 'react-redux';
import ExternalSurveyPreview from 'components/Quote/Preview/ExternalSurveyPreview';
import leadMetadataToSurvey from 'utils/Askem/leadMetadataToSurvey';

const QuoteExternalPreviewContainer = connect(
	function mapStateToProps(state, ownProps) {
		let surveyMetadata = state.getIn(['data', 'quote', 'surveyMetadata']);
		let survey, questions;
		if (surveyMetadata) {
			surveyMetadata = surveyMetadata.toJS();
			survey = leadMetadataToSurvey(surveyMetadata);
			questions = survey.questions;
		}
		let lead = state.getIn(['data', 'lead']);
		if (lead) { lead = lead.toJS(); }
		return {
			lead,
			surveyMetadata,
			survey,
			questions
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
		};
	}
)(ExternalSurveyPreview);

export default QuoteExternalPreviewContainer;
