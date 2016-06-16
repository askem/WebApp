import React from 'react';

const round = (number, decimals) => {
	return +(Math.round(number + "e+" + decimals) + "e-" + decimals);
}

const KPIResult = (props) => {
	const COLOR_THRESHOLD = 5.0;
	const COLOR_GREEN = '#3DBB95';
	const COLOR_RED = '#F15B40';
	const COLOR_YELLOW = '#F6D935';

	const brandLift = props.kpi.exposed - props.kpi.control;
	let color = COLOR_YELLOW;
	if (Math.abs(brandLift) > props.confidenceInterval) {
		if (brandLift > COLOR_THRESHOLD) {
			color = COLOR_GREEN;
		} else if (brandLift < -COLOR_THRESHOLD) {
			color = COLOR_RED;
		}
	}
	let brandLiftTitle = round(brandLift, 1);
	if (brandLift > 0) {
		brandLiftTitle = `+${brandLiftTitle}`;
	}

	return <div className="kpi-result">
		<div className="kpi-number" style={{borderColor: color}}>
			{brandLiftTitle}
		</div>
		<div className="kpi-title">
			{props.kpi.title}
		</div>
	</div>
}

KPIResult.propTypes = {
	kpi: React.PropTypes.object.isRequired
}

class SegmentedResults extends React.Component {
	resultsText() {
		let genderLabel;
		switch (this.props.gender) {
			case 'all':
				genderLabel = 'Female and Male Responders';
				break;
			case 'female':
				genderLabel = 'Female Responders';
				break;
			case 'male':
				genderLabel = 'Male Responders';
				break;
		}
		let resultsLabel = `Within ${genderLabel}`;
		return resultsLabel;
	}
	render() {
		if (!this.props.research) {
			return <h2>Research Campaign #{this.props.researchID} does not exist</h2>
		}
		const confidenceInterval = 4.0;
		const kpis = [
			{ kpiID: 'brandAwareness', title: 'Brand Awareness', exposed: 34.2, control: 31.6},
			{ kpiID: 'brandPreference', title: 'Brand Preference', exposed: 74.2, control: 61.6},
			{ kpiID: 'shoppingIntent', title: 'Shopping Intent', exposed: 40.8, control: 30},
			{ kpiID: 'Message Recall', title: 'Message Recall', exposed: 24.2, control: 41.6},
			{ kpiID: 'campaignRecall', title: 'Campaign Recall', exposed: 54.2, control: 55.6},
			{ kpiID: 'brandRecall', title: 'Brand Recall', exposed: 64.2, control: 63.1}
		]
		return <div className="segmented-results">
			<div className="kpis">
				{kpis.map(k => <KPIResult key={`kpi-${k.kpiID}`} kpi={k} confidenceInterval={confidenceInterval} />)}
			</div>
			<h3 className="results-label">
				{this.resultsText()}
			</h3>
		</div>
	}
}

SegmentedResults.propTypes = {
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object
}

export default SegmentedResults;
