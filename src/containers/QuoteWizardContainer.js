import { connect } from 'react-redux';
import QuoteWizard from 'components/Quote/QuoteWizard';
import * as quoteActions from 'actions/quoteActions';

const QuoteWizardContainer = connect(
	function mapStateToProps(state, ownProps) {
		let demographics = state.getIn(['data', 'demographics']);
		if (demographics) { demographics = demographics.toJS(); }
		return {
			demographics
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			setQuoteDemoGender: (gender, value) => dispatch(quoteActions.setQuoteDemoGender(gender, value)),
			setQuoteDemoAgeGroups: value => dispatch(quoteActions.setQuoteDemoAgeGroups(value)),
		};
	}
)(QuoteWizard);

export default QuoteWizardContainer;
