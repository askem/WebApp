const dceModel =

{
	"name": "DCE",
	"modelID": "dce",
	"modelVersion": "0.1",
	"modelDescription": "",
	"variables": [
		{"id": "brandName", "name": "Brand Name","description":"", "type": "string", "defaultValue": null, "validations": {"length": 40}},
		{"id": "productName", "name": "Product Name","description":"", "type": "string", "defaultValue": null, "validations": {"length": 40}},
		{"id": "consumptionCategories", "name": "Consumption Categories", "description":"", "type": "string[]", "hint": "Consumption Category #{{#}}", "defaultValue": null, "validations": {"min": 1, "max": 4}},
		{"id": "consumeVerb", "name": "Consumtion Verb", "description":"How do people consume your product?", "type": "string", "defaultValue": "buy"},
		{"id": "brandCategory", "name": "Brand Category", "description":"", "type": "category", "defaultValue": null},
		{"id": "shortAdDescription", "name": "Short Ad Description", "description":"", "type": "string", "defaultValue": null},
		{"id": "competitors", "name": "Major Competitors", "description":"", "type": "string[]", "hint": "Competitor #{{#}}", "defaultValue": null, "validations": {"length": 40, "min": 1, "max": 4}},
		{"id": "adMessage", "name": "Correct Campaign Message", "description":"", "type": "string", "defaultValue": null, "validations": {"length": 50, "min": 0, "max": 7}},
		{"id": "adAltMessages", "name": "Alt. Campaign Messages", "description":"", "type": "string[]", "hint": "Alt. Message #{{#}}", "defaultValue": null, "validations": {"length": 50, "min": 0, "max": 7}},
		{"id": "categoryImage1", "name": "Category Image", "description":"", "type": "image", "defaultValue": null, "validations": {"minWidth": 1000, "minHeight": 1000}},
		{"id": "categoryImage2", "name": "Category Image", "description":"", "type": "image", "defaultValue": null, "validations": {"minWidth": 1000, "minHeight": 1000}},
		{"id": "categoryImage3", "name": "Category Image", "description":"", "type": "image", "defaultValue": null, "validations": {"minWidth": 1000, "minHeight": 1000}},
		{"id": "goldenFrame1", "name": "Category Image", "description":"", "type": "image", "defaultValue": null, "validations": {"minWidth": 1000, "minHeight": 1000}},
		{"id": "goldenFrame2", "name": "Category Image", "description":"", "type": "image", "defaultValue": null, "validations": {"minWidth": 1000, "minHeight": 1000}},
		{"id": "goldenFrame3", "name": "Category Image", "description":"", "type": "image", "defaultValue": null, "validations": {"minWidth": 1000, "minHeight": 1000}},
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
        "possibleAnswers": [
            {
                "possibleAnswerID": 101,
                "textValue": "{{consumptionCategories}}",
                "attributes": 0,
                "numericValue": 1,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 102,
                "textValue": "No",
                "attributes": 2,
                "numericValue": 2,
                "uiTypeID": 0
            }
        ],
        "textValue": "Do you {{consumeVerb}} {{brandCategory}}?",
        "maxAnswers": 1,
        "questionTypeID": 3,
        "_popupsArrangement": 3,
        "_imageFileName": "{{categoryImage1}}",
        "_imageBackgroundColor": "white",
        "kpis": [
            "exposure_targeting"
        ],
        "mediaID": "cc005bd6-1bae-4c48-8da0-7392c62e100e",
        "questionImageURL": null,
        "minAnswers": 1,
        "questionID": 1
    },
    {
        "possibleAnswers": [
            {
                "possibleAnswerID": 201,
                "textValue": "{{brandName}}",
                "attributes": 1,
                "numericValue": 1,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 202,
                "textValue": "{{competitors}}",
                "attributes": 1,
                "numericValue": 2,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 203,
                "textValue": "None",
                "attributes": 2,
                "numericValue": 3,
                "uiTypeID": 0
            }
        ],
        "textValue": "Which of the following {{brandCategory}} brands are you familiar with?",
        "maxAnswers": 0,
        "questionTypeID": 3,
        "_popupsArrangement": 4,
        "_imageFileName": "{{categoryImage2}}",
        "_imageBackgroundColor": "white",
        "kpis": [
            "awareness_brand"
        ],
        "mediaID": "c7483382-28a4-4b93-8166-16bba300b0dc",
        "questionImageURL": null,
        "minAnswers": 1,
        "questionID": 2
    },
    {
        "possibleAnswers": [
            {
                "possibleAnswerID": 301,
                "textValue": "{{brandName}}",
                "attributes": 3,
                "numericValue": 1,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 302,
                "textValue": "{{competitors}}",
                "attributes": 3,
                "numericValue": 2,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 303,
                "textValue": "None",
                "attributes": 2,
                "numericValue": 3,
                "uiTypeID": 0
            }
        ],
        "textValue": "Which of the {{brandCategory}} brands do you prefer?",
        "maxAnswers": 1,
        "questionTypeID": 3,
        "_popupsArrangement": 4,
        "_imageFileName": "{{categoryImage3}}",
        "_imageBackgroundColor": "white",
        "kpis": [
            "preference_brand"
        ],
        "mediaID": "7b2d16c2-26bb-4903-8c5f-005445dcbe0a",
        "questionImageURL": null,
        "minAnswers": 1,
        "questionID": 3
    },
    {
        "possibleAnswers": [
            {
                "possibleAnswerID": 401,
                "textValue": "Yes",
                "attributes": 2,
                "numericValue": 1,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 402,
                "textValue": "No",
                "attributes": 2,
                "numericValue": 2,
                "uiTypeID": 0
            }
        ],
        "textValue": "In a recent {{brandCategory}} commercial,  {{shortAdDescription}}. Have you seen this commercial?  ",
        "maxAnswers": 1,
        "questionTypeID": 3,
        "_popupsArrangement": 2,
        "_imageFileName": "{{goldenFrame1}}",
        "_imageBackgroundColor": "white",
        "kpis": [
            "recall_campaign"
        ],
        "mediaID": "b7bdef03-6030-4841-b81a-29b3fbd472ae",
        "questionImageURL": null,
        "minAnswers": 1,
        "questionID": 4
    },
    {
        "possibleAnswers": [
            {
                "possibleAnswerID": 501,
                "textValue": "{{brandName}}",
                "attributes": 3,
                "numericValue": 1,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 502,
                "textValue": "{{competitors}}",
                "attributes": 3,
                "numericValue": 2,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 503,
                "textValue": "I don't remember",
                "attributes": 2,
                "numericValue": 3,
                "uiTypeID": 0
            }
        ],
        "textValue": "Which brand was advertised?",
        "maxAnswers": 1,
        "questionTypeID": 3,
        "_popupsArrangement": 1,
        "_imageFileName": "{{goldenFrame2}}",
        "_imageBackgroundColor": "white",
        "kpis": [
            "recall_brand"
        ],
        "mediaID": "b23b0a63-8f8c-4783-9bfe-bc5422b7d58d",
        "questionImageURL": null,
        "minAnswers": 1,
        "questionID": 5
    },
    {
        "possibleAnswers": [
            {
                "possibleAnswerID": 601,
                "textValue": "{{adMessage}}",
                "attributes": 3,
                "numericValue": 1,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 602,
                "textValue": "{{adAltMessages}}",
                "attributes": 3,
                "numericValue": 2,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 603,
                "textValue": "I don't remember",
                "attributes": 2,
                "numericValue": 3,
                "uiTypeID": 0
            }
        ],
        "textValue": "What was the message that was emphasized in the commercial?",
        "maxAnswers": 1,
        "questionTypeID": 3,
        "_popupsArrangement": 1,
        "_imageFileName": "{{goldenFrame3}}",
        "_imageBackgroundColor": "white",
        "kpis": [
            "recall_message"
        ],
        "mediaID": "eac1763a-caa5-4738-a59c-673701480298",
        "questionImageURL": null,
        "minAnswers": 1,
        "questionID": 6
    },
    {
        "possibleAnswers": [
            {
                "possibleAnswerID": 801,
                "textValue": "I'm sure I will",
                "attributes": 2,
                "numericValue": 1,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 802,
                "textValue": "I think I will",
                "attributes": 2,
                "numericValue": 2,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 803,
                "textValue": "Maybe",
                "attributes": 2,
                "numericValue": 3,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 804,
                "textValue": "I think I won't ",
                "attributes": 2,
                "numericValue": 4,
                "uiTypeID": 0
            },
            {
                "possibleAnswerID": 805,
                "textValue": "I'm sure I won't",
                "attributes": 2,
                "numericValue": 5,
                "uiTypeID": 0
            }
        ],
        "textValue": "Will you buy the {{productName}} next time you buy {{brandName}}?",
        "maxAnswers": 1,
        "questionTypeID": 3,
        "_popupsArrangement": 3,
        "_imageFileName": "{{productImage}}",
        "_imageBackgroundColor": "white",
        "kpis": [
            "intent_purchase"
        ],
        "mediaID": "29a6770b-8684-4c61-8984-3652bae1f82e",
        "questionImageURL": null,
        "minAnswers": 1,
        "questionID": 8
    }
],
		"questions2": [
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
