import React from 'react';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

class ToggleArrow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const collapsed = this.props.collapsed;
		const arrow = collapsed ? <FaAngleRight size={20} /> : <FaAngleDown size={20} />;

		return (
			<div>
				{ arrow }
			</div>
		)
	}
}

export default ToggleArrow;