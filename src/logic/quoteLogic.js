import { createLogic } from 'redux-logic';
import nlp_compromise from 'nlp_compromise/src/index';

const reachInvalidationLogic = createLogic({
	type: [
		'REACH_ESTIMATE_EXPLICIT_FETCH',	// request a fetch explicitly, or any of the data changes:
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
	reachInvalidationLogic,
	imageSuggestionsLogic
];
