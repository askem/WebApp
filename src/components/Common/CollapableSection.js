import React from 'react';
import ToggleArrow from 'components/Common/ToggleArrow';

class CollapableSection extends React.Component {
	constructor(props){
		super(props);
		this.toggleState = this.toggleState.bind(this);
		this.childrenSelected = this.childrenSelected.bind(this);

		const initialCollapsedState = !this.childrenSelected(this.props.children);

		this.state = {
			collapsed : initialCollapsedState,
			titleWidth : 80
		}
	}

	childrenSelected(items) {
		if (items) {
			const childrenSelected = items.some(item => {
					if (item.props.attributes) {
						return item.props.attributes.length > 0;
					}
					else if (item.props.children) {
									return this.childrenSelected(item.props.children);
								}
								else {
									return false;
								}
			});

			return childrenSelected;
		}

		return false; // no children --> initial state of toggle is collapsed so we return false
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
