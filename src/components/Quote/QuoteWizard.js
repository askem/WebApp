import React from 'react';
import QuoteDemographics from 'components/Quote/QuoteDemographics';
import QuoteModels from 'components/Quote/QuoteModels';

const stages = {
	ASK: 0,
	TARGET: 1,
	ANSWERS: 2
};

const stageTitles = [
	'Ask',
	'Target',
	'Get Answers'
];

class QuoteWizard extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			stage: stages.ASK
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
			case stages.ASK:
				stageComponent = <QuoteModels {...this.props} />
				break;
			case stages.TARGET:
				stageComponent = <QuoteDemographics {...this.props} />;
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
