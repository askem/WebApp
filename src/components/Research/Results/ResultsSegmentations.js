import React from 'react';

const ResultsSegmentations = (props) => {
	if (!props.research) {
		return <h2>Research Campaign #{props.researchID} does not exist</h2>
	}
	return <div>
		<div>
			Age: 13-65+
		</div>
		<div>
			Gender: F/M/All
		</div>
		<div>
			Audiences: All
		</div>
	</div>
}

ResultsSegmentations.propTypes = {
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object,
	onSegmentationsChange: React.PropTypes.func
}

export default ResultsSegmentations;
