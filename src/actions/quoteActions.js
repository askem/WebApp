/* Audience */
const requestReach = () => {
	return {
		type: 'REACH_ESTIMATE_EXPLICIT_FETCH'
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

const setQuoteQuestionText = (questionID, textValue) => {
	return {
		type: 'SET_QUOTE_QUESTION_TEXT',
		payload: {
			questionID,
			textValue
		}
	}
}

const finishedEditingQText = (questionID, textValue) => {
	return {
		type: 'FINISHED_EDITING_QUOTE_QUESTION_TEXT',
		payload: {
			questionID,
			textValue
		}
	}
}

const setQuoteQuestionImage = (questionID, mediaID) => {
	return {
		type: 'SET_QUOTE_QUESTION_IMAGE',
		payload: {
			questionID,
			mediaID
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

const setQuotePossibleAnswerText = (questionID, possibleAnswerID, textValue) => {
	return {
		type: 'SET_QUOTE_POSSIBLE_ANSWER_TEXT',
		payload: {
			questionID,
			possibleAnswerID,
			textValue
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

export {
	requestReach,
	setQuoteDemoGender, toggleQuoteDemoAgeGroup,
	addQuoteAudiencePage, toggleQuoteAudiencePageConnected, removeQuoteAudiencePage,
	addQuoteAudienceInterest, removeQuoteAudienceInterest,
	addQuoteAudienceBehavior, removeQuoteAudienceBehavior,
	addQuoteQuestion, deleteQuoteQuestion, swapQuoteQuestions, setQuoteQuestionText, finishedEditingQText, setQuoteQuestionImage,
	addQuotePossibleAnswer, deleteQuotePossibleAnswer, setQuotePossibleAnswerText,
	setQuoteSampleSize,
	setQuoteContactValue, finishedEditingContactValue,
	submitLead, closeSuccessSubmitLead, newSubmission, cancelFailedSubmitLead,
	quoteUIAction
};
