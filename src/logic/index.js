import briefLogic from 'logic/briefLogic';
import fetchMediaPlan from 'logic/fetchMediaPlan';
import { fetchResearch, fetchResearchKPIs } from 'logic/researchLogic';

export default [
	fetchMediaPlan,
	briefLogic,
	fetchResearch,
	fetchResearchKPIs,
];
