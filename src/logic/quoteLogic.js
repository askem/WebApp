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
		'ADD_CREATIVE_HEADLINE', 'UPDATE_CREATIVE_HEADLINE' ,'DELETE_CREATIVE_HEADLINE',
		'DELETE_CAROUSEL', 'UPLOAD_CAROUSEL_CREATIVE_IMAGE_REQUEST_SUCCESS', 'UPDATE_CAROUSEL_DESCRIPTION', 'DELETE_CAROUSEL_DESCRIPTION',
		'SET_RESEARCH_CAMPAIGN_DATA', 'SET_SURVEYID'

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

		// do not save the cropped images to DB
		delete quote.surveyMetadata.croppedImages;
		delete quote.surveyMetadata.croppedCarouselImages;

		// remove data prior to DB API call
		delete quote.samplePlan;
		delete quote.samplePlanError;
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
		const key = action.payload.metadata.key;

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
						index:imageIndex,
						key
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

const uploadCarouselCreativeImageLogic = createLogic({
	type: 'REPLACE_IMAGE_IN_CAROUSEL_FOR_SET',
	process({ getState, action, api }, dispatch) {
		const quoteID = getState().getIn(['data', 'lead', 'quoteID']);
		if (!quoteID) { return; }	
		const { mediaID,  key} = action.payload.metadata
		const { setIndex, imageIndex} = action.payload;

		if (!mediaID.startsWith('data:')) { return; }
		const blob = dataURIToBlob(mediaID);
		dispatch({ type: 'UPLOAD_CAROUSEL_CREATIVE_IMAGE_REQUEST_START' }, { allowMore: true });
		return api.uploadFileForLead(blob, quoteID)
		.then(newMediaID => {
			// Preload image to make visual transition seamless
			const img = new Image();
			img.onload = (img) => {
				dispatch({
					type: 'UPLOAD_CAROUSEL_CREATIVE_IMAGE_REQUEST_SUCCESS',
					payload: {
						mediaID:newMediaID,
						setIndex,
						imageIndex,
						key,
					}
				});
			};
			img.src = blobURL(newMediaID);
		})
		.catch(error => {
			console.error(error);
			dispatch({ type: 'UPLOAD_CAROUSEL_CREATIVE_IMAGE_REQUEST_FAIL', payload: {
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

						//if (!delayDispatch) {
							dispatch({
								type: 'LOAD_QUOTE_REQUEST_SUCCESS',
								payload: {
									quote
								}
							}, { allowMore: true });
						//}

					})
					.catch(err => {
						console.error('quote.Logic.js -> loadQuoteLogic -> err', err);
						throw err;
					})
			}
			
			if (quote.metadata.surveyMetadata.adCreatives && quote.metadata.surveyMetadata.adCreatives.imageAdCreatives && quote.metadata.surveyMetadata.adCreatives.imageAdCreatives.images) {
				const promises = quote.metadata.surveyMetadata.adCreatives.imageAdCreatives.images.map((item, index) => {
					const uri = blobURL(item.mediaID);
					const x = item.crop191x100[0][0];
					const y = item.crop191x100[0][1];
					const width = item.crop191x100[1][0] - x;
					const height = item.crop191x100[1][1] - y;
					const newMetadata = { x, y, height, width, dataURI : uri, extraData: { mediaID:item.mediaID, index }};
					return getImageData(newMetadata);
				})

				Promise
					.all(promises)
					.then(values => {
						values = values.sort((a,b) => a.index - b.index);
						const arr = values.map(item => {
							const { width, height, dataURI:croppedSrc } = item;
							const { mediaID } = item.extraData;
							return {
								key : mediaID, 
								cropData : { croppedSrc },
							}
						})

						quote.metadata.surveyMetadata.croppedImages = arr;

						dispatch({
							type: 'LOAD_QUOTE_REQUEST_SUCCESS',
							payload: {  quote }
						}, { allowMore: true });
					})
					.catch(err => {
						console.error(err);
					})
			}
			// else {
			// 	dispatch({
			// 		type: 'LOAD_QUOTE_REQUEST_SUCCESS',
			// 		payload: {
			// 			quote
			// 		}
			// 	}, { allowMore: true });
			// }

			if (quote.metadata.surveyMetadata.adCreatives && quote.metadata.surveyMetadata.adCreatives.carouselAdCreatives) {
				const promises = quote.metadata.surveyMetadata.adCreatives.carouselAdCreatives.carousels.map((item, index) => {
					return new Promise((resolve, reject) => {
						const innerPromises = item.map(img => {
							const uri = blobURL(img.mediaID);
							const x = img.crop100x100 ? img.crop100x100[0][0] : 0;
							const y = img.crop100x100 ? img.crop100x100[0][1] : 0;
							const width = img.crop100x100 ? img.crop100x100[1][0] - x : 100;
							const height = img.crop100x100 ? img.crop100x100[1][1] - y : 100;
							const newMetadata = { x, y, height, width, dataURI : uri, extraData: { mediaID:img.mediaID, setIndex: item.setIndex, imageIndex : img.imageIndex }};
							return getImageData(newMetadata);
						});

						Promise
							.all(innerPromises)
							.then(vals => {
								resolve(vals);
							})
							.catch(err => {
								console.log('err', err);
								reject(err);
							})
					});

				})

				Promise
					.all(promises)
					.then(values => {
						const arr = [];
						values.forEach((item, setIndex) => {
							item.forEach((elm, imageIndex) => {
								const { width, height, dataURI:croppedSrc } = elm;
								const { mediaID } = elm.extraData;
								arr.push({
									key : mediaID, 
									cropData : { croppedSrc },
									imageIndex,
									setIndex,

								});
							});							
						})

						quote.metadata.surveyMetadata.croppedCarouselImages = arr;

						dispatch({
							type: 'LOAD_QUOTE_REQUEST_SUCCESS',
							payload: {  quote }
						}, { allowMore: true });
					})
					.catch(err => {
						console.error(err);
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


const getChannelConsumptionData = createLogic({
	type: 'GET_CHANNEL_CONSUMPTION_DATA',
	latest: true,
	process({ getState, action, api }, dispatch) {
		dispatch({type:'GET_CHANNEL_CONSUMPTION_DATA_STARTED', payload :{ sampleID : action.payload.sampleID }}, { allowMore: true });
		return api.getChannelConsumptionData(action.payload.sampleID)
				.then(data => {
					const { items, name } = data.enrichment[0];
					dispatch({ type:'GET_CHANNEL_CONSUMPTION_DATA_SUCCESS', payload :{ 
						items,
						name
					}}, { allowMore: true });
				})
				.catch(error => {
					dispatch({ type : 'GET_CHANNEL_CONSUMPTION_DATA_FAIL', payload : {
						error },
						error : true});
					console.error('GET_CHANNEL_CONSUMPTION_DATA fail!!!', error);
				})
	}
});

const getSamplePlan = createLogic({
	type: 'GET_SAMPLE_PLAN',
	latest: true,
	process({ getState, action, api }, dispatch) {
		dispatch({type:'GET_SAMPLE_PLAN_STARTED', payload :{ sampleID : action.payload.sampleID, sampleAccounts : action.payload.sampleAccounts }}, { allowMore: true });
		return api.getSamplePlan(action.payload.sampleID, action.payload.sampleAccounts)
				.then(data => {
					dispatch({ type:'GET_SAMPLE_PLAN_SUCCESS', payload :{ 
						samplePlan : data.samplePlan[0]
					}}, { allowMore: true });
				})
				.catch(error => {
					dispatch({ type : 'GET_CHANNEL_CONSUMPTION_DATA_FAIL', payload : {
						error },
						error : true});
					console.error('GET_CHANNEL_CONSUMPTION_DATA fail!!!', error);
				})
	}
});

const getRelationshipStatus = createLogic({
	type: 'GET_RELATIONSHIP_STATUS',
	latest: true,
	process({ getState, action, api }, dispatch) {
		dispatch({type:'GET_RELATIONSHIP_STATUS_STARTED', payload :{ sampleID : action.payload.sampleID}}, { allowMore: true });
		return api.getRelationshipData(action.payload.sampleID)
				.then(data => {
					dispatch({ type:'GET_RELATIONSHIP_STATUS_SUCCESS', payload :{ 
						relationshipStatusData : data.enrichment[0].items
					}}, { allowMore: true });
				})
				.catch(error => {
					dispatch({ type : 'GET_RELATIONSHIP_STATUS_FAIL', payload : {
						error },
						error : true});
					console.error('GET_RELATIONSHIP_STATUS fail!!!', error);
				})
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
	uploadCreativeImageLogic,
	uploadCarouselCreativeImageLogic,
	getChannelConsumptionData,
	getSamplePlan,
	getRelationshipStatus
];
