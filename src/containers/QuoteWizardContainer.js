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
		let imageSuggestions = state.getIn(['data', 'imageSuggestions']);
		if (imageSuggestions) { imageSuggestions = imageSuggestions.toJS(); }
		let reachEstimate = state.getIn(['data', 'quote', 'reachEstimate']);
		if (reachEstimate) { reachEstimate = reachEstimate.toJS(); }
		return {
			audience,
			demographics: audience.demographics,
			surveyMetadata,
			sample,
			imageSuggestions,
			reachEstimate
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			requestReach: () => dispatch(quoteActions.requestReach()),
			setQuoteDemoGender: (gender, value) => dispatch(quoteActions.setQuoteDemoGender(gender, value)),
			toggleQuoteDemoAgeGroup: group => dispatch(quoteActions.toggleQuoteDemoAgeGroup(group)),
			addQuoteAudiencePage: fbPage => dispatch(quoteActions.addQuoteAudiencePage(fbPage)),
			toggleQuoteAudiencePageConnected: pageIndex => dispatch(quoteActions.toggleQuoteAudiencePageConnected(pageIndex)),
			removeQuoteAudiencePage: pageIndex => dispatch(quoteActions.removeQuoteAudiencePage(pageIndex)),
			addQuoteAudienceInterest: interest => dispatch(quoteActions.addQuoteAudienceInterest(interest)),
			removeQuoteAudienceInterest: interestIndex => dispatch(quoteActions.removeQuoteAudienceInterest(interestIndex)),
			addQuoteAudienceBehavior: behavior => dispatch(quoteActions.addQuoteAudienceBehavior(behavior)),
			removeQuoteAudienceBehavior: behaviorIndex => dispatch(quoteActions.removeQuoteAudienceBehavior(behaviorIndex)),
			addQuoteQuestion: () => dispatch(quoteActions.addQuoteQuestion()),
			deleteQuoteQuestion: (questionID) => dispatch(quoteActions.deleteQuoteQuestion(questionID)),
			setQuoteQuestionText: (questionID, textValue) => dispatch(quoteActions.setQuoteQuestionText(questionID, textValue)),
			finishedEditingQText: (questionID, textValue) => dispatch(quoteActions.finishedEditingQText(questionID, textValue)),
			setQuoteQuestionImage: (questionID, mediaID) => dispatch(quoteActions.setQuoteQuestionImage(questionID, mediaID)),
			addQuotePossibleAnswer: (questionID) => dispatch(quoteActions.addQuotePossibleAnswer(questionID)),
			deleteQuotePossibleAnswer: (questionID, possibleAnswerID) => dispatch(quoteActions.deleteQuotePossibleAnswer(questionID, possibleAnswerID)),
			setQuotePossibleAnswerText: (questionID, possibleAnswerID, textValue) => dispatch(quoteActions.setQuotePossibleAnswerText(questionID, possibleAnswerID, textValue)),
			setQuoteSampleSize: (sampleSize, moe) => dispatch(quoteActions.setQuoteSampleSize(sampleSize, moe)),
		};
	}
)(QuoteWizard);

export default QuoteWizardContainer;
