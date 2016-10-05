import React from 'react';
import CreateSurvey from 'components/Quote/CreateSurvey';
import QuoteDemographics from 'components/Quote/QuoteDemographics';
import SampleSize from 'components/Quote/SampleSize';

const stages = {
	AUDIENCE: 0,
	SURVEY: 1,
	SAMPLE_SIZE: 2
};

const stageTitles = [
	'Audience',
	'Survey',
	'Sample Size'
];

class QuoteWizard extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			stage: stages.AUDIENCE
		};
	}
	handleStageClick(stage) {
		if (this.state.stage === stage) {
			return;
		}
		this.setState({
			stage
		});
	}
	render() {
		let stageComponent;
		switch (this.state.stage) {
			case stages.AUDIENCE:
				stageComponent = <QuoteDemographics {...this.props} />;
				break;
			case stages.SURVEY:
				stageComponent = <CreateSurvey {...this.props} />;
				break;
			case stages.SAMPLE_SIZE:
				stageComponent = <SampleSize {...this.props} />;
				break;
			default:
		}
		return (
			<div>
				<div className="quote-wizard-header">
					{stageTitles.map((s, idx) => {
						let className = (idx === this.state.stage) ? 'stage active' : 'stage';
						return <div className={className} key={s}
							onClick={()=> this.handleStageClick(idx)}>
							<div className="number">0{idx+1}</div>
							<div className="title">{s}</div>
						</div>
					})}
				</div>
				{stageComponent}
			</div>
		)
	}
}

QuoteWizard.propTypes = {

};

export default QuoteWizard;
