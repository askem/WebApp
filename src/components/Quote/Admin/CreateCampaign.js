import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Circle } from 'react-progressbar.js';
import TextField from 'material-ui/TextField';

class CreateCampaign extends Component {
	constructor(props) {
		super(props);
		this.startCampaign = this.startCampaign.bind(this);
		this.stopCampaign = this.stopCampaign.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.isValid = this.isValid.bind(this);
		this.createCampaign	 = this.createCampaign.bind(this);
		this.convertToLocalTime = this.convertToLocalTime.bind(this);

		this.state = {
			campaignRunning : false,
			timer: null,
			buttonsDisabled : true,
			campaignDaysValid : true,
			microCellMaxSizeValid : true,
			microCellMaxImageAdsValid: true,
			microCellMaxCarouselAdsValid : true,
			campaignExists : false,
			inProcess : false,
			interval : 1000 * 5,
			inputDisabled : false
		}
	}


	createCampaign() {
		this.setState({ inProcess : true, inputDisabled : true});
		this.props.createCampaign(this.refs.campaignSpentCaps.input.value,
								  this.refs.campaignDays.input.value,
								  this.refs.microCellMaxSize.input.value,
								  this.refs.microCellMaxImageAds.input.value,
								  this.refs.microCellMaxCarouselAds.input.value,
								  this.props.sampleID);
	}

	startCampaign() {

	}

	stopCampaign() {
		// if (this.state.timer) {
		// 	window.clearInterval(this.state.timer);
		// 	this.setState({ campaignRunning:false })
		// }
	}

	handleTextChange(event) {
		if (this.isValid()){
			this.setState({ buttonsDisabled : false });
		}
		else {
			this.setState({ buttonsDisabled : true });
		}
	}

	isValid() {
		const fieldsNotEmpty = (this.refs.campaignSpentCaps.input.value.length > 0 &&
			this.refs.campaignDays.input.value.length > 0 && 
			this.refs.microCellMaxSize.input.value.length > 0 && 
			this.refs.microCellMaxImageAds.input.value.length > 0 && 
			this.refs.microCellMaxCarouselAds.input.value.length > 0);

		const campaignDays = parseInt(this.refs.campaignDays.input.value);
		const campaignDaysValid = !isNaN(campaignDays) && campaignDays >= 2 && campaignDays <= 7;
		const microCellMaxSize = parseInt(this.refs.microCellMaxSize.input.value);
		const microCellMaxSizeValid = !isNaN(microCellMaxSize) && microCellMaxSize >= 5 && microCellMaxSize <= 15;
		const microCellMaxImageAds = parseInt(this.refs.microCellMaxImageAds.input.value);
		const microCellMaxImageAdsValid = !isNaN(microCellMaxImageAds) && microCellMaxImageAds >= 10 && microCellMaxImageAds <= 35;
		const microCellMaxCarouselAds = parseInt(this.refs.microCellMaxCarouselAds.input.value);
		const microCellMaxCarouselAdsValid = !isNaN(microCellMaxCarouselAds) && microCellMaxCarouselAds >= 5 && microCellMaxCarouselAds <= 15;

		this.setState({
			campaignDaysValid,
			microCellMaxSizeValid,
			microCellMaxImageAdsValid,
			microCellMaxCarouselAdsValid
		})

		return fieldsNotEmpty && campaignDaysValid && microCellMaxSizeValid && microCellMaxImageAdsValid && microCellMaxCarouselAdsValid;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.campaignStatus && nextProps.campaignStatus.continueWithGetStatus) {
			if (this.state.timer === null) {
				this.setPollingInterval();	
			}
		}
	}
	
	setPollingInterval() {
		const timer = setInterval(() => {
			if (this.props.campaignStatus && this.props.campaignStatus.progress === 1) {
				window.clearInterval(this.state.timer);
				this.setState({ inProcess : false, campaignExists:true, timer : null, buttonsDisabled:true });
				this.props.setCreateCampaignStatusFinished();
				return;
			}

			this.props.getCreateCampaignStatus(this.props.sampleID);
		}, this.state.interval);

		this.setState({ timer, buttonsDisabled : true });
		this.props.getCreateCampaignStatus(this.props.sampleID);
	}


	convertToLocalTime(dateString) {
		dateString = dateString.replace(/\//g, '').replace('Date(', '').replace(')', '');
		return new Date(parseInt(dateString)).toString();
	}

	render() {
		const percent = this.props.campaignStatus && this.props.campaignStatus.progress ? this.props.campaignStatus.progress : '0';
		const text = `${parseInt(percent*100)}%`;
		const options = {
				strokeWidth : 10,
				 style: {
            		color: '#f00',
            		position: 'absolute',
            		left: '50%',
            		top: '50%',
            		padding: 0,
            		margin: 0,
            		transform: {
                		prefix: true,
                		value: 'translate(-50%, -50%)'
            		}
        		},
				text : {
					className : 'circular-text-style'
				}
		}

		return (
			<div className="create-campaign-container">
				<div>
					<TextField 
						floatingLabelText="Campaign spent caps (in USD)"
						onChange={ this.handleTextChange }
						className="text-field"
						ref="campaignSpentCaps"
						disabled={ this.state.inputDisabled } />

					<div></div>		
				</div>
				<div>
					<TextField
						floatingLabelText="Campign Days (2-7 days)"
						onChange={ this.handleTextChange }
						className="text-field"
						ref="campaignDays" 
						disabled={ this.state.inputDisabled }/>

					<div className="error-message" style={{ display:this.state.campaignDaysValid ? 'none' : 'inline' }}>Campaign days must be a number and between 2-7 days</div>
				</div>
				<div>
					<TextField
						floatingLabelText="Micro cell max size (5-15)"
						onChange={ this.handleTextChange }
						className="text-field"
						ref="microCellMaxSize"
						disabled={ this.state.inputDisabled } />

					<div className="error-message" style={{ display:this.state.microCellMaxSizeValid ? 'none' : 'inline' }}>Max size beween 5-15</div>
				</div>
				<div>
					<TextField
						floatingLabelText="Micro cell max image ads (10-35)"
						onChange={ this.handleTextChange }
						className="text-field"
						ref="microCellMaxImageAds"
						disabled={ this.state.inputDisabled } />

					<div className="error-message" style={{ display: this.state.microCellMaxImageAdsValid ? 'none' : 'inline' }}>Max image ads between 10 and 35</div>
				</div>
				<div>
					<TextField
						floatingLabelText="Micro cell max carousel ads (5-15)"
						onChange={ this.handleTextChange }
						className="text-field"
						ref="microCellMaxCarouselAds"
						disabled={ this.state.inputDisabled } />

					<div className="error-message" style={{ display: this.state.microCellMaxCarouselAdsValid ? 'none' : 'inline' }}>Max carousel ads between 5 and 15</div>
				</div>

				<div style={{ display:'inline' }}>
					<FlatButton 
						label="create campaign"
						onTouchTap={ this.createCampaign }
						disabled={ this.state.buttonsDisabled || this.state.inProcess } />
				</div>
				<div className="buttons">
					<FlatButton 
						label="start campaign"
						onTouchTap={ this.startCampaign }
						disabled={ !this.state.campaignExists } />
				</div>
				<div className="buttons">
					<FlatButton 
						label="stop campaign"
						onTouchTap={ this.stopCampaign } 
						disabled={ !this.state.campaignExists } />
				</div>
				{ this.state.inProcess && 
					<div>
						<div className="campaign-end-time">						
							{ (this.props.campaignStatus && this.props.campaignStatus.ETA) && 
							<span className="">Campaign will finish at { this.convertToLocalTime(this.props.campaignStatus.ETA) }</span>
							}
						</div>

						<div className="circular-progress-container">
							<div className="circle-container">
								<Circle 
										progress={ percent }
										initialAnimate={true}
										text={ text }
										options={ options } />
							</div>
						</div>
					</div>
				}	
			</div>
		);
	}
}

export default CreateCampaign;