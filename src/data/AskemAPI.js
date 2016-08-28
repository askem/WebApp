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
		headers.append('Authorization', `Bearer ${this._accessToken}`);
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
		});
	}

	fetch(endpoint, postObject) {
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
	fetchResearchCampaign(researchID) {
		return this.fetch(`researchCampaigns/${researchID}`)
		.then(results => results.researchCampaign);
	}
	fetchSamplingKPIs(samplingID) {
		return this.fetch(`samplings/${samplingID}/kpis`);
	}

	/* API - Not yet implemented */
	fetchMediaPlan(researchID) {
		return this.fetchURL(`/mockdata/${researchID}/mediaPlan.json`)
	}
}

export default AskemAPI;
