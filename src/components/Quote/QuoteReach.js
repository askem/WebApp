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
		if (window.api.loggedIn()) {
			let costEstimate;
			if (this.props.costEstimate && this.props.costEstimate.estimates) {
				const estimates = this.props.costEstimate.estimates;
				costEstimate = <div className="quote-estimated-reach-description">
					{Object.keys(estimates).map(sampleSize => 
						<div key={sampleSize}>
							<span className="sample-size-estimate">{sampleSize} Respondents:</span>
							<span className="price">
								{numeral(estimates[sampleSize].costPerSample).divide(100).format('$0,0.00')}
							</span>
						</div>)}
				</div>
			} else {
				costEstimate = <Loading className="loading-3bounce-green" />;
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

};

export default QuoteReach;
