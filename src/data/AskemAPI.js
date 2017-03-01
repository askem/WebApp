import AGE_GROUPS from 'constants/AGE_GROUPS';
import HOUSEHOLD_INCOME from 'constants/HOUSEHOLD_INCOME';
import RELATIONSHIP_STATUS from 'constants/RELATIONSHIP_STATUS';
import quoteContactFields from 'constants/quoteContactFields';
import Cookies from 'cookies-js';
import dateStringToDate from 'utils/dateStringToDate';
import leadMetadataToQuestion from 'utils/Askem/leadMetadataToQuestion';
import leadMetadataToSurvey from 'utils/Askem/leadMetadataToSurvey';

const defaultModelData = {
	"modelID": "dce",
	"modelVersion": "0.1",
	"locale": "en-US",
	"variableValues": [],
	"requiredKPIs": ["exposure_targeting"]
};
const EMPTY_MEDIA_ID = '5e86a8e1-ecda-4cc8-a074-78e4638ad4d0';

class AskemAPI {
	constructor(props = {}) {
		this._baseURI = props.baseURI || 'https://api.askem.com/0/';
		this._loginURI = props.loginURI || 'https://askem.com/profile/login';
		this._accessToken = props.accessToken || Cookies.get('atoken');
		this.setHeaders();
	}
	setAccessToken(accessToken) {
		if (this._accessToken === accessToken) { return; }
		this._accessToken = accessToken;
		this.setHeaders();
	}
	loggedIn() {
		return !!this._accessToken;
	}
	username() {
		if (!this.loggedIn()) { return ''; }
		return localStorage.username || '';
	}
	signOut() {
		Cookies.expire('atoken');
		Cookies.expire('rtoken');
		this._accessToken = undefined;
		localStorage.removeItem('username');
		this.setHeaders();
	}
	setHeaders() {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json; charset=utf-8');
		if (this._accessToken) {
			headers.append('Authorization', `Bearer ${this._accessToken}`);
		}
		this._headers = headers;
	}

	/* Helper functions */
	/// standardize error handling, return body as JSON
	fetchURL(...params) {
		return fetch(...params)
		.then(response => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then(results => {
			// Askem errors
			if (results.errorCode !== 200) {
				throw Error(results.error);
			}
			return results;
		});
	}

	fetchEndpoint(endpoint, postObject) {
		let options = {
			headers: this._headers,
			cors: true
		};
		if (postObject) {
			options.method = 'POST';
			options.body = JSON.stringify(postObject);
		}
		return this.fetchURL(`${this._baseURI}${endpoint}`, options);
	}

	/* Auth */
	getAccessToken(email, password) {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json; charset=utf-8');
		let fetchAccessToken;
		if (__PRODUCTION__) {
			fetchAccessToken = this.fetchURL(this._loginURI, {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify({email, password}),
				headers
			});
		} else {
			// fetchAccessToken = Promise.resolve({"error":"","errorCode":200,"status":"ok","accessToken":"45158d44fcfa43208777d0f73f2cd8bc","accessTokenTTL":"Sat Feb 18 2017 15:29:12","refreshToken":"b9e14fbd3e244a7d88a52fd03125e4fa","refreshTokenTTL":"Sat Feb 18 2017 15:29:12"});
			fetchAccessToken = Promise.resolve({"error":"","errorCode":200,"status":"ok","accessToken":"5ebd10eb797a44c5bda17f6f6193ad94","accessTokenTTL":"Sat May 27 2017 22:52:46 GMT+0800 (CST)","refreshToken":"4b1b421d47e54184b6dc5889b1ec30c1","refreshTokenTTL":"Sat May 27 2017 22:52:46 GMT+0800 (CST)"});
		}
		return fetchAccessToken
		.then(results => {
			Cookies.set('atoken', results.accessToken, {
				expires: results.accessTokenTTL,
				//domain: '.askem.com',
				//secure: true
			});
			Cookies.set('rtoken', results.refreshToken, {
				expires: results.refreshTokenTTL,
				//domain: '.askem.com',
				//secure: true
			});
			this.setAccessToken(results.accessToken);
			this.fetchEndpoint('user/me').then(meResults => {
				localStorage.username = meResults.user.userName;
				localStorage.userProfile = meResults.user.profileImageMediaID;
			})
		});
	}

	/* API */
	
	uploadMedia(mediaBlob, bypassProcessing) {
		const mimeType = mediaBlob.type;
        if (mimeType !== 'image/jpeg' && mimeType !== 'video/mp4' && mimeType !== 'image/png') {
            throw Error('Invalid mime type');
        }
        const fd = new FormData();
        fd.append('file', mediaBlob);
		let endpoint = 'media/upload';
		if (bypassProcessing) {
			endpoint = endpoint + '?processImage=0';
		}
		const headers = new Headers(this._headers);
		headers.set('Content-Type', mimeType);
		const options = {
			headers,
			cors: true,
			method: 'POST',
			body: fd
		};		
		return this.fetchURL(`${this._baseURI}${endpoint}`, options).
		then(results => results.mediaID);
	}
	
	uploadFileForLead(blob, leadID) {
		const mimeType = blob.type;
        const fd = new FormData();
        fd.append('file', blob);
		const endpoint = `external/leads/${leadID}/files`;
		const headers = new Headers(this._headers);
		headers.set('Content-Type', mimeType);
		const options = {
			headers,
			cors: true,
			method: 'POST',
			body: fd
		};		
		return this.fetchURL(`${this._baseURI}${endpoint}`, options).
		then(results => results.mediaID);
	}
	
	getSurvey(surveyID) {
		return this.fetchEndpoint(`surveys/${surveyID}`)
		.then(results => results.survey);
	}
	getSurveyResults(surveyID) {
		return this.fetchEndpoint(`surveys/${surveyID}/report`)
		.then(results => results.report);
	}
	
	fetchResearchCampaign(researchID) {
		return this.fetchEndpoint(`researchCampaigns/${researchID}`)
		.then(results => results.researchCampaign);
	}
	fetchResearchKPIs(researchID) {
		// TODO : real endpoint
		return this.fetchEndpoint(`samplings/${researchID}/kpis`);
	}
	fetchSamplingKPIs(samplingID) {
		return this.fetchEndpoint(`samplings/${samplingID}/kpis`);
	}
	updateResearchData(researchID, modelData, kpiBindings, surveyID) {
		return this.fetchEndpoint(`researchCampaigns/${researchID}`, {
			modelData: JSON.stringify(modelData),
			kpiBindings,
			surveyID
		});
	}
	createResearchCampaign(name, description, modelData = defaultModelData) {
		return this.fetchEndpoint('researchCampaigns', {
			name,
			description,
			modelData: JSON.stringify(modelData)
		});
	}

	_audienceToAttributePhraseUSA(audience) {
		let attributes = [];
		attributes.push({
			"ID" : 0,
			"type" : "countries",
			"value" : "US",
			"description" : null,
			"facebookID" : "NA"
		});
		if (audience.demographics.gender.female) {
			attributes.push({
				"ID" : 0,
				"type" : "gender",
				"value" : "Female",
				"description" : null,
				"facebookID" : "NA"
			});
		}
		if (audience.demographics.gender.male) {
			attributes.push({
				"ID" : 0,
				"type" : "gender",
				"value" : "Male",
				"description" : null,
				"facebookID" : "NA"
			});
		}

		const concatAttributes = (includedAttributes, availableAttributes) => {
			if (includedAttributes) {
				attributes = attributes.concat(availableAttributes
				.filter(attr => includedAttributes.includes(attr.id))
				.map(attr => attr.attribute));
			}
		}
		if (audience.demographics.ageGroups.length !== AGE_GROUPS.length) {
			concatAttributes(audience.demographics.ageGroups, AGE_GROUPS);
		}
		concatAttributes(audience.householdIncome, HOUSEHOLD_INCOME);
		concatAttributes(audience.relationship, RELATIONSHIP_STATUS);
		
		// Attributes stored as complete entities
		attributes = attributes.concat(audience.interests || []);
		attributes = attributes.concat(audience.behaviors || []);
		attributes = attributes.concat(audience.educationMajors || []);
		attributes = attributes.concat(audience.industries || []);
		attributes = attributes.concat(audience.workPositions || []);
		attributes = attributes.concat(audience.workEmployers || []);
		
		const phrase = {
			attributes
		};
		return phrase;
	}

	fetchReach(audience) {
		const phrase = this._audienceToAttributePhraseUSA(audience);
		return this.fetchEndpoint('segments/reach', phrase);
	}
	fetchCostEstimate(audience, sampleSize = 500) {
		const phrase = this._audienceToAttributePhraseUSA(audience);
		return this.fetchEndpoint(`segments/cost/estimate?reponders=${sampleSize}`, phrase);
	}
	tempFetchAllCostEstimates(audience) {
		const phrase = this._audienceToAttributePhraseUSA(audience);
		const sampleSizes = [200, 500, 2000];
		const promises = sampleSizes.map(size => 
			this.fetchEndpoint(`segments/cost/estimate?reponders=${size}`, phrase));
		return Promise.all(promises)
		.then(resultsArray => {
			let estimates = {};
			sampleSizes.forEach((size, idx) => {
				estimates[size] = resultsArray[idx];
			});
			return estimates;
		});
	}

	searchTargetingAttributes(type, searchQuery = "", limit = 20) {
		switch (type) {
			case 'educationMajors':
				type = 'education_major';
				break;
			case 'industries':
				type = 'industry';
				break;
			case 'workPositions':
				type = 'work_positions';
				break;
			case 'workEmployers':
				type = 'work_employer';
				break;
			default:
				break;
		}
		return this.fetchEndpoint(`attributes/search?type=${type}&limit=${limit}&q=${encodeURIComponent(searchQuery)}`);
	}

	searchTargetingInterests(searchQuery = "", limit = 20) {
		return this.fetchEndpoint(`attributes/search?q=${encodeURIComponent(searchQuery)}&type=interests&limit=${limit}`);
	}
	searchTargetingFBPages(searchQuery = "", limit = 10) {
		return this.fetchEndpoint(`attributes/search?q=${encodeURIComponent(searchQuery)}&type=page&limit=${limit}`);
	}
	searchTargetingBehaviors(searchQuery = "", limit = 20) {
		return this.fetchEndpoint(`attributes/search?q=${encodeURIComponent(searchQuery)}&type=behaviors&limit=${limit}`);
	}

	createQuote(quoteID, metadata, source) {
		// const endpoint = this.loggedIn() ? 'leads' : 'external/leads';
		return this.fetchEndpoint('external/leads', {
			ID: quoteID,
			source,
			metadata: JSON.stringify(metadata)
		});
	}
	updateQuote(quoteID, metadata = {}, contact, description = '', submit) {
		let quoteUpdate = {
			ID: quoteID,
			metadata: JSON.stringify(metadata),
			description
		};
		quoteUpdate = Object.assign({}, quoteUpdate, contact);
		const submitParam = `submit=${submit ? '1' : '0'}`;
		return this.fetchEndpoint(`external/leads/${quoteID}?${submitParam}`, quoteUpdate);
	}
	getQuoteByID(quoteID) {
		let endpoint = `external/leads/${quoteID}`;
		if (this.loggedIn()) {
			endpoint = `leads/${quoteID}`;
		}
		return this.fetchEndpoint(endpoint)
		.then(results => {
			if (results && results.lead) {
				let lead = results.lead;
				lead.dateCreated = dateStringToDate(lead.dateCreated);
				lead.dateModified = dateStringToDate(lead.dateModified);
				if (lead.metadata) {
					lead.metadata = JSON.parse(lead.metadata);
				}
				const { firstName, lastName, email, phone, company, jobTitle } = lead;
				lead.contact = { firstName, lastName, email, phone, company, jobTitle };
				return lead;
			} else {
				return null;
			}
		});
	}
	getAllQuotes() {
		return this.fetchEndpoint('leads')
		.then(results => results.leads);
	}

	createSurvey(questionsMetadata, questionsVariantsMetadata, leadID = '') {
		//TODO: reverse, jumps
		let questions = [...questionsMetadata];
		questions.reverse();
		let newQuestionIDs = questions.map(q => q.questionID);
		let newPossibleAnswerIDs = new Map();
		let newSurveyID;
		const qPromises = questions.map(q => {
			const originalQID = q.questionID;
			q = leadMetadataToQuestion(q);
			q.questionTypeID = 3;
			q.geoLocation = { longitude: 0, latitude: 0};
			if (!q.mediaID) { q.mediaID = EMPTY_MEDIA_ID; }
			delete q.questionID;
			q.possibleAnswers.forEach((pa, idx) => {
				Object.assign(pa, q.popupLocations[idx]);
				pa.numericValue = idx;
				let attributes = 0;
				if (pa.randomLocation) { attributes |= 1; }
				if (pa.multiBehavior === 'none') { attributes |= 2; }
				if (pa.multiBehavior === 'all') { attributes |= 4; }
				pa.attributes = attributes;
				delete pa.possibleAnswerID;
			});
			return this.fetchEndpoint(`questions/add`, q)
			.then(result => {
				const newQuestionID = result.postID;
				newQuestionIDs[originalQID] = newQuestionID;
				newPossibleAnswerIDs.set(newQuestionID, result.possibleAnswersID);
				
				questions[originalQID].questionID = newQuestionID;
				questions[originalQID].possibleAnswers.forEach((pa, idx) => {
					pa.possibleAnswerID = result.possibleAnswersID[idx];
				});
			});
		});
		
		return Promise.all(qPromises)
		.then(qResults => {
			let questionsVariants;
			if (questionsVariantsMetadata) {
				questionsVariants = [...questionsVariantsMetadata];
				questionsVariants.forEach(v => v.questionID = newQuestionIDs[v.questionID]);
			}
			let survey = leadMetadataToSurvey({ questions, questionsVariants }, true);
			survey.questionIDs = newQuestionIDs;
			survey.title = `Survey from lead ${leadID}`;
			survey.description = `Survey from lead ${leadID}`;
			delete survey.questions;
			const transformConnectionsDictionary = dict => Object.keys(dict).map(sourceID => {
				return {
					ID: Number(sourceID),
					destination: dict[sourceID]
				};
			});
			survey.connections.possibleAnswers = transformConnectionsDictionary(survey.connections.possibleAnswers);
			
			return this.fetchEndpoint(`surveys/add`, survey)
			.then(sResults => {
				newSurveyID = sResults.surveyID;
				return {
					surveyID: newSurveyID,
					questionIDs: newQuestionIDs,
					possibleAnswerIDs: newPossibleAnswerIDs
				};
			})
		});
	}


	/* API - Not yet implemented */
	fetchMediaPlan(researchID) {
		return this.fetchURL(`/mockdata/${researchID}/mediaPlan.json`)
	}
}

export default AskemAPI;
