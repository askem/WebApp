import { connect } from 'react-redux';
import LeadGen from 'components/LeadGen/LeadGen';
import * as leadGenActions from 'actions/leadGenActions';

const LeadGenContainer = connect(
	function mapStateToProps(state, ownProps) {
		let leadgenID = state.getIn(['data', 'lead', 'leadgenID']);
		let ageGroups = state.getIn(['data', 'lead', 'metadata', 'ageGroups'])
		ageGroups = ageGroups || [];

		let gender = state.getIn(['data', 'lead', 'metadata', 'gender']);
		gender = gender || [];

		let campaignStartDate = state.getIn(['data', 'lead', 'metadata', 'campaignStartDate']);
		let campaignEndDate = state.getIn(['data', 'lead', 'metadata', 'campaignEndDate']);
		let industry = state.getIn(['data', 'lead', 'metadata', 'industry']);
		let intentToPurchase = state.getIn(['data', 'lead', 'metadata', 'intentToPurchase']);
		let estimatedAudienceSize = state.getIn(['data', 'lead', 'metadata', 'estimatedAudienceSize']);
		let price = state.getIn(['data', 'lead', 'metadata', 'price']);
		let intentToPurchaseText = state.getIn(['data', 'lead', 'metadata', 'intentToPurchaseText']);
		let industryTextValue = state.getIn(['data', 'lead', 'metadata', 'industryTextValue']);

		let leadgenLoading = state.getIn(['data', 'lead', 'leadgenLoading']);
		leadgenLoading = (typeof leadgenLoading === 'undefined') ?  true : leadgenLoading;

		return {
			leadgenID,
			ageGroups,
			gender,
			campaignStartDate,
			campaignEndDate,
			industry,
			industryTextValue,
			intentToPurchase,
			estimatedAudienceSize,
			price,
			leadgenLoading,
			intentToPurchaseText
		}
	},

	function mapDispatchToProps(dispatch) {
		return {
			onAgeGroupChange : groups => dispatch(leadGenActions.onAgeGroupChange(groups)),
			onGenderChange : genders => dispatch(leadGenActions.onGenderChange(genders)),
			onIndustryChange : (industry, intentToPurchase, estimatedAudienceSize, price, industryTextValue) => dispatch(leadGenActions.onIndustryChange(industry, intentToPurchase, estimatedAudienceSize, price, industryTextValue)),
			onCampaignDateChange : (campaignStartDate, campaignEndDate) => dispatch(leadGenActions.onCampaignDateChange(campaignStartDate, campaignEndDate)),
			onIntentToPurchaseChange : (intentToPurchase, estimatedAudienceSize, price, intentToPurchaseTextValue) => dispatch(leadGenActions.onIntentToPurchaseChange(intentToPurchase, estimatedAudienceSize, price, intentToPurchaseTextValue)),
		}
	}
)(LeadGen);

export default LeadGenContainer;