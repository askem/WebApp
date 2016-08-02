import React from 'react';
import { Checkbox } from 'react-bootstrap';
import FaQuestionCircle from 'react-icons/lib/fa/question-circle';

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
				<div style={{display: 'flex'}}>
					<h4 style={{width: 300, margin: 0}}>{group.name}</h4>
					<div style={{paddingTop: 7}}><FaQuestionCircle /></div>
				</div>
				{kpis.map(k => {
					const selected = this.props.selected;
					const kpi = k.kpiID;
					const boundClick = this.onClick.bind(this, kpi);
					return <Checkbox key={kpi}
					style={{paddingLeft: 20, marginTop: 0}}
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
