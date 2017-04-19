import React, { Component } from 'react';
import ChannelConsumption from 'components/Graphs/ChannelConsumption';
import SamplePlanGraph from 'components/Graphs/SamplePlanGraph';
import RelationshipStatusGraph from 'components/Graphs/RelationshipStatusGraph';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class GraphContainer extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			selectedGraph : 'channelConsumption',
			renderedGraph : null
		}
	}

	///TODO : remove later
	componentDidMount() {
		switch (this.state.selectedGraph) {
			case 'channelConsumption': 
				const sampleID = this.props.sampleID;
				this.props.getChannelConsumptionData(sampleID);
				break;
		}
	}

	handleChange(event, index, value) {
		switch(value) {
			case 'relationshipStatus':
				this.props.getRelationshipData(this.props.sampleID);
				break;
		}


		this.setState({ selectedGraph : value });
	}

	render() {
		let output;
		let style = { display : 'block' };
		const loading = <div className="loading-graphs">Loading Media Channel Consumption Data...</div>

		switch (this.state.selectedGraph) {
			case 'channelConsumption':
				if (!this.props.channelConsumptionData) {
					output = loading;
					style = { display : 'none' }
				}
				else {
					output = <ChannelConsumption graphData={this.props.channelConsumptionData} />;
				}
				break;
			case 'samplePlan': 
				output = <SamplePlanGraph data={this.props.samplePlan } />;
				break;
			case 'relationshipStatus':{
				output = <RelationshipStatusGraph data={this.props.relationshipStatusData}/>
				break;
			}
			default:
				output = loading;
				style = { display : 'none' }
				break;
		}

		return (
			<div>
				<div className="graph-type" style={ style }>
					<SelectField
							value={this.state.selectedGraph}
							onChange= { this.handleChange }> 
						<MenuItem value={'channelConsumption'} primaryText="Media Channel consumption" />
						<MenuItem value={'samplePlan'} primaryText="Sample Plan" />
						<MenuItem value={'relationshipStatus'} primaryText="Relationship Status" />
					</SelectField>
				</div>
				{ output }
			</div>
		);
	}
}

export default GraphContainer;