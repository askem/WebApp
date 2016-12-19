import React from 'react';
import Checkbox from 'components/Common/Checkbox/Checkbox';

class TargetingList extends React.Component {
	constructor(props) {
    	super(props);
		this.onChange = this.onChange.bind(this);
		this.state = {
		};
	}
	onChange(e) {
		const attributeID = e.target.dataset.attr;
		this.props.onToggle(this.props.attributeType, attributeID, e.target.checked);
	}
	render() {
		return <div className="quote-audience">
				<div className="title">{this.props.title}</div>
				<div className="value" className="attributes-list">
					{this.props.availableAttributes.map(attr => <div key={attr.id}
					className="attributes-list-item">
						<Checkbox data-attr={attr.id} label={attr.title}
							onChange={this.onChange}
							checked={this.props.attributes.indexOf(attr.id) > -1} />
					</div>)}
				</div>
			</div>;
	}
}

TargetingList.propTypes = {
	title: React.PropTypes.string.isRequired,
	attributeType: React.PropTypes.string.isRequired,
	attributes: React.PropTypes.array.isRequired,
	availableAttributes: React.PropTypes.array.isRequired,
	onToggle: React.PropTypes.func,
};

export default TargetingList;
