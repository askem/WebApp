import React from 'react';
import Loading from 'components/Common/Loading';
import Survey from 'components/Survey/Survey';

class ExternalSurveyPreview extends React.Component {
	constructor(props) {
    	super(props);
	}
	
	render() {
		if (!this.props.surveyMetadata) {
			if (this.props.lead && this.props.lead.loadingFail) {
				return <div className="quote-wizard-loading">
					<strong>Error: Could not load preview</strong>
				</div>;
			}
			return <div className="quote-wizard-loading">
				<Loading className="loading-3bounce-green loading-3bounce-lg" />
			</div>;
		}
		if (this.props.surveyMetadata.questions.length === 0) {
			return <div className="quote-wizard-loading">
				<strong>Survey is not yet available</strong>
			</div>;
		}
		
		return <div className="external-preview">
				<Survey survey={this.props.survey} questions={this.props.questions} />
			</div>;
	}
}

ExternalSurveyPreview.propTypes = {

};

export default ExternalSurveyPreview;
