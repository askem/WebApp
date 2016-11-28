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

export default [
	enterWithoutIDLogic,
	enterWithIDLogic,
	manageCreateNewLogic
];
