import briefLogic from 'logic/briefLogic';
import fetchMediaPlan from 'logic/fetchMediaPlan';
import { fetchResearch, fetchResearchKPIs, commitResearchData } from 'logic/researchLogic';

export default [
	fetchMediaPlan,
	briefLogic,
	fetchResearch,
	fetchResearchKPIs,
	commitResearchData,
];
