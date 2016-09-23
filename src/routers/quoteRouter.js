import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import QuoteFrame from 'components/base/QuoteFrame';
import QuoteWizardContainer from 'containers/QuoteWizardContainer';

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
		<Route component={QuoteFrame}>
			<Route path="/" component={QuoteWizardContainer} />
		</Route>
	</Router>;
}

export default quoteRouter;
