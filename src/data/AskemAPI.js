import AGE_GROUPS from 'constants/AGE_GROUPS';
import quoteContactFields from 'constants/quoteContactFields';

const defaultModelData = {
	"modelID": "dce",
	"modelVersion": "0.1",
	"locale": "en-US",
	"variableValues": [],
	"requiredKPIs": ["exposure_targeting"]
};

class AskemAPI {
	constructor(props = {}) {
		this._baseURI = props.baseURI || 'https://api.askem.com/0/';
		this._loginURI = props.loginURI || 'https://askem.com/profile/login';
		this._accessToken = props.accessToken;
		this.setHeaders();
	}
	setAccessToken(accessToken) {
		if (this._accessToken === accessToken) { return; }
		this._accessToken = accessToken;
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
		return this.fetchURL(this._loginURI, {
			method: 'POST',
			method: 'cors',
			body: JSON.stringify({email, password}),
			headers
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

	fetchReach(audience) {
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

		if (audience.demographics.ageGroups.length !== AGE_GROUPS.length) {
			attributes = attributes.concat(AGE_GROUPS
			.filter(group => audience.demographics.ageGroups.includes(group.id))
			.map(group => group.attribute));
		}

		attributes = attributes.concat(audience.interests);
		attributes = attributes.concat(audience.behaviors);

		const phrase = {
			attributes
		};
		return this.fetchEndpoint('segments/reach', phrase);
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

	createQuote(quoteID, quote) {
		return this.fetchEndpoint('external/leads', {
			ID: quoteID,
			metadata: JSON.stringify(quote)
		});
	}
	updateQuote(quoteID, quote = {}, contact, description = '') {
		let quoteUpdate = {
			ID: quoteID,
			metadata: JSON.stringify(quote),
			description
		};
		quoteUpdate = Object.assign({}, quoteUpdate, contact);
		return this.fetchEndpoint(`external/leads/${quoteID}`, quoteUpdate);
	}
	getQuoteByID(quoteID) {
		return this.fetchEndpoint(`external/leads/${quoteID}`)
		.then(results => {
			if (results && results.lead && results.lead.metadata) {
				return JSON.parse(results.lead.metadata)
			} else {
				return null;
			}
		});
	}

	/* API - Not yet implemented */
	fetchMediaPlan(researchID) {
		return this.fetchURL(`/mockdata/${researchID}/mediaPlan.json`)
	}
}

export default AskemAPI;
