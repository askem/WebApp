import { createLogic } from 'redux-logic';

const fetchMediaPlan = createLogic({
	type: 'FETCH_MEDIA_PLAN',
	cancelType: 'CANCEL_FETCH_MEDIA_PLAN',
	latest: true,

	// processOptions: {
	// 	dispatchReturn: true,
	// 	successType: 'FETCH_MEDIA_PLAN_SUCCESS',
	// 	failType: 'FETCH_MEDIA_PLAN_FAIL',
	// },

	validate({ getState, action }, allow, reject) {
		const researchID = action.payload.researchID;
		const existing = getState().getIn(['data', 'mediaPlans', researchID]);
		if (existing && !existing.get('loadingFail')) {
			reject(action);
		} else {
			allow(action);
		}
	},

	process({ getState, action, api }, dispatch) {
		const researchID = action.payload.researchID;
    	return api(`/mockdata/${researchID}/mediaplan.json`)
		.then(response => response.json())
		// .then(mediaPlan => {
		// 	return {
		// 		researchID,
		// 		mediaPlan
		// 	};
		// })
		.then(mediaPlan => dispatch({ type: 'FETCH_MEDIA_PLAN_SUCCESS', payload: {
			researchID,
			mediaPlan
		}}))
	    .catch(error => dispatch({ type: 'FETCH_MEDIA_PLAN_FAIL', payload: {
			researchID,
			error
		}, error: true }));

	}
});

export default fetchMediaPlan;
