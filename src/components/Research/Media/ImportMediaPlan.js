import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload';
import XLSX from 'xlsx';
import TAGGING_METHODS from 'constants/TAGGING_METHODS';

class ImportMediaPlan extends React.Component {
	constructor(props) {
    	super(props);
		this.handleUpload = this.handleUpload.bind(this);
	}
	worksheetToChannelsJSON(worksheet) {
		const colNames = {
			'channelName': 'Media Channel',
			'description': 'Description',
			'taggingMethod': 'Tagging Method',
			'estimatedReach': 'Estimated Reach',
			'estimatedUniques': 'Estimated Reach [Uniques]',
			'budget': 'Budget',
			'technicalContact': 'Technical Contact',
			'businessContact': 'Admin Contact',
			'isRetargeting': 'Is Retargeting'
		};
		let channels = [];
		worksheet.forEach(row => {
			let channel = {};
			for (let col in colNames) {
				let value = row[colNames[col]];
				switch (col) {
					case 'isRetargeting':
						value = value === 'Yes';
						break;
					case 'estimatedReach', 'estimatedUniques':
						value = Number(value) || 0;
						break;
					case 'taggingMethod':
						value = TAGGING_METHODS.find(tm => tm.title === value).id;
						break;
					default:
						value = value || '';
				}
				channel[col] = value;
			}
			channels.push(channel);
		});
		return channels;
	}

	handleUpload(e) {
		e.preventDefault();
		console.info(e);
		const reader = new FileReader();
		const file = e.target.files[0];
		if (file &&
			file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
			file.type === "application/vnd.ms-excel") {
			reader.onload = (loadE) => {
				console.info('onload');
				console.info(loadE);
				const data = loadE.target.result;
				const workbook = XLSX.read(data, {type: 'binary'});
				const firstSheetName = workbook.SheetNames[0];
				const sheet = workbook.Sheets[firstSheetName];
				const wsJSON = XLSX.utils.sheet_to_json(sheet);
				const channels = this.worksheetToChannelsJSON(wsJSON);
				this.props.addChannels(this.props.researchID, channels);
				this.props.onRequestClose();
			}
			reader.readAsBinaryString(file);
		}
	}
	render() {
		const actions = [
		      <FlatButton
		        label="Cancel"
		        primary={true}
		        onTouchTap={this.props.onRequestClose}
		      />
		  ];
		const uploadHiddenStyle = {
    		cursor: 'pointer',
			position: 'absolute',
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
			width: '100%',
			height: '100%',
			opacity: 0
		};
		return (
			<Dialog title="Import Media Plan"
			modal={false} open={true}
			actions={actions}
			onRequestClose={this.props.onRequestClose}>
			<div style={{marginBottom: 30}}>
				<RaisedButton style={{width: 250, height: 80}}
				label="Upload Excel File"
				icon={<FaCloudUpload size={30} />}>
				<input type="file" style={uploadHiddenStyle}
				accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
				onChange={this.handleUpload} />
				</RaisedButton>
			</div>
			<a href="/resources/MediaPlanTemplate.xlsx">Download Excel Template</a>
	        </Dialog>
		)
	}
}

ImportMediaPlan.propTypes = {

};

export default ImportMediaPlan;
