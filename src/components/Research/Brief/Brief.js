import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import GoHome from 'react-icons/lib/go/home';
import ModelInputsWizard from 'components/Research/Brief/ModelInputsWizard'
import RaisedButton from 'material-ui/RaisedButton';
import ProgressButton from 'react-progress-button';

class Brief extends React.Component {
	constructor(props) {
    	super(props);
		this.startEditing = this.startEditing.bind(this);
		this.stopEditing = this.stopEditing.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
		this.state = {
			editing: false,
			saving: false
		}
	}
	startEditing() {
		this.setState({
			editing: true
		});
	}
	saveChanges() {
		this.setState({
			saving: true
		});
		this.props.commitResearchData(this.props.researchID);
	}
	stopEditing() {
		this.setState({
			editing: false
		});
	}
	render() {
		if (this.state.editing) {
			const saveButtonState = this.state.saving ? 'loading' : '';
			const saveButton = <ProgressButton state={saveButtonState}
				onClick={this.saveChanges}>Save Changes</ProgressButton>;
			// const saveButton = <RaisedButton backgroundColor="#9665aa" labelColor="#ffffff"
			// 	label="Done" onClick={this.stopEditing} />;
			return <div>
				<ModelInputsWizard model={this.props.model}
						researchID={this.props.researchID}
						research={this.props.research}
						onModelVariableChange={this.props.onModelVariableChange}
						toggleResearchKPI={this.props.toggleResearchKPI} />
					<div style={{width: '70%', textAlign: 'right',
						marginTop: 30,
						marginRight: 'auto', marginLeft: 'auto'}}>
						{saveButton}
					</div>
			</div>
		}

		const selected = new Set(this.props.research.modelData.requiredKPIs);
		const selectedKPIs = this.props.model.KPIGroups.map(group => {
			const kpis = this.props.model.KPIs.filter(
				k => k.groupID === group.groupID && selected.has(k.kpiID));
			if (kpis.length === 0) { return null; }
			return <div key={group.groupID}>
					<h4 style={{marginBottom: 0}}>{group.name}</h4>
					{kpis.map(k => <div key={k.kpiID} style={{paddingLeft: 20}}>
						{k.name}
					</div>)}
				</div>;
		});

		return <div>
			<div style={{width: '70%', textAlign: 'right', marginRight: 'auto', marginLeft: 'auto'}}>
				<RaisedButton onClick={this.startEditing}>Edit Brief</RaisedButton>
			</div>
			<div className="pane-title" style={{width: '70%'}}>Selected KPIs</div>
			<div className="pane results-pane">
				{selectedKPIs}
			</div>


		</div>
	}
}

Brief.propTypes = {
	model: React.PropTypes.object.isRequired,
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object.isRequired,
	toggleResearchKPI: React.PropTypes.func.isRequired,
	onModelVariableChange: React.PropTypes.func.isRequired
}

export default Brief;
