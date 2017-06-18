import 'babel-polyfill';
require('sass/quote.scss');

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import quoteDataReducer from 'reducers/quoteDataReducer';
import routingReducer from 'reducers/routingReducer';
import resultsReducer from 'reducers/resultsReducer';
// import commitsReducer from 'reducers/commitsReducer';
import quoteRouter from 'routers/quoteRouter';
import logger from 'middleware/logger';

import { createLogicMiddleware } from 'redux-logic';
import quoteLogics from 'logic/quoteLogic';
import quoteRoutingLogics from 'logic/quoteRoutingLogic';
import leadGenLogic from 'logic/leadGenLogic';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import quoteAnalytics from 'middleware/quoteAnalytics';

import AskemAPI from 'data/AskemAPI';

// Needed for onTouchTap - for material-ui
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const api = new AskemAPI({
	//baseURI: 'http://b00efe1d45b54369be28736a4235a52f.cloudapp.net/0/',
	//baseURI: 'https://3po.askem.com/0/',
	baseURI: __API_ROOT__,
	//accessToken: '2d5a3b3cef67422db402273506fa9152',
	//loginURI: 'https://r2d2.askem.com/0/login'
});
window.api = api;

const logicDeps = {
	api,
};
let logics = [];
logics = logics.concat(quoteLogics);
logics = logics.concat(quoteRoutingLogics);
logics = logics.concat(leadGenLogic);
const logicMiddleware = createLogicMiddleware(logics, logicDeps);

const initialState = Immutable.fromJS({
	data: {
		quote: {},
		contact: {},
		imageSuggestions: {}
	}
});

const rootReducer = combineReducers({
	data: quoteDataReducer,
	routing: routingReducer,
	results: resultsReducer,
	// commits: commitsReducer,
});

let mainReducer = rootReducer;
if (__DEV__) {
	window.s = () => {
		localStorage.state = JSON.stringify(store.getState().toJS());
	}
	window.l = () => {
		store.dispatch({type: 'DEBUG_REPLACE_STORE', payload: JSON.parse(localStorage.state)});
	}
	const debugReducer = (state, action) => {
		switch (action.type) {
			case 'DEBUG_REPLACE_STORE':
				return Immutable.fromJS(action.payload);			
			default:
				return rootReducer(state, action);
		}
	}
	const mainReducer = debugReducer;
}

let middleware = [
	logger,
	logicMiddleware
];
if (__PRODUCTION__) {
	middleware.push(quoteAnalytics);
}

const store = createStore(
	mainReducer,
	initialState,
	compose(
		applyMiddleware(
			...middleware
		),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)

);
const router = quoteRouter(store, api);

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

/* Integrations */
if (__PRODUCTION__) {
	// Google Analytics
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-87736891-2', 'auto');
	ga('send', 'pageview');
	
	// Facebook Pixel
	!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', '1848903508664772'); 
	fbq('track', 'PageView');
	
	// Intercom
	window.intercomSettings = {
	  app_id: 'p1iplum8'
	};
 	(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/p1iplum8';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
	
	// Linkedin
	window._linkedin_data_partner_id = '21993';
	(function(){var s = document.getElementsByTagName("script")[0];
	var b = document.createElement("script");
	b.type = "text/javascript";b.async = true;
	b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
	s.parentNode.insertBefore(b, s);})();
	
	// Askem Pixel
	const currentURL = location.href;
	const referrerURL = document.referrer || '';
	let aPixelURL = 'https://askem.com/pixel?pub=Askem&campaign=Quote&';
	aPixelURL += 'currentURL=' + encodeURIComponent(currentURL);
	aPixelURL += '&referrerURL=' + encodeURIComponent(referrerURL);
	aPixelURL += '&userAgent=' + encodeURIComponent(navigator.userAgent);
	const iframe = document.createElement('iframe');
	iframe.src = aPixelURL;
	iframe.width = '0';
	iframe.height = '0';
	iframe.style.display = 'none';
	iframe.style.visibility = 'hidden';
	document.body.appendChild(iframe);
}
