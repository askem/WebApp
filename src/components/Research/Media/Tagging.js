import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ReactDataGrid from 'react-data-grid';
import TaggingInstructions from 'components/Research/Media/TaggingInstructions';

class Tagging extends React.Component {
	constructor(props) {
    	super(props);
		this.handleChannelInstructions = this.handleChannelInstructions.bind(this);
		this.closeInstructions = this.closeInstructions.bind(this);
		this.state = {
			openInstructions: null
		}
	}
	handleChannelInstructions(channelName) {
		this.setState({
			openInstructions: channelName
		})
	}
	closeInstructions() {
		this.setState({
			openInstructions: null
		})
	}
	render() {
		const InstructionsButton = props => {
			const boundClick = props.onClick.bind(this, props.value);
			return <FlatButton primary={true}
					onClick={boundClick}>
					Instructions
				</FlatButton>;
		};
		const taggingByChannel = this.props.taggingStatus.channels;
		const data = this.props.mediaPlan.channels.map(c => {
			const tagging = taggingByChannel.find(t => t.channelName === c.channelName);
			let channelData;
			if (tagging) {
				channelData = Object.assign({}, c, tagging);
			} else {
				channelData = Object.assign({}, c, {
					total: 0,
					unique: 0,
					facebookAudienceID: '<N/A>'
				});
			}
			if (channelData.total === 0) {
				channelData.total = '0 ⚠️';
			}
			return channelData;
		});
		const rowGetter = idx => data[idx];
		const columns = [
			{key: 'channelName', name: 'Channel', resizable: true},
			{key: 'total', name: 'Total Tags', resizable: true},
			{key: 'unique', name: 'Unique Tags', resizable: true},
			{key: 'facebookAudienceID', name: 'Facebook Audience', resizable: true},
			{key: 'channelName', name: 'Instructions',
				formatter: <InstructionsButton onClick={this.handleChannelInstructions} />}
		];
		const buttonStyle = {width: 150, marginRight: 10};

		let instructionsDialog;
		if (this.state.openInstructions) {
			instructionsDialog = <TaggingInstructions {...this.props}
				channelName={this.state.openInstructions}
				onRequestClose={this.closeInstructions} />;
		}
		return (
			<div>
				{instructionsDialog}
				<h1>Tagging</h1>
				<h2>Impressions</h2>
				{/*<div style={{marginBottom: 20, marginTop: 20, width: '80%', marginRight: 'auto', marginLeft: 'auto'}}>
					<RaisedButton style={buttonStyle}>Tagging Instructions</RaisedButton>
				</div>*/}

				<div className="pane" style={{width: '80%', padding: 0}}>
					<ReactDataGrid columns={columns} rowGetter={rowGetter}
					rowsCount={data.length} />
				</div>

				<h2>Conversions</h2>
				{/*<div style={{marginBottom: 20, marginTop: 20, width: '80%', marginRight: 'auto', marginLeft: 'auto'}}>
					<RaisedButton style={buttonStyle}>Tagging Instructions</RaisedButton>
				</div>*/}

				<div className="pane" style={{width: '80%', padding: 0}}>
					<ReactDataGrid columns={columns} rowGetter={rowGetter}
					rowsCount={data.length} />
				</div>
			</div>
		)
	}
}

Tagging.propTypes = {

};

export default Tagging;
