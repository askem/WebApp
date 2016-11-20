import React from 'react';
import TextField from 'material-ui/TextField';
import Loading from 'components/Common/Loading';
import { browserHistory } from 'react-router';

class Login extends React.Component {
	constructor(props) {
    	super(props);
		this.doLogin = this.doLogin.bind(this);
		this.state = {
			email: '',
			password: '',
			performingLogin: false,
			errorMessage: ''
		};
	}
	doLogin() {
		if (!this.state.email || !this.state.password) {
			this.setState({
				errorMessage: 'Please provide valid email and password'
			});
			return;
		}
		const self = this;
		const { location, history } = this.props;
		this.setState({
			performingLogin: true,
			errorMessage: ''
		});
		window.api.getAccessToken(this.state.email, this.state.password)
		.then(() => {
			self.setState({
				performingLogin: false
			});
			if (location.state && location.state.nextPathname) {
				browserHistory.replace(location.state.nextPathname);
			} else {
				browserHistory.replace('/admin');
			}
		})
		.catch(error => {
			console.error(error);
			self.setState({
				errorMessage: 'Error while logging in',
				performingLogin: false
			});
		});
	}
	render() {
		let button;
		if (!this.state.performingLogin) {
			button = <button className="askem-button-white" onClick={this.doLogin}>Login</button>;
		} else {
			button = <Loading className="loading-3bounce-purple" />;
		}
		return (
			<div className="login">
				<h1>Login</h1>
				<div>
					<label htmlFor="email">Email</label>
					<TextField value={this.state.email} type="email"
					disabled={this.state.performingLogin}
					onFocus={() => this.setState({errorMessage: ''})}
					onChange={(e) =>
						this.setState({
							email: e.target.value
						})
					} id="login_email" autoFocus />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<TextField value={this.state.password} type="password"
					disabled={this.state.performingLogin}
					onFocus={() => this.setState({errorMessage: ''})}
					onChange={(e) =>
						this.setState({
							password: e.target.value
						})
					} id="login_password" />
				</div>
				<div className="error-message">
					{this.state.errorMessage}
				</div>
				<div className="button-container">
					{button}
				</div>
			</div>
		)
	}
}

Login.propTypes = {

};

export default Login;
