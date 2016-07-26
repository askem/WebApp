import React from 'react';

const ResearchOverview = (props) => {
	if (!props.research) {
		return <h2>Research Campaign #{props.researchID} does not exist</h2>
	}
	return <div>
		campaign #{props.researchID}:  <b>{props.research.title}</b>

		<div>
			<div>Spend</div>
			<div>{`${props.businessResults.spentCurrency}${props.businessResults.spent}`}</div>
		</div>
	</div>
}

ResearchOverview.propTypes = {
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object,
}

export default ResearchOverview;
