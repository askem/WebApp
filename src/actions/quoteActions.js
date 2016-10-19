/* Audience */
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
		type: 'SET_QUOTE_POSSIBLE_ANSER_TEXT',
		payload: {
			questionID,
			possibleAnswerID,
			textValue
		}
	}
}

const setQuoteSampleSize = (sampleSize) => {
	return {
		type: 'SET_QUOTE_SAMPLE_SIZE',
		payload: {
			sampleSize
		}
	}
}

export {
	setQuoteDemoGender, toggleQuoteDemoAgeGroup,
	addQuoteAudiencePage, toggleQuoteAudiencePageConnected, removeQuoteAudiencePage,
	addQuoteAudienceInterest, removeQuoteAudienceInterest,
	addQuoteQuestion, deleteQuoteQuestion, setQuoteQuestionText, finishedEditingQText, setQuoteQuestionImage,
	addQuotePossibleAnswer, deleteQuotePossibleAnswer, setQuotePossibleAnswerText,
	setQuoteSampleSize
};
