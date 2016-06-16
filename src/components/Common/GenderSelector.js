import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const genderOptions = [
	{ id: 'all', title: 'All' },
	{ id: 'female', title: 'Female' },
	{ id: 'male', title: 'Male' }
]

class GenderSelector extends React.Component {
	constructor(props) {
    	super(props);
		this.onSelect = this.onSelect.bind(this);
	}
	onSelect(genderID) {
		this.props.onChange(genderID);
	}
	render() {
		const selected = this.props.gender;
		return <ButtonGroup>
			{genderOptions.map(g => {
				const boundClick = this.onSelect.bind(this, g.id);
				return <Button key={g.id} active={selected === g.id} onClick={boundClick}>
					{g.title}
				</Button>
			})}

		</ButtonGroup>;
	}
}

GenderSelector.propTypes = {
	gender: React.PropTypes.string,
	onChange: React.PropTypes.func.isRequired
}

export default GenderSelector;
