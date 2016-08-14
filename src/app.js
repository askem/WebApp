import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Immutable from 'immutable';
import DashboardFrame from 'components/base/DashboardFrame';
import ResearchOverviewContainer from 'containers/ResearchOverviewContainer';
import MediaPlanContainer from 'containers/MediaPlanContainer';
import TaggingContainer from 'containers/TaggingContainer';
import AudiencesContainer from 'containers/AudiencesContainer';
import ResearchSurveyContainer from 'containers/ResearchSurveyContainer';
import SamplingsListContainer from 'containers/SamplingsListContainer';
import SampleMixContainer from 'containers/SampleMixContainer';
import BriefContainer from 'containers/BriefContainer';
import ResearchResultsContainer from 'containers/ResearchResultsContainer';
import { combineReducers } from 'redux-immutable';
import dataReducer from 'reducers/dataReducer';
import routing from 'reducers/routingReducer';
import logger from 'middleware/logger';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import mockData from 'data/mockData';
import dceModel from 'data/DCE';

// Needed for onTouchTap - for material-ui
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


mockData.model = dceModel;
const initialState = Immutable.fromJS({
	data: mockData
});

const rootReducer = combineReducers({
	data: dataReducer,
	routing
});

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(
			logger
		),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)

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

const muiTheme = getMuiTheme({
 	palette: {
		textColor: '#9665aa',
 	},
 	textField: {
		floatingLabelColor: '#9665aa',
		focusColor: '#9665aa'
 	},
	floatingActionButton: {
		color: '#9665aa'
	}
});

render(
	<MuiThemeProvider muiTheme={muiTheme}>
	<Provider store={store}>
		<Router history={history}>
			<Route component={DashboardFrame}>
				<Route path="/" component={DummyComponent} />
				<Route path="/campaigns/:researchID" component={ResearchOverviewContainer} />
				<Route path="/campaigns/:researchID/brief" component={BriefContainer} />
				<Route path="/campaigns/:researchID/media" component={MediaPlanContainer} />
				<Route path="/campaigns/:researchID/tagging" component={TaggingContainer} />
				<Route path="/campaigns/:researchID/audiences" component={AudiencesContainer} />
				<Route path="/campaigns/:researchID/results" component={ResearchResultsContainer} />
				<Route path="/campaigns/:researchID/survey" component={ResearchSurveyContainer} />
				<Route path="/campaigns/:researchID/samplings" component={SamplingsListContainer} />
				<Route path="/campaigns/:researchID/samplings/:samplingID/samplemix" component={SampleMixContainer} />
			</Route>
		</Router>
	</Provider>
	</MuiThemeProvider>,
	document.getElementById('app')
);
