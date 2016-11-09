import { createLogic } from 'redux-logic';
import nlp_compromise from 'nlp_compromise/src/index';

const createQuoteLogic = createLogic({
	type: 'CREATE_NEW_QUOTE',
	process({ getState, action, api }, dispatch) {
		const quoteID = action.payload.quoteID;
		let quote = getState().getIn(['data', 'quote']);
		if (quote) {
			quote = quote.toJS();
		} else {
			quote = {};
		}
		dispatch({ type: 'CREATE_NEW_QUOTE_REQUEST_START' }, { allowMore: true });
		return api.createQuote(quoteID, quote)
		.then(() => {
			dispatch({ type: 'CREATE_NEW_QUOTE_REQUEST_SUCCESS' }, { allowMore: true });
		})
		.catch(error => dispatch({ type: 'CREATE_NEW_QUOTE_REQUEST_FAIL', payload: {
			error
		}, error: true }));
	}
});

const autoSaveLogic = createLogic({
	type: [
		'SET_QUOTE_DEMO_GENDER', 'TOGGLE_QUOTE_DEMO_AGE_GROUP',
		'ADD_QUOTE_AUDIENCE_PAGE', 'TOGGLE_QUOTE_AUDIENCE_PAGE_CONNECTED', 'REMOVE_QUOTE_AUDIENCE_PAGE',
		'ADD_QUOTE_AUDIENCE_INTEREST', 'REMOVE_QUOTE_AUDIENCE_INTEREST',
		'ADD_QUOTE_AUDIENCE_BEHAVIOR', 'REMOVE_QUOTE_AUDIENCE_BEHAVIOR',
		'ADD_QUOTE_QUESTION', 'DELETE_QUOTE_QUESTION',
		'FINISHED_EDITING_QUOTE_QUESTION_TEXT', 'SET_QUOTE_QUESTION_IMAGE',
		'ADD_QUOTE_POSSIBLE_ANSWER', 'DELETE_QUOTE_POSSIBLE_ANSWER', 'SET_QUOTE_POSSIBLE_ANSWER_TEXT',
		'SET_QUOTE_SAMPLE_SIZE'
	],
	process({ getState, action, api }, dispatch) {
		dispatch({type: 'AUTO_SAVE_QUOTE'});
	}
});

const updateQuoteLogic = createLogic({
	debounce: 2000,
	type: 'AUTO_SAVE_QUOTE',
	process({ getState, action, api }, dispatch) {
		const quoteID = getState().getIn(['data', 'lead', 'quoteID']);
		let quote = getState().getIn(['data', 'quote']);
		if (!quoteID || !quote) { return; }
		quote = quote.toJS();
		dispatch({ type: 'UPDATE_QUOTE_REQUEST_START' }, { allowMore: true });
		return api.updateQuote(quoteID, quote)
		.then(() => {
			console.info('Quote changes saved');
			dispatch({ type: 'UPDATE_QUOTE_REQUEST_SUCCESS' }, { allowMore: true });
		})
		.catch(error => {
			console.error(error);
			dispatch({ type: 'UPDATE_QUOTE_REQUEST_FAIL', payload: {
				error
			}, error: true });
		});
	}
});

const loadQuoteLogic = createLogic({
	type: 'LOAD_QUOTE',
	process({ getState, action, api }, dispatch) {
		const quoteID = action.payload.quoteID;
		dispatch({ type: 'LOAD_QUOTE_REQUEST_START' }, { allowMore: true });
		return api.getQuoteByID(quoteID)
		.then((quote) => {
			dispatch({
				type: 'LOAD_QUOTE_REQUEST_SUCCESS',
				payload: {
					quote
				}				
			}, { allowMore: true });
		})
		.catch(error => dispatch({ type: 'LOAD_QUOTE_REQUEST_FAIL', payload: {
			error
		}, error: true }));
	}
});

const reachInvalidationLogic = createLogic({
	type: [
		'REACH_ESTIMATE_EXPLICIT_FETCH',	// request a fetch explicitly, or any of the data changes:
		'LOAD_QUOTE_REQUEST_SUCCESS',
		'SET_QUOTE_DEMO_GENDER', 'TOGGLE_QUOTE_DEMO_AGE_GROUP',
		'ADD_QUOTE_AUDIENCE_PAGE', 'TOGGLE_QUOTE_AUDIENCE_PAGE_CONNECTED', 'REMOVE_QUOTE_AUDIENCE_PAGE',
		'ADD_QUOTE_AUDIENCE_INTEREST', 'REMOVE_QUOTE_AUDIENCE_INTEREST',
		'ADD_QUOTE_AUDIENCE_BEHAVIOR', 'REMOVE_QUOTE_AUDIENCE_BEHAVIOR'],
	latest: true,
	process({ getState, action, api }, dispatch) {
		let audience = getState().getIn(['data', 'quote', 'audience']);
		if (!audience) { return; }
		audience = audience.toJS();
		dispatch({ type: 'REACH_ESTIMATE_FETCH' }, { allowMore: true });
		return api.fetchReach(audience)
		.then(results => {
			dispatch({
				type: 'REACH_ESTIMATE_FETCH_SUCCESS',
				payload: {
					reach: results.size
				}
			});
		})
		.catch(error => dispatch({ type: 'REACH_ESTIMATE_FETCH_FAIL', payload: {
			error
		}, error: true }));
	}
});

const imageSuggestionsLogic = createLogic({
	type: 'FINISHED_EDITING_QUOTE_QUESTION_TEXT',
	latest: true,
	validate({ getState, action }, allow, reject) {
		const textValue = action.payload.textValue;
		const existing = getState().getIn(['data', 'imageSuggestions', textValue]);
		if (existing && !existing.get('loadingFail')) {
			reject(action);
		} else {
			allow(action);
		}
	},
	process({ getState, action, api }, dispatch) {
		const textValue = action.payload.textValue;
		const questionID = action.payload.questionID;
		const nouns = nlp_compromise.question(textValue).nouns().filter(n => n.tag === 'Noun');
		if (nouns.length === 0) {
			dispatch({ type: 'QUESTION_IMAGE_SUGGESTIONS_FAIL', payload: {
				textValue,
				error: 'No nouns found'
			}, error: true });
			return;
		}
		const searchTerm = nouns[0].text.replace('?', '').replace(' ', '+');
    	return fetch(`https://pixabay.com/api/?q=${searchTerm}&key=3553709-610c5bd2bedf89891b41caf1f&image_type=photo&min_width=1000&min_height=1000&per_page=5&safesearch=true`)
		.then(response => response.json())
		.then(results => {
			const suggestions = results.hits.map(hit => {
				const { previewURL, webformatURL, imageWidth, imageHeight, previewWidth } = hit;
				return {
					previewURL,
					previewWidth,
					width: imageWidth,
					height: imageHeight,
					imageURL: webformatURL
				}
			});
			dispatch({
				type: 'QUESTION_IMAGE_SUGGESTIONS_SUCCESS',
				payload: {
					questionID,
					textValue,
					searchTerm,
					suggestions
				}
			});
		})
	    .catch(error => dispatch({ type: 'QUESTION_IMAGE_SUGGESTIONS_FAIL', payload: {
			questionID,
			textValue,
			error
		}, error: true }));
	}
});

export default [
	createQuoteLogic,
	autoSaveLogic,
	updateQuoteLogic,
	loadQuoteLogic,
	reachInvalidationLogic,
	imageSuggestionsLogic
];
