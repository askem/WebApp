import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDataGrid from 'react-data-grid';
import FacebookAudienceLink from 'components/Common/FacebookAudienceLink';
import AddAudience from 'components/Research/Audiences/AddAudience';

const AudienceSourceFormatter = props => {
	const sourceNames = {
		askem: 'Askem Declarative Audience',
		facebook: 'Facebook'
	};
	const displayName = sourceNames[props.value] || '';
	return <span>{displayName}</span>;
};

class Audiences extends React.Component {
	constructor(props) {
    	super(props);
		this.openAddDialog = this.openAddDialog.bind(this);
		this.closeAddDialog = this.closeAddDialog.bind(this);
		this.state = {
			addDialogOpen: false
		}
	}
	openAddDialog() {
		this.setState({
			addDialogOpen: true
		});
	}
	closeAddDialog() {
		this.setState({
			addDialogOpen: false
		});
	}
	render() {
		const data = this.props.audiences;
		const rowGetter = idx => data[idx];
		const columns = [
			{key: 'name', name: 'Audience', resizable: true},
			{key: 'description', name: 'Description', resizable: true},
			{key: 'size', name: 'Size', resizable: true},
			{key: 'facebookAudienceID', name: 'Facebook Audience', resizable: true,
				formatter: <FacebookAudienceLink />},
			{key: 'source', name: 'Source',
				formatter: <AudienceSourceFormatter />}
		];
		const buttonStyle = {width: 150, marginRight: 10};
		let addDialog;
		if (this.state.addDialogOpen) {
			addDialog = <AddAudience {...this.props}
			onRequestClose={this.closeAddDialog}
			/>
		}
		return (
			<div>
				{addDialog}
				<h1>Audiences</h1>
				<div style={{marginBottom: 20, marginTop: 20, width: '80%', marginRight: 'auto', marginLeft: 'auto'}}>
					{/*<RaisedButton style={buttonStyle}>Add Channel</RaisedButton>*/}
					<RaisedButton style={buttonStyle} onClick={this.openAddDialog}>Add Audience</RaisedButton>
				</div>

				<div className="pane" style={{width: '80%', padding: 0}}>
					<ReactDataGrid columns={columns} rowGetter={rowGetter}
					rowsCount={data.length}  />
				</div>
			</div>
		)
	}
}

Audiences.propTypes = {

};

export default Audiences;
