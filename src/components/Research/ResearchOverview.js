import React from 'react';
import KPIQuickView from 'components/Research/KPIQuickView';
import TargetingInsights from 'components/Research/Results/TargetingInsights';

const ResearchOverview = (props) => {
	if (!props.research) {
		return <h2>Research Campaign #{props.researchID} does not exist</h2>
	}

	let businessResultsPane;
	if (props.businessResults) {
		businessResultsPane = <div>
			<div className="pane-title">Totals</div>
			<div className="dashboard-pane results-pane">
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
			</div>
		</div>;
	}

	let kpisPane;
	if (props.results && props.results.kpiSets &&  props.results.kpiSets.length > 0) {
		const kpis = props.results.kpiSets[0].kpis.filter(k => k.categoryType === 'KpiValue');
		kpisPane = (
			<div>
				<div className="pane-title">KPIs</div>
				<div className="dashboard-pane results-pane"
					style={{flexWrap: 'wrap'}}>
					{kpis.map(kpi => {
						const kpiID = kpi.kpiID;
						const kpiDefinition = props.model.KPIs.find(k => k.kpiID === kpiID);
						return <KPIQuickView key={`kpi-${kpiID}`} kpiResult={kpi} kpi={kpiDefinition} />
					})}
				</div>
			</div>
		);
	}

	return <div>
		{businessResultsPane}
		{kpisPane}

		<div className="pane-title">Targeting Insights</div>
		<div className="dashboard-pane results-pane">
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
