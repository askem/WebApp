const setQuoteDemoGender = (gender, value) => {
	return {
		type: 'SET_QUOTE_DEMO_GENDER',
		payload: {
			gender,
			value
		}
	}
}

const toggleQuoteDemoAgeGroup = (ageGroup) => {
	return {
		type: 'TOGGLE_QUOTE_DEMO_AGE_GROUP',
		payload: {
			ageGroup
		}
	}
}

export { setQuoteDemoGender, toggleQuoteDemoAgeGroup };
