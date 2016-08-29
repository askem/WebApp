import React from 'react';
import SurveyPreview from 'components/Research/SurveyPreview';
import RaisedButton from 'material-ui/RaisedButton';

class ResearchSurvey extends React.Component {
	constructor(props) {
    	super(props);
		this.togglePreview = this.togglePreview.bind(this);
		this.state = {
			surveyPreview: false
		}
	}
	togglePreview() {
		this.setState({
			surveyPreview: !this.state.surveyPreview
		});
	}
	render() {
		let preview;
		if (this.state.surveyPreview) {
			preview = <SurveyPreview
				togglePreview={this.togglePreview}
				survey={this.props.survey}
				questions={this.props.questions} />
		}
		return (
			<div>
				{preview}
				<div>
					<RaisedButton style={{width: 200}}
						onClick={this.togglePreview}>
						Show Preview
					</RaisedButton>
				</div>
			</div>
		)
	}
}

ResearchSurvey.propTypes = {
	survey: React.PropTypes.object.isRequired,
	questions: React.PropTypes.object.isRequired,
	researchID: React.PropTypes.string.isRequired
};

export default ResearchSurvey;
