/* Audience */
const requestReach = () => {
	return {
		type: 'REACH_ESTIMATE_EXPLICIT_FETCH'
	};
};

const requestCostEstimates = () => {
	return {
		type: 'GET_COST_ESTIMATE'
	};
};

const toggleQuoteAudienceAttribute = (attributeType, attribute) => {
	return {
		type: 'TOGGLE_QUOTE_AUDIENCE_ATTRIBUTE',
		payload: {
			attributeType,
			attribute
		}
	};
};

const setQuoteDemoGender = (gender, value) => {
	return {
		type: 'SET_QUOTE_DEMO_GENDER',
		payload: {
			gender,
			value
		}
	}
}

const toggleQuoteDemoAgeGroup = (ageGroup) => {
	return {
		type: 'TOGGLE_QUOTE_DEMO_AGE_GROUP',
		payload: {
			ageGroup
		}
	}
}

const addQuoteAudiencePage = (fbPage) => {
	return {
		type: 'ADD_QUOTE_AUDIENCE_PAGE',
		payload: {
			fbPage
		}
	}
}

const toggleQuoteAudiencePageConnected = (pageIndex) => {
	return {
		type: 'TOGGLE_QUOTE_AUDIENCE_PAGE_CONNECTED',
		payload: {
			pageIndex
		}
	}
}

const removeQuoteAudiencePage = (pageIndex) => {
	return {
		type: 'REMOVE_QUOTE_AUDIENCE_PAGE',
		payload: {
			pageIndex
		}
	}
}

const addQuoteAudienceInterest = (interest) => {
	return {
		type: 'ADD_QUOTE_AUDIENCE_INTEREST',
		payload: {
			interest
		}
	}
}

const removeQuoteAudienceInterest = (interestIndex) => {
	return {
		type: 'REMOVE_QUOTE_AUDIENCE_INTEREST',
		payload: {
			interestIndex
		}
	}
}

const addQuoteAudienceBehavior = (behavior) => {
	return {
		type: 'ADD_QUOTE_AUDIENCE_BEHAVIOR',
		payload: {
			behavior
		}
	}
}

const removeQuoteAudienceBehavior = (behaviorIndex) => {
	return {
		type: 'REMOVE_QUOTE_AUDIENCE_BEHAVIOR',
		payload: {
			behaviorIndex
		}
	}
}

/* Survey */
const addQuoteQuestion = () => {
	return {
		type: 'ADD_QUOTE_QUESTION'
	}
}

const deleteQuoteQuestion = (questionID) => {
	return {
		type: 'DELETE_QUOTE_QUESTION',
		payload: {
			questionID
		}
	}
}

const swapQuoteQuestions = (oldIndex, newIndex) => {
	return {
		type: 'SWAP_QUOTE_QUESTION',
		payload: {
			oldIndex,
			newIndex
		}
	}
}

const setQuoteQuestionText = (questionID, textValue, variantID) => {
	return {
		type: 'SET_QUOTE_QUESTION_TEXT',
		payload: {
			questionID,
			textValue,
			variantID
		}
	}
}

const setQuoteQuestionIsMultiAnswer = (questionID, isMultiAnswer) => {
	return {
		type: 'SET_QUOTE_QUESTION_IS_MULTI_ANSWER',
		payload: {
			questionID,
			isMultiAnswer
		}
	}
}

const setQuoteQuestionAutoArrangement = (questionID, autoArrangement, variantID) => {
	return {
		type: 'SET_QUOTE_QUESTION_AUTO_ARRANGEMENT',
		payload: {
			questionID,
			autoArrangement,
			variantID
		}
	}
}

const setQuoteQuestionMinAnswers = (questionID, minAnswers) => {
	return {
		type: 'SET_QUOTE_QUESTION_MIN_ANSWERS',
		payload: {
			questionID,
			minAnswers
		}
	}
}

const setQuoteQuestionMaxAnswers = (questionID, maxAnswers) => {
	return {
		type: 'SET_QUOTE_QUESTION_MAX_ANSWERS',
		payload: {
			questionID,
			maxAnswers
		}
	}
}

const finishedEditingQText = (questionID, textValue, variantID) => {
	return {
		type: 'FINISHED_EDITING_QUOTE_QUESTION_TEXT',
		payload: {
			questionID,
			textValue,
			variantID
		}
	}
}

const setQuoteQuestionImage = (questionID, mediaID, variantID) => {
	return {
		type: 'SET_QUOTE_QUESTION_IMAGE',
		payload: {
			questionID,
			mediaID,
			variantID
		}
	}
}

const addQuotePossibleAnswer = (questionID) => {
	return {
		type: 'ADD_QUOTE_POSSIBLE_ANSWER',
		payload: {
			questionID
		}
	}
}

const deleteQuotePossibleAnswer = (questionID, possibleAnswerID) => {
	return {
		type: 'DELETE_QUOTE_POSSIBLE_ANSWER',
		payload: {
			questionID,
			possibleAnswerID
		}
	}
}

const setQuotePossibleAnswerText = (questionID, possibleAnswerID, textValue, variantID) => {
	return {
		type: 'SET_QUOTE_POSSIBLE_ANSWER_TEXT',
		payload: {
			questionID,
			possibleAnswerID,
			textValue,
			variantID
		}
	}
}

const setQuotePossibleAnswerLocation = (questionID, possibleAnswerID, location, variantID) => {
	return {
		type: 'SET_QUOTE_POSSIBLE_ANSWER_LOCATION',
		payload: {
			questionID,
			possibleAnswerID,
			location,
			variantID
		}
	}
}

const setQuotePossibleAnswerRandomLocation = (questionID, possibleAnswerID, randomLocation) => {
	return {
		type: 'SET_QUOTE_POSSIBLE_ANSWER_RANDOM_LOCATION',
		payload: {
			questionID,
			possibleAnswerID,
			randomLocation
		}
	}
}

const setQuotePossibleAnswerConnection = (questionID, possibleAnswerID, entity) => {
	return {
		type: 'SET_QUOTE_POSSIBLE_ANSWER_CONNECTION',
		payload: {
			questionID,
			possibleAnswerID,
			entity
		}
	}
}

const addQuestionVariant = (questionID, duplicateVariantID) => {
	return {
		type: 'ADD_QUESTION_VARIANT',
		payload: {
			questionID,
			duplicateVariantID
		}
	}
}

const deleteQuestionVariant = (questionID, variantID) => {
	return {
		type: 'DELETE_QUESTION_VARIANT',
		payload: {
			questionID,
			variantID
		}
	}
}

const setQuotePossibleAnswerMultiBehavior = (questionID, possibleAnswerID, multiBehavior) => {
	return {
		type: 'SET_QUOTE_POSSIBLE_ANSWER_MULTI_BEHAVIOR',
		payload: {
			questionID,
			possibleAnswerID,
			multiBehavior
		}
	}
}

const setQuoteSampleSize = (sampleSize, moe) => {
	return {
		type: 'SET_QUOTE_SAMPLE_SIZE',
		payload: {
			sampleSize,
			moe
		}
	}
}

const setQuoteContactValue = (field, value) => {
	return {
		type: 'SET_QUOTE_CONTACT_VALUE',
		payload: {
			field,
			value
		}
	}
}

const finishedEditingContactValue = (field, value) => {
	return {
		type: 'FINISHED_EDITING_QUOTE_CONTACT_VALUE',
		payload: {
			field,
			value
		}
	}
}

const submitLead = () => {
	return {
		type: 'SUBMIT_LEAD'
	}
}

const closeSuccessSubmitLead = () => {
	return {
		type: 'SUBMIT_LEAD_CLOSE_SUCCESS'
	}
}

const newSubmission = () => {
	return {
		type: 'NEW_SUBMISSION'
	}
}


const cancelFailedSubmitLead = () => {
	return {
		type: 'SUBMIT_LEAD_CANCEL_FAILED'
	}
}

// Generic action for reporting UI events. Caought by analytics logger
const quoteUIAction = (actionType, metadata = '') => {
	return {
		type: 'QUOTE_UI_ACTION',
		payload: {
			actionType,
			metadata
		}
	}
}

const setResearchObjective = (researchId, description, title) => {
	return {
		type : 'SET_RESEARCH_OBJECTIVE',
		payload : {
			researchId,
			description
    }
  }
}

const toggleCollapsablePanel = (actionType, eventData) => {
	return {
		type : 'TOGGLE_COLLAPSABLE_PANEL',
		payload : {
				actionType,
				eventData
		}
	}
}

export {
	requestReach, requestCostEstimates,
	toggleQuoteAudienceAttribute,
	setQuoteDemoGender, toggleQuoteDemoAgeGroup,
	addQuoteAudiencePage, toggleQuoteAudiencePageConnected, removeQuoteAudiencePage,
	addQuoteAudienceInterest, removeQuoteAudienceInterest,
	addQuoteAudienceBehavior, removeQuoteAudienceBehavior,
	addQuoteQuestion, deleteQuoteQuestion, swapQuoteQuestions, setQuoteQuestionText,
	setQuoteQuestionIsMultiAnswer, setQuoteQuestionMinAnswers, setQuoteQuestionMaxAnswers,
	setQuoteQuestionAutoArrangement,
	finishedEditingQText, setQuoteQuestionImage,
	addQuotePossibleAnswer, deleteQuotePossibleAnswer, setQuotePossibleAnswerText,
	setQuotePossibleAnswerLocation, setQuotePossibleAnswerRandomLocation, setQuotePossibleAnswerConnection, setQuotePossibleAnswerMultiBehavior,
	addQuestionVariant, deleteQuestionVariant,
	setQuoteSampleSize,
	setQuoteContactValue, finishedEditingContactValue,
	submitLead, closeSuccessSubmitLead, newSubmission, cancelFailedSubmitLead,
	quoteUIAction,
	setResearchObjective,
	toggleCollapsablePanel,
};
