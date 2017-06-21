import React, { Component } from 'react';
import ReactSelectize from 'react-selectize';
import AGE_GROUPS from 'constants/AGE_GROUPS';
import Checkbox from 'components/Common/Checkbox/Checkbox';
import INDUSTRY_LIST from 'constants/INDUSTRY_LIST';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FaQuestionCircle from 'react-icons/lib/fa/question-circle';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from "react-day-picker";

import "react-day-picker/lib/style.css"

import AdAccounts from 'components/LeadGen/AdAccounts';
import LeadgenForm from 'components/LeadGen/LeadgenForm';

class LeadGen extends Component {
	constructor(props) {
		super(props);
		this.onIndustryChange = this.onIndustryChange.bind(this);
		this.onAgeGroupChange = this.onAgeGroupChange.bind(this);
		this.onGenderChange = this.onGenderChange.bind(this);
		this.onCampaignStartDateChange = this.onCampaignStartDateChange.bind(this);
		this.onCampaigEndDateChange = this.onCampaigEndDateChange.bind(this);
		this.onLoginToFacebookClick = this.onLoginToFacebookClick.bind(this);
		this.onIntentToPurchaseChange = this.onIntentToPurchaseChange.bind(this);
		this.onTextChange = this.onTextChange.bind(this);
		this.onContinueButton = this.onContinueButton.bind(this);

		this.state = {
			loading : true,
			fixedFormat : 'DD/MM/YYYY'
		}
	}

	
	componentWillMount() {
		this.initFacebookScript();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.leadgenLoading) {
			this.setState({ loading : true});
		}
		else {
			const industry = INDUSTRY_LIST.filter(item => item.id === nextProps.industry);
			let industryID = industry.length ? industry[0].id : nextProps.industry;
			
			const intentToPurchaseItemID = nextProps.intentToPurchase;
			const intentToPurchaseText = nextProps.intentToPurchaseText;
			const industryTextValue = nextProps.industryTextValue;

			let { intentToPurchaseTitle, intentToPurchaseItems, estimatedAudienceSize, price } = this.filterIndustryList(industryID);	

			let today = new Date();
			let todayDate = today.getDate();
			let tenDaysFromToday = new Date(today.setDate(today.getDate() + 10));

			let campaignStartDate;
			//let minCampaignEndDate;
			let campaignEndDate;

			const dateFormat = this.state.fixedFormat;


			if (!nextProps.campaignStartDate) {
				campaignStartDate =  moment(tenDaysFromToday).format(dateFormat);
				//minCampaignEndDate = campaignStartDate;
				campaignEndDate = '';
			}
			else {
				campaignStartDate = moment(nextProps.campaignStartDate).format(dateFormat);
				//minCampaignEndDate = new Date(campaignStartDate);
				//moment(campaignStartDate).format('DD/MM/YYYY');
			}

			if (!nextProps.campaignEndDate) {
				campaignEndDate = '';
			}
			else {
				campaignEndDate = moment(nextProps.campaignEndDate).format(dateFormat);
			}

			let currentDate = new Date();
			const minCampaignStartDate = tenDaysFromToday;


			let minCampaignEndDate = campaignStartDate.split('/')
			minCampaignEndDate = new Date(`${minCampaignEndDate[2]}-${minCampaignEndDate[1]}-${minCampaignEndDate[0]}`);

			this.setState({
				loading : false,
				selectedIndustry : industryID,
				intentToPurchaseItemID,
				intentToPurchaseTitle,
				campaignStartDate,
				campaignEndDate,
				minCampaignStartDate,
				minCampaignEndDate,
				intentToPurchaseItems,
				estimatedAudienceSize,
				price,
				intentToPurchaseText,
				industryTextValue
			});
		}
	}

	initFacebookScript() {
		const script = document.createElement('script');
  		script.innerText = `window.fbAsyncInit = function() {
			FB.init({
			appId      : '529005620566097',
			xfbml      : true,
			version    : 'v2.9'
			});
			FB.AppEvents.logPageView();
		};

		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));`;


		document.querySelector('body').appendChild(script);
	}

	onAgeGroupChange(event) {
		const ageGroup = event.target.dataset.group;
		let groups = [...this.props.ageGroups];
		const index = groups.indexOf(ageGroup);

		if (index === -1)  {
			groups.push(ageGroup);
		}
		else {
			groups = [...groups.slice(0, index), ...groups.slice(index+1)];
		}

		this.props.onAgeGroupChange(groups);
	}

	onGenderChange(event) {
		const gender = event.target.dataset.gender;
		let selectedGender = [ ...this.props.gender];
		const index = selectedGender.indexOf(gender);

		if (index === -1) {
			selectedGender.push(gender);
		}
		else {
			selectedGender = [ ...selectedGender.slice(0, index), ...selectedGender.slice(index+1)]
		}
					
		this.props.onGenderChange(selectedGender);
	}

	onIndustryChange(event, key, industryID) {
		const { intentToPurchaseItemID, intentToPurchaseTitle, intentToPurchaseItems, estimatedAudienceSize, price } = this.filterIndustryList(industryID);
		this.props.onIndustryChange(industryID, intentToPurchaseItemID, estimatedAudienceSize, price);
	}

	filterIndustryList(industryID) {
		if (industryID !== 'other') {
			const intentToPurchaseItems = INDUSTRY_LIST.filter((item, index) => {
													return item.id === industryID
											})[0].items;
			
			const selectedIntentToPurchase = intentToPurchaseItems[0];
			const intentToPurchaseItemID = selectedIntentToPurchase.id;
			const intentToPurchaseTitle =  selectedIntentToPurchase.title;
			const estimatedAudienceSize = selectedIntentToPurchase.estimatedAudienceSize;
			const price = selectedIntentToPurchase.price;

			return {
				intentToPurchaseItemID,
				intentToPurchaseTitle,
				intentToPurchaseItems,
				estimatedAudienceSize,
				price
			}
		}
		else {
			return {
				intentToPurchaseItemID : 'other',
				intentToPurchaseTitle : 'Other',
				intentToPurchaseItems: [],
				estimatedAudienceSize : 0,
				price : 0
			}
		}
	}

	formatDateToString(date) {
		const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
		const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	}


	onCampaignStartDateChange(selectedDate, modifiers) {
		let { campaignStartDate, campaignEndDate, fixedFormat } = this.state;

		/**
		 * clicking on the already selected date will pass
		 * undefined and true as parameters to this function
		 */		
		campaignStartDate =  typeof selectedDate === 'undefined' ? moment(this.state.campaignStartDate, fixedFormat).toDate() : selectedDate.toDate();
		if (typeof campaignEndDate === 'undefined' || !campaignEndDate) {
			campaignEndDate = '';  
		}
		else {
			
			campaignEndDate = moment(campaignEndDate, fixedFormat).toDate();
		}

		// this is to allow the input to mouse click
		// on the selected date --> due to DayPickerInput 'bug',
		// selecting the same selected date clears the input
		if (typeof selectedDate === 'undefined') {
			setTimeout(() => {
				this.setState({ campaignStartDate : moment(campaignStartDate).format(fixedFormat), });
			}, 10);
			return;
		}

		const minCampaignEndDate = campaignStartDate;

		if (campaignEndDate !== '' && campaignStartDate > campaignEndDate) {
			campaignEndDate = campaignStartDate;
		}

		const campaignEndDateAsString = campaignEndDate === '' ? '' : this.formatDateToString(campaignEndDate);

		this.setState({ 
				campaignStartDate : moment(campaignStartDate).format(fixedFormat),
				minCampaignEndDate,
				campaignEndDate : campaignEndDateAsString
		});

		this.props.onCampaignDateChange(campaignStartDate , campaignEndDate);
	}

	onCampaigEndDateChange(selectedDate, modifier) {
		const { fixedFormat } = this.state;
		const campaignStartDate = moment(this.state.campaignStartDate, fixedFormat).toDate();
		const campaignEndDate = typeof selectedDate !== 'undefined' ? selectedDate.toDate() : moment(this.state.campaignEndDate, fixedFormat).toDate();

		// this is to allow the input to mouse click
		// on the selected date --> due to DayPickerInput 'bug',
		// selecting the same selected date clears the input
		if (typeof selectedDate === 'undefined') {
			setTimeout(() => {
				this.setState({ campaignEndDate : moment(campaignEndDate).format(fixedFormat) });	
			}, 10);
			
			return;
		}

		
		if (campaignEndDate < campaignStartDate) {
			this.setState({ campaignEndDate : '' });
			return;
		}

		this.setState({ campaignEndDate : moment(campaignEndDate).format(fixedFormat) });
		this.props.onCampaignDateChange(campaignStartDate, campaignEndDate);
	}

	onLoginToFacebookClick(event) {
		FB.login(response => {
			FB.api('/me/adaccounts', {fields:'name'}, (response) => {
				const adAccounts = [...response.data];
				this.setState({ adAccounts });

			});
		}, { scope:  'ads_management'});
	}

	onIntentToPurchaseChange(event, key, payload) {
		let price, estimatedAudienceSize, selectedIntentToPurchaseItem
		let intentToPurchase = payload;
		
		if (payload !== 'other') {
			selectedIntentToPurchaseItem = INDUSTRY_LIST
													.filter(item => {
														return item.id === this.state.selectedIndustry;
													})[0].items
													.filter(item => {
															return item.id === payload;
													})[0];

			
			price = selectedIntentToPurchaseItem.price;
			estimatedAudienceSize = selectedIntentToPurchaseItem.estimatedAudienceSize;								
		}
		else {
			estimatedAudienceSize = 0;
			price = 0;
		}

		this.setState({ intentToPurchaseItemID : intentToPurchase, estimatedAudienceSize, price})
		this.props.onIntentToPurchaseChange(intentToPurchase, estimatedAudienceSize, price);
	}


	onTextChange(event, type) {
		const newValue = event.target.value;
		const estimatedAudienceSize = 0;
		const price = 0;

		if (type === 'industry') { 
			this.props.onIndustryChange('other', 'other', estimatedAudienceSize, price, newValue);
		}
		else {
			this.props.onIntentToPurchaseChange('other', estimatedAudienceSize, price, newValue);
			this.setState({ intentToPurchaseText : newValue});
		}
	}

	onContinueButton() {
		const leadgenID = localStorage.getItem('leadgenID');
		this.props.proceedToLeadgenContactForm(leadgenID);
	}

	render() {
		if (this.state.loading) {
			return (
				<div className="leadgen-loading ">Loading...</div>
			)
		}

		let inventory_items_list = INDUSTRY_LIST.map((item, index) => {
														const key = `${item.id}_${index}`;
														return <MenuItem
															key={key}
															value={item.id}
															primaryText={item.title}
														/>
													})

		inventory_items_list.push(
			<MenuItem
					key={`item_other`}
					value={'other'}
					primaryText={'Other'} />
		);	

		let intentToPurchaseItems = this.state.intentToPurchaseItems.map((item, index) => {
													let key = `item_${item.id}`;
													return <MenuItem
																key={ key }
																value={ item.id }
																primaryText={ item.title } />;
												})						

		intentToPurchaseItems.push(<MenuItem
					key={`item_other`}
					value={'other'}
					primaryText={'Other'} />);

		return (
			<div>
				<div className="leadgen-title">Get Declarative Leads</div>

				<div className="quote-wizard-border">
					<div className="quote-wizard-main">
						<div className="quote-wizard-maincontent">
							<div>
								<div className="quote-audience">
									<div className="title">
										Country
									</div>
									<div className="value quote-uneditable-select">
										<ReactSelectize.SimpleSelect ref="locationSelector"
											hideResetButton={true}
											filterOptions={(options, search) => options}
											options={['US']}
											renderOption={()=><span style={{marginLeft: 5}}>United States</span>}
											renderValue={()=><span>United States</span>}
											value={'US'}
										/>
									</div>
								</div>

								<div className="quote-audience">
									<div className="title">Ages</div>
									<div className="value" style={{display: 'flex'}}>
										{AGE_GROUPS.map(g => <div key={g.id}>
											<Checkbox 
												data-group={g.id}
												label={g.title}
												onChange={(event) => this.onAgeGroupChange(event)}
												checked={this.props.ageGroups.indexOf(g.id) > -1}
												/>
										</div>)}
									</div>
								</div>

								<div className="quote-audience">
									<div className="title">Gender</div>
									<div className="value">
										<Checkbox
											data-gender="female"
											label="Female"
											onChange={(event) => this.onGenderChange(event)} 
											checked={this.props.gender.indexOf('female') > -1} 
											/>
										<Checkbox
											data-gender="male"
											label="Male"
											onChange={(event) => this.onGenderChange(event)} 
											checked={this.props.gender.indexOf('male') > -1}
											/>
									</div>
								</div>

								<div className="quote-audience">
									<div className="title">
										Industry
									</div>
									<div className="industry-placeholder">
											<SelectField
												value={this.props.industry}
												onChange={this.onIndustryChange}
												ref="industry"
												id="industry">
													{ inventory_items_list }
											</SelectField>

											{ this.props.industry === 'other' && 
												<div className="other-text-container">
													<TextField
														hintText='please specify industry'
														label="enter industry"
														ref="otherIndustry"
														id="otherIndustry"
														onChange={(event) => this.onTextChange(event, 'industry')}
														value={this.props.industryTextValue}
													/>
												 </div>
											}
											
									</div>
								</div>

								<div className="quote-audience">
									<div className="title">
										Intent to purchase :
									</div>
									<div className="intent-to-purchase-placeholrder">
										<SelectField
											value={ this.state.intentToPurchaseItemID }		
											ref="intentToPurchase"						
											id="intentToPurchase"
											onChange={ this.onIntentToPurchaseChange }>
												{ intentToPurchaseItems }
										</SelectField>

										{ this.props.intentToPurchase === 'other' && 
											<div className="other-text-container">
												<TextField
														value={this.props.intentToPurchaseText}
														hintText='please specify intent to purchase'
														label="enter industry"
														ref="otherIntentToPurchase"
														id="otherIntentToPurchase"
														onChange={(event) =>  this.onTextChange(event, 'intentToPurchase')}
													/>
											</div>
										}
									</div>
								</div>

								<div className="quote-audience">
									<div className="campaign-date-container">
										<div className="campaign-date">
											<div className="title">
												Campaign start :
												<Tooltip
													 placement="right"
													 trigger='hover'
													 arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
													 overlay={
														<span>Campaign start date is always today + 10 days</span>
													 }>
													<FaQuestionCircle />
												</Tooltip>
											</div>
											<div className="date-picker-container">
													<DayPickerInput
														format="DD/MM/YYYY"
														value={this.state.campaignStartDate}
														onDayChange={this.onCampaignStartDateChange}
														dayPickerProps={{
																enableOutsideDays: true,
																disabledDays:{
																	before : this.state.minCampaignStartDate
																}
														}}
													/>
											</div>
										</div>
										
										<div className="campaign-date">
											<div className="title">
												Campaign end : 
												<Tooltip
													 placement="right"
													 trigger='hover'
													 arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
													 overlay={
														<span>Campaign end date must be at least start date</span>
													 }>
													<FaQuestionCircle />
												</Tooltip>
											</div>
											<div className="date-picker-container">
												<DayPickerInput
													format="DD/MM/YYYY"
													value={this.state.campaignEndDate}
													onDayChange={this.onCampaigEndDateChange}
													dayPickerProps={{
															enableOutsideDays: true,
															disabledDays:{
																before : this.state.minCampaignEndDate
															}
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="quote-wizard-side">
							<div>
								<div className="quote-wizard-side-title">
									Estimated Audience Size 
								</div>
								<div>
									<div className="quote-estimated-reach">
										{ typeof this.props.estimatedAudienceSize === 'undefined' ? this.state.estimatedAudienceSize : this.props.estimatedAudienceSize }
									</div>
								</div>
								<div className="quote-estimated-reach-description">
									Price : 
									{ typeof this.props.price === 'undefined' ? this.state.price : this.props.price }
								</div>
							</div>
						</div>
					</div>

					<div className="login-with-facebook-placeholder">
						<div className="button-container">
							<button
								disabled={this.state.campaignStartDate === ''}
								className="askem-button"
								onClick={ this.onLoginToFacebookClick }>
									LOGIN WITH FACEBOOK
								</button> 
						</div>
				 	</div>

					 { this.state.adAccounts && 
						 <div>
							<AdAccounts accounts={this.state.adAccounts} />
						 </div>
					 }
					 <div style={{  marginTop:'30px' }}>
						<button className="askem-button" onClick={this.onContinueButton}>
							continue
						</button>
					 </div>
				</div>
			</div>
		);
	}
}

export default LeadGen;