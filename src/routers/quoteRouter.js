import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import genGUID from 'utils/Askem/genGUID';
import QuoteFrame from 'components/base/QuoteFrame';
import QuoteWizardContainer from 'containers/QuoteWizardContainer';
import Login from 'components/Base/Login';

const QuoteManageContainer = () => <h1>Manage Quote</h1>;

const quoteRouter = (store, api) =>  {
	// Create an enhanced history that syncs navigation events with the store
	const history = syncHistoryWithStore(browserHistory/*hashHistory*/, store, {
	    selectLocationState (state) {
	        return state.get('routing').toJS();
	    }
	});

	const enterWithoutID = (nextState, replace) => {
		setTimeout( ()=> 
			store.dispatch({
				type: 'ROUTING_ENTER_WITHOUT_ID'
			})
		, 0);
		
		// const existingQuoteID = store.getState().getIn(['data', 'lead', 'quoteID']);
		// if (!existingQuoteID) {
		// 	let quoteID = localStorage.inProgressQuoteID;
		// 	if (quoteID) {
		// 		replace(`/${quoteID}`);
		// 	} else {
		// 		quoteID = genGUID();
		// 		console.info(`Redirecting to new quote ${quoteID}`);
		// 		replace(`/${quoteID}`);
		// 		store.dispatch({
		// 			type: 'CREATE_NEW_QUOTE',
		// 			payload: {
		// 				quoteID
		// 			}
		// 		});
		// 	}
		// }
	}
	
	const enterWithID = (nextState, replace) => {
		
		const quoteID = nextState.params.quoteID;
		// const existingQuoteID = store.getState().getIn(['data', 'lead', 'quoteID']);
		// if (existingQuoteID === quoteID) { return; }
		setTimeout(()=> 
			store.dispatch({
				type: 'ROUTING_ENTER_WITH_ID',
				payload: {
					quoteID
				}
			}), 0);
	}
	
	const enterRestricted = (nextState, replace) => {
		if (!api.loggedIn()) {
			replace({
				pathname: '/login',
				state: {
					nextPathname: nextState.location.pathname
				}
			});
			return;
		}
	};
	
	const enterRestrictedWithID= (nextState, replace) => {
		if (!api.loggedIn()) {
			replace({
				pathname: '/login',
				state: {
					nextPathname: nextState.location.pathname
				}
			});
			return;
		}
		const quoteID = nextState.params.quoteID;
		setTimeout(()=> 
			store.dispatch({
				type: 'ROUTING_ENTER_WITH_ID',
				payload: {
					quoteID
				}
			}), 0);
	};
	
	const signOut =  (nextState, replace) => {
		api.signOut();
		history.goBack();
		// replace({
		// 	pathname: '/login',
		// 	// state: {
		// 	// 	nextPathname: nextState.location.pathname
		// 	// }
		// });
	};

	return <Router history={history}>
		<Route component={QuoteFrame}>
			<Route path="/" onEnter={enterWithoutID} />
			<Route path="/login" component={Login} />
			<Route path="/signout" onEnter={signOut} />
			<Route path="/admin" onEnter={enterRestricted} />
			<Route path="/:quoteID" component={QuoteWizardContainer} onEnter={enterWithID} />
			<Route path="/:quoteID/manage" component={QuoteManageContainer} onEnter={enterRestrictedWithID} />
		</Route>
	</Router>;
}

export default quoteRouter;
