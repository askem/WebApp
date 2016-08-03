import React from 'react';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

const getTeamUser = () => localStorage._teamUser;
const setTeamUser = (user) => { localStorage._teamUser = user; };

const UserChooser = (props) => {
	const users = ['IH', 'ZR', 'YH', 'TB', 'MT', 'NM'];
	return <div>
		{users.map(u => {
			const boundChoose = props.onChoose.bind(this, u);
			return <Avatar style={{marginRight: 10}} key={u} onClick={boundChoose}>{u}</Avatar>;
		})}
	</div>
}

class DebugMenu extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.sendInfo = this.sendInfo.bind(this);
		this.chooseUser = this.chooseUser.bind(this);

		this.state = {
			user: getTeamUser()
		};
	}
	sendInfo() {
		const actions = JSON.stringify(window.actionsLog);
		const reduxState = JSON.stringify(this.context.store.getState().get('data').toJSON());
	}
	chooseUser(user) {
		setTeamUser(user);
		this.setState({user});
	}
	render() {
		console.info('user', this.state.user);
		if (!this.state.user) {
			return <Dialog title="Who Are You?" modal={false} open={true}>
				<UserChooser onChoose={this.chooseUser} />
			</Dialog>
		}
		return (
			<Dialog title="Debug Menu" modal={false} open={true}>
				<div style={{marginBottom: 20}}>
					<RaisedButton label="Send Debug Info" onClick={this.sendInfo} />
				</div>
				<Divider />
			  	<div style={{width: '100%', textAlign: 'right'}}>
			  		Press ? to dismiss
				</div>
	        </Dialog>
		);
	}
};

DebugMenu.contextTypes = {
	store: React.PropTypes.object
};

export default DebugMenu;
