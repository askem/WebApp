import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import GoHome from 'react-icons/lib/go/home';
import KPISelector from 'components/Research/Brief/KPISelector'

class Brief extends React.Component {
	constructor(props) {
    	super(props);
	}
	render() {
		return (
			<div>
				<Breadcrumb>
					<Breadcrumb.Item>
						<GoHome size={26} />
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<img src="/images/temp/brand.jpg" />
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<img src="/images/temp/campaign.jpg" />
					</Breadcrumb.Item>
					<Breadcrumb.Item active={true}>
						Brief
					</Breadcrumb.Item>
				</Breadcrumb>
				<h1>Brief</h1>

				<KPISelector model={this.props.model}
					researchID={this.props.researchID}
					selected={new Set(this.props.research.kpis)}
					toggleResearchKPI={this.props.toggleResearchKPI} />

			</div>);
	}
}

Brief.propTypes = {

}

export default Brief;
