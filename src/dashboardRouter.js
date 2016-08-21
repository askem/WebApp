import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

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

const DummyComponent = () => (
	<div style={{color:'red'}}></div>
);

const dashboardRouter = (store) =>  {
	// Create an enhanced history that syncs navigation events with the store
	const history = syncHistoryWithStore(/*browserHistory*/hashHistory, store, {
	    selectLocationState (state) {
	        return state.get('routing').toJS();
	    }
	});

	return <Router history={history}>
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
	</Router>;
}

export default dashboardRouter;
