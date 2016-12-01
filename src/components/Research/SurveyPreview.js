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
			// <FlatButton
	        //   label="Restart"
	        //   primary={true}
	        //   onTouchTap={this.handleRestart}
	        // />,
			<FlatButton
				label="Open in New Window"
				onTouchTap={() => window.open(this.props.previewURL, '_blank')}
				/>,
			<FlatButton
		        label="Close"
		        
		        onTouchTap={this.props.togglePreview}
			/>
		];
		// bodyStyle={{backgroundColor: '#444444'}}
		// titleStyle={{backgroundColor: '#444444', color: 'white'}}
		return (
			<Dialog title="Survey Preview"
				actions={actions}
				contentStyle={{width:600}}
				onRequestClose={this.props.togglePreview}
				modal={false} open={true}>
			<div className="survey-preview-dialog">
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
	previewURL: React.PropTypes.string,
};

export default SurveyPreview;
