import { createLogic } from 'redux-logic';

import INDUSTRY_LIST from 'constants/INDUSTRY_LIST';

const createLeadGenLogic = createLogic({
	type: 'CREATE_NEW_LEADGEN',
	process({ getState, action, api }, dispatch) {
		const leadgenID = action.payload.leadgenID;
		 dispatch({ type: 'CREATE_NEW_LEADGEN_REQUEST_START' }, { allowMore: true });

		const today = new Date();
		const startDate = new Date(today.setDate(today.getDate() + 10));

		const params = {
			leadgenID,
			ageGroups : ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
			gender : ['female', 'male'],
			industry : INDUSTRY_LIST[0].id,
			intentToPurchase : INDUSTRY_LIST[0].items[0].id,
			campaignStartDate : startDate,
			campaignEndDate : null
		}

		return api.createLeadGen(params)
			.then(() => {
				localStorage.leadgenID = leadgenID;
				dispatch({ type: 'CREATE_NEW_LEADGEN_REQUEST_SUCCESS' }, { allowMore: true });
			})
			.catch(error => { 
				dispatch({ type: 'CREATE_NEW_LEADGEN_REQUEST_FAIL', payload: { error }, error: true })
			});
	}
});


const updateLeadgenLogic = createLogic({
	latest: true,
	debounce: 2000,
	type : 'AUTO_SAVE_LEADGEN',
	process({ getState, action, api }, dispatch) {
		const leadgenID = getState().getIn(['data', 'lead', 'leadgenID']);
		const ageGroups = getState().getIn(['data', 'lead', 'metadata', 'ageGroups']);
		const gender = getState().getIn(['data', 'lead', 'metadata', 'gender']);
		const industry = getState().getIn(['data', 'lead', 'metadata', 'industry']);
		const intentToPurchase = getState().getIn(['data', 'lead', 'metadata', 'intentToPurchase']);
		const campaignStartDate = getState().getIn(['data', 'lead', 'metadata', 'campaignStartDate']);
		const campaignEndDate = getState().getIn(['data', 'lead', 'metadata', 'campaignEndDate']);
		const industryTextValue = getState().getIn(['data', 'lead', 'metadata', 'industryTextValue']);
		const intentToPurchaseText = getState().getIn(['data', 'lead', 'metadata', 'intentToPurchaseText']);
		
		const params = {
			leadgenID,
			ageGroups,
			gender,
			industry,
			intentToPurchase,
			campaignStartDate,
			campaignEndDate,
			industryTextValue,
			intentToPurchaseText,
			type : 'leadgen'
		}

		dispatch({ type : 'LEADGEN_UPDATE_REQUEST_START'}, {allowMore : true});

		return api.updateLeadGen(params)
			.then(data => {
				dispatch({ type : 'LEADGEN_UPDATE_REQUEST_SUCCESSFULL'}, {allowMore : true});
			})
			.catch(err => {
				dispatch({ type : 'LEADGEN_UPDATE_REQUEST_FAIL',  payload : { error }, error : true});
			});
	}
})

const autoSaveLeadGenLogic = createLogic({
	type : [
			'CREATE_NEW_LEADGEN',
			'LEADGEN_AGE_GROUP_CHANGE',
			'LEADGEN_GENDER_CHANGE',
			'LEADGEN_INDUSTRY_CHANGE',
			'LEADGEN_CAMPAIGN_DATE_CHANGE',
			'LEADGEN_INTENT_TO_PURCHASE_CHANGE',
	],
	process({getState, action, api}, dispatch) {
		dispatch({type : 'AUTO_SAVE_LEADGEN'})
	}
})

const getLeadGenLogic = createLogic({
	type : 'LOAD_LEADGEN',
	process({getState, action, api}, dispatch) {
		dispatch({ type : 'LOAD_LEADGEN_REQUEST_START', payload : action.payload.leadgenID}, {allowMore : true});
		return api.getLeadGen(action.payload.leadgenID)
				.then(response => {
					dispatch({
							 type : 'LOAD_LEADGEN_REQUEST_SUCCESS',
							 payload : {
								lead: response.lead
							 }
							}, {allowMore : true});
				})
				.catch(err => {
					dispatch({ type : 'LOAD_LEADGEN_REQUEST_FAILURE'}, {allowMore : true});
					console.error(err);
				})
	}
});


export default [ 
	createLeadGenLogic,
	autoSaveLeadGenLogic,
	updateLeadgenLogic,
	getLeadGenLogic
];