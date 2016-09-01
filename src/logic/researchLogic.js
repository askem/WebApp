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

const commitResearchData = createLogic({
	type: 'COMMIT_RESEARCH_DATA',
	cancelType: 'CANCEL_COMMIT_RESEARCH_DATA',
	latest: true,
	validate({ getState, action }, allow, reject) {
		const researchID = action.payload.researchID;
		let modelData = getState().getIn(['data', 'researchCampaigns', researchID, 'modelData']);
		if (!modelData || modelData.get('loadingFail')) {
			reject(action);
		}
		modelData = modelData.toJS();
		const kpiBindings = null;
		const surveyID = null;
		action.payload.modelData = modelData;
		action.payload.kpiBindings = kpiBindings;
		action.payload.surveyID = surveyID;
		allow(action);
	},
	process({ getState, action, api }, dispatch) {
		const researchID = action.payload.researchID;
    	return api.updateResearchData(researchID, action.payload.modelData, action.payload.kpiBindings, action.payload.surveyID)
		.then(result => dispatch({ type: 'COMMIT_RESEARCH_DATA_SUCCESS', payload: {
			researchID,

		}}))
	    .catch(error => dispatch({ type: 'COMMIT_RESEARCH_DATA_FAIL', payload: {
			researchID,
			error
		}, error: true }));
	}
});

export { fetchResearch, fetchResearchKPIs, commitResearchData };
