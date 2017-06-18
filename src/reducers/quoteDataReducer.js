import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import emptyQuote from 'data/emptyQuote';
import { POPUP_ARRANGEMENT_TYPE, POPUP_ARRANGEMENT_DEFAULT, calcLocations, AutomaticPopupArrangementTypes } from 'utils/Askem/AutoArrangement';
import { isAspectRatioValid, getImageData  } from 'utils/imageUtils';

const initialState = Immutable.fromJS({});
const initialLeadGenState = Immutable.fromJS({});

const stateWithSettingValueInVQariant = (state, questionID, variantID, key, value) => {
	const idx = state.getIn(['surveyMetadata', 'questionsVariants']).findIndex(v => v.get('questionID') === questionID);
	const variantIdx = state.getIn(['surveyMetadata', 'questionsVariants', idx, 'variants']).findIndex(v => v.get('ID') === variantID);
	return state.setIn(['surveyMetadata', 'questionsVariants', idx, 'variants', variantIdx, key], value);
};
const stateWithSettingPAValueInVQariant = (state, questionID, variantID, possibleAnswerID, key, value) => {
	const idx = state.getIn(['surveyMetadata', 'questionsVariants']).findIndex(v => v.get('questionID') === questionID);
	const variantIdx = state.getIn(['surveyMetadata', 'questionsVariants', idx, 'variants']).findIndex(v => v.get('ID') === variantID);
	return state.setIn(['surveyMetadata', 'questionsVariants', idx, 'variants', variantIdx, key, possibleAnswerID], value);
};

const quoteReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'CREATE_NEW_QUOTE':
			emptyQuote.showResearchObjective =  true;
			return Immutable.fromJS(emptyQuote);
		case 'LOAD_QUOTE_REQUEST_SUCCESS':
			let metadata;
			if (action.payload.quote && action.payload.quote.metadata && typeof(action.payload.quote.metadata) === 'object') {
				metadata = action.payload.quote.metadata;
				delete metadata.showResearchObjective;
			} else {
				metadata = emptyQuote;
			}
			return Immutable.fromJS(metadata);

		case 'REACH_ESTIMATE_FETCH':
			return state.mergeIn(['reachEstimate'], {
				reach: null,
				error: false,
				fetching: true
			});
		case 'REACH_ESTIMATE_FETCH_SUCCESS':
			return state.mergeIn(['reachEstimate'], {
				reach: action.payload.reach,
				error: false,
				fetching: false
			});
		case 'REACH_ESTIMATE_FETCH_FAIL':
			return state.mergeIn(['reachEstimate'], {
				reach: null,
				error: true,
				fetching: false
			});
		case 'INVALIDATE_COST_ESTIMATE':
			return state.delete('costEstimate');
		case 'COST_ESTIMATE_FETCH':
			return state.mergeIn(['costEstimate'], {
				estimates: null,
				error: false,
				fetching: true
			});
		case 'COST_ESTIMATE_FETCH_SUCCESS':
			return state.mergeIn(['costEstimate'], {
				estimates: action.payload.estimates,
				error: false,
				fetching: false
			});
		case 'COST_ESTIMATE_FETCH_FAIL':
			return state.mergeIn(['costEstimate'], {
				estimates: null,
				error: true,
				fetching: false
			});

		case 'SET_QUOTE_DEMO_GENDER':
			return state.setIn(['audience', 'demographics', 'gender', action.payload.gender], action.payload.value);
		case 'TOGGLE_QUOTE_DEMO_AGE_GROUP':
			return state.updateIn(['audience', 'demographics', 'ageGroups'], groups => {
				const group = action.payload.ageGroup
				const idx = groups.keyOf(group);
				if (idx === undefined) {
					return groups.push(group);
				} else {
					return groups.delete(idx);
				}
			});
		case 'TOGGLE_QUOTE_AUDIENCE_ATTRIBUTE':
			const attributeType = action.payload.attributeType;
			return state.updateIn(['audience', attributeType], Immutable.List(), list => {
				const attribute = Immutable.fromJS(action.payload.attribute);
				const idx = list.keyOf(attribute);
				if (idx === undefined) {
					return list.push(attribute);
				} else {
					return list.delete(idx);
				}
			});
		case 'ADD_QUOTE_AUDIENCE_PAGE':
			return state.updateIn(['audience', 'facebookPages'], pages =>
			pages.push(Immutable.fromJS(action.payload.fbPage)));
		case 'TOGGLE_QUOTE_AUDIENCE_PAGE_CONNECTED':
			return state.updateIn(['audience', 'facebookPages', action.payload.pageIndex], page =>
			page.set('targetConnected', !page.get('targetConnected')));
		case 'REMOVE_QUOTE_AUDIENCE_PAGE':
			return state.updateIn(['audience', 'facebookPages'], pages =>
			pages.delete(action.payload.pageIndex));
		case 'ADD_QUOTE_AUDIENCE_INTEREST':
			return state.updateIn(['audience', 'interests'], interests =>
			interests.push(Immutable.fromJS(action.payload.interest)));
		case 'REMOVE_QUOTE_AUDIENCE_INTEREST':
			return state.updateIn(['audience', 'interests'], interests =>
			interests.delete(action.payload.interestIndex));
		case 'ADD_QUOTE_AUDIENCE_BEHAVIOR':
			return state.updateIn(['audience', 'behaviors'], behaviors =>
			behaviors.push(Immutable.fromJS(action.payload.behavior)));
		case 'REMOVE_QUOTE_AUDIENCE_BEHAVIOR':
			return state.updateIn(['audience', 'behaviors'], behaviors =>
			behaviors.delete(action.payload.behaviorIndex));

		case 'ADD_QUOTE_QUESTION':
			return state.updateIn(['surveyMetadata', 'questions'], questions =>
				questions.push(Immutable.fromJS({
					textValue: '',
					questionID: questions.size,
					possibleAnswers: [{textValue: '', possibleAnswerID: 0}]
				}))
			);
		case 'DELETE_QUOTE_QUESTION':
			return state.updateIn(['surveyMetadata', 'questions'], questions =>
				questions
				.delete(action.payload.questionID)
				.map((q, idx) => q.set('questionID', idx)));
		case 'SWAP_QUOTE_QUESTION':
			return state.updateIn(['surveyMetadata', 'questions'], questions => {
				const item = questions.get(action.payload.oldIndex);
				return questions
					.delete(action.payload.oldIndex)
					.insert(action.payload.newIndex, item)
					.map((q, idx) => q.set('questionID', idx));
			});
		case 'SET_QUOTE_QUESTION_TEXT':
			if (action.payload.variantID !== undefined) {
				return stateWithSettingValueInVQariant(state, action.payload.questionID, action.payload.variantID, 'textValue', action.payload.textValue);
			}
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID, 'textValue'], action.payload.textValue);
		case 'SET_QUOTE_QUESTION_IS_MULTI_ANSWER':
			return state.updateIn(['surveyMetadata', 'questions', action.payload.questionID], q => {
				if (action.payload.isMultiAnswer) {
					return q.set('isMultiAnswerQuestion', true)
					.set('minAnswers', 1)
					.set('maxAnswers', q.get('possibleAnswers').size);
				} else {
					return q.delete('isMultiAnswerQuestion')
					.delete('minAnswers')
					.delete('maxAnswers');
				}
			});
		case 'SET_QUOTE_QUESTION_MIN_ANSWERS':
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID, 'minAnswers'], action.payload.minAnswers);
		case 'SET_QUOTE_QUESTION_MAX_ANSWERS':
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID, 'maxAnswers'], action.payload.maxAnswers);
		case 'SET_QUOTE_QUESTION_AUTO_ARRANGEMENT':
			if (action.payload.variantID !== undefined) {
				// Set both name and actual locations
				const arrangementTitle = AutomaticPopupArrangementTypes.find(type => type.id === action.payload.autoArrangement).title;
				const possibleAnswersCount = state.getIn(['surveyMetadata', 'questions', action.payload.questionID, 'possibleAnswers']).size;
				const arrangeBy = action.payload.autoArrangement === POPUP_ARRANGEMENT_TYPE.CUSTOM ? POPUP_ARRANGEMENT_DEFAULT : action.payload.autoArrangement;
				const locations = Immutable.fromJS(calcLocations(possibleAnswersCount, arrangeBy));
				let vState = stateWithSettingValueInVQariant(state, action.payload.questionID, action.payload.variantID, 'paArrangement', arrangementTitle);
				vState = stateWithSettingValueInVQariant(vState, action.payload.questionID, action.payload.variantID, 'paLocations', locations);
				return vState;
			}
			return state.updateIn(['surveyMetadata', 'questions', action.payload.questionID], q => {
				const newArrangement = action.payload.autoArrangement;
				if (newArrangement === POPUP_ARRANGEMENT_TYPE.CUSTOM) {
					const arrangement = q.get('autoArrangement') || POPUP_ARRANGEMENT_DEFAULT;
					const possibleAnswersCount = q.get('possibleAnswers').size;
					const currentLocations = Immutable.fromJS(calcLocations(possibleAnswersCount, arrangement));
					return q.set('popupLocations', currentLocations).set('autoArrangement', newArrangement);
				} else {
					return q.delete('popupLocations').set('autoArrangement', newArrangement);
				}
			});
		case 'SET_QUOTE_QUESTION_IMAGE':
			if (action.payload.variantID !== undefined) {
				return stateWithSettingValueInVQariant(state, action.payload.questionID, action.payload.variantID, 'mediaID', action.payload.mediaID);
			}
			return state.updateIn(['surveyMetadata', 'questions'], questions => {
				return questions.updateIn([action.payload.questionID], q => {
					return q.merge({
						mediaID:action.payload.mediaID,
						croppedMetadata:action.payload.croppedMetadata
					});
				});
			});
		case 'UPLOAD_IMAGE_REQUEST_SUCCESS':
			const { originalMediaID, newMediaID} = action.payload;
			return state.updateIn(['surveyMetadata', 'questions'], questions => {
				const key = questions.findKey(q => q.get('mediaID') === originalMediaID);
				if (key !== undefined) {
					return questions.setIn([key, 'mediaID'], newMediaID);
				}
				return questions;
			}).updateIn(['surveyMetadata', 'questionsVariants'], Immutable.List(), allQVariants =>
				allQVariants.map(qVariants => qVariants.update('variants', variants =>
					variants.map(v => {
						if (v.get('mediaID') === originalMediaID) {
							return v.set('mediaID', newMediaID);
						}
						return v;
					})
				)
			));
		case 'UPLOAD_CREATIVE_IMAGE_REQUEST_SUCCESS': {
			const { mediaID, index, key } = action.payload;
			let imagesState = state.setIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'images', index, 'mediaID'], mediaID);
			let itemIndex = imagesState.getIn(['surveyMetadata', 'croppedImages']).findIndex(item => item.get('key') === key);
			return imagesState.setIn(['surveyMetadata', 'croppedImages', itemIndex, 'key'], mediaID);
		}
		case 'UPLOAD_CAROUSEL_CREATIVE_IMAGE_REQUEST_SUCCESS': {
			const { setIndex, imageIndex, mediaID } = action.payload;
			const idx = state.getIn(['surveyMetadata', 'croppedCarouselImages']).findIndex(carousel => carousel.get('setIndex') === setIndex);
			const carouselSet = state.getIn(['surveyMetadata', 'croppedCarouselImages',idx]);
			if (!carouselSet) {
				const carouselImage = {
						setIndex,
						imageIndex,
						mediaID,
						key : mediaID
				}

				state = state.setIn(['surveyMetadata', 'croppedCarouselImages'], Immutable.fromJS([carouselImage]));
			}
			else {
				state =  state.updateIn(['surveyMetadata', 'croppedCarouselImages',idx], carousel => {
					return carousel.set('key', mediaID).set('mediaID', mediaID);
				});
			}

			return state.updateIn(['surveyMetadata', 'adCreatives', 'carouselAdCreatives', 'carousels', setIndex, imageIndex], img => {
				return img.set('mediaID', mediaID);						

			})
		}
		case 'ADD_QUOTE_POSSIBLE_ANSWER': {
			let newPAID;
			let addedState = state.updateIn(['surveyMetadata', 'questions', action.payload.questionID], q => {
				newPAID = q.get('possibleAnswers').size;
				q = q.update('possibleAnswers', pas => pas.push(Immutable.fromJS({
					textValue: '',
					possibleAnswerID: newPAID
				})));
				if (q.get('autoArrangement') === POPUP_ARRANGEMENT_TYPE.CUSTOM && q.get('popupLocations')) {
					const newLocation = Immutable.fromJS(calcLocations(newPAID + 1, POPUP_ARRANGEMENT_DEFAULT)[newPAID]);
					q = q.update('popupLocations', locations => locations.push(newLocation));
				}
				return q;
			});
			const qVariantsIndex = (state.getIn(['surveyMetadata', 'questionsVariants']) || Immutable.List()).findIndex(v => v.get('questionID') === action.payload.questionID);
			if (qVariantsIndex > -1) {
				addedState = addedState.updateIn(['surveyMetadata', 'questionsVariants', qVariantsIndex, 'variants'], variants => {
					return variants.map(v => {
						const arrangementType = v.get('paArrangement');
						let arrangement = AutomaticPopupArrangementTypes.find(type => type.title === arrangementType).id;
						arrangement = arrangement === POPUP_ARRANGEMENT_TYPE.CUSTOM ? POPUP_ARRANGEMENT_DEFAULT : arrangement;
						const paLocations = Immutable.fromJS(calcLocations(newPAID + 1, arrangement));
						return v.update('paTextValues', values => values.push(''))
						.set('paLocations', paLocations);
					});
				});
			}
			return addedState;
		}
		case 'DELETE_QUOTE_POSSIBLE_ANSWER': {
			const paID = action.payload.possibleAnswerID;
			let deletedState = state;
			const qVariantsIndex = (state.getIn(['surveyMetadata', 'questionsVariants']) || Immutable.List()).findIndex(v => v.get('questionID') === action.payload.questionID);
			if (qVariantsIndex > -1) {
				deletedState = deletedState.updateIn(['surveyMetadata', 'questionsVariants', qVariantsIndex, 'variants'], variants => {
					return variants.map(v =>
						v
						.deleteIn(['paTextValues', paID])
						.deleteIn(['paLocations', paID]));
				});
			}
			return deletedState.updateIn(['surveyMetadata', 'questions', action.payload.questionID, 'possibleAnswers'], pas =>
				pas
				.delete(paID)
				.map((pa, idx) => pa.set('possibleAnswerID', idx)))
				.updateIn(['surveyMetadata', 'questions', action.payload.questionID, 'popupLocations'], locations => {
				if (locations) {
					return locations.delete(paID);
				}});
		}
		case 'SET_QUOTE_POSSIBLE_ANSWER_TEXT':
			if (action.payload.variantID !== undefined) {
				return stateWithSettingPAValueInVQariant(state, action.payload.questionID, action.payload.variantID,
					action.payload.possibleAnswerID, 'paTextValues', action.payload.textValue);
			}
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID,
				'possibleAnswers', action.payload.possibleAnswerID, 'textValue'], action.payload.textValue);
		case 'SET_QUOTE_POSSIBLE_ANSWER_LOCATION':
			if (action.payload.variantID !== undefined) {
				return stateWithSettingPAValueInVQariant(state, action.payload.questionID, action.payload.variantID,
					action.payload.possibleAnswerID, 'paLocations', action.payload.location);
			}
			return state.setIn(['surveyMetadata', 'questions', action.payload.questionID,
				'popupLocations', action.payload.possibleAnswerID], action.payload.location);
		case 'SET_QUOTE_POSSIBLE_ANSWER_RANDOM_LOCATION':
			if (action.payload.randomLocation) {
				return state.setIn(['surveyMetadata', 'questions', action.payload.questionID,
					'possibleAnswers', action.payload.possibleAnswerID, 'randomLocation'], true);
			} else {
				return state.deleteIn(['surveyMetadata', 'questions', action.payload.questionID,
					'possibleAnswers', action.payload.possibleAnswerID, 'randomLocation']);
			}
		case 'SET_QUOTE_POSSIBLE_ANSWER_CONNECTION':
			const { entity } = action.payload;
			if (entity) {
				return state.setIn(['surveyMetadata', 'questions', action.payload.questionID,
					'possibleAnswers', action.payload.possibleAnswerID, 'connection'], Immutable.fromJS(entity));
			} else {
				return state.deleteIn(['surveyMetadata', 'questions', action.payload.questionID,
					'possibleAnswers', action.payload.possibleAnswerID, 'connection']);
			}
		case 'SET_QUOTE_POSSIBLE_ANSWER_MULTI_BEHAVIOR':
			const { multiBehavior } = action.payload;
			if (multiBehavior && multiBehavior !== 'regular') {
				return state.setIn(['surveyMetadata', 'questions', action.payload.questionID,
					'possibleAnswers', action.payload.possibleAnswerID, 'multiBehavior'], multiBehavior);
			} else {
				// Don't save 'regular' values
				return state.deleteIn(['surveyMetadata', 'questions', action.payload.questionID,
					'possibleAnswers', action.payload.possibleAnswerID, 'multiBehavior']);
			}
		case 'ADD_QUESTION_VARIANT':
			const questionToVariant = q => {
				const arrangement = q.autoArrangement || POPUP_ARRANGEMENT_DEFAULT;
				const newVariant = {
					status: 'Draft',
					title: '',
					ID: 0,
					mediaID: q.mediaID,
					textValue: q.textValue,
					paTextValues: q.possibleAnswers.map(pa => pa.textValue),
					paArrangement: AutomaticPopupArrangementTypes.find(type => type.id === arrangement).title,
					paLocations: q.popupLocations ||
					 	calcLocations(q.possibleAnswers.length, arrangement)
				}
				return newVariant;
			}
			const questionID = action.payload.questionID;
			let allQuestionsVariants = state.getIn(['surveyMetadata', 'questionsVariants']);
			let qVariants;
			let qVariantsIndex = -1;
			if (allQuestionsVariants) {
				qVariantsIndex = allQuestionsVariants.findIndex(v => v.get('questionID') === questionID);
				if (qVariantsIndex > -1) {
					qVariants = allQuestionsVariants.get(qVariantsIndex);
				}
			} else {
				allQuestionsVariants = Immutable.List();
			}
			if (!qVariants) {
				const q = state.getIn(['surveyMetadata', 'questions', questionID]).toJS();
				qVariants = Immutable.fromJS({
					questionID,
					variants: [
						questionToVariant(q)
					]
				});
				allQuestionsVariants = allQuestionsVariants.push(qVariants);
				qVariantsIndex = allQuestionsVariants.size - 1;
			}
			const newVariantID = qVariants.get('variants').size;
			const duplicateVariantID = action.payload.duplicateVariantID || 0;
			const variantToDuplicate = qVariants.get('variants').find(v => v.get('ID') === duplicateVariantID);
			if (!variantToDuplicate) {
				console.warn(`Can't find duplicateVariantID ${duplicateVariantID}`);
				return state;
			}
			let newVariant = variantToDuplicate.toJS();
			newVariant.ID = newVariantID;
			//newVariant.textValue = `variant text ${newVariantID + 1}`;
			qVariants = qVariants.update('variants',
				variants => variants.push(Immutable.fromJS(newVariant)));
			allQuestionsVariants = allQuestionsVariants.set(qVariantsIndex, qVariants);
			return state.setIn(['surveyMetadata', 'questionsVariants'], allQuestionsVariants);
		case 'DELETE_QUESTION_VARIANT':
			const deleteQVariantsIndex = state.getIn(['surveyMetadata', 'questionsVariants']).findIndex(v => v.get('questionID') === action.payload.questionID);
			const deleteVariantIndex = state.getIn(['surveyMetadata', 'questionsVariants', deleteQVariantsIndex, 'variants'])
				.findIndex(v => v.get('ID') === action.payload.variantID);
			let deletedState = state.updateIn(['surveyMetadata', 'questionsVariants', deleteQVariantsIndex, 'variants'], variants =>
				variants
				.delete(deleteVariantIndex)
				.map((v, idx) => v.set('ID', idx)));
			if (deletedState.getIn(['surveyMetadata', 'questionsVariants', deleteQVariantsIndex, 'variants']).size === 1) {
				const lastVariant = deletedState.getIn(['surveyMetadata', 'questionsVariants', deleteQVariantsIndex, 'variants', 0]).toJS();
				let possibleAnswers = [];
				lastVariant.paTextValues.forEach((textValue, idx) => {
					let pa = {
						textValue,
					};
					possibleAnswers.push(pa);
				});
				const q = {
					mediaID: lastVariant.mediaID,
					textValue: lastVariant.textValue,
					possibleAnswers,
					popupLocations: lastVariant.paLocations,
					autoArrangement: AutomaticPopupArrangementTypes.find(type => type.title === lastVariant.paArrangement).id
				};
				deletedState = state
				.deleteIn(['surveyMetadata', 'questionsVariants', deleteQVariantsIndex])
				.mergeDeepIn(['surveyMetadata', 'questions', action.payload.questionID], Immutable.fromJS(q));
			}
			return deletedState;
		case 'SET_QUOTE_SAMPLE_SIZE':
			return state.set('sample', Immutable.fromJS({
				sampleSize: action.payload.sampleSize,
				moe: action.payload.moe
			}));
		case 'UPDATE_CREATIVE_HEADLINE': 		
			return state.setIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'headlines', action.payload.index], action.payload.text);
		case 'ADD_CREATIVE_HEADLINE':
			const headlines = state.getIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'headlines']);

			if (!headlines) {
				return state.setIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'headlines'], Immutable.fromJS(['']));
			}
			else {
				return state.updateIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'headlines'], headlines => {
					return headlines.push('');
				});
			}
		case 'DELETE_CREATIVE_HEADLINE':
			return state.deleteIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'headlines', action.payload.index]);

		case 'ADD_CREATIVE_TEXT':
			const texts = state.getIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'texts']);

			if (!texts) {
				return state.setIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'texts'], Immutable.fromJS(['']));
			}
			else {
				return state.updateIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'texts'], texts => {
					return texts.push('');
				});
			}
		case 'UPDATE_CREATIVE_TEXT': 		
			return state.setIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'texts', action.payload.index], action.payload.text);
		case 'DELETE_CREATIVE_TEXT':
			return state.deleteIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'texts', action.payload.index]);
		case 'ADD_CREATIVE_DESCRIPTION':
			const descriptions = state.getIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'descriptions']);

			if (!descriptions) {
				return state.setIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'descriptions'], Immutable.fromJS(['']));
			}
			else {
				return state.updateIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'descriptions'], descriptions => {
					return descriptions.push('');
				});
			}
		case 'UPDATE_CREATIVE_DESCRIPTION': 		
			return state.setIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'descriptions', action.payload.index], action.payload.text);
		case 'DELETE_CREATIVE_DESCRIPTION':
			return state.deleteIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'descriptions', action.payload.index]);
		case 'ADD_CREATIVE_IMAGE':{
			let croppedImages = state.getIn(['surveyMetadata','croppedImages']);
			const croppedImageObject = { 
						key : action.payload.metadata.key,
						cropData : {
							croppedSrc : action.payload.metadata.croppedSrc
						}
			}

			if (!croppedImages) {
				state = state.setIn(['surveyMetadata','croppedImages'], Immutable.fromJS([croppedImageObject]));
			}
			else {
				state = state.updateIn(['surveyMetadata','croppedImages'], croppedImages => {
					return croppedImages.push(Immutable.fromJS(croppedImageObject));
				});
			}

			let images = state.getIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'images']);
			const creativeImageData = {
				crop191x100 : action.payload.metadata.crop191x100,
				mediaID : action.payload.metadata.mediaID
			}


			if (!images) {
				return state.setIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'images'], Immutable.fromJS([creativeImageData]));
			}
			else {
				return state.updateIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'images'], images => {
					return images.push(Immutable.fromJS(creativeImageData));
				})
			}
		}
		case 'DELETE_CREATIVE_IMAGE':
			let modifiedState = state.deleteIn(['surveyMetadata', 'adCreatives', 'imageAdCreatives', 'images', action.payload.index]);
			const index = modifiedState.getIn(['surveyMetadata', 'croppedImages']).findIndex(image => image.get('key') === action.payload.key);
			return modifiedState.deleteIn(['surveyMetadata', 'croppedImages', index]);
		case 'SET_RESEARCH_OBJECTIVE':
			state = state.deleteIn(['showResearchObjective']);
			return state.set('researchObjective', Immutable.fromJS({
				id : action.payload.researchId,
				description : action.payload.description
			}));
		case 'REPLACE_IMAGE_IN_CAROUSEL_FOR_SET':{
			const croppedImages = state.getIn(['surveyMetadata','croppedCarouselImages']);
			const croppedImageObject = { 
				key : action.payload.metadata.key,
				cropData : {
					croppedSrc : action.payload.metadata.croppedSrc
				},
				setIndex : action.payload.setIndex,
				imageIndex : action.payload.imageIndex
			}

			if (!croppedImages) {
				state = state.setIn(['surveyMetadata','croppedCarouselImages'], Immutable.fromJS([croppedImageObject]));
			}
			else {
				const idx = state.getIn(['surveyMetadata','croppedCarouselImages']).findIndex(carousel => {
					return carousel.get('setIndex') === action.payload.setIndex && carousel.get('imageIndex') === action.payload.imageIndex;
				})
			
				if (idx === -1) {
					state = state.updateIn(['surveyMetadata','croppedCarouselImages'], croppedImages => {
						return croppedImages.push(Immutable.fromJS(croppedImageObject));
					});
				}
				else {
					state = state.setIn(['surveyMetadata','croppedCarouselImages', idx], Immutable.fromJS(croppedImageObject));
				}
			}

			const carouselCreatives = state.getIn(['surveyMetadata', 'adCreatives', 'carouselAdCreatives', 'carousels']);
			const { crop100x100, key, mediaID } = action.payload.metadata;

			return state.updateIn(['surveyMetadata', 'adCreatives', 'carouselAdCreatives', 'carousels', action.payload.setIndex, action.payload.imageIndex], img => {
				return img.set('crop100x100', Immutable.fromJS(crop100x100))
						  .set('mediaID', Immutable.fromJS(mediaID));

			});
		}
		case 'ADD_NEW_CAROUSEL_SET' : {
			const emptyImage = {
				crop100x100 : null,
				mediaID : null
			};

			let emptySet = [];
			for (let i=0; i<action.payload.totalPossibleAnswers; i++) {
				emptySet.push(emptyImage);
			}

			emptySet = Immutable.fromJS(emptySet);

			const carouselCreatives = state.getIn(['surveyMetadata', 'adCreatives', 'carouselAdCreatives', 'carousels']);
			if (!carouselCreatives) {
				return state.setIn(['surveyMetadata', 'adCreatives', 'carouselAdCreatives', 'carousels'], Immutable.fromJS([emptySet]));
			}
			else {
				return state.updateIn(['surveyMetadata', 'adCreatives', 'carouselAdCreatives', 'carousels'], carousels => {
					return carousels.push(emptySet);
				});
			}
		}
		case 'DELETE_CAROUSEL':{
			state = state.deleteIn(['surveyMetadata', 'adCreatives', 'carouselAdCreatives', 'carousels', action.payload.setIndex]);
			state = state.setIn(['surveyMetadata', 'croppedCarouselImages'], state.getIn(['surveyMetadata', 'croppedCarouselImages']).filter(carousel => carousel.get('setIndex') !== action.payload.setIndex));
			return state.updateIn(['surveyMetadata', 'croppedCarouselImages'], carousel => {
				return carousel.map(item => {
					if (item.get('setIndex') > action.payload.setIndex) {
						return item.set('setIndex', item.get('setIndex')-1);
					}
					else {
						return item;
					}
				})
			});
		}
		case 'ADD_NEW_DESCRIPTION_IN_CAROUSEL':{
			if (!state.getIn(['surveyMetadata', 'adCreatives', 'carouselAdCreatives', 'descriptions'])) {
				return state = state.setIn(['surveyMetadata', 'adCreatives', 'carouselAdCreatives', 'descriptions' ], Immutable.fromJS([''])); 
			}
			else {
				return state.updateIn(['surveyMetadata', 'adCreatives', 'carouselAdCreatives', 'descriptions'], descriptions => {
				 	return descriptions.push('');
				});
			}
		}
		case 'UPDATE_CAROUSEL_DESCRIPTION':{
			return state.setIn(['surveyMetadata', 'adCreatives', 'carouselAdCreatives','descriptions', action.payload.index], action.payload.text);
		}
		case 'DELETE_CAROUSEL_DESCRIPTION':{
			return state.deleteIn(['surveyMetadata', 'adCreatives', 'carouselAdCreatives','descriptions', action.payload.index]);
		}
		case 'SET_RESEARCH_CAMPAIGN_DATA': {
			const { researchCampaignID, campaignName, campaignDescription, sampleID, surveyID } = action.payload;
			return state.set('researchCampaign', Immutable.fromJS({ researchCampaignID, campaignName, campaignDescription}))
				   		.set('sampleID', sampleID)
				   		.set('surveyID', surveyID)
		}
		case 'SET_SURVEYID':{
			return state.set('surveyID', action.payload.surveyID);
		}
		case 'GET_CHANNEL_CONSUMPTION_DATA_SUCCESS' : {
			return state.setIn(['channelConsumptionData', 'items'], Immutable.fromJS(action.payload.items))
		}
		case 'GET_SAMPLE_PLAN_SUCCESS':{
			return state.setIn(['samplePlan'], Immutable.fromJS(action.payload.samplePlan))
					.set('samplePlanError', false)
		}
		case 'GET_SAMPLE_PLAN_ERROR':{
			return state.set('samplePlanError',  true);
		}
		case 'GET_RELATIONSHIP_STATUS_SUCCESS':{
			return state.setIn(['relationshipStatusData'], Immutable.fromJS(action.payload.relationshipStatusData));
		}
		case 'CREATE_CAMPAIGN_REQUEST_SUCCESSFULL':{
			return state.setIn(['campaignStatus', 'continueWithGetStatus'], true);
		}
		case 'GET_CREATE_CAMPAIGN_STATUS_SUCCESSFULL' :{
			return state.mergeIn(['campaignStatus'], Immutable.fromJS({
				progress : action.payload.progress,
				status : action.payload.status,
				ETA : action.payload.ETA,
				startTime : action.payload.startTime
			}));
			//return state.setIn(['campaignStatus', 'progress'], Immutable.fromJS(action.payload.progress));
		}
		case 'SET_CREATE_CAMPAIGN_STATUS_TO_FINISED': {
			return state.updateIn(['campaignStatus'], (campaignStatus) => {
				return campaignStatus.set('continueWithGetStatus', false);
			});
		}

		
		default : 
			return state;
	}
}

const leadReducer = (state = initialState, action) => {
	switch(action.type) {
	case 'CREATE_NEW_QUOTE':
		return Immutable.fromJS({
			quoteID: action.payload.quoteID,
			loaded: true
		});
	case 'LOAD_QUOTE':
		return state.set('quoteID', action.payload.quoteID);
	case 'LOAD_QUOTE_REQUEST_START':
		return state.set('loadingFail', false);
	case 'LOAD_QUOTE_REQUEST_FAIL':
		return state.set('loadingFail', true);
	case 'LOAD_QUOTE_REQUEST_SUCCESS':
		const { researchId, status, name, internalDescription, dateModified, dateCreated, userId, source, description } = action.payload.quote;
		return state.merge({ loaded: true, researchId, status, name, internalDescription, dateModified, dateCreated, userId, source, description });
	case 'SUBMIT_LEAD_REQUEST_START':
		return state.set('submitInProgress', true);
	case 'SUBMIT_LEAD_REQUEST_SUCCESS':
		return state.set('submitSuccess', true).set('submitInProgress', false);
	case 'SUBMIT_LEAD_REQUEST_FAIL':
		return state.set('submitFail', true).set('submitInProgress', false);
	case 'SUBMIT_LEAD_CLOSE_SUCCESS':
		return state.delete('submitSuccess');
	case 'SUBMIT_LEAD_CANCEL_FAILED':
		return state.delete('submitFail');

	case 'CREATE_NEW_LEADGEN' : 
		if (!state.get('metadata')) {
			state = state.set('metadata', Immutable.fromJS({}));
		}

		return state
					.set('leadgenID', action.payload.leadgenID)
					.setIn(['metadata', 'type'], 'leadgen');
			  
	case 'LOAD_LEADGEN' : 
		return state.set('leadgenLoading', true).set('leadgenID', action.payload.leadgenID);
	case 'LOAD_LEADGEN_REQUEST_SUCCESS':
		const metadata = JSON.parse(action.payload.lead.metadata);
		const { ageGroups,  campaignEndDate, campaignStartDate, gender, industry, intentToPurchase, industryTextValue = '', intentToPurchaseText =''} = metadata;

		return state
					.set('leadgenLoading', false)
		 			.mergeIn(['metadata'], Immutable.fromJS({
						ageGroups,
						campaignEndDate,
						campaignStartDate,
						gender,
						industry,
						intentToPurchase,
						industryTextValue,
						intentToPurchaseText,
						type : 'leadgen'
					}))

	case 'LEADGEN_AGE_GROUP_CHANGE': {
		return state.updateIn(['metadata', 'ageGroups'], ageGroups => action.payload.ageGroups.map(ageGroup => ageGroup)); 
	}
	case 'LEADGEN_GENDER_CHANGE': {
		return state.setIn(['metadata', 'gender'], Immutable.fromJS(action.payload.genders));
	}
	case 'LEADGEN_INDUSTRY_CHANGE' : {
		const { industry, intentToPurchase, estimatedAudienceSize, price, industryTextValue = '' } = action.payload;

		return state.mergeIn(['metadata'], Immutable.fromJS({
			industry,
			intentToPurchase,
			estimatedAudienceSize,
			price,
			industryTextValue,
		}));
	}
	case 'LEADGEN_CAMPAIGN_DATE_CHANGE' : {
		if (action.payload.campaignEndDate) {
			 return state
				.setIn(['metadata', 'campaignStartDate'], action.payload.campaignStartDate)
			 	.setIn(['metadata', 'campaignEndDate'], action.payload.campaignEndDate);
		}
		else {
			return state.setIn(['metadata', 'campaignStartDate'], action.payload.campaignStartDate);
		}
	}
	case 'LEADGEN_INTENT_TO_PURCHASE_CHANGE' : {
		const { intentToPurchase, estimatedAudienceSize, price, textValue = '' } = action.payload;
		return state.mergeIn(['metadata'], Immutable.fromJS({
			intentToPurchase,
			estimatedAudienceSize,
			price,
			intentToPurchaseText : textValue
		}));
		 
	}
	default:
		return state;
	}
}

const contactReducer = (state = initialState, action) => {
	switch(action.type) {
	case 'SET_QUOTE_CONTACT_VALUE':
		return state.set(action.payload.field, action.payload.value);
	case 'CREATE_NEW_QUOTE':
		return initialState;
	case 'LOAD_QUOTE_REQUEST_SUCCESS':
		return Immutable.fromJS(action.payload.quote.contact);
	default:
		return state;
	}
}

const imageSuggestionsReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'QUESTION_IMAGE_SUGGESTIONS_SUCCESS':
			return state.setIn([action.payload.textValue], Immutable.fromJS({
				suggestions: action.payload.suggestions,
				searchTerm: action.payload.searchTerm,
				fromQuestionID: action.payload.questionID
			}));
		case 'QUESTION_IMAGE_SUGGESTIONS_FAIL':
			return state.setIn([action.payload.textValue], Immutable.fromJS({
				loadingFail: true,
				error: action.payload.error
			}));
		default:
			return state;
	}
}

const leadGenReducer = (state = initialLeadGenState, action) => {
	
}

const dataReducer = combineReducers({
	quote: quoteReducer,
	imageSuggestions: imageSuggestionsReducer,
	lead: leadReducer,
	contact: contactReducer,
	//leadGen : leadGenReducer 
});

export default dataReducer;
