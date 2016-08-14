const addAudience = (researchID, audienceSource, audienceIDs) => {
	return {
		type: 'ADD_AUDIENCE',
		payload: {
			researchID,
			audienceSource,
			audienceIDs
		}
	}
}

export default addAudience;
