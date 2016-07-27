import { List, Map } from 'immutable';
import Immutable from 'immutable';

const initialState = Map({});

export default function(state=initialState, action) {
	switch(action.type) {
	case 'SET_RESEARCH_KPIS':
		return state.setIn(['researchCampaigns', action.payload.researchID, 'kpis'], List(action.payload.kpis));
	case 'TOGGLE_RESEARCH_KPI':
		const k = action.payload.kpi;
		return state.updateIn(['researchCampaigns', action.payload.researchID, 'kpis'], kpis => {
			const idx = kpis.keyOf(k);
			if (idx === undefined) {
				// Adding
				let kpisToAdd = [k];
				const modelKPI = action.payload.allKPIs.find(mk => mk.kpiID === k);
				if (modelKPI.dependencies) {
					modelKPI.dependencies.forEach(d => {
						if (!kpis.includes(d)) {
							kpisToAdd.push(d);
						}
					})
				}
				console.info('adding : ' + kpisToAdd);
				return kpis.push(...kpisToAdd);
			} else {
				// Removing
				let kpisToDelete = [k];
				const dependendentKPIs = action.payload.allKPIs.filter(mk => mk.dependencies && mk.dependencies.includes(k));
				kpisToDelete.push(...dependendentKPIs.map(kpi => kpi.kpiID));
				console.info('removing : ' + kpisToDelete);
				return kpis.filterNot(kpi => kpisToDelete.includes(kpi));
			}
		});
	case 'SET_MODEL_VARIABLE':
		const varID = action.payload.variableID;
		const newValue = Map({
			id: varID,
			value: Immutable.fromJS(action.payload.value)
		});
		return state.updateIn(['researchModelData', action.payload.researchID, 'variableValues'], values => {
			const idx = values.findKey(v => v.get('id') === varID);
			if (idx !== undefined) {
				return values.set(idx, newValue);
			} else {
				return values.push(newValue);
			}
		});
    default:
		return state;
	}
}
