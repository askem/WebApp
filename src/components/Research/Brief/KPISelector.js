import React from 'react';
import { Checkbox } from 'react-bootstrap';

class KPISelector extends React.Component {
	constructor(props) {
    	super(props);
	}
	onClick(kpi) {
		this.props.toggleResearchKPI(this.props.researchID, kpi, this.props.model.KPIs);
	}
	render() {
		const groups = this.props.model.KPIGroups.map(group => {
			const kpis = this.props.model.KPIs.filter(k => k.groupID === group.groupID);
			return <div key={group.groupID}>
				<h4>{group.name}</h4>
				{kpis.map(k => {
					const selected = this.props.selected;
					const kpi = k.kpiID;
					const boundClick = this.onClick.bind(this, kpi);
					return <Checkbox key={kpi}
					disabled={k.required}
					checked={selected.has(kpi)}
					onChange={boundClick}>
						{k.name}
					</Checkbox>
				})}
			</div>;
		}

		);
		return (
			<div>
				{groups}
			</div>
		);
	}
}
KPISelector.propTypes = {
	model: React.PropTypes.object.isRequired,
	researchID: React.PropTypes.string.isRequired,
	selected: React.PropTypes.object.isRequired,	// Set
	toggleResearchKPI: React.PropTypes.func.isRequired
}

export default KPISelector;
