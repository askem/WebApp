import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import genGUID from 'utils/Askem/genGUID';
import QuoteFrame from 'components/base/QuoteFrame';
import QuoteWizardContainer from 'containers/QuoteWizardContainer';

const quoteRouter = (store) =>  {
	// Create an enhanced history that syncs navigation events with the store
	const history = syncHistoryWithStore(browserHistory/*hashHistory*/, store, {
	    selectLocationState (state) {
	        return state.get('routing').toJS();
	    }
	});

	const enterWithoutID = (nextState, replace) => {
		const existingQuoteID = store.getState().getIn(['data', 'lead', 'quoteID']);
		if (!existingQuoteID) {
			const quoteID = genGUID();
			console.info(`Redirecting to new quote ${quoteID}`);
			replace(`/${quoteID}`);
			store.dispatch({
				type: 'CREATE_NEW_QUOTE',
				payload: {
					quoteID
				}
			});
		}
	}
	
	const enterWithID = (nextState, replace) => {
		const quoteID = nextState.params.quoteID;
		const existingQuoteID = store.getState().getIn(['data', 'lead', 'quoteID']);
		if (existingQuoteID === quoteID) { return; }
		store.dispatch({
			type: 'LOAD_QUOTE',
			payload: {
				quoteID
			}
		});
	}

	return <Router history={history}>
		<Route component={QuoteFrame}>
			<Route path="/" onEnter={enterWithoutID} />
			<Route path="/:quoteID" component={QuoteWizardContainer} onEnter={enterWithID} />
		</Route>
	</Router>;
}

export default quoteRouter;
