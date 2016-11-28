import Immutable from 'immutable';

const POPUP_ARRANGEMENT_TYPE = {
	CUSTOM: -1,
	CIRCLE: 0,
	OPEN_ARC: 1,
	ALIGN_HORIZONTAL: 2,
	ALIGN_VERTICAL: 3,
	HUGGING: 4,
	FLIP_HORIZONTAL: 100,
	FLIP_VERTICAL: 101
};
const POPUP_ARRANGEMENT_DEFAULT = POPUP_ARRANGEMENT_TYPE.CIRCLE;

const AutomaticPopupArrangementTypes = [
	{id: POPUP_ARRANGEMENT_TYPE.CIRCLE, title: 'Circle'},
	{id: POPUP_ARRANGEMENT_TYPE.OPEN_ARC, title: 'Open Arc'},
	{id: POPUP_ARRANGEMENT_TYPE.ALIGN_HORIZONTAL, title: 'Horizontal'},
	{id: POPUP_ARRANGEMENT_TYPE.ALIGN_VERTICAL, title: 'Vertical'},
	{id: POPUP_ARRANGEMENT_TYPE.HUGGING, title: 'Hugging'},
	{id: POPUP_ARRANGEMENT_TYPE.CUSTOM, title: 'Custom'},
];

const popupArranger = (numberOfPopups, arrangementType) => {
	let step = 1.0;
	const nPoints = numberOfPopups;
	if (nPoints > 1) {
		step = 1.0 / (nPoints - 1);
	}
	
	if (numberOfPopups === 1) {
		arrangementType = POPUP_ARRANGEMENT_TYPE.CIRCLE;
	} else if (numberOfPopups < 3 && arrangementType === POPUP_ARRANGEMENT_TYPE.HUGGING) {
		arrangementType = POPUP_ARRANGEMENT_TYPE.OPEN_ARC;
	}
	
	let possibleAnswerArranger = pa => pa;
	const flipper = val => 1.0 - val;
	switch (arrangementType) {
		case POPUP_ARRANGEMENT_TYPE.HUGGING:
			possibleAnswerArranger = (pa, idx) => {
				const iMod = (idx % (Math.floor((nPoints + 1)/2)));
				const leftRight = Math.floor(idx / (Math.floor((nPoints + 1) / 2)));
				const denominator = Math.floor((nPoints - 1) / 2);
				return pa.set('textXOffset', 0.5 + Math.pow(-1, leftRight) * (0.275 + 0.075 * Math.sin(Math.PI * iMod / denominator)))
				.set('textYOffset', 0.15 + 0.7 * iMod / denominator)
				.set('uiXOffset', 0.5 + Math.pow(-1, leftRight) * (0.15 + 0.075 * Math.sin(Math.PI * iMod / denominator)))
				.set('uiYOffset', 0.15 + 0.7 * iMod / denominator);
			};
			break;
		case POPUP_ARRANGEMENT_TYPE.CIRCLE:
			possibleAnswerArranger = (pa, idx) => {
				return pa.set('textXOffset', 0.5 + 0.35 * Math.sin(2 * Math.PI / nPoints * idx))
				.set('textYOffset', 0.5 + 0.35 * Math.sin(Math.PI * (2 / nPoints * idx - 0.5)))
				.set('uiXOffset', 0.5 + 0.25 * Math.sin(2 * Math.PI / nPoints * idx))
				.set('uiYOffset', 0.5 + 0.25 * Math.sin(Math.PI * (2 / nPoints * idx - 0.5)));
			};
			break;
		case POPUP_ARRANGEMENT_TYPE.OPEN_ARC:
			possibleAnswerArranger = (pa, idx) => {
				return pa.set('textXOffset', 0.65 + 0.5 * Math.sin((-0.75 + (nPoints - 1 - idx) / (nPoints - 1.0) * 0.875) * Math.PI))
				.set('textYOffset', 0.575 + 0.5 * Math.sin((-1.25 + (nPoints - 1 - idx) / (nPoints - 1.0) * 0.875) * Math.PI))
				.set('uiXOffset', 0.65 + 0.325 * Math.sin((-0.75 + (nPoints - 1 - idx) / (nPoints - 1.0) * 0.875) * Math.PI))
				.set('uiYOffset', 0.575 + 0.325 * Math.sin((-1.25 + (nPoints - 1 - idx) / (nPoints - 1.0) * 0.875) * Math.PI));
			};
			break;
		case POPUP_ARRANGEMENT_TYPE.ALIGN_VERTICAL:
				possibleAnswerArranger = (pa, idx) => {
					const div = idx / (nPoints - 1.0);
					const y = 0.15 + 0.65 * div + 0.05 * Math.floor(div);
					return pa.set('textXOffset', 0.75)
					.set('textYOffset', y)
					.set('uiXOffset', 0.55)
					.set('uiYOffset', y);
				};
				break;
		case POPUP_ARRANGEMENT_TYPE.ALIGN_HORIZONTAL:
			possibleAnswerArranger = (pa, idx) => {
				const div = (nPoints - 1 - idx) / (nPoints - 1.0);
				const x = 0.15 + 0.7 * div;
				return pa.set('textXOffset', x)
				.set('textYOffset', 0.25)
				.set('uiXOffset', x)
				.set('uiYOffset', 0.45);
			};
			break;
		case POPUP_ARRANGEMENT_TYPE.FLIP_HORIZONTAL:
			possibleAnswerArranger = (pa, idx) => {
				return pa.update('textXOffset', flipper)
				.update('uiXOffset', flipper);
			};
			break;
		case POPUP_ARRANGEMENT_TYPE.FLIP_VERTICAL:
			possibleAnswerArranger = (pa, idx) => {
				return pa.update('textYOffset', flipper)
				.update('uiYOffset', flipper);
			};
			break;
		default:
			possibleAnswerArranger = pa => pa;
			break;
	}
	return possibleAnswerArranger;
};

const calcLocations = (numberOfLocations, arrangementType) => {
	let emptyLocations = [];
	for (let i = 0; i < numberOfLocations; i++) {
		emptyLocations.push({});
	}
	let locations = Immutable.fromJS(emptyLocations);
	const possibleAnswerArranger = popupArranger(numberOfLocations, arrangementType);
	locations = locations.map(possibleAnswerArranger);

	// Handle RTL Hebrew locale
	const flipper = popupArranger(numberOfLocations, POPUP_ARRANGEMENT_TYPE.FLIP_HORIZONTAL);

	if (arrangementType === POPUP_ARRANGEMENT_TYPE.OPEN_ARC) {
		// hebrew ...
		const flipper = popupArranger(numberOfLocations, POPUP_ARRANGEMENT_TYPE.FLIP_HORIZONTAL);
		locations = locations.map(flipper);
	}
	return locations.toJS();
};

export { calcLocations, popupArranger, POPUP_ARRANGEMENT_TYPE, POPUP_ARRANGEMENT_DEFAULT, AutomaticPopupArrangementTypes };
