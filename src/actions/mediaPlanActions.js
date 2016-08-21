const addMediaPlanChannels = (researchID, channels) => {
	return {
		type: 'ADD_MEDIA_PLAN_CHANNELS',
		payload: {
			researchID,
			channels
		}
	}
}

const getMediaPlan = researchID => {
	return {
		type: 'FETCH_MEDIA_PLAN',
		payload: {
			researchID
		}
	}
}

export { addMediaPlanChannels, getMediaPlan };
