const mockData = {
	selectedResearchCampaign: 0,

	researchCampaigns: {
		1073: {
			name: 'Alcon 2016-06',
			modelID: 'dce',
			modelVersion: '0.1',
			kpis: ['exposure_targeting', 'intent_purchase'],
			samplings:[0, 1]
		}
	},
	samplings: {
		0: { samplingID: 0, surveyID: 79, surveyType: 'DCE', status: 'Running', approvedSampleMix: 1464710210668 },
		1: { samplingID: 1, surveyID: 83, surveyType: 'Custom', status: 'Draft', approvedSampleMix: null }
	},
	sampleMixes: {
		1464710210668: {}
	},

	taggingStatus: {
		1073: {
			channels: [
				{
					"channelName": "fbvideoweb",
					"total": 1400,
					"unique": 1000,
					"facebookAudienceID": '1342353263'
				}
			]
		}
	},

	mediaPlans: {
		0: {
			channels: [
				{
					"channelName": "fbvideoweb",
					"description": "Facebook Video prerolled for OrangeOnly website vistors",
					"taggingMethod": "fbvideo",
					"estimatedReach": 20000,
					"estimatedUniques": 15000,
					"budget": "$700",
					"technicalContact": "technical@example.com",
					"businessContact": "business@example.com",
					"isRetargeting": true
				},
				{
					"channelName": "fbvideofemale",
					"description": "Facebook Video prerolled for OrangeOnly - female only 29+ IL",
					"taggingMethod": "fbvideo",
					"estimatedReach": 18000,
					"estimatedUniques": 14000,
					"budget": "$650.00",
					"technicalContact": "technical@example.com",
					"businessContact": "business@example.com",
					"isRetargeting": false
				}
			]
		}
	},

	audiences: {
		1073: [
			{
				name: 'Orange Only FB Likes',
				description: 'Facebook page likes',
				size: 18200,
				facebookAudienceID: '4123213321',
				source: 'facebook'
			},
			{
				name: 'Purchase Intent Jan 2016',
				description: 'Based on previous DCE research',
				size: 6000,
				facebookAudienceID: '4123213387',
				source: 'askem'
			},
			{
				name: 'Look Alike 1% Purchase Intent Jan 2016',
				description: 'Based on previous DCE research',
				size: 50200,
				facebookAudienceID: '4123213388',
				source: 'askem'
			},
		]
	},

	businessDashboardsByResearch: {
		1073: {
			"totalRFAs": 100,
			"completedRFAs": 90,
			"qualifiedResponders": 300,
			"spent": 321.2,
			"avargeCPM (maybe, for superadmins only)": 0.8,
			"totalImpressions": 80400,
			"uniqueImpressions": 75000,
			"dropRate": 0.3,
			"taintedRatio": 0.1,
			"spentCurrency": "$",
			"from": 3213213213,
			"to": 3213213213
		}
	},

	resultsByResearch: {
		1073: {
	"kpiSets": [
    {
      "DateCreated": "/Date(1471448695478)/",
      "FromTime": "/Date(1465815408177)/",
      "ID": 8,
      "ToTime": "/Date(1471448695478)/",
      "kpis": [
        {
          "ID": 67,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160368,
                "respondersCount": 85,
                "respondersPercentage": 0.33203,
                "textValue": "כן,  יומיות"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160369,
                "respondersCount": 114,
                "respondersPercentage": 0.44531,
                "textValue": "כן, חודשיות"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160370,
                "respondersCount": 20,
                "respondersPercentage": 0.07812,
                "textValue": "חושב להתחיל"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160371,
                "respondersCount": 37,
                "respondersPercentage": 0.14453,
                "textValue": "לא"
              }
            ],
            "numberOfResponders": 256,
            "numericAnswer": 0,
            "questionID": 2894691,
            "statisticalSignificance": 0
          },
          "categoryName": "Exposed",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "exposure_targeting",
          "qualifiedResponders": 256,
          "qualifyingResponders": 1,
          "sampleSize": 256,
          "value": 0.85547
        },
        {
          "ID": 68,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160372,
                "respondersCount": 75,
                "respondersPercentage": 0.34247,
                "textValue": "Johnson & Johnson"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160373,
                "respondersCount": 35,
                "respondersPercentage": 0.15982,
                "textValue": "Bausch + Lomb"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160374,
                "respondersCount": 77,
                "respondersPercentage": 0.3516,
                "textValue": "Life "
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160375,
                "respondersCount": 41,
                "respondersPercentage": 0.18721,
                "textValue": "Alcon"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160376,
                "respondersCount": 66,
                "respondersPercentage": 0.30137,
                "textValue": "ACUVUE"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160377,
                "respondersCount": 68,
                "respondersPercentage": 0.3105,
                "textValue": "אף אחד מהם"
              }
            ],
            "numberOfResponders": 219,
            "numericAnswer": 0,
            "questionID": 2894692,
            "statisticalSignificance": 0
          },
          "categoryName": "Exposed",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "awareness_brand",
          "qualifiedResponders": 219,
          "qualifyingResponders": 1,
          "sampleSize": 256,
          "value": 0.18721
        },
        {
          "ID": 69,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160378,
                "respondersCount": 41,
                "respondersPercentage": 0.18721,
                "textValue": "Johnson & Johnson"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160379,
                "respondersCount": 15,
                "respondersPercentage": 0.06849,
                "textValue": "Bausch + Lomb"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160380,
                "respondersCount": 25,
                "respondersPercentage": 0.11416,
                "textValue": "Life "
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160381,
                "respondersCount": 22,
                "respondersPercentage": 0.10046,
                "textValue": "Alcon"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160382,
                "respondersCount": 40,
                "respondersPercentage": 0.18265,
                "textValue": "ACUVUE"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160383,
                "respondersCount": 76,
                "respondersPercentage": 0.34703,
                "textValue": "אף אחד מהם"
              }
            ],
            "numberOfResponders": 219,
            "numericAnswer": 0,
            "questionID": 2894693,
            "statisticalSignificance": 0
          },
          "categoryName": "Exposed",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "preference_brand",
          "qualifiedResponders": 219,
          "qualifyingResponders": 1,
          "sampleSize": 256,
          "value": 0.10046
        },
        {
          "ID": 70,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160384,
                "respondersCount": 99,
                "respondersPercentage": 0.45205,
                "textValue": "כן"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160385,
                "respondersCount": 120,
                "respondersPercentage": 0.54795,
                "textValue": "לא"
              }
            ],
            "numberOfResponders": 219,
            "numericAnswer": 0,
            "questionID": 2894694,
            "statisticalSignificance": 0
          },
          "categoryName": "Exposed",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "recall_campaign",
          "qualifiedResponders": 219,
          "qualifyingResponders": 1,
          "sampleSize": 256,
          "value": 0.45205
        },
        {
          "ID": 71,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160386,
                "respondersCount": 5,
                "respondersPercentage": 0.05051,
                "textValue": "Johnson & Johnson"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160387,
                "respondersCount": 3,
                "respondersPercentage": 0.0303,
                "textValue": "Bausch + Lomb"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160388,
                "respondersCount": 4,
                "respondersPercentage": 0.0404,
                "textValue": "Life "
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160389,
                "respondersCount": 55,
                "respondersPercentage": 0.55556,
                "textValue": "Alcon"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160390,
                "respondersCount": 3,
                "respondersPercentage": 0.0303,
                "textValue": "ACUVUE"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160391,
                "respondersCount": 29,
                "respondersPercentage": 0.29293,
                "textValue": "לא זוכר"
              }
            ],
            "numberOfResponders": 99,
            "numericAnswer": 0,
            "questionID": 2894695,
            "statisticalSignificance": 0
          },
          "categoryName": "Exposed",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "recall_brand",
          "qualifiedResponders": 99,
          "qualifyingResponders": 1,
          "sampleSize": 256,
          "value": 0.55556
        },
        {
          "ID": 72,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160392,
                "respondersCount": 83,
                "respondersPercentage": 0.83838,
                "textValue": "הן הנוחות ביותר"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160393,
                "respondersCount": 3,
                "respondersPercentage": 0.0303,
                "textValue": "הן האמינות ביותר"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160394,
                "respondersCount": 2,
                "respondersPercentage": 0.0202,
                "textValue": "הן המשתלמות ביותר"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160395,
                "respondersCount": 3,
                "respondersPercentage": 0.0303,
                "textValue": "הן הפופולריות ביותר"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160396,
                "respondersCount": 8,
                "respondersPercentage": 0.08081,
                "textValue": "לא זוכר"
              }
            ],
            "numberOfResponders": 99,
            "numericAnswer": 0,
            "questionID": 2894696,
            "statisticalSignificance": 0
          },
          "categoryName": "Exposed",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "recall_message",
          "qualifiedResponders": 99,
          "qualifyingResponders": 1,
          "sampleSize": 256,
          "value": 0.83838
        },
        {
          "ID": 73,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160397,
                "respondersCount": 120,
                "respondersPercentage": 0.54795,
                "textValue": "כן"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160398,
                "respondersCount": 34,
                "respondersPercentage": 0.15525,
                "textValue": "היא מוכרת לי"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160399,
                "respondersCount": 65,
                "respondersPercentage": 0.2968,
                "textValue": "לא"
              }
            ],
            "numberOfResponders": 219,
            "numericAnswer": 0,
            "questionID": 2894697,
            "statisticalSignificance": 0
          },
          "categoryName": "Exposed",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "awareness_presenter",
          "qualifiedResponders": 219,
          "qualifyingResponders": 1,
          "sampleSize": 256,
          "value": 0.7032
        },
        {
          "ID": 74,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160400,
                "respondersCount": 14,
                "respondersPercentage": 0.06393,
                "textValue": "בטוח שכן"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160401,
                "respondersCount": 21,
                "respondersPercentage": 0.09589,
                "textValue": "חושב שכן"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160402,
                "respondersCount": 96,
                "respondersPercentage": 0.43836,
                "textValue": "אולי"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160403,
                "respondersCount": 59,
                "respondersPercentage": 0.26941,
                "textValue": "חושב שלא"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160404,
                "respondersCount": 29,
                "respondersPercentage": 0.13242,
                "textValue": "בטוח שלא"
              }
            ],
            "numberOfResponders": 219,
            "numericAnswer": 0,
            "questionID": 2894698,
            "statisticalSignificance": 0
          },
          "categoryName": "Exposed",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "intent_purchase",
          "qualifiedResponders": 219,
          "qualifyingResponders": 1,
          "sampleSize": 256,
          "value": 0.59817
        },
        {
          "ID": 75,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160368,
                "respondersCount": 62,
                "respondersPercentage": 0.24314,
                "textValue": "כן,  יומיות"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160369,
                "respondersCount": 90,
                "respondersPercentage": 0.35294,
                "textValue": "כן, חודשיות"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160370,
                "respondersCount": 10,
                "respondersPercentage": 0.03922,
                "textValue": "חושב להתחיל"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160371,
                "respondersCount": 93,
                "respondersPercentage": 0.36471,
                "textValue": "לא"
              }
            ],
            "numberOfResponders": 255,
            "numericAnswer": 0,
            "questionID": 2894691,
            "statisticalSignificance": 0
          },
          "categoryName": "Control",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "exposure_targeting",
          "qualifiedResponders": 255,
          "qualifyingResponders": 1,
          "sampleSize": 255,
          "value": 0.63529
        },
        {
          "ID": 76,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160372,
                "respondersCount": 44,
                "respondersPercentage": 0.2716,
                "textValue": "Johnson & Johnson"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160373,
                "respondersCount": 14,
                "respondersPercentage": 0.08642,
                "textValue": "Bausch + Lomb"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160374,
                "respondersCount": 44,
                "respondersPercentage": 0.2716,
                "textValue": "Life "
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160375,
                "respondersCount": 18,
                "respondersPercentage": 0.11111,
                "textValue": "Alcon"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160376,
                "respondersCount": 42,
                "respondersPercentage": 0.25926,
                "textValue": "ACUVUE"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160377,
                "respondersCount": 60,
                "respondersPercentage": 0.37037,
                "textValue": "אף אחד מהם"
              }
            ],
            "numberOfResponders": 162,
            "numericAnswer": 0,
            "questionID": 2894692,
            "statisticalSignificance": 0
          },
          "categoryName": "Control",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "awareness_brand",
          "qualifiedResponders": 162,
          "qualifyingResponders": 1,
          "sampleSize": 255,
          "value": 0.11111
        },
        {
          "ID": 77,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160378,
                "respondersCount": 31,
                "respondersPercentage": 0.19136,
                "textValue": "Johnson & Johnson"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160379,
                "respondersCount": 9,
                "respondersPercentage": 0.05556,
                "textValue": "Bausch + Lomb"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160380,
                "respondersCount": 16,
                "respondersPercentage": 0.09877,
                "textValue": "Life "
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160381,
                "respondersCount": 7,
                "respondersPercentage": 0.04321,
                "textValue": "Alcon"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160382,
                "respondersCount": 26,
                "respondersPercentage": 0.16049,
                "textValue": "ACUVUE"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160383,
                "respondersCount": 73,
                "respondersPercentage": 0.45062,
                "textValue": "אף אחד מהם"
              }
            ],
            "numberOfResponders": 162,
            "numericAnswer": 0,
            "questionID": 2894693,
            "statisticalSignificance": 0
          },
          "categoryName": "Control",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "preference_brand",
          "qualifiedResponders": 162,
          "qualifyingResponders": 1,
          "sampleSize": 255,
          "value": 0.04321
        },
        {
          "ID": 78,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160384,
                "respondersCount": 6,
                "respondersPercentage": 0.037039999999999997,
                "textValue": "כן"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160385,
                "respondersCount": 156,
                "respondersPercentage": 0.96296,
                "textValue": "לא"
              }
            ],
            "numberOfResponders": 162,
            "numericAnswer": 0,
            "questionID": 2894694,
            "statisticalSignificance": 0
          },
          "categoryName": "Control",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "recall_campaign",
          "qualifiedResponders": 162,
          "qualifyingResponders": 1,
          "sampleSize": 255,
          "value": 0.037039999999999997
        },
        {
          "ID": 79,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160386,
                "respondersCount": 1,
                "respondersPercentage": 0.16667,
                "textValue": "Johnson & Johnson"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160387,
                "respondersCount": 0,
                "respondersPercentage": 0,
                "textValue": "Bausch + Lomb"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160388,
                "respondersCount": 0,
                "respondersPercentage": 0,
                "textValue": "Life "
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160389,
                "respondersCount": 3,
                "respondersPercentage": 0.5,
                "textValue": "Alcon"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160390,
                "respondersCount": 0,
                "respondersPercentage": 0,
                "textValue": "ACUVUE"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160391,
                "respondersCount": 2,
                "respondersPercentage": 0.33333,
                "textValue": "לא זוכר"
              }
            ],
            "numberOfResponders": 6,
            "numericAnswer": 0,
            "questionID": 2894695,
            "statisticalSignificance": 0
          },
          "categoryName": "Control",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "recall_brand",
          "qualifiedResponders": 6,
          "qualifyingResponders": 1,
          "sampleSize": 255,
          "value": 0.5
        },
        {
          "ID": 80,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160392,
                "respondersCount": 3,
                "respondersPercentage": 0.5,
                "textValue": "הן הנוחות ביותר"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160393,
                "respondersCount": 0,
                "respondersPercentage": 0,
                "textValue": "הן האמינות ביותר"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160394,
                "respondersCount": 1,
                "respondersPercentage": 0.16667,
                "textValue": "הן המשתלמות ביותר"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160395,
                "respondersCount": 0,
                "respondersPercentage": 0,
                "textValue": "הן הפופולריות ביותר"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160396,
                "respondersCount": 2,
                "respondersPercentage": 0.33333,
                "textValue": "לא זוכר"
              }
            ],
            "numberOfResponders": 6,
            "numericAnswer": 0,
            "questionID": 2894696,
            "statisticalSignificance": 0
          },
          "categoryName": "Control",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "recall_message",
          "qualifiedResponders": 6,
          "qualifyingResponders": 1,
          "sampleSize": 255,
          "value": 0.5
        },
        {
          "ID": 81,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160397,
                "respondersCount": 71,
                "respondersPercentage": 0.43827,
                "textValue": "כן"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160398,
                "respondersCount": 25,
                "respondersPercentage": 0.15432,
                "textValue": "היא מוכרת לי"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160399,
                "respondersCount": 66,
                "respondersPercentage": 0.40741,
                "textValue": "לא"
              }
            ],
            "numberOfResponders": 162,
            "numericAnswer": 0,
            "questionID": 2894697,
            "statisticalSignificance": 0
          },
          "categoryName": "Control",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "awareness_presenter",
          "qualifiedResponders": 162,
          "qualifyingResponders": 1,
          "sampleSize": 255,
          "value": 0.59259
        },
        {
          "ID": 82,
          "MoE": 0,
          "aggregatedAnswers": {
            "markers": [
              {
                "numericValue": null,
                "possibleAnswerID": 2160400,
                "respondersCount": 3,
                "respondersPercentage": 0.018519999999999998,
                "textValue": "בטוח שכן"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160401,
                "respondersCount": 10,
                "respondersPercentage": 0.06173,
                "textValue": "חושב שכן"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160402,
                "respondersCount": 75,
                "respondersPercentage": 0.46296,
                "textValue": "אולי"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160403,
                "respondersCount": 45,
                "respondersPercentage": 0.27778,
                "textValue": "חושב שלא"
              },
              {
                "numericValue": null,
                "possibleAnswerID": 2160404,
                "respondersCount": 29,
                "respondersPercentage": 0.17901,
                "textValue": "בטוח שלא"
              }
            ],
            "numberOfResponders": 162,
            "numericAnswer": 0,
            "questionID": 2894698,
            "statisticalSignificance": 0
          },
          "categoryName": "Control",
          "categoryType": "SampleValue",
          "confidenceLevel": 0.95,
          "kpiID": "intent_purchase",
          "qualifiedResponders": 162,
          "qualifyingResponders": 1,
          "sampleSize": 255,
          "value": 0.54321
        },
        {
          "ID": 83,
          "MoE": 0,
          "aggregatedAnswers": null,
          "categoryName": "Uplift",
          "categoryType": "KpiValue",
          "confidenceLevel": 0.95,
          "kpiID": "exposure_targeting",
          "qualifiedResponders": 511,
          "qualifyingResponders": 1,
          "sampleSize": 511,
          "value": 0.22017
        },
        {
          "ID": 84,
          "MoE": 0,
          "aggregatedAnswers": null,
          "categoryName": "Uplift",
          "categoryType": "KpiValue",
          "confidenceLevel": 0.95,
          "kpiID": "awareness_brand",
          "qualifiedResponders": 381,
          "qualifyingResponders": 1,
          "sampleSize": 511,
          "value": 0.0761
        },
        {
          "ID": 85,
          "MoE": 0,
          "aggregatedAnswers": null,
          "categoryName": "Uplift",
          "categoryType": "KpiValue",
          "confidenceLevel": 0.95,
          "kpiID": "preference_brand",
          "qualifiedResponders": 381,
          "qualifyingResponders": 1,
          "sampleSize": 511,
          "value": 0.05725
        },
        {
          "ID": 86,
          "MoE": 0,
          "aggregatedAnswers": null,
          "categoryName": "Uplift",
          "categoryType": "KpiValue",
          "confidenceLevel": 0.95,
          "kpiID": "recall_campaign",
          "qualifiedResponders": 381,
          "qualifyingResponders": 1,
          "sampleSize": 511,
          "value": 0.41502
        },
        {
          "ID": 87,
          "MoE": 0,
          "aggregatedAnswers": null,
          "categoryName": "Uplift",
          "categoryType": "KpiValue",
          "confidenceLevel": 0.95,
          "kpiID": "recall_brand",
          "qualifiedResponders": 105,
          "qualifyingResponders": 1,
          "sampleSize": 511,
          "value": 0.05556
        },
        {
          "ID": 88,
          "MoE": 0,
          "aggregatedAnswers": null,
          "categoryName": "Uplift",
          "categoryType": "KpiValue",
          "confidenceLevel": 0.95,
          "kpiID": "recall_message",
          "qualifiedResponders": 105,
          "qualifyingResponders": 1,
          "sampleSize": 511,
          "value": 0.33838
        },
        {
          "ID": 89,
          "MoE": 0,
          "aggregatedAnswers": null,
          "categoryName": "Uplift",
          "categoryType": "KpiValue",
          "confidenceLevel": 0.95,
          "kpiID": "awareness_presenter",
          "qualifiedResponders": 381,
          "qualifyingResponders": 1,
          "sampleSize": 511,
          "value": 0.1106
        },
        {
          "ID": 90,
          "MoE": 0,
          "aggregatedAnswers": null,
          "categoryName": "Uplift",
          "categoryType": "KpiValue",
          "confidenceLevel": 0.95,
          "kpiID": "intent_purchase",
          "qualifiedResponders": 381,
          "qualifyingResponders": 1,
          "sampleSize": 511,
          "value": 0.05496
        }
      ]
    }
  ]
}
,
		1074: [
			{
				"samplingID": 123123,
				"kpis": [
					{
						"kpiID": "recall_campaign",
						"MoE": 0.05,
						"kpiValue": 0.12,
						"samples":
						[
							{ "sampleName": "test", "kpiValue": 0.4912, "qualifyingResponders":637000},
							{ "sampleName": "control", "kpiValue": 0.375, "qualifyingResponders":133},
							{ "sampleName": "extra_sample", "kpiValue": 0.1, "qualifyingResponders":40}
						],
						"benchmarks":
						[
							{ "benchmarkName": "Brand", "kpiValue": 0.8, "qualifyingResponders":320},
							{ "benchmarkName": "Category1", "kpiValue": 0.8, "qualifyingResponders":320},
							{ "benchmarkName": "Category2", "kpiValue": 0.8, "qualifyingResponders":320},
						],
						"to": "Date(322133613)", "from": "Date(322133213)"
					},
					{
						"kpiID": "preference_brand",
						"MoE": 0.04,
						"kpiValue": -0.12,
						"samples":
						[
							{ "sampleName": "test", "kpiValue": 0.09, "qualifyingResponders":637000},
							{ "sampleName": "control", "kpiValue": 0.375, "qualifyingResponders":133},
							{ "sampleName": "extra_sample", "kpiValue": 0.1, "qualifyingResponders":40}
						],
						"benchmarks":
						[
							{ "benchmarkName": "Brand", "kpiValue": 0.8, "qualifyingResponders":320},
							{ "benchmarkName": "Category1", "kpiValue": 0.8, "qualifyingResponders":320},
							{ "benchmarkName": "Category2", "kpiValue": 0.8, "qualifyingResponders":320},
						],
						"to": "Date(322133613)", "from": "Date(322133213)"
					},
					{
						"kpiID": "intent_purchase",
						"MoE": 0.04,
						"kpiValue": 0.03,
						"samples":
						[
							{ "sampleName": "test", "kpiValue": 0.8, "qualifyingResponders":320},
							{ "sampleName": "control", "kpiValue": 0.3, "qualifyingResponders":133},
							{ "sampleName": "extra_sample", "kpiValue": 0.1, "qualifyingResponders":40}
						],
						"benchmarks":
						[
							{ "benchmarkName": "Brand", "kpiValue": 0.8, "qualifyingResponders":320},
							{ "benchmarkName": "Category1", "kpiValue": 0.8, "qualifyingResponders":320},
							{ "benchmarkName": "Category2", "kpiValue": 0.8, "qualifyingResponders":320},
						],
						"to": "Date(322133613)", "from": "Date(322133213)"
					},
					{
						"kpiID": "recall_brand",
						"MoE": 0.05,
						"kpiValue": 0.03,
						"samples":
						[
							{ "sampleName": "test", "kpiValue": 0.4912, "qualifyingResponders":637000},
							{ "sampleName": "control", "kpiValue": 0.375, "qualifyingResponders":133},
							{ "sampleName": "extra_sample", "kpiValue": 0.1, "qualifyingResponders":40}
						],
						"benchmarks":
						[
							{ "benchmarkName": "Brand", "kpiValue": 0.8, "qualifyingResponders":320},
							{ "benchmarkName": "Category1", "kpiValue": 0.8, "qualifyingResponders":320},
							{ "benchmarkName": "Category2", "kpiValue": 0.8, "qualifyingResponders":320},
						],
						"to": "Date(322133613)", "from": "Date(322133213)"
					},
				],
				"samples": [
					{ "sampleName": "test", "targetMoE":0.05, "MoE": 0.09, "sampleSize": 400, "qualifiedResponders": 397},
					{ "sampleName": "control", "marginOfError":0.05, "sampleSize": 400},
					{ "sampleName": "extra_sample", "marginOfError":0.05, "sampleSize": 400},
				]
			}
		]
	},

	researchModelData: {
		1073: {
			"modelID": "dce",
			"modelVersion": "0.1",
			"locale": "he-IL",
			"variableValues": [
				{"id": "brandCategory", "value": "orange juice"},
				{"id": "consumeVerb", "value": "drink"},
				{"id": "consumptionCategories", "value": [
					"Freshly squeezed only",
					"Botteled fresh orange juice",
					"Orange Soft drinks"
				]},
				{"id": "competitors", "value": [
					"Second Ready",
					"Florida's Favorite",
					"Tropicazza",
					"Simpsons"
				]},
				{"id": "brandName", "value": "Orange Only"},
				{"id": "productName", "value": "Orange Only 100%"},
				{"id": "shortAdDescription", "value": "2 women crashed into an truck delivering orange crates"},
				{"id": "adMessage", "value": "It is the freshest"},
				{"id": "adAltMessages", "value": [
					"It is the tastiest",
					"It is made out of natural ingrediants ",
					"It is the healthiest",
				]},
				{"id": "categoryImage1", "value":{"mediaID": "fd19dfde-83e1-4a81-b970-3aaa6fc38ffe"}},
				{"id": "categoryImage2", "value":{"mediaID": "f0cb1b43-8474-49b9-a4c7-a3839de8d5f5"}},
				{"id": "categoryImage3", "value":{"mediaID": "293a040a-f4ce-48f6-ae1e-b75870b56ac7"}},
				{"id": "goldenFrame1", "value":{"mediaID": "12c8920c-fa9f-420b-bf3c-6e1003467059"}},
				{"id": "goldenFrame2", "value":{"mediaID": "f26a7295-5a00-4468-be3e-bf4315b63c60"}},
				{"id": "goldenFrame3", "value":{"mediaID": "ad3bbbeb-0a6a-462e-824e-452019440764"}},
				{"id": "atmosphereImages", "value":
					[
						{"value": {"mediaID": "{GUID}", "crop": "0,0,100,100"}},
						{"value": {"mediaID": "{GUID}", "crop": "0,0,100,100"}},
					]
				}
			],
			"requiredKPIs": ["exposure_targeting_score", "recall_campaign"],

			"survey": {

			},
			"analysisLogic": {
				"KPIBinding":
					[
						{"kpiID": "exposure_targeting_score", "answersBingding":[42364554672, 42364554673]},
						{"kpiID": "recall_campaign", "answersBingding":[]},
						{"kpiID": "recall_brand", "answersBingding":[]},
						{"kpiID": "recall_message", "answersBingding":[]},
						{"kpiID": "awareness_brand", "answersBingding":[]},
						{"kpiID": "awareness_presenter", "answersBingding":[]},
						{"kpiID": "brand_preference", "answersBingding":[]},
						{"kpiID": "purchase_intent", "answersBingding":[]},
					]
				}
			}
	}

};

export default mockData;
