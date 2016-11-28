import React from 'react';
import Loading from 'components/Common/Loading';
import QuoteSurvey from 'components/Quote/QuoteSurvey';

class ManageQuote extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			selectedQuestion: null
		};
	}
	render() {
		if (!this.props.audience) {
			if (this.props.lead && this.props.lead.loadingFail) {
				return <div className="quote-wizard-loading">
					<strong>Error: Quote could not load</strong>
				</div>;
			}
			return <div className="quote-wizard-loading">
				<Loading className="loading-3bounce-green loading-3bounce-lg" />
			</div>;
		}
		
		return (
			<div>
				<h1>Manage Quote</h1>
				<div style={{width:1000, margin: '0 auto'}}>
					<QuoteSurvey {...this.props} showAdvancedControls={true} />
				</div>
			</div>
		)
	}
}

ManageQuote.propTypes = {

};

export default ManageQuote;
