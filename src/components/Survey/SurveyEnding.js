import React from 'react';
import AskemUserText from 'components/Common/AskemUserText';
import askemLocalize from 'utils/Askem/askemLocalize';

class SurveyEnding extends React.Component {
	constructor(props) {
    	super(props);
	}
	render() {
		let message;
		if (this.props.ending) {
			const endingType = this.props.ending.type;
			let endingValue = this.props.ending.value;
			switch (endingType) {
				case 'redirect':
					endingValue = endingValue.replace('{{oID}}', ASKEM.oID);
					$(document).ajaxStop(function() {
						window.location = endingValue;
					});
					return null;
				case 'iframe':
					const height = $(document).height() - $('nav').outerHeight();
					return <iframe src={endingValue} style={{width: '100%', height}} />;
				case 'message':
					message = endingValue;
					break;
				default:
					break;
			}
		}

		// System default ending: message
		if (!message) {
			message = askemLocalize('Thanks for answering');
		}
		return <h1 style={{textAlign: 'center'}}><AskemUserText>{message}</AskemUserText></h1>;
	}
}

SurveyEnding.propTypes = {
	ending: React.PropTypes.object
};

export default SurveyEnding;
