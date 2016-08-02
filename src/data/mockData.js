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
