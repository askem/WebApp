import React from 'react';
import { Checkbox } from 'react-bootstrap';
import CONSUMTPION_GROUPS from 'constants/CONSUMTPION_GROUPS';

class ConsumptionSelector extends React.Component {
	constructor(props) {
    	super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick(group) {
		this.props.onToggle(group);
	}
	render() {
		const selectedGroups = this.props.consumptionGroups;
		return <div>
			{CONSUMTPION_GROUPS.map(g => {
				const boundClick = this.onClick.bind(this, g.id);
				return <Checkbox key={g.id} checked={selectedGroups.has(g.id)} onChange={boundClick}>
					{g.title}
				</Checkbox>
			})}
		</div>;
	}
}

ConsumptionSelector.propTypes = {
	consumptionGroups: React.PropTypes.object,
	onToggle: React.PropTypes.func.isRequired
}

export default ConsumptionSelector;
