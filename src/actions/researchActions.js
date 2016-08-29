const getResearch = researchID => {
	return {
		type: 'FETCH_RESEARCH',
		payload: {
			researchID
		}
	}
};

const getResearchKPIs = researchID => {
	return {
		type: 'FETCH_RESEARCH_KPIS',
		payload: {
			researchID
		}
	}
};


export { getResearch, getResearchKPIs };
