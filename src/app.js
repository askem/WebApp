import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Immutable from 'immutable';
import DashboardFrame from 'components/base/DashboardFrame';
import ResearchOverviewContainer from 'containers/ResearchOverviewContainer';
import SamplingsListContainer from 'containers/SamplingsListContainer';
import SampleMixContainer from 'containers/SampleMixContainer';
import BriefContainer from 'containers/BriefContainer';
import ResearchResultsContainer from 'containers/ResearchResultsContainer';
import { combineReducers } from 'redux-immutable';
import dashReducer from 'reducers/dashboardReducer';
import modelReducer from 'reducers/modelReducer';
import routing from 'reducers/routingReducer';

import mockData from 'data/mockData';
import dceModel from 'data/DCE';

const initialState = Immutable.fromJS({
	data: mockData,
	model: dceModel
});

const rootReducer = combineReducers({
	data: dashReducer,
	model: modelReducer,
	routing
});

const store = createStore(
	rootReducer,
	initialState,
	window.devToolsExtension && window.devToolsExtension()
);

//store.dispatch({type: 'SET_MODEL', payload: dceModel});

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(/*browserHistory*/hashHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toJS();
    }
});

const DummyComponent = () => (
	<div style={{color:'red'}}></div>
);

render(
	<Provider store={store}>
		<Router history={history}>
			<Route component={DashboardFrame}>
				<Route path="/" component={DummyComponent} />
				<Route path="/campaigns/:researchID" component={ResearchOverviewContainer} />
				<Route path="/campaigns/:researchID/brief" component={BriefContainer} />
				<Route path="/campaigns/:researchID/results" component={ResearchResultsContainer} />
				<Route path="/campaigns/:researchID/samplings" component={SamplingsListContainer} />
				<Route path="/campaigns/:researchID/samplings/:samplingID/samplemix" component={SampleMixContainer} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);
