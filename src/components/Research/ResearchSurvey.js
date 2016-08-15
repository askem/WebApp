import React from 'react';
import Survey from 'components/Survey/Survey';

class ResearchSurvey extends React.Component {
	constructor(props) {
    	super(props);
	}
	render() {
		return (
			<div>
				<h1>Survey</h1>
				<div style={{width:400, height: 650}}>
					<Survey
					survey={this.props.survey}
					questions={this.props.questions} />
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
