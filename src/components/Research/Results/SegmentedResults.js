import React from 'react';
import { FaFilePdfO, FaFileExcelO } from 'react-icons/lib/fa';
import Spinner from 'react-spinkit';

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
	let brandLiftNumber = round(brandLift, 1);
	if (brandLift > 0) {
		brandLiftNumber = `+${brandLiftNumber}`;
	}

	const breakdown = `E: ${round(props.kpi.exposed, 1)}% C: ${round(props.kpi.control, 1)}%`;
	return <div className="kpi-result animated zoomIn">
		<div className="kpi-number" style={{borderColor: color}}>
			{brandLiftNumber}
		</div>
		<div className="kpi-title">
			{props.kpi.title}
		</div>
		<div className="kpi-breakdown">
			{breakdown}
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
		let ageLabel = '18-65+';
		let resultsLabel = `Within ${genderLabel} aged ${ageLabel}`;
		return resultsLabel;
	}
	render() {
		if (this.props.loading) {
			return <div className="spinner-loading ">
				<Spinner spinnerName='three-bounce' noFadeIn />
				</div>;
		}
		if (!this.props.research) {
			return <h2>Research Campaign #{this.props.researchID} does not exist</h2>
		}
		const confidenceInterval = 4.0;
		const kpis = [
			{ kpiID: 'brandAwareness', title: 'Brand Awareness', exposed: 16, control: 8},
			{ kpiID: 'brandPreference', title: 'Brand Preference', exposed: 9.13, control: 4.43},
			{ kpiID: 'shoppingIntent', title: 'Purchase Intent', exposed: 14.42, control: 8.23},
			{ kpiID: 'Message Recall', title: 'Message Recall', exposed: 83.52, control: 50},
			{ kpiID: 'campaignRecall', title: 'Campaign Recall', exposed: 43.75, control: 3.8},
			{ kpiID: 'brandRecall', title: 'Brand Recall', exposed: 53.85, control: 50}
		]
		return <div className="segmented-results">
			<div className="kpis">
				{kpis.map(k => <KPIResult key={`kpi-${k.kpiID}`} kpi={k} confidenceInterval={confidenceInterval} />)}
			</div>

			<div className="results-footer animated fadeIn">
				<div className="results-footer-text">
					<div className="results-label">
						{this.resultsText()}
					</div>
					<div>
						<strong>Exposed Group</strong> 263
					</div>
					<div>
						<strong>Control Group</strong> 250
					</div>
					<div>
						<strong>Confidence Interval</strong> ±4%
					</div>
				</div>
				<div className="results-footer-download">
					<FaFileExcelO size={40} color="#3DBB95" />
				</div>
			</div>
		</div>
	}
}

SegmentedResults.propTypes = {
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object
}

export default SegmentedResults;
