import React from 'react';
import QuoteDemographics from 'components/Quote/QuoteDemographics';

const stages = {
	TARGET: 0,
	ASK: 1,
	ANSWERS: 2
};

const stageTitles = [
	'Target',
	'Ask',
	'Get Answers'
];

class QuoteWizard extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			stage: stages.TARGET
		};
	}


	render() {
		let stageComponent;
		switch (this.state.stage) {
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
						return <div className={className} key={s}>
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
