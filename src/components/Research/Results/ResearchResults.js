import React from 'react';
import ResultsSegmentations from 'components/Research/Results/ResultsSegmentations';
import SegmentedResults from 'components/Research/Results/SegmentedResults';
import CONSUMTPION_GROUPS from 'constants/CONSUMTPION_GROUPS';
import { Breadcrumb } from 'react-bootstrap';
import GoHome from 'react-icons/lib/go/home';

class ResearchResults extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
			gender: 'all',
			ageGroups: new Set(['18-24', '25-34', '35-44', '45-64', '65+']),
			consumptionGroups: new Set(CONSUMTPION_GROUPS.map(g => g.id)),
			loading: true
		};
		this.onSelectGender = this.onSelectGender.bind(this);
		this.onToggleAgeGroup = this.onToggleAgeGroup.bind(this);
		this.onToggleConsumption = this.onToggleConsumption.bind(this);
		window.setTimeout(() => {
			this.setState({loading: false});
		}, 1000)
	}
	hackySetState(newState) {
		newState.loading = true;
		this.setState(newState);
		window.setTimeout(() => {
			this.setState({loading: false});
		}, 1700)
	}
	onSelectGender(gender) {
		this.hackySetState({gender});
	}
	onToggleAgeGroup(group) {
		let ageGroups = this.state.ageGroups;
		if (ageGroups.has(group)) {
			ageGroups.delete(group);
		} else {
			ageGroups.add(group);
		}
		this.hackySetState({ageGroups});
	}
	onToggleConsumption(group) {
		let consumptionGroups = this.state.consumptionGroups;
		if (consumptionGroups.has(group)) {
			consumptionGroups.delete(group);
		} else {
			consumptionGroups.add(group);
		}
		this.hackySetState({consumptionGroups});
	}
	render() {
		if (!this.props.research) {
			return <h2>Research Campaign #{this.props.researchID} does not exist</h2>
		}
		return <div>
			<Breadcrumb>
			<Breadcrumb.Item>
				<GoHome size={26} />
			</Breadcrumb.Item>
			<Breadcrumb.Item>
				<img src="/images/temp/brand.jpg" />
			</Breadcrumb.Item>
			<Breadcrumb.Item>
				<img src="/images/temp/campaign.jpg" />
			</Breadcrumb.Item>
			<Breadcrumb.Item active={true}>
				Results
			</Breadcrumb.Item>
		</Breadcrumb>
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
