const approveSampleMix = (samplingID) => {
	return {
		type: 'APPROVE_SAMPLE_MIX',
		payload: {
			samplingID
		}
	}
}

export default approveSampleMix;
