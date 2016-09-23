import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import DashboardFrame from 'components/base/DashboardFrame';

const DummyComponent = () => (
	<div style={{color:'red'}}></div>
);

const quoteRouter = (store) =>  {
	// Create an enhanced history that syncs navigation events with the store
	const history = syncHistoryWithStore(/*browserHistory*/hashHistory, store, {
	    selectLocationState (state) {
	        return state.get('routing').toJS();
	    }
	});

	return <Router history={history}>
		<Route component={DashboardFrame}>
			<Route path="/" component={DummyComponent} />
		</Route>
	</Router>;
}

export default quoteRouter;
