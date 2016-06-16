import React from 'react';
import GenderSelector from 'components/Common/GenderSelector';
import AgeGroupSelector from 'components/Common/AgeGroupSelector';
import ConsumptionSelector from 'components/Research/Results/ConsumptionSelector';

class ResultsSegmentations extends React.Component {
	render() {
		return <div>
			<div className="panel panel-default">
				<h3>
					Gender
				</h3>
				<div className="panel-body">
					<GenderSelector gender={this.props.gender} onChange={this.props.onSelectGender} />
				</div>
			</div>
			<div className="panel panel-default">
				<h3>
					Age
				</h3>
				<div className="panel-body">
					<AgeGroupSelector ageGroups={this.props.ageGroups} onToggle={this.props.onToggleAgeGroup} />
				</div>
			</div>
			<div className="panel panel-default">
				<h3>
					Consumption
				</h3>
				<div className="panel-body">
					<ConsumptionSelector consumptionGroups={this.props.consumptionGroups} onToggle={this.props.onToggleConsumption} />
				</div>
			</div>
		</div>
	}
}

ResultsSegmentations.propTypes = {
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object,
	onSegmentationsChange: React.PropTypes.func,
	onSelectGender: React.PropTypes.func.isRequired,
	ageGroups: React.PropTypes.object,
	onToggleAgeGroup: React.PropTypes.func.isRequired,
	consumptionGroups: React.PropTypes.object,
	onToggleConsumption: React.PropTypes.func.isRequired
}

export default ResultsSegmentations;
