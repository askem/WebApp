const dceModel =

{
	"name": "DCE",
	"modelID": "dce",
	"modelVersion": "0.1",
	"modelDescription": "",
	"variables": [
		{"id": "brand", "name": "Brand Name","description":"", "type": "string", "defaultValue": null, "validations": {"length": 40}},
		{"id": "categories", "name": "Categories", "description":"", "type": "category[]", "defaultValue": null, "validations": {"min": 1}},
		{"id": "category", "name": "Brand Category", "description":"", "type": "category", "defaultValue": null},
		{"id": "competitors", "name": "Major Competitors", "description":"", "type": "string[]", "hint": "Competitor #{{#}}", "defaultValue": null, "validations": {"length": 40, "min": 1, "max": 4}},
		{"id": "messages", "name": "Brand Messages", "description":"", "type": "string[]", "defaultValue": null, "validations": {"length": 50, "min": 0, "max": 7}},
		{"id": "brand_image", "name": "Brand Image", "description":"", "type": "image", "defaultValue": null, "validations": {"minWidth": 400, "minHeight": 400}},
		{"id": "add_brand_images", "name": "Additional Brand Images", "description":"", "type": "image[]", "defaultValue": null, "validations": {"minWidth": 400, "minHeight": 400, "min": 1, "max": 3}},
		{"id": "category_image", "name": "Category Image", "description":"", "type": "image", "defaultValue": null, "validations": {"minWidth": 400, "minHeight": 400}}
	],
	"KPIGroups": [
		{"groupID": "exposure", "name": "Exposure", "description": ""},
		{"groupID": "recall", "name": "Recall", "description": ""},
		{"groupID": "awareness", "name": "Awareness", "description": ""},
		{"groupID": "preference", "name": "Preference", "description": ""},
		{"groupID": "intent", "name": "Intent", "description": ""},
	],
	"KPIs": [
		{"kpiID": "exposure_targeting", "name": "Targeting Score", "groupID":"exposure" , "description": "Score of audience's relevence to the media campaign", "required": true},
		{"kpiID": "recall_campaign", "name": "Campaign Recall", "groupID":"recall" , "description": "Recall of campaign"},
		{"kpiID": "recall_brand", "name": "Brand Recall", "dependencies": ["recall_campaign"], "groupID":"recall" , "description": "Recall of brand"},
		{"kpiID": "recall_message", "name": "Message Recall", "dependencies": ["recall_campaign", "recall_brand"], "groupID":"recall" , "description": "Recall of massage"},
		{"kpiID": "awareness_brand", "name": "Brand Awareness", "groupID":"awareness" , "description": "Awareness of brand"},
		{"kpiID": "awareness_presenter", "name": "Presenter Awareness", "groupID":"awareness" , "description": "Awareness of presenter"},
		{"kpiID": "preference_brand", "name": "Brand Preference", "groupID":"preference" , "description": "Audience Brand Preference"},
		{"kpiID": "intent_purchase", "name": "Purchase Intent", "groupID":"intent" , "description": "Audience Purchase intent"},
	],

	"samplingLogic": {

		"sampling": {
			"test": {"name": "Exposed", "qualification": "otc_campaign", "type": "fb_audience", "required": true, "minimumSize": 200},
			"control": {"name": "Non-Exposed", "qualification": "otc_campaign", "type": "fb_lookalike_control", "basedOn":"test", "required": true, "minimumSize": 200}
		},
		"addCustomSamples":true,
		"minimumAudienceSize": 100,
		"confidenceLevel": 0.95,
		"minimalSamplingToAudience": 0.001,
		"marginOfErrorScale":[0.03,0.1],
		"defaultMarginOfError":0.05,
		"industryStandartMarginOfError":0.05,
		"maximumCellSize": 5,
		"initialBid" : 1.00,
		"samplingType" : "Single Wave|Continous",
		"samplingCreativesTamplates":
		{
			"body":[
				{"id": 0, "name": "body your votes counts", "template":"your votes counts"},
				{"id": 1, "name": "body your votes metters", "template":"your votes metters"},
				{"id": 2, "name": "body category your vote metter", "template":"$catgoryName shoppers, your votes metters"},
			],
			"head":[
				{"id": 0, "name": "head the big category survey", "template":"The BIG $catgoryName survey"},
				{"id": 1, "name": "head Like category", "template":"Do you like $catgoryName"},
				{"id": 2, "name": "head Big shoppers survey", "template":"The BIG shoppers survey"},
				{"id": 3, "name": "head smart shoppers survey", "template":"The smart shoppers survey"}
			],
			"images":
			[
				{"id": 0, "name": "shopping cart", "image": "dae60d26-23e3-4c3c-ac56-c512d42a42f7"},
				{"id": 1, "name": "shopping bag", "image": "dae60d26-23e3-4c3c-ac56-c512d42a42f8"},
			]
		}
	},

	"survey": {
		"questions": [
			{
				"kpis": ["exposure_targeting"],
				"popupsArrangement": "circle",
				"questionID": 1,
				"textValue": "Do you like {{category}}?",
				"possibleAnswers": [
					{"possibleAnswerID": 101, "textValue": "yes"},
					{"possibleAnswerID": 102, "textValue": "no"}
				],
				"mediaID": "{{category_image}}"
			},
			{
				"kpis": ["intent_purchase"],
				"popupsArrangement": "circle",
				"questionID": 2,
				"textValue": "Which brands of {{category}} do you buy?",
				"possibleAnswers": [
					{"possibleAnswerID": 201, "textValue": "{{brand}}", "random": true},
					{"possibleAnswerID": 202, "textValue": "{{competitors}}", "random": true},
					{"possibleAnswerID": 203, "textValue": "None"},
					{"possibleAnswerID": 204, "textValue": "All"}
				],
				"mediaID": "{{category_image}}"
			},
			{
				"kpis": ["awareness"],
				"popupsArrangement": "circle",
				"questionID": 3,
				"textValue": "Would you say that **{{messages}}**?",
				"possibleAnswers": [
					{"possibleAnswerID": 301, "textValue": "yes"},
					{"possibleAnswerID": 302, "textValue": "no"},
					{"possibleAnswerID": 303, "textValue": "maybe"}
				],
				"mediaID": "{{add_brand_images}}"
			}
		],
		"questionSets": [
			{
				"ID": 0,
				"questionIDs": [2],
				"kpis": ["awareness"]
			}
		]
	},
	"analysisLogic": {
		"KPIBinding":
			[
				{"kpiID": "exposure_targeting_score", "answersBingding":[101, 102]},
				{"kpiID": "recall_campaign", "answersBingding":[]},
				{"kpiID": "recall_brand", "answersBingding":[]},
				{"kpiID": "recall_message", "answersBingding":[]},
				{"kpiID": "awareness_brand", "answersBingding":[]},
				{"kpiID": "awareness_presenter", "answersBingding":[]},
				{"kpiID": "brand_preference", "answersBingding":[]},
				{"kpiID": "purchase_intent", "answersBingding":[]},
			]

	}
};

export default dceModel;
