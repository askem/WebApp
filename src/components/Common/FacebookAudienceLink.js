import React from 'react';
import GoLinkExternal from 'react-icons/lib/go/link-external';

const FacebookAudienceLink = (props) => {
	if (!props.value) {
		return <div>N/A</div>
	} else {
		//https://business.facebook.com/ads/manager/audiences/detail/?act=278875186&ids=6054095416627&business_id=932650486806342
		return <a target="_blank"
			href="https://business.facebook.com/ads/manager/audiences/manage/?act=278875186&business_id=932650486806342">
			{props.value} <GoLinkExternal />
		</a>;
	}
};

FacebookAudienceLink.propTypes = {
	value: React.PropTypes.string
};

export default FacebookAudienceLink;
