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

export {
	setQuoteDemoGender, toggleQuoteDemoAgeGroup,
	addQuoteQuestion, deleteQuoteQuestion, setQuoteQuestionText, setQuoteQuestionImage,
	addQuotePossibleAnswer, deleteQuotePossibleAnswer, setQuotePossibleAnswerText
};
