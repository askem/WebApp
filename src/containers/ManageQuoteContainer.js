import { connect } from 'react-redux';
import ManageQuote from 'components/Quote/Admin/ManageQuote';
import * as quoteActions from 'actions/quoteActions';

const ManageQuoteContainer = connect(
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
		let costEstimate = state.getIn(['data', 'quote', 'costEstimate']);
		if (costEstimate) { costEstimate = costEstimate.toJS(); }
		let lead = state.getIn(['data', 'lead']);
		if (lead) { lead = lead.toJS(); }
		let contact = state.getIn(['data', 'contact']);
		if (contact) { contact = contact.toJS(); }
		let researchObjective = state.getIn(['data', 'quote', 'researchObjective']);
		if (researchObjective) { researchObjective = researchObjective.toJS(); }
		let researchCampaign = state.getIn(['data', 'quote', 'researchCampaign']);
		if (researchCampaign) { researchCampaign = researchCampaign.toJS(); }
		let surveyID = state.getIn(['data', 'quote', 'surveyID']);
		let sampleID = state.getIn(['data', 'quote', 'sampleID']);

		return {
			lead,
			audience,
			surveyMetadata,
			sample,
			imageSuggestions,
			reachEstimate,
			costEstimate,
			contact,
			researchObjective,
			researchCampaign,
			surveyID,
			sampleID
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			requestReach: () => dispatch(quoteActions.requestReach()),
			toggleQuoteAudienceAttribute: (attributeType, attribute) => dispatch(quoteActions.toggleQuoteAudienceAttribute(attributeType, attribute)),
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
			swapQuoteQuestions: (oldIndex, newIndex) => dispatch(quoteActions.swapQuoteQuestions(oldIndex, newIndex)),
			setQuoteQuestionText: (questionID, textValue, variantID) => dispatch(quoteActions.setQuoteQuestionText(questionID, textValue, variantID)),
			finishedEditingQText: (questionID, textValue, variantID) => dispatch(quoteActions.finishedEditingQText(questionID, textValue, variantID)),
			setQuoteQuestionImage: (questionID, mediaID, variantID) => dispatch(quoteActions.setQuoteQuestionImage(questionID, mediaID, variantID)),
			addQuotePossibleAnswer: (questionID) => dispatch(quoteActions.addQuotePossibleAnswer(questionID)),
			deleteQuotePossibleAnswer: (questionID, possibleAnswerID) => dispatch(quoteActions.deleteQuotePossibleAnswer(questionID, possibleAnswerID)),
			setQuotePossibleAnswerText: (questionID, possibleAnswerID, textValue, variantID) => dispatch(quoteActions.setQuotePossibleAnswerText(questionID, possibleAnswerID, textValue, variantID)),
			setQuoteSampleSize: (sampleSize, moe) => dispatch(quoteActions.setQuoteSampleSize(sampleSize, moe)),
			setQuoteContactValue: (field, value) => dispatch(quoteActions.setQuoteContactValue(field, value)),
			finishedEditingContactValue: (field, value) => dispatch(quoteActions.finishedEditingContactValue(field, value)),
			submitLead: () => dispatch(quoteActions.submitLead()),
			newSubmission: () => dispatch(quoteActions.newSubmission()),
			closeSuccessSubmitLead: () => dispatch(quoteActions.closeSuccessSubmitLead()),
			cancelFailedSubmitLead: () => dispatch(quoteActions.cancelFailedSubmitLead()),
			quoteUIAction: (actionType, metadata) => dispatch(quoteActions.quoteUIAction(actionType, metadata)),
			updateCreativeHeadline: (index, text) => dispatch(quoteActions.updateCreativeHeadline(index, text)),
			addCreativeHeadline : () => dispatch(quoteActions.addCreativeHeadline()), 
			deleteCreativeHeadline : (index) => dispatch(quoteActions.deleteCreativeHeadline(index)),
			addCreativeText : () => dispatch(quoteActions.addCreativeText()), 
			updateCreativeText: (index, text) => dispatch(quoteActions.updateCreativeText(index, text)),
			deleteCreativeText : (index) => dispatch(quoteActions.deleteCreativeText(index)),
			addCreativeDescription : () => dispatch(quoteActions.addCreativeDescription()), 
			updateCreativeDescription: (index, text) => dispatch(quoteActions.updateCreativeDescription(index, text)),
			deleteCreativeDescription : (index) => dispatch(quoteActions.deleteCreativeDescription(index)),
			addCreativeImage : (index, metadata, croppedImage) => dispatch(quoteActions.addCreativeImage(index, metadata, croppedImage)),
			deleteCreativeImage : (index, key) => dispatch(quoteActions.deleteCreativeImage(index, key)),
			replaceImageCarouselInSet : (setIndex, imageIndex, metadata) => dispatch(quoteActions.replaceImageCarouselInSet(setIndex, imageIndex, metadata)),
			addNewSet : (totalPossibleAnswers) => dispatch(quoteActions.addNewSet(totalPossibleAnswers)),
			deleteCarousel : (setIndex) => dispatch(quoteActions.deleteCarousel(setIndex)),
			addNewDescriptionInCarousels: () => dispatch(quoteActions.addNewDescriptionInCarousels()),
			updateCarouselDescription : (index, text) => dispatch(quoteActions.updateCarouselDescription(index, text)),
			deleteCarouselDescription : (index) => dispatch(quoteActions.deleteCarouselDescription(index)),
			setResearchCampaignData : (researchCampaignID, campaignName, campaignDescription, sampleID, surveyID) => dispatch(quoteActions.setResearchCampaignData(researchCampaignID, campaignName, campaignDescription, sampleID, surveyID)),
			setSurveyID : (surveyID) => dispatch(quoteActions.setSurveyID(surveyID)),

			/* Advanced */
			addQuestionVariant: (questionID, duplicateVariantID) => dispatch(quoteActions.addQuestionVariant(questionID, duplicateVariantID)),
			deleteQuestionVariant: (questionID, variantID) => dispatch(quoteActions.deleteQuestionVariant(questionID, variantID)),
			requestCostEstimates: () => dispatch(quoteActions.requestCostEstimates()),
			setQuoteQuestionIsMultiAnswer: (questionID, isMultiAnswer) => dispatch(quoteActions.setQuoteQuestionIsMultiAnswer(questionID, isMultiAnswer)),
			setQuoteQuestionMinAnswers: (questionID, minAnswers) => dispatch(quoteActions.setQuoteQuestionMinAnswers(questionID, minAnswers)),
			setQuoteQuestionMaxAnswers: (questionID, maxAnswers) => dispatch(quoteActions.setQuoteQuestionMaxAnswers(questionID, maxAnswers)),
			setQuoteQuestionAutoArrangement: (questionID, autoArrangement, variantID) => dispatch(quoteActions.setQuoteQuestionAutoArrangement(questionID, autoArrangement, variantID)),
			setQuotePossibleAnswerRandomLocation: (questionID, possibleAnswerID, randomLocation) => dispatch(quoteActions.setQuotePossibleAnswerRandomLocation(questionID, possibleAnswerID, randomLocation)),
			setQuotePossibleAnswerConnection: (questionID, possibleAnswerID, entity) => dispatch(quoteActions.setQuotePossibleAnswerConnection(questionID, possibleAnswerID, entity)),
			setQuotePossibleAnswerMultiBehavior: (questionID, possibleAnswerID, multiBehavior) => dispatch(quoteActions.setQuotePossibleAnswerMultiBehavior(questionID, possibleAnswerID, multiBehavior)),
			setQuotePossibleAnswerLocation: (questionID, possibleAnswerID, location, variantID) => dispatch(quoteActions.setQuotePossibleAnswerLocation(questionID, possibleAnswerID, location, variantID)),
		};
	}
)(ManageQuote);

export default ManageQuoteContainer;
