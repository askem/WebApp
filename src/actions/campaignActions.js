const createCampaign = (caps, campaignDays, microCellMaxSize, microCellMaxImagesAds, microCellMaxCarouselAds, sampleID) => {
	return {
		type : 'CREATE_CAMPAIGN',
		payload : {
			caps,
			campaignDays,
			microCellMaxSize,
			microCellMaxImagesAds,
			microCellMaxCarouselAds,
			sampleID
		}
	}
}

const getCreateCampaignStatus = (sampleID) => {
	return {
		type : 'GET_CREATE_CAMPAIGN_STATUS',
		payload : {
			sampleID
		}
	}
}

const setCreateCampaignStatusFinished = () => {
	return {
		type : 'SET_CREATE_CAMPAIGN_STATUS_TO_FINISED',
		payload : {}
	}
}

export {
	createCampaign,
	getCreateCampaignStatus,
	setCreateCampaignStatusFinished
}