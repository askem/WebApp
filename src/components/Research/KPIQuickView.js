import React from 'react';
import round from 'utils/math/round';

const COLOR_GREEN = '#3DBB95';
const COLOR_RED = '#F15B40';
const COLOR_YELLOW = '#F6D935';

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
		<div className="kpi-number" style={{backgroundColor: color, marginBotton: 8,
			color: 'white', textShadow: '1px 1px black',
			boxShadow: '0 8px rgba(61, 187, 149, 0.3)', border: 'none'}}>
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
