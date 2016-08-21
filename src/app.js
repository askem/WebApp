import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import dataReducer from 'reducers/dataReducer';
import routingReducer from 'reducers/routingReducer';
import dashboardRouter from 'dashboardRouter';
import logger from 'middleware/logger';

import { createLogicMiddleware } from 'redux-logic';
import logics from 'logic/index';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import mockData from 'data/mockData';
import dceModel from 'data/DCE';

// Needed for onTouchTap - for material-ui
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const api = (...params) => fetch(params)
	.then(response => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	});

const logicDeps = {
	api,
};
const logicMiddleware = createLogicMiddleware(logics, logicDeps);


mockData.model = dceModel;
const initialState = Immutable.fromJS({
	data: mockData
});

const rootReducer = combineReducers({
	data: dataReducer,
	routing: routingReducer
});

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(
			logger,
			logicMiddleware
		),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)

);
//store.dispatch({type: 'SET_MODEL', payload: dceModel});
const router = dashboardRouter(store);

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
		{router}
	</Provider>
	</MuiThemeProvider>,
	document.getElementById('app')
);
