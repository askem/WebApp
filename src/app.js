import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Immutable from 'immutable';
import { TodoList } from 'containers/dashboardContainer';
import { combineReducers } from 'redux-immutable';
import dashReducer from 'reducers/dashboardReducer';
import routing from 'reducers/routingReducer';

const initialState = Immutable.fromJS({
	data:[
		{ id: 0, isDone: true,  text: 'make components' },
		{ id: 1, isDone: false, text: 'design actions' },
		{ id: 2, isDone: false, text: 'implement reducer' },
		{ id: 3, isDone: false, text: 'connect components' }
	]
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
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toJS();
    }
});

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={TodoList} />
		</Router>
	</Provider>,
	document.getElementById('app')
);
