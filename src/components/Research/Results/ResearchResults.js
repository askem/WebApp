import React from 'react';
import ResultsSegmentations from 'components/Research/Results/ResultsSegmentations';
import SegmentedResults from 'components/Research/Results/SegmentedResults';

const ResearchResults = (props) => {
	if (!props.research) {
		return <h2>Research Campaign #{props.researchID} does not exist</h2>
	}
	return <div>
		<h1>Results</h1>
		campaign #{props.researchID}:  <b>{props.research.title}</b>

		<div className="results-segmentations">
			<ResultsSegmentations {...props} />
		</div>

		<div className="results-main">
			<SegmentedResults {...props} />
		</div>

	</div>
}

ResearchResults.propTypes = {
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object,
	onSegmentationsChange: React.PropTypes.func
}

export default ResearchResults;
