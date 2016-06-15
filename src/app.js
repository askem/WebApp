import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Immutable from 'immutable';
import { TodoList } from 'containers/DashboardContainer';
import DashboardFrame from 'components/base/DashboardFrame';
import ResearchOverviewContainer from 'containers/ResearchContainer';
import SamplingsListContainer from 'containers/SamplingsListContainer';
import SampleMixContainer from 'containers/SampleMixContainer';
import ResearchResultsContainer from 'containers/ResearchResultsContainer';
import { combineReducers } from 'redux-immutable';
import dashReducer from 'reducers/dashboardReducer';
import routing from 'reducers/routingReducer';

const initialState = Immutable.fromJS({
	data: {
		todos: [
			{ id: 0, isDone: true,  text: 'make components' },
			{ id: 1, isDone: false, text: 'design actions' },
			{ id: 2, isDone: false, text: 'implement reducer' },
			{ id: 3, isDone: false, text: 'connect components' }
		],

		selectedResearchCampaign: 0,


		researchCampaigns: {
			1073: { title: 'Yoplait ADCE June 2016', samplings:[0, 1] }
		},
		samplings: {
			0: { samplingID: 0, surveyID: 79, surveyType: 'ADCE', status: 'Running', approvedSampleMix: 1464710210668 },
			1: { samplingID: 1, surveyID: 83, surveyType: 'Custom', status: 'Draft', approvedSampleMix: null }
		},
		sampleMixes: {
			1464710210668: {}
		}
	}
});

const rootReducer = combineReducers({
	data: dashReducer,
	routing
});

const store = createStore(
	rootReducer,
	initialState,
	window.devToolsExtension && window.devToolsExtension()
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(/*browserHistory*/hashHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toJS();
    }
});

const DummyComponent = () => (
	<div style={{color:'red'}}>DummyComponent</div>
);

// <Provider store={store}>
// 	<DashboardFrame>
// 		<Router history={history}>
// 			<Route path="/" component={TodoList}>
// 			</Route>
// 			<Route path="campaigns/:researchID" component={ResearchOverviewContainer} />
// 		</Router>
// 	</DashboardFrame>
// </Provider>,
render(
	<Provider store={store}>
		<Router history={history}>
			<Route component={DashboardFrame}>
				<Route path="/" component={TodoList} />
				<Route path="/campaigns/:researchID" component={ResearchOverviewContainer} />
				<Route path="/campaigns/:researchID/results" component={ResearchResultsContainer} />
				<Route path="/campaigns/:researchID/samplings" component={SamplingsListContainer} />
				<Route path="/campaigns/:researchID/samplings/:samplingID/samplemix" component={SampleMixContainer} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);
