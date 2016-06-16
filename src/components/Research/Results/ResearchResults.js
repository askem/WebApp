import React from 'react';
import ResultsSegmentations from 'components/Research/Results/ResultsSegmentations';
import SegmentedResults from 'components/Research/Results/SegmentedResults';
import CONSUMTPION_GROUPS from 'constants/CONSUMTPION_GROUPS';

class ResearchResults extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
			gender: 'all',
			ageGroups: new Set(['18-24', '25-34', '35-44', '45-64', '65+']),
			consumptionGroups: new Set(CONSUMTPION_GROUPS.map(g => g.id))
		};
		this.onSelectGender = this.onSelectGender.bind(this);
		this.onToggleAgeGroup = this.onToggleAgeGroup.bind(this);
		this.onToggleConsumption = this.onToggleConsumption.bind(this);
	}
	onSelectGender(gender) {
		this.setState({gender});
	}
	onToggleAgeGroup(group) {
		let ageGroups = this.state.ageGroups;
		if (ageGroups.has(group)) {
			ageGroups.delete(group);
		} else {
			ageGroups.add(group);
		}
		this.setState({ageGroups});
	}
	onToggleConsumption(group) {
		let consumptionGroups = this.state.consumptionGroups;
		if (consumptionGroups.has(group)) {
			consumptionGroups.delete(group);
		} else {
			consumptionGroups.add(group);
		}
		this.setState({consumptionGroups});
	}
	render() {
		console.log(this.state);
		if (!this.props.research) {
			return <h2>Research Campaign #{this.props.researchID} does not exist</h2>
		}
		return <div>
			<h1>Results</h1>

			<div className="results-with-segments">
				<div className="results-segmentations">
					<ResultsSegmentations {...this.props} {...this.state}
					onSelectGender={this.onSelectGender}
					onToggleAgeGroup={this.onToggleAgeGroup}
					onToggleConsumption={this.onToggleConsumption} />
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
