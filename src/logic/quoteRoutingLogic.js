import { createLogic } from 'redux-logic';
import { browserHistory } from 'react-router';
import genGUID from 'utils/Askem/genGUID';

const enterWithoutIDLogic = createLogic({
	type: 'ROUTING_ENTER_WITHOUT_ID',
	process({ getState, action, api }, dispatch) {
		const existingQuoteID = getState().getIn(['data', 'lead', 'quoteID']);
		if (!existingQuoteID) {
			let quoteID = localStorage.inProgressQuoteID;
			if (quoteID) {
				browserHistory.replace(`/${quoteID}`);
			} else {
				quoteID = genGUID();
				console.info(`Redirecting to new quote ${quoteID}`);
				browserHistory.replace(`/${quoteID}`);
				dispatch({
					type: 'CREATE_NEW_QUOTE',
					payload: {
						quoteID,
						source: 'quote.askem.com:wizard'
					}
				});
			}
		}
	}
});

const enterWithIDLogic = createLogic({
	type: 'ROUTING_ENTER_WITH_ID',
	process({ getState, action, api }, dispatch) {
		const quoteID = action.payload.quoteID;
		const existingQuoteID = getState().getIn(['data', 'lead', 'quoteID']);
		if (existingQuoteID === quoteID) { return; }
		dispatch({
			type: 'LOAD_QUOTE',
			payload: {
				quoteID
			}
		});
	}
});

const manageCreateNewLogic = createLogic({
	type: 'ROUTING_MANAGE_CREATE_NEW',
	process({ getState, action, api }, dispatch) {
		const quoteID = genGUID();
		console.info(`Redirecting to new quote ${quoteID}`);
		browserHistory.replace(`/${quoteID}/manage`);
		dispatch({
			type: 'CREATE_NEW_QUOTE',
			payload: {
				quoteID,
				source: `quote.askem.com/admin:@${api.username()}`
			}
		});
	}
});

const enterLeadGenLogic = createLogic({
	type : 'ROUTING_LEADGEN',
	process({ getState, action, api}, dispatch) {
		const existingLeadID = getState().getIn(['data', 'metadata', 'leadgenID']);
		if (!existingLeadID) {
			let leadgenID = localStorage.leadgenID;
			if (leadgenID) {
				browserHistory.replace(`/leadgen/${leadgenID}`);
			} else {
				leadgenID = genGUID();
				//console.info(`Redirecting to new quote ${quoteID}`);
				browserHistory.replace(`/leadgen/${leadgenID}`);
				dispatch({
					type : 'CREATE_NEW_LEADGEN',
					payload : {
						leadgenID
					}
				})
			}
		}
	}
})


const enterLeadGenWithIDLogic = createLogic({
	type : 'ROUTING_LEADGEN_WITH_ID',
	process({ getState, action, api }, dispatch) {
		const leadgenID = action.payload.leadgenID;
		dispatch({
			type: 'LOAD_LEADGEN',
			payload: {
				leadgenID
			}
		});
	}

})

const enterLeadgenContactForm = createLogic({
	type : 'GOTO_LEADGEN_CONTACT_FORM',
	process({ getState, action, api }, dispatch) {
		const { leadgenID }  = action.payload;
		browserHistory.replace(`/leadgen/${leadgenID}/form`);
		dispatch({
			type : 'LEADGEN_CONTACT_FORM_ENTER',
			payload:{
				leadgenID
			}
		})
	}
});

export default [
	enterWithoutIDLogic,
	enterWithIDLogic,
	manageCreateNewLogic,
	enterLeadGenLogic,
	enterLeadGenWithIDLogic,
	enterLeadgenContactForm
];
