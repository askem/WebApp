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
			reach = <Loading className="" />;
		}
		return (
			<div>
				<div className="quote-estimated-reach-title">
					Estimated Reach
				</div>
				{reach}
			</div>
		)
	}
}

QuoteReach.propTypes = {

};

export default QuoteReach;
