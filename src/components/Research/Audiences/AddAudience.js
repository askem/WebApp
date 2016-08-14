import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class AddAudience extends React.Component {
	constructor(props) {
    	super(props);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.state = {
			audience: ''
		};
	}
	handleAdd() {
		const audiences = this.state.audience.split(',');
		this.props.onAddAudience(this.props.researchID, 'facebook', audiences);
		this.props.onRequestClose();
	}
	handleChange(e) {
		this.setState({
			audience: e.target.value
		})
	}
	handleKeyDown(e) {
		if (e.keyCode === 13) {
			this.handleAdd();
		}
	}
	render() {
		const actions = [
			  <FlatButton
		        label="Cancel"
		        primary={false}
		        onTouchTap={this.props.onRequestClose}
		      />,
			  <FlatButton
		        label="Add"
		        primary={true}
		        onTouchTap={this.handleAdd}
		      />
		    ];
		return (
			<Dialog title="Add Audience"
			modal={false} open={true}
			actions={actions}
			onRequestClose={this.props.onRequestClose}>
			<div style={{color: 'black'}}>
				<ol>
					<li>In Facebook Ad Manager, share audience to 'Askem Native'.</li>
					<li>
					Enter ID Here:<br/>
					<TextField id="audienceInput" type="number" autoFocus={true}
						onKeyDown={this.handleKeyDown}
						hintText="Audience ID" floatingLabelText="Audience ID"
						value={this.state.audience} onChange={this.handleChange} />
					</li>
				</ol>

			</div>
	        </Dialog>
		)
	}
}

AddAudience.propTypes = {
	onRequestClose: React.PropTypes.func.isRequired
};

export default AddAudience;
