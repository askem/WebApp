import React from 'react';
import { Checkbox } from 'react-bootstrap';

const ageGroups = [
	'18-24',
	'25-34',
	'35-44',
	'45-64',
	'65+'
]

class AgeGroupSelector extends React.Component {
	constructor(props) {
    	super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick(group) {
		this.props.onToggle(group);
	}
	render() {
		const selectedGroups = this.props.ageGroups;
		return <div>
			{ageGroups.map(g => {
				const boundClick = this.onClick.bind(this, g);
				return <Checkbox key={g} checked={selectedGroups.has(g)} onChange={boundClick}>
					{g}
				</Checkbox>
			})}
		</div>;
	}
}

AgeGroupSelector.propTypes = {
	ageGroups: React.PropTypes.object,
	onToggle: React.PropTypes.func.isRequired
}

export default AgeGroupSelector;
