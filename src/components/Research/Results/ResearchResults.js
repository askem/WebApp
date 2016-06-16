import React from 'react';
import ResultsSegmentations from 'components/Research/Results/ResultsSegmentations';
import SegmentedResults from 'components/Research/Results/SegmentedResults';

class ResearchResults extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
			gender: 'all'
		};
		this.onSelectGender = this.onSelectGender.bind(this);
	}
	onSelectGender(gender) {
		this.setState({gender});
	}
	render() {
		if (!this.props.research) {
			return <h2>Research Campaign #{this.props.researchID} does not exist</h2>
		}
		return <div>
			<h1>Results</h1>

			<div className="results-with-segments">
				<div className="results-segmentations">
					<ResultsSegmentations {...this.props} {...this.state} onSelectGender={this.onSelectGender} />
				</div>

				<div className="results-main">
					<SegmentedResults {...this.props} {...this.state} />
				</div>
			</div>

		</div>
	}
}

ResearchResults.propTypes = {
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object,
	onSegmentationsChange: React.PropTypes.func
}

export default ResearchResults;
