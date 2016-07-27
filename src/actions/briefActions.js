const setResearchKPIs = (researchID, kpis) => {
	return {
		type: 'SET_RESEARCH_KPIS',
		payload: {
			researchID,
			kpis
		}
	}
}

const toggleResearchKPI = (researchID, kpi, allKPIs) => {
	return {
		type: 'TOGGLE_RESEARCH_KPI',
		payload: {
			researchID,
			kpi,
			allKPIs
		}
	}
}

const setModelVariable = (researchID, variableID, value) => {
	return {
		type: 'SET_MODEL_VARIABLE',
		payload: {
			researchID,
			variableID,
			value
		}
	}
}

export { setResearchKPIs, toggleResearchKPI, setModelVariable };
