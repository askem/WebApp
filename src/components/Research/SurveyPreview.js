import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Survey from 'components/Survey/Survey';

class SurveyPreview extends React.Component {
	constructor(props) {
    	super(props);
		this.handleRestart = this.handleRestart.bind(this);
		this.state = {
			// dummy to force re-renders
			dt: new Date().getTime()
		};
	}
	handleRestart() {
		this.setState({
			dt: new Date().getTime()
		});
	}
	render() {
		const actions = [
			<FlatButton
	          label="Restart"
	          primary={true}
	          onTouchTap={this.handleRestart}
	        />,
			<FlatButton
		        label="Close"
		        primary={true}
		        onTouchTap={this.props.togglePreview}
			/>
		];
		return (
			<Dialog title="Survey Preview"
				actions={actions}
				contentStyle={{width:600}}
				bodyStyle={{backgroundColor: '#444444'}}
				titleStyle={{backgroundColor: '#444444', color: 'white'}}
				onRequestClose={this.props.togglePreview}
				modal={false} open={true}>
			<div style={{width:400, height: 650, color: 'black',
				marginLeft: 'auto', marginRight: 'auto'}}>
				<Survey key={`preview-${this.state.dt}`}
					survey={this.props.survey}
					questions={this.props.questions} />
			</div>
			</Dialog>
		)
	}
}

SurveyPreview.propTypes = {
	togglePreview: React.PropTypes.func.isRequired,
	survey: React.PropTypes.object.isRequired,
	questions: React.PropTypes.object.isRequired,
};

export default SurveyPreview;
