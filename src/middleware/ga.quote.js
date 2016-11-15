const GAQuoteLogger = store => next => action => {
	let eventAction = action.type;
	let eventLabel = '';
	let eventValue;
	let sendEvent = true;
	switch (eventAction) {
		case 'SET_QUOTE_DEMO_GENDER':
			eventLabel = `${action.payload.gender}:${action.payload.value}`;
			break;
		case 'TOGGLE_QUOTE_DEMO_AGE_GROUP':
			eventLabel = `${action.payload.ageGroup}`;
			break;
		case 'ADD_QUOTE_AUDIENCE_PAGE', 'TOGGLE_QUOTE_AUDIENCE_PAGE_CONNECTED':
			eventLabel = action.payload.fbPage.facebookID;
			break;
		case 'REMOVE_QUOTE_AUDIENCE_PAGE':
			eventLabel = action.payload.pageIndex;
			break;
		case 'ADD_QUOTE_AUDIENCE_INTEREST':
			eventLabel = action.payload.interest.facebookID;
			break;
		case 'REMOVE_QUOTE_AUDIENCE_INTEREST':
			eventLabel = action.payload.interestIndex;
			break;
		case 'ADD_QUOTE_AUDIENCE_BEHAVIOR':
			eventLabel = action.payload.behavior.facebookID;
			break;
		case 'REMOVE_QUOTE_AUDIENCE_BEHAVIOR':
			eventLabel = action.payload.behaviorIndex;
			break;
		case 'ADD_QUOTE_QUESTION':
			break;
		case 'DELETE_QUOTE_QUESTION':
			eventLabel = action.payload.questionID;
			break;
		case 'SWAP_QUOTE_QUESTION':
			eventLabel = `${action.payload.oldIndex}->${action.payload.newIndex}`;
			break;
		case 'FINISHED_EDITING_QUOTE_QUESTION_TEXT':
			eventLabel = action.payload.questionID;
			break;
		case 'SET_QUOTE_QUESTION_IMAGE':
			eventLabel = action.payload.questionID;
			break;
		case 'UPLOAD_IMAGE_REQUEST_SUCCESS', 'UPLOAD_IMAGE_REQUEST_FAIL':
			break;
		case 'ADD_QUOTE_POSSIBLE_ANSWER':
			eventLabel = action.payload.questionID;
			break;
		case 'DELETE_QUOTE_POSSIBLE_ANSWER':
			eventLabel = `${action.payload.questionID},${action.payload.possibleAnswerID}`;
			break;
		case 'SET_QUOTE_POSSIBLE_ANSWER_TEXT':
			eventLabel = `${action.payload.questionID},${action.payload.possibleAnswerID}`;
			break;
		case 'SET_QUOTE_SAMPLE_SIZE':
			eventLabel = `${action.payload.sampleSize},${action.payload.moe}`;
			eventValue = action.payload.sampleSize;
			break;
		case 'FINISHED_EDITING_QUOTE_CONTACT_VALUE':
			eventLabel = `${action.payload.field}:${action.payload.value}`;
			break;
		case 'QUOTE_UI_ACTION':
		//'WIZARD_CLICK_STAGE', 'WIZARD_CLICK_NEXT',
		//'WIZARD_CLICK_SUBMIT', 'WIZARD_SUBMIT_MISSING_FIELDS',
		//'WIZARD_AFTER_SUBMIT_START_NEW'
			eventAction = action.payload.actionType;
			eventLabel = action.payload.metadata;
			break;
		default:
			sendEvent = false;
			break;
	}
	if (sendEvent) {
		//console.info('ANALYTICS: ', eventAction, eventLabel);
		try {
			ga('send', {
				hitType: 'event',
				eventCategory: 'GetQuote',
				eventAction,
				eventLabel,
				eventValue
			});
		} catch (e) { }
	}
	
	const result = next(action)
	return result
}

export default GAQuoteLogger;
