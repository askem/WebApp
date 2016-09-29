import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import quoteDataReducer from 'reducers/quoteDataReducer';
import routingReducer from 'reducers/routingReducer';
// import commitsReducer from 'reducers/commitsReducer';
import quoteRouter from 'routers/quoteRouter';
import logger from 'middleware/logger';

// import { createLogicMiddleware } from 'redux-logic';
// import logics from 'logic/index';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import mockData from 'data/mockData';
// import dceModel from 'data/DCE';
import AskemAPI from 'data/AskemAPI';

// Needed for onTouchTap - for material-ui
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const api = new AskemAPI({
	baseURI: 'https://3po.askem.com/0/',
	accessToken: '2d5a3b3cef67422db402273506fa9152',
	loginURI: 'https://r2d2.askem.com/0/login'
});

// For console testing
window.api = api;

// const logicDeps = {
// 	api,
// };
// const logicMiddleware = createLogicMiddleware(logics, logicDeps);

const initialState = Immutable.fromJS({
	data: {
		sample: {
			sampleSize: 400,
			reach: 350000000
		},
		demographics: {
			gender: {
				male: true,
				female: true
			},
			ageGroups: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+']
		},
		surveyMetadata: {
			questions: [
				
			]
		}
	}
});

const rootReducer = combineReducers({
	data: quoteDataReducer,
	routing: routingReducer,
	// commits: commitsReducer,
});

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(
			logger
			// logicMiddleware
		),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)

);
const router = quoteRouter(store);

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
