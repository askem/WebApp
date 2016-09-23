const setQuoteDemoGender = (gender, value) => {
	return {
		type: 'SET_QUOTE_DEMO_GENDER',
		payload: {
			gender,
			value
		}
	}
}

const setQuoteDemoAgeGroups = (value) => {
	return {
		type: 'SET_QUOTE_DEMO_AGE_GROUPS',
		payload: {
			value
		}
	}
}

export { setQuoteDemoGender, setQuoteDemoAgeGroups };
