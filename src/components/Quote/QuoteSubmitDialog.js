import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class QuoteSubmitDialog extends React.Component {
	constructor(props) {
    	super(props);
	}
	render() {
		if (this.props.lead.submitInProgress) { 
			return <Dialog open={true}
				title="Submitting ...">
				Please Wait
			</Dialog>;
		} else if (this.props.lead.submitSuccess) {
			const actions = [
				<FlatButton	label="New Submission"
				onClick={this.props.onNewSubmission}
				/>,
				<FlatButton	label="Close"
				onClick={this.props.closeSuccessSubmitLead}
				/>
			];
			return <Dialog open={true}
				title="Thank You!"	
				actions={actions}>
				Your information was successfully submitted.
				Our representative will be in contact within 24 hours.
			</Dialog>;
		} else if (this.props.lead.submitFail) {
			const actions = [
				<FlatButton
					label="Cancel"
					onClick={this.props.cancelFailedSubmitLead}
				/>,
				<FlatButton
					label="Retry"
					onClick={this.props.submitLead}
				/>,
			];
			return <Dialog open={true}
				actions={actions}
				title="Error">
				An error occured while submitting your information. Please try again.
			</Dialog>;
		}
		return null;
	}
}

QuoteSubmitDialog.propTypes = {

};

export default QuoteSubmitDialog;
