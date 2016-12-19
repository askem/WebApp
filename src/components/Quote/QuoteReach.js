import React from 'react';
import Loading from 'components/Common/Loading';
import numeral from 'numeral';

class QuoteReach extends React.Component {
	constructor(props) {
    	super(props);
	}
	render() {
		let reach;
		if (this.props.reach) {
			reach = <div>
				<div className="quote-estimated-reach">
					{numeral(this.props.reach).format('a')}
				</div>
				<div className="quote-estimated-reach-description">
					monthly active people
				</div>
			</div>
		} else {
			reach = <Loading className="loading-3bounce-green" />;
		}
		let estimatedCostDiv;
		if (this.props.showCostEstimate) {
			let costEstimate;
			if (this.props.costEstimate) {
				if (this.props.costEstimate.estimates) {
					const estimates = this.props.costEstimate.estimates;
					costEstimate = <div className="quote-estimated-reach-description">
						{Object.keys(estimates).map(sampleSize => {
							let estimateDescription;
							if (estimates[sampleSize].supported) {
								estimateDescription = <span className="price">
									{numeral(estimates[sampleSize].costPerSample).divide(100).format('$0,0.00')}
								</span>;
							} else {
								estimateDescription = <span className="price-error">
									Not Supported
								</span>;
							}
							return <div key={sampleSize}>
								<span className="sample-size-estimate">{sampleSize} Respondents:</span>
								{estimateDescription}
							</div>
						})}
					</div>
				} else {
					costEstimate = <Loading className="loading-3bounce-green" />;
				}
			} else {
				costEstimate = <div>
					<button className="askem-button-white" onClick={this.props.requestCostEstimates}>Get Cost Estimate</button>
				</div>;
			}
			estimatedCostDiv = <div className="quote-estimated-cost">
				<div className="quote-wizard-side-title">
					Estimated Cost
				</div>
				{costEstimate}
			</div>;
		}
		return (
			<div>
				<div className="quote-wizard-side-title">
					Estimated Reach
				</div>
				{reach}
				
				{estimatedCostDiv}
			</div>
		)
	}
}

QuoteReach.propTypes = {
	reach: React.PropTypes.number,
	showCostEstimate: React.PropTypes.bool,
	costEstimate: React.PropTypes.object,
	requestCostEstimates: React.PropTypes.func,
};

export default QuoteReach;
