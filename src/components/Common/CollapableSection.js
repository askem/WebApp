import React from 'react';
import ToggleArrow from 'components/Common/ToggleArrow';

class CollapableSection extends React.Component {
	constructor(props){
		super(props);
		this.toggleState = this.toggleState.bind(this);
		this.state = {
			collapsed : true,
			titleWidth : 80

		}
	}

	toggleState() {
		let { collapsed } = this.state;

		this.setState({
			collapsed:!collapsed
		})

		if (this.props.useAnalytics && __PRODUCTION__) {
			const eventPostfix = collapsed ? 'OPEN' : 'CLOSED';
			const eventName = `${this.props.eventName}_${eventPostfix}`;

			let stateObj = {
				collapsed : !collapsed,
				eventName : eventName,
			}

			this.props.toggleCollapsablePanel(this.props.eventName, stateObj);
		}
	}

	render() {
		return (
			<div>
				<div className="quote-audience react-selectize-toggle-button-container collapsable-header" onClick={this.toggleState}>
						<div style={{ width:this.state.titleWidth + 'px' }}>{ this.props.title }</div>
						<div>
							<ToggleArrow collapsed={ this.state.collapsed }/>
						</div>
				</div>
				<div style={{display:this.state.collapsed ? 'none' : 'block'}}>
						{ this.props.children }
				</div>
			</div>
		)
	}
}

export default CollapableSection;
