import React from 'react';
import round from 'utils/math/round';

const COLOR_GREEN = '#159571';
const COLOR_RED = '#c82e13';
const COLOR_YELLOW = '#dcbe15';

const KPIQuickView = (props) => {
	const brandLift = props.kpiResult.value;
	let color = COLOR_YELLOW;
	if (brandLift > props.kpiResult.MoE) {
		color = COLOR_GREEN;
	} else if (brandLift < -props.kpiResult.MoE) {
		color = COLOR_RED;
	}
	let brandLiftNumber = round(brandLift * 100, 1);
	if (brandLift > 0) {
		brandLiftNumber = `+${brandLiftNumber}`;
	}
	return <div className="kpi-result animated zoomIn">
		<div className="kpi-number" style={{borderColor: color,
			color: color}}>
			{brandLiftNumber}
		</div>
		<div className="kpi-title">
			{props.kpi.name}
		</div>
	</div>;
}

KPIQuickView.propTypes = {
	kpi: React.PropTypes.object.isRequired,
	kpiGroup: React.PropTypes.object,
	kpiResult: React.PropTypes.object.isRequired
}

export default KPIQuickView;
