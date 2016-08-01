const mockData = {
	selectedResearchCampaign: 0,

	researchCampaigns: {
		1073: {
			title: 'Alcon 2016-06',
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
		1073: [
			{
				"samplingID": 123123,
				"kpis": [
					{
						"kpiID": "recall_campaign",
						"MoE": 0.12,
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
						"kpiID": "intent_purchase",
						"MoE": 0.12,
						"kpiValue": 0.5,
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
					}
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
					{"id": "category", "value": "Contact Lenses"},
					{"id": "adverisedProductName", "value": ""},
					{"id": "goldenFrame", "value":{"mediaID": "{GUID}", "crop": "0,0,100,100"}},
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
