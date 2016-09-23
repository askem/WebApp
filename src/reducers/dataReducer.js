import { List, Map } from 'immutable';
import Immutable from 'immutable';

const initialState = Map({});

export default function(state=initialState, action) {
	switch(action.type) {
	case 'SET_MODEL':
		return state.set('model', Map(action.payload));
	case 'SET_RESEARCH_KPIS':
		return state.setIn(['researchCampaigns', action.payload.researchID, 'modelData', 'requiredKPIs'], List(action.payload.kpis));
	case 'TOGGLE_RESEARCH_KPI':
		const k = action.payload.kpi;
		const allKPIs = state.getIn(['model', 'KPIs']).toJS();
		return state.updateIn(['researchCampaigns', action.payload.researchID, 'modelData', 'requiredKPIs'], kpis => {
			const idx = kpis.keyOf(k);
			if (idx === undefined) {
				// Adding
				let kpisToAdd = [k];
				const modelKPI = allKPIs.find(mk => mk.kpiID === k);
				if (modelKPI.dependencies) {
					modelKPI.dependencies.forEach(d => {
						if (!kpis.includes(d)) {
							kpisToAdd.push(d);
						}
					})
				}
				return kpis.push(...kpisToAdd);
			} else {
				// Removing
				let kpisToDelete = [k];
				const dependendentKPIs = allKPIs.filter(mk => mk.dependencies && mk.dependencies.includes(k));
				kpisToDelete.push(...dependendentKPIs.map(kpi => kpi.kpiID));
				return kpis.filterNot(kpi => kpisToDelete.includes(kpi));
			}
		});
	case 'SET_MODEL_VARIABLE':
		const varID = action.payload.variableID;
		const newValue = Map({
			id: varID,
			value: Immutable.fromJS(action.payload.value)
		});
		return state.updateIn(['researchCampaigns', action.payload.researchID, 'modelData', 'variableValues'], values => {
			const idx = values.findKey(v => v.get('id') === varID);
			if (idx !== undefined) {
				return values.set(idx, newValue);
			} else {
				return values.push(newValue);
			}
		});
	case 'FETCH_RESEARCH_SUCCESS':
		let research = action.payload.research;
		let modelData = {};
		if (research.modelData) {
			try {
				modelData = JSON.parse(research.modelData);
			} catch (e) { }
		}
		if (!modelData.requiredKPIs) {
			modelData.requiredKPIs = ['exposure_targeting'];	// TODO: this assumes DCE
		}
		research.modelData = modelData;
		return state.setIn(['researchCampaigns', action.payload.researchID],
			Immutable.fromJS(research));
	case 'FETCH_RESEARCH_FAIL':
		return state.setIn(['researchCampaigns', action.payload.researchID],
			Immutable.fromJS({
				loadingFail: true,
				loadingError: action.payload.error.message
			}));
	case 'FETCH_RESEARCH_KPIS_SUCCESS':
		return state.setIn(['resultsByResearch', action.payload.researchID],
			Immutable.fromJS(action.payload.resultsSet));
	case 'FETCH_RESEARCH_KPIS_FAIL':
		return state.setIn(['resultsByResearch', action.payload.researchID],
			Immutable.fromJS({
				loadingFail: true,
				loadingError: action.payload.error.message
			}));
	case 'ADD_MEDIA_PLAN_CHANNELS':
		return state.updateIn(['mediaPlans', action.payload.researchID, 'channels'], channels => {
			return channels.concat(Immutable.fromJS(action.payload.channels));
		});
	case 'FETCH_MEDIA_PLAN_SUCCESS':
		return state.setIn(['mediaPlans', action.payload.researchID],
			Immutable.fromJS(action.payload.mediaPlan));
	case 'FETCH_MEDIA_PLAN_FAIL':
		return state.setIn(['mediaPlans', action.payload.researchID],
			Immutable.fromJS({
				loadingFail: true,
				loadingError: action.payload.error.message
			}));
	case 'ADD_AUDIENCE':
		let newAudienceIdx = state.getIn(['audiences', action.payload.researchID]).size + 1;
		return state.updateIn(['audiences', action.payload.researchID], audiences => {
			const newAudiences = action.payload.audienceIDs.map(aID => {
				const audience = {
					name: `New Audience #${newAudienceIdx}`,
					description: '',
					size: 0,
					source: action.payload.audienceSource,
					facebookAudienceID: aID
				};
				newAudienceIdx++;
				return audience;
			});
			return audiences.concat(Immutable.fromJS(newAudiences));
		});
    default:
		return state;
	}
}
