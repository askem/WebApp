import { createLogic } from 'redux-logic';
import nlp_compromise from 'nlp_compromise/src/index';

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
	imageSuggestionsLogic
];
