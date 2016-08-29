import { createLogic } from 'redux-logic';

const fetchResearch = createLogic({
	type: 'FETCH_RESEARCH',
	cancelType: 'CANCEL_FETCH_RESEARCH',
	latest: true,
	validate({ getState, action }, allow, reject) {
		const researchID = action.payload.researchID;
		const existing = getState().getIn(['data', 'researchCampaigns', researchID]);
		if (existing && !existing.get('loadingFail')) {
			reject(action);
		} else {
			allow(action);
		}
	},
	process({ getState, action, api }, dispatch) {
		const researchID = action.payload.researchID;
    	return api.fetchResearchCampaign(researchID)
		.then(research => dispatch({ type: 'FETCH_RESEARCH_SUCCESS', payload: {
			researchID,
			research
		}}))
	    .catch(error => dispatch({ type: 'FETCH_RESEARCH_FAIL', payload: {
			researchID,
			error
		}, error: true }));
	}
});

const fetchResearchKPIs = createLogic({
	type: 'FETCH_RESEARCH_KPIS',
	cancelType: 'CANCEL_FETCH_RESEARCH_KPIS',
	latest: true,
	validate({ getState, action }, allow, reject) {
		const researchID = action.payload.researchID;
		const existing = getState().getIn(['data', 'resultsByResearch', researchID]);
		if (existing && !existing.get('loadingFail')) {
			reject(action);
		} else {
			allow(action);
		}
	},
	process({ getState, action, api }, dispatch) {
		const researchID = action.payload.researchID;
    	return api.fetchResearchKPIs(researchID)
		.then(resultsSet => dispatch({ type: 'FETCH_RESEARCH_KPIS_SUCCESS', payload: {
			researchID,
			resultsSet
		}}))
	    .catch(error => dispatch({ type: 'FETCH_RESEARCH_KPIS_FAIL', payload: {
			researchID,
			error
		}, error: true }));
	}
});

export { fetchResearch, fetchResearchKPIs };
