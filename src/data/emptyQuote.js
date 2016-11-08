const emptyQuote =  {
	reachEstimate: {
		reach: null
	},
	
	sample: {
		sampleSize: 500,
		moe: 0.043
	},

	audience: {
		// baseAudience
		demographics: {
			gender: {
				male: true,
				female: true
			},
			ageGroups: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+']
		},
		facebookPages: [
			// {
			// 	facebookID: '12345678',
			// 	name: 'MY FACEBOOK PAGE',
			// 	fans: 300000,
			// 	iconURL: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/10489765_862388573774524_778769360338540944_n.png?oh=c0c407d5181442f0b7f72d21be9a7362&oe=58736EE4',
			// 	targetConnected: true
			// }
		],
		interests: [],
		behaviors: []
	},

	surveyMetadata: {
		questions: []
	}
};

export default emptyQuote;
