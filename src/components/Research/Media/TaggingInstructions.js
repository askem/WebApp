import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import copyToClipboard from 'utils/copyToClipboard';

const facebookPartnerID = '932650486806342';
const youtubeCustomerID = '607-632-1430';
const viewtagURL = channelName =>
`https://www.facebook.com/tr/?id=1526910370926908&ev=APixel&dl=http%3A%2F%2Faskem.com%2Fpixel%3Fpub%3DAskemTestUni%26campaign%3DNativePixTestUni%26ch%3D${channelName}&rl=&i=false&ts=1441620412729&cd[pub]=AskemTestUni&cd[campaign]=NativePixTestUni&cd[ch]=${channelName}`;
const jspixelURL = channelName =>
`<script src="https://askem.com/pixel.js?pub=Shlomo&campaign=LANDING_NewCar201607&ch=${channelName}" async="async" defer="defer"></script>`;

class TaggingInstructions extends React.Component {
	constructor(props) {
    	super(props);
		this.handleClose = this.handleClose.bind(this);
		this.renderInstructions = this.renderInstructions.bind(this);
		this.handlePDF = this.handlePDF.bind(this);
		this.copyYoutube = this.copyYoutube.bind(this);
		this.copyFacebook = this.copyFacebook.bind(this);
		this.copyViewtag = this.copyViewtag.bind(this);
		this.copyJSPixel = this.copyJSPixel.bind(this);
	}
	handleClose(e) {
		this.props.onRequestClose(e);
	}
	handlePDF() {

	}
	copyYoutube() {
		copyToClipboard(youtubeCustomerID);
	}
	copyFacebook() {
		copyToClipboard(facebookPartnerID);
	}
	copyViewtag() {
		copyToClipboard(viewtagURL(this.props.channelName));
	}
	copyJSPixel() {
		copyToClipboard(jspixelURL(this.props.channelName));
	}
	renderInstructions(taggingMethod, channelName) {
		let instructions;
		switch (taggingMethod) {
			case 'fbvideo':
				return <ol>
					<li>Sign in to your Facebook Business Manager.</li>
					<li>Go to the <em>Ad Account</em> tab.</li>
					<li>Click Assign Partner.</li>
					<li>
						Enter the Partner Business ID: <strong>{facebookPartnerID}</strong>.
						<FlatButton onClick={this.copyFacebook}>Copy</FlatButton>
					</li>
					<li>Assign the roles: <em>Ad Account Advertiser</em>, <em>Ad Account Analyst</em>.</li>
				</ol>;
			case 'youtube':
				return <ol>
					<li>Sign in to your YouTube channel.</li>
					<li>Click your channel icon or name in the upper corner of the page to select the channel you want to link.</li>
					<li>Click <em>My Channel</em>.</li>
					<li>Click <em>Video Manager</em>.</li>
					<li>Under 'Channel', click <em>Advanced</em>.</li>
					<li>Under 'Link an AdWords for video account', click <em>Link an AdWords account</em>.</li>
					<li>
						Paste in the Customer ID: <strong>{youtubeCustomerID}</strong>.
						<FlatButton onClick={this.copyYoutube}>Copy</FlatButton>
					</li>
					<li>Make sure all the checkboxes are selected and then click <em>Finish</em>.</li>
				</ol>;
			case 'javascript':
				return <div>
					Embed the following code at the end of your {`<body>`} tag:<br/>
					<div style={{marginTop: 10, marginBottom: 10}}>
						<strong>{jspixelURL(channelName)}</strong>
					</div>
					<FlatButton onClick={this.copyJSPixel}>Copy</FlatButton>
				</div>;
			case 'viewtag':
				return <ol>
					<li>Sign in to your Facebook Business Manager.</li>
					<li>Go to the <em>Ad Account</em> tab.</li>
					<li>Select the campaign and relevant Ad Sets.</li>
					<li>
						Enter the Following URL in the <em>View Tag</em> input field:<br/>
						<strong>{viewtagURL(channelName)}</strong>
						<FlatButton onClick={this.copyViewtag}>Copy</FlatButton>
					</li>
				</ol>;
			default:
				return <div>
				Tagging is not available for <em>channelName</em> channel.
				</div>

		}
		return instructions;
	}
	render() {
		const channel = this.props.mediaPlan.channels.find(c => c.channelName === this.props.channelName);

		const actions = [
		      <FlatButton
		        label="Save As PDF"
		        primary={true}
		        //keyboardFocused={true}
		        onTouchTap={this.handlePDF}
		      />,
			  <FlatButton
		        label="Close"
		        primary={true}
		        onTouchTap={this.handleClose}
		      />
		    ];
		return (
			<Dialog title={`Tagging Instructions: ${this.props.channelName}`}
			modal={false} open={true}
			actions={actions}
			onRequestClose={this.props.onRequestClose}>
			<div style={{color: 'black'}}>
				{this.renderInstructions(channel.taggingMethod, this.props.channelName)}
			</div>
	        </Dialog>
		)
	}
}

TaggingInstructions.propTypes = {
};

export default TaggingInstructions;
