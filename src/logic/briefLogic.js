import { createLogic } from 'redux-logic';

const fetchBriefLogic = createLogic({
 	// declarative built-in functionality wraps your code
	type: 'FETCH_BRIEF', // only apply this logic to this type
	cancelType: 'CANCEL_FETCH_BRIEF', // cancel on this type
	latest: true, // only take latest

	processOptions: {
		dispatchReturn: true, // use returned/resolved value(s) for dispatching
		// provide action types or action creator functions to be used
		// with the resolved/rejected values from promise/observable returned
		successType: 'FETCH_BRIEF_SUCCESS', // dispatch this success act type
		failType: 'FETCH_BRIEF_FAILED', // dispatch this failed action type
	},

	// dispatchReturn option allows you to simply return obj, promise, obs
	// not needing to use dispatch directly
	process({ getState, action }) {
    	return fetch('https://survey.codewinds.com/polls')
			//.then(resp => resp.data.polls);
	}
});

export default fetchBriefLogic;
