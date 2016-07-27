import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import GoHome from 'react-icons/lib/go/home';
import KPISelector from 'components/Research/Brief/KPISelector'
import ModelInputsWizard from 'components/Research/Brief/ModelInputsWizard'

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

				{/*<ModelInputsWizard model={this.props.model}
					modelData={this.props.modelData}
					researchID={this.props.researchID}
					research={this.props.research} />*/}

				<KPISelector model={this.props.model}
					researchID={this.props.researchID}
					selected={new Set(this.props.research.kpis)}
					toggleResearchKPI={this.props.toggleResearchKPI} />

			</div>);
	}
}

Brief.propTypes = {
	model: React.PropTypes.object.isRequired,
	modelData: React.PropTypes.object.isRequired,
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object.isRequired,
	toggleResearchKPI: React.PropTypes.func.isRequired
}

export default Brief;
