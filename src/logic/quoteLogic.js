import { createLogic } from 'redux-logic';
import nlp_compromise from 'nlp_compromise/src/index';
import genGUID from 'utils/Askem/genGUID';
import blobURL from 'utils/Askem/blobURL';
import dataURIToBlob from 'utils/dataURIToBlob';
import { calculateAspectRatio, getImageData } from 'utils/imageUtils';

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
		const source = action.payload.source || 'quote.askem.com';
		dispatch({ type: 'CREATE_NEW_QUOTE_REQUEST_START' }, { allowMore: true });
		dispatch({ type: 'REACH_ESTIMATE_EXPLICIT_FETCH' }, { allowMore: true });
		return api.createQuote(quoteID, quote, source)
		.then(() => {
			localStorage.inProgressQuoteID = quoteID;
			dispatch({ type: 'CREATE_NEW_QUOTE_REQUEST_SUCCESS' }, { allowMore: true });
		})
		.catch(error => dispatch({ type: 'CREATE_NEW_QUOTE_REQUEST_FAIL', payload: {
			error
		}, error: true }));
	}
});

const newSubmissionLogic = createLogic({
	type: 'NEW_SUBMISSION',
	process({ getState, action, api }, dispatch) {
		const quoteID = genGUID();
		console.info(`Redirecting to new quote ${quoteID}`);
		window.history.pushState(null, '', `/${quoteID}`);
		dispatch({
			type: 'CREATE_NEW_QUOTE',
			payload: {
				quoteID,
				source: 'quote.askem.com:wizard/new submission'
			}
		});
	}
});

const autoSaveLogic = createLogic({
	type: [
		'SET_RESEARCH_OBJECTIVE',
		'TOGGLE_QUOTE_AUDIENCE_ATTRIBUTE',
		'SET_QUOTE_DEMO_GENDER', 'TOGGLE_QUOTE_DEMO_AGE_GROUP',
		'ADD_QUOTE_AUDIENCE_PAGE', 'TOGGLE_QUOTE_AUDIENCE_PAGE_CONNECTED', 'REMOVE_QUOTE_AUDIENCE_PAGE',
		'ADD_QUOTE_AUDIENCE_INTEREST', 'REMOVE_QUOTE_AUDIENCE_INTEREST',
		'ADD_QUOTE_AUDIENCE_BEHAVIOR', 'REMOVE_QUOTE_AUDIENCE_BEHAVIOR',
		'ADD_QUOTE_QUESTION', 'DELETE_QUOTE_QUESTION', 'SWAP_QUOTE_QUESTION',
		'FINISHED_EDITING_QUOTE_QUESTION_TEXT',
		'SET_QUOTE_QUESTION_IS_MULTI_ANSWER', 'SET_QUOTE_QUESTION_MIN_ANSWERS', 'SET_QUOTE_QUESTION_MAX_ANSWERS',
		'SET_QUOTE_QUESTION_AUTO_ARRANGEMENT',
		//'SET_QUOTE_QUESTION_IMAGE',
		'UPLOAD_IMAGE_REQUEST_SUCCESS',
		'UPLOAD_IMAGE_REQUEST_FAIL',	// If upload fails, still save as data
		'ADD_QUOTE_POSSIBLE_ANSWER', 'DELETE_QUOTE_POSSIBLE_ANSWER', 'SET_QUOTE_POSSIBLE_ANSWER_TEXT',
		'SET_QUOTE_POSSIBLE_ANSWER_LOCATION', 'SET_QUOTE_POSSIBLE_ANSWER_RANDOM_LOCATION', 'SET_QUOTE_POSSIBLE_ANSWER_CONNECTION', 'SET_QUOTE_POSSIBLE_ANSWER_MULTI_BEHAVIOR',
		'SET_QUOTE_SAMPLE_SIZE',
		'FINISHED_EDITING_QUOTE_CONTACT_VALUE',
		'ADD_CREATIVE_IMAGE', 'DELETE_CREATIVE_IMAGE',
		'ADD_CREATIVE_DESCRIPTION','UPDATE_CREATIVE_DESCRIPTION', 'DELETE_CREATIVE_DESCRIPTION',
		'ADD_CREATIVE_TEXT', 'UPDATE_CREATIVE_TEXT', 'DELETE_CREATIVE_TEXT',
		'ADD_CREATIVE_HEADLINE', 'UPDATE_CREATIVE_HEADLINE' ,'DELETE_CREATIVE_HEADLINE'

	],
	process({ getState, action, api }, dispatch) {
		dispatch({type: 'AUTO_SAVE_QUOTE'});
	}
});

const updateQuoteLogic = createLogic({
	debounce: 2000,
	latest: true,
	type: 'AUTO_SAVE_QUOTE',
	process({ getState, action, api }, dispatch) {
		const state = getState();
		if (state.getIn(['data', 'lead', 'submitInProgress']) ||
			state.getIn(['data', 'lead', 'submitSuccess']) ||
			state.getIn(['data', 'lead', 'submitFail'])) {
			return
		}
		const quoteID = getState().getIn(['data', 'lead', 'quoteID']);
		let quote = getState().getIn(['data', 'quote']);
		if (!quoteID || !quote) { return; }
		quote = quote.toJS();

		//removed dataURI from cropped object if exists
		//------------------------------------------------
		quote.surveyMetadata.questions.forEach(q => {
			if (q.croppedMetadata) {
				if (q.croppedMetadata.dataURI) {
					delete q.croppedMetadata.dataURI;
				}
			} 

			return q; 
		});
		//------------------------------------------------

		let contact = getState().getIn(['data', 'contact']);
		if (contact) { contact = contact.toJS(); } else { contact = {}; }
		dispatch({ type: 'UPDATE_QUOTE_REQUEST_START' }, { allowMore: true });
		return api.updateQuote(quoteID, quote, contact)
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

const uploadImageLogic = createLogic({
	type: 'SET_QUOTE_QUESTION_IMAGE',
	process({ getState, action, api }, dispatch) {
		const questionID = action.payload.questionID;
		const quoteID = getState().getIn(['data', 'lead', 'quoteID']);
		if (!quoteID) { return; }	
		const mediaID = action.payload.mediaID;
		if (!mediaID.startsWith('data:')) { return; }
		const blob = dataURIToBlob(mediaID);
		dispatch({ type: 'UPLOAD_IMAGE_REQUEST_START' }, { allowMore: true });
		return api.uploadFileForLead(blob, quoteID)
		.then(newMediaID => {
			// Preload image to make visual transition seamless
			const img = new Image();
			img.onload = (img) => {
				dispatch({
					type: 'UPLOAD_IMAGE_REQUEST_SUCCESS',
					payload: {
						originalMediaID: mediaID,
						newMediaID,
						questionID
					}
				});
			};
			img.src = blobURL(newMediaID);
		})
		.catch(error => {
			console.error(error);
			dispatch({ type: 'UPLOAD_IMAGE_REQUEST_FAIL', payload: {
				error
			}, error: true });
		});
	}
});

const uploadCreativeImageLogic = createLogic({
	type: 'ADD_CREATIVE_IMAGE',
	process({ getState, action, api }, dispatch) {
		const quoteID = getState().getIn(['data', 'lead', 'quoteID']);
		if (!quoteID) { return; }	
		const mediaID = action.payload.metadata.mediaID;
		const imageIndex = action.payload.index;

		if (!mediaID.startsWith('data:')) { return; }
		const blob = dataURIToBlob(mediaID);
		dispatch({ type: 'UPLOAD_CREATIVE_IMAGE_REQUEST_START' }, { allowMore: true });
		return api.uploadFileForLead(blob, quoteID)
		.then(newMediaID => {
			// Preload image to make visual transition seamless
			const img = new Image();
			img.onload = (img) => {
				dispatch({
					type: 'UPLOAD_CREATIVE_IMAGE_REQUEST_SUCCESS',
					payload: {
						mediaID:newMediaID,
						index:imageIndex
					}
				});
			};
			img.src = blobURL(newMediaID);
		})
		.catch(error => {
			console.error(error);
			dispatch({ type: 'UPLOAD_CREATIVE_IMAGE_REQUEST_FAIL', payload: {
				error
			}, error: true });
		});
	}
});

const submitQuoteLogic = createLogic({
	type: 'SUBMIT_LEAD',
	process({ getState, action, api }, dispatch) {
		const quoteID = getState().getIn(['data', 'lead', 'quoteID']);
		let quote = getState().getIn(['data', 'quote']);
		if (!quoteID || !quote) { return; }
		quote = quote.toJS();
		let contact = getState().getIn(['data', 'contact']);
		if (contact) { contact = contact.toJS(); } else { contact = {}; }
		dispatch({ type: 'SUBMIT_LEAD_REQUEST_START' }, { allowMore: true });
		return api.updateQuote(quoteID, quote, contact, '', true)
		.then(() => {
			localStorage.removeItem('inProgressQuoteID');
			dispatch({ type: 'SUBMIT_LEAD_REQUEST_SUCCESS' }, { allowMore: true });
		})
		.catch(error => {
			console.error(error);
			dispatch({ type: 'SUBMIT_LEAD_REQUEST_FAIL', payload: {
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
			if (quote.metadata.surveyMetadata.questions) {
				const promisesArr = quote.metadata.surveyMetadata.questions.map(q => {
					const uri = blobURL(q.mediaID);

					if (q.croppedMetadata) {
						const newMetadata = Object.assign({}, q.croppedMetadata, {dataURI : uri, questionID: q.questionID})
						return getImageData(newMetadata);
					}
					else {
						return Promise.resolve({ dataURI:uri, questionID: q.questionID });
					}
				});

				Promise
					.all(promisesArr)
					.then(values => {
						values.forEach(v => {
							if (quote.metadata.surveyMetadata.questions[v.questionID].croppedMetadata) {
								quote.metadata.surveyMetadata.questions[v.questionID].croppedMetadata.dataURI = v.dataURI;
							}							
						});

						dispatch({
							type: 'LOAD_QUOTE_REQUEST_SUCCESS',
							payload: {
								quote
							}
						}, { allowMore: true });

					})
					.catch(err => {
						console.error('quote.Logic.js -> loadQuoteLogic -> err', err);
						throw err;
					})
			}
			else {
				dispatch({
					type: 'LOAD_QUOTE_REQUEST_SUCCESS',
					payload: {
						quote
					}
				}, { allowMore: true });
			}
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
		'TOGGLE_QUOTE_AUDIENCE_ATTRIBUTE',
		'SET_QUOTE_DEMO_GENDER', 'TOGGLE_QUOTE_DEMO_AGE_GROUP',
		'ADD_QUOTE_AUDIENCE_PAGE', 'TOGGLE_QUOTE_AUDIENCE_PAGE_CONNECTED', 'REMOVE_QUOTE_AUDIENCE_PAGE',
		'ADD_QUOTE_AUDIENCE_INTEREST', 'REMOVE_QUOTE_AUDIENCE_INTEREST',
		'ADD_QUOTE_AUDIENCE_BEHAVIOR', 'REMOVE_QUOTE_AUDIENCE_BEHAVIOR'],
	latest: true,
	process({ getState, action, api }, dispatch) {
		let audience = getState().getIn(['data', 'quote', 'audience']);
		if (!audience) { return; }
		audience = audience.toJS();
		// automatically fetch cost estimate
		// if (api.loggedIn()) {
		// 	dispatch({ type: 'GET_COST_ESTIMATE' }, { allowMore: true });
		// }
		dispatch({ type: 'INVALIDATE_COST_ESTIMATE' }, { allowMore: true });
		dispatch({ type: 'REACH_ESTIMATE_FETCH' }, { allowMore: true });
		return api.fetchReach(audience)
		.then(results => {
			dispatch({
				type: 'REACH_ESTIMATE_FETCH_SUCCESS',
				payload: {
					reach: results.size
				}
			}, { allowMore: true });

		})
		.catch(error => dispatch({ type: 'REACH_ESTIMATE_FETCH_FAIL', payload: {
			error
		}, error: true }));
	}
});

const fetchCostEstimateLogic = createLogic({
	type: 'GET_COST_ESTIMATE',
	latest: true,
	process({ getState, action, api }, dispatch) {
		if (!api.loggedIn()) { return; }
		let audience = getState().getIn(['data', 'quote', 'audience']);
		if (!audience) { return; }
		audience = audience.toJS();
		dispatch({ type: 'COST_ESTIMATE_FETCH' }, { allowMore: true });
		return api.tempFetchAllCostEstimates(audience)
			.then(estimates => {
				dispatch({ type: 'COST_ESTIMATE_FETCH_SUCCESS', payload: { estimates } }, { allowMore: true });
			}).catch(error => dispatch({ type: 'COST_ESTIMATE_FETCH_FAIL', payload: {
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
	newSubmissionLogic,
	autoSaveLogic,
	updateQuoteLogic,
	submitQuoteLogic,
	loadQuoteLogic,
	uploadImageLogic,
	reachInvalidationLogic,
	fetchCostEstimateLogic,
	imageSuggestionsLogic,
	uploadCreativeImageLogic
];
