import { connect } from 'react-redux';
import QuoteWizard from 'components/Quote/QuoteWizard';
import * as quoteActions from 'actions/quoteActions';

const QuoteWizardContainer = connect(
	function mapStateToProps(state, ownProps) {
		let audience = state.getIn(['data', 'quote', 'audience']);
		if (audience) { audience = audience.toJS(); }
		let surveyMetadata = state.getIn(['data', 'quote', 'surveyMetadata']);
		if (surveyMetadata) { surveyMetadata = surveyMetadata.toJS(); }
		let sample = state.getIn(['data', 'quote', 'sample']);
		if (sample) { sample = sample.toJS(); }
		return {
			audience,
			demographics: audience.demographics,
			surveyMetadata,
			sample
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			setQuoteDemoGender: (gender, value) => dispatch(quoteActions.setQuoteDemoGender(gender, value)),
			toggleQuoteDemoAgeGroup: group => dispatch(quoteActions.toggleQuoteDemoAgeGroup(group)),
			addQuoteAudiencePage: fbPage => dispatch(quoteActions.addQuoteAudiencePage(fbPage)),
			toggleQuoteAudiencePageConnected: pageIndex => dispatch(quoteActions.toggleQuoteAudiencePageConnected(pageIndex)),
			removeQuoteAudiencePage: pageIndex => dispatch(quoteActions.removeQuoteAudiencePage(pageIndex)),
			addQuoteAudienceInterest: interest => dispatch(quoteActions.addQuoteAudienceInterest(interest)),
			removeQuoteAudienceInterest: interestIndex => dispatch(quoteActions.removeQuoteAudienceInterest(interestIndex)),
			addQuoteQuestion: () => dispatch(quoteActions.addQuoteQuestion()),
			deleteQuoteQuestion: (questionID) => dispatch(quoteActions.deleteQuoteQuestion(questionID)),
			setQuoteQuestionText: (questionID, textValue) => dispatch(quoteActions.setQuoteQuestionText(questionID, textValue)),
			setQuoteQuestionImage: (questionID, mediaID) => dispatch(quoteActions.setQuoteQuestionImage(questionID, mediaID)),
			addQuotePossibleAnswer: (questionID) => dispatch(quoteActions.addQuotePossibleAnswer(questionID)),
			deleteQuotePossibleAnswer: (questionID, possibleAnswerID) => dispatch(quoteActions.deleteQuotePossibleAnswer(questionID, possibleAnswerID)),
			setQuotePossibleAnswerText: (questionID, possibleAnswerID, textValue) => dispatch(quoteActions.setQuotePossibleAnswerText(questionID, possibleAnswerID, textValue)),
			setQuoteSampleSize: (sampleSize) => dispatch(quoteActions.setQuoteSampleSize(sampleSize)),
		};
	}
)(QuoteWizard);

export default QuoteWizardContainer;
