import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import GoHome from 'react-icons/lib/go/home';
import ModelInputsWizard from 'components/Research/Brief/ModelInputsWizard'

class Brief extends React.Component {
	constructor(props) {
    	super(props);
	}
	render() {
		return (
			<div>
				<ModelInputsWizard model={this.props.model}
					modelData={this.props.modelData}
					researchID={this.props.researchID}
					research={this.props.research}
					onModelVariableChange={this.props.onModelVariableChange}
					toggleResearchKPI={this.props.toggleResearchKPI} />

			</div>);
	}
}

Brief.propTypes = {
	model: React.PropTypes.object.isRequired,
	modelData: React.PropTypes.object.isRequired,
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object.isRequired,
	toggleResearchKPI: React.PropTypes.func.isRequired,
	onModelVariableChange: React.PropTypes.func.isRequired
}

export default Brief;
