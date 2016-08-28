import React from 'react';
import KPIQuickView from 'components/Research/KPIQuickView';
import TargetingInsights from 'components/Research/Results/TargetingInsights';

const ResearchOverview = (props) => {
	if (!props.research) {
		return <h2>Research Campaign #{props.researchID} does not exist</h2>
	}

	let businessResultsPane;
	if (props.businessResults) {
		businessResultsPane = <div className="dashboard-pane">
			<div className="pane-item">
				<span className="value">185k</span>
				<span className="title">Exposed</span>
			</div>
			<div className="pane-item">
				<span className="value">248</span>
				<span className="title">Qualified Responders</span>
			</div>
			<div className="pane-item">
				<span className="value">{`${props.businessResults.spentCurrency}${props.businessResults.spent}`}</span>
				<span className="title">Spent</span>
			</div>
		</div>;
	}

	let kpisPane;
	if (props.results && props.results.kpiSets &&  props.results.kpiSets.length > 0) {
		const kpis = props.results.kpiSets[0].kpis.filter(k => k.categoryType === 'KpiValue');
		kpisPane = (
			<div className="dashboard-pane"
				style={{flexWrap: 'wrap', justifyContent: 'flex-start'}}>
				{kpis.map(kpi => {
					const kpiID = kpi.kpiID;
					const kpiDefinition = props.model.KPIs.find(k => k.kpiID === kpiID);
					return <KPIQuickView key={`kpi-${kpiID}`} kpiResult={kpi} kpi={kpiDefinition} />
				})}
			</div>
		);
	}

	return <div>
		<h1>
			{props.research.name}
		</h1>
		{businessResultsPane}
		{kpisPane}

	<div className="dashboard-pane">
		<TargetingInsights />
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
