import React from 'react';
import KPIQuickView from 'components/Research/KPIQuickView';

const ResearchOverview = (props) => {
	if (!props.research) {
		return <h2>Research Campaign #{props.researchID} does not exist</h2>
	}
	const kpis = props.results.kpis;

	return <div>
		campaign #{props.researchID}:  <b>{props.research.title}</b>

		<div>
			<div>Spend</div>
			<div>{`${props.businessResults.spentCurrency}${props.businessResults.spent}`}</div>
		</div>

		<div style={{display: 'flex', width: '70%'}}>
			{kpis.map(kpi => {
				const kpiID = kpi.kpiID;
				const kpiDefinition = props.model.KPIs.find(k => k.kpiID === kpiID);
				return <KPIQuickView key={`kpi-${kpiID}`} kpiResult={kpi} kpi={kpiDefinition} />
			})}
		</div>

	</div>
}

ResearchOverview.propTypes = {
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object,
	businessResults: React.PropTypes.object,
	model: React.PropTypes.object,
	results: React.PropTypes.object
}

export default ResearchOverview;
