const getResearch = researchID => {
	return {
		type: 'FETCH_RESEARCH',
		payload: {
			researchID
		}
	}
}

export { getResearch };
