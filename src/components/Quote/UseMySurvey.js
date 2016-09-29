import React from 'react';
import TextField from 'material-ui/TextField';

class UseMySurvey extends React.Component {
	constructor(props) {
    	super(props);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleDone = this.handleDone.bind(this);
		this.state = {
			url: ''
		};
	}
	handleTextChange(e) {
		this.setState({
			url: e.target.value
		});
	}
	handleDone() {
		// TODO: validate
		this.props.onComplete(this.state.url);
	}
	render() {
		const canProceed = (this.state.url !== '');
		return (
			<div>
				<TextField id="my_survey_url" hintText="Survey URL" floatingLabelText="Survey URL"
				value={this.state.url} onChange={this.handleTextChange} />
				<button onClick={this.props.onCancel}>Cancel</button>
				<button onClick={this.handleDone} enabled={canProceed}>Done</button>
			</div>
		)
	}
}

UseMySurvey.propTypes = {
	onComplete: React.PropTypes.func.isRequired,
	onCancel: React.PropTypes.func.isRequired
};

export default UseMySurvey;
