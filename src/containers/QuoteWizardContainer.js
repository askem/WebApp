import { connect } from 'react-redux';
import QuoteWizard from 'components/Quote/QuoteWizard';
import * as quoteActions from 'actions/quoteActions';

const QuoteWizardContainer = connect(
	function mapStateToProps(state, ownProps) {
		let demographics = state.getIn(['data', 'demographics']);
		if (demographics) { demographics = demographics.toJS(); }
		let surveyMetadata = state.getIn(['data', 'surveyMetadata']);
		if (surveyMetadata) { surveyMetadata = surveyMetadata.toJS(); }
		return {
			demographics,
			surveyMetadata
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			setQuoteDemoGender: (gender, value) => dispatch(quoteActions.setQuoteDemoGender(gender, value)),
			toggleQuoteDemoAgeGroup: group => dispatch(quoteActions.toggleQuoteDemoAgeGroup(group)),
			addQuoteQuestion: () => dispatch(quoteActions.addQuoteQuestion()),
			deleteQuoteQuestion: (questionID) => dispatch(quoteActions.deleteQuoteQuestion(questionID)),
			setQuoteQuestionText: (questionID, textValue) => dispatch(quoteActions.setQuoteQuestionText(questionID, textValue)),
			setQuoteQuestionImage: (questionID, mediaID) => dispatch(quoteActions.setQuoteQuestionImage(questionID, mediaID)),
			addQuotePossibleAnswer: (questionID) => dispatch(quoteActions.addQuotePossibleAnswer(questionID)),
			deleteQuotePossibleAnswer: (questionID, possibleAnswerID) => dispatch(quoteActions.deleteQuotePossibleAnswer(questionID, possibleAnswerID)),
			setQuotePossibleAnswerText: (questionID, possibleAnswerID, textValue) => dispatch(quoteActions.setQuotePossibleAnswerText(questionID, possibleAnswerID, textValue)),
		};
	}
)(QuoteWizard);

export default QuoteWizardContainer;
