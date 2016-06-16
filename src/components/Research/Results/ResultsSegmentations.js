import React from 'react';
import GenderSelector from 'components/Common/GenderSelector';

class ResultsSegmentations extends React.Component {
	render() {
		return <div>
			<div>
				<h3>
					Age
				</h3>
				13-65+
			</div>
			<div>
				<h3>
					Gender
				</h3>
				<GenderSelector gender={this.props.gender} onChange={this.props.onSelectGender} />
			</div>
			<div>
				<h3>
					Consumption
				</h3>
				All
			</div>
		</div>
	}
}

ResultsSegmentations.propTypes = {
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object,
	onSegmentationsChange: React.PropTypes.func,
	onSelectGender: React.PropTypes.func.isRequired
}

export default ResultsSegmentations;
