const onAgeGroupChange = (ageGroups) => {
	return {
		type : 'LEADGEN_AGE_GROUP_CHANGE',
		payload : {
			ageGroups
		}
	}
}

const onGenderChange = (genders) => {
	return {
		type : 'LEADGEN_GENDER_CHANGE',
		payload : {
			genders
		}
	}
}

const onIndustryChange = (industry, intentToPurchase, estimatedAudienceSize, price, industryTextValue) => {
	return {
		type : 'LEADGEN_INDUSTRY_CHANGE',
		payload: {
			industry,
			intentToPurchase,
			estimatedAudienceSize, 
			price,
			industryTextValue
		}
	}
}

const onCampaignDateChange = (campaignStartDate, campaignEndDate) => {
	return {
		type : 'LEADGEN_CAMPAIGN_DATE_CHANGE',
		payload : {
			campaignStartDate,
			campaignEndDate
		}
	}
}

const onIntentToPurchaseChange = (intentToPurchase, estimatedAudienceSize, price, textValue) => {
	return {
		type : 'LEADGEN_INTENT_TO_PURCHASE_CHANGE',
		payload : {
			intentToPurchase,
			estimatedAudienceSize, 
			price,
			textValue
		}
	}
}

const proceedToLeadgenContactForm = (leadgenID) => {
	return {
		type : 'GOTO_LEADGEN_CONTACT_FORM',
		payload : {
			leadgenID 
		}
	}
}

export {
	onAgeGroupChange,
	onGenderChange,
	onIndustryChange,
	onCampaignDateChange,
	onIntentToPurchaseChange,
	proceedToLeadgenContactForm
}