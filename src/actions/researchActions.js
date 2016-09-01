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

const commitResearchData = researchID => {
	return {
		type: 'COMMIT_RESEARCH_DATA',
		payload: {
			researchID
		}
	}
};

export { getResearch, getResearchKPIs, commitResearchData };
