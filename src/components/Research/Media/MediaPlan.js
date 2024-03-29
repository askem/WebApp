import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDataGrid from 'react-data-grid';
import { Editors } from 'react-data-grid/addons';
import TAGGING_METHODS from 'constants/TAGGING_METHODS';
import ImportMediaPlan from 'components/Research/Media/ImportMediaPlan';

class NumberEditor extends Editors.SimpleTextEditor {
	render() {
		return <input ref="input" type="number" onBlur={this.props.onBlur} className="form-control" defaultValue={this.props.value} />;
	}
}

class EmailEditor extends Editors.SimpleTextEditor {
	render() {
		return <input ref="input" type="email" onBlur={this.props.onBlur} className="form-control" defaultValue={this.props.value} />;
	}
}

const TaggingMethodFormatter = props => <span>
		{TAGGING_METHODS.find(tm => tm.id === props.value).title}
	</span>;

const BoolFormatter = props => <span>
		{props.value ? 'Yes' : 'No'}
	</span>;

class MediaPlan extends React.Component {
	constructor(props) {
    	super(props);
		this.handleRowUpdated = this.handleRowUpdated.bind(this);
		this.openImportDialog = this.openImportDialog.bind(this);
		this.closeImportDialog = this.closeImportDialog.bind(this);
		this.state = {
			importOpen: false
		};
	}

	handleRowUpdated(e) {
		console.info(e);

		if (e.cellKey === 'taggingMethod') {
			let val = e.updated.taggingMethod;
			val = TAGGING_METHODS.find(tm => tm.title === val).id;
		}
    // //merge updated row with current row and rerender by setting state
    // var rows = this.state.rows;
    // Object.assign(rows[e.rowIdx], e.updated);
    // this.setState({rows:rows});
 	}
	openImportDialog() {
		this.setState({
			importOpen: true
		});
	}
	closeImportDialog() {
		this.setState({
			importOpen: false
		});
	}
	render() {
		const taggingMethods = TAGGING_METHODS.map(tm => {
			tm.value = tm.title;
			tm.text = tm.title;
			return tm;
		});
		const channels = this.props.mediaPlan.channels
		const rowGetter = idx => channels[idx];
		const columns = [
			{key: 'channelName', name: 'Channel', resizable: true, editable: true},
			{key: 'description', name: 'Description', resizable: true, editable: true},
			{key: 'taggingMethod', name: 'Tagging Method', resizable: true,
				editor: <Editors.DropDownEditor options={taggingMethods} />,
				formatter: <TaggingMethodFormatter />
			},
			{key: 'estimatedReach', name: 'Estimated Reach', resizable: true, editor: <NumberEditor />},
			{key: 'estimatedUniques', name: 'Estimated Unique', resizable: true, editor: <NumberEditor />},
			{key: 'budget', name: 'Budget', resizable: true, editable: true},
			{key: 'technicalContact', name: 'Technical Contact', resizable: true, editor: <EmailEditor />},
			{key: 'businessContact', name: 'Admin Contact', resizable: true, editor: <EmailEditor />},
			{key: 'isRetargeting', name: 'Is Retargeting', resizable: true,
				formatter: <BoolFormatter />,
			}
		];
		const buttonStyle = {width: 150, marginRight: 10};

		let importDialog;
		if (this.state.importOpen) {
			importDialog = <ImportMediaPlan {...this.props} onRequestClose={this.closeImportDialog} />
		}

		return (
			<div>
				{importDialog}
				<div style={{marginBottom: 20, marginTop: 20, width: '80%', marginRight: 'auto', marginLeft: 'auto'}}>
					{/*<RaisedButton style={buttonStyle}>Add Channel</RaisedButton>*/}
					<RaisedButton style={buttonStyle} onClick={this.openImportDialog}>Import Excel</RaisedButton>
				</div>

				<div className="pane" style={{width: '80%', padding: 0}}>
					<ReactDataGrid columns={columns} rowGetter={rowGetter}
					onRowUpdated={this.handleRowUpdated}
					rowsCount={channels.length} enableCellSelect={true}
					cellNavigationMode="changeRow" />
				</div>

			</div>
		)
	}
}

MediaPlan.propTypes = {
	researchID: React.PropTypes.string.isRequired,
	mediaPlan: React.PropTypes.object,
	getMediaPlan: React.PropTypes.func.isRequired,
	addChannels: React.PropTypes.func.isRequired
};

export default MediaPlan;
