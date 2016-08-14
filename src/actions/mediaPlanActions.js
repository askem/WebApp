const addMediaPlanChannels = (researchID, channels) => {
	return {
		type: 'ADD_MEDIA_PLAN_CHANNELS',
		payload: {
			researchID,
			channels
		}
	}
}

export { addMediaPlanChannels };
