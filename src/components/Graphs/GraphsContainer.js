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
			selectedGraph : 'MediaChannels',
			renderedGraph : null
		}
	}
	
	componentDidMount() {
		switch (this.state.selectedGraph) {
			case 'MediaChannels': 
				this.props.getEnrichmentData(this.props.sampleID, this.state.selectedGraph);
				break;
		}
	}

	handleChange(event, index, value) {
		switch(value) {
			case 'MediaChannels':
			case 'Supermarkets':
			case 'eCommerce':
			case 'RelationshipStatus':
				this.props.getEnrichmentData(this.props.sampleID, value);
				break;
			case 'samplePlan':
				this.props.getSamplePlan(this.props.sampleID)
				break;

		}
		this.setState({ selectedGraph : value });
	}

	render() {
		let output;
		let style = { display : 'block' };
		const loading = <div className="loading-graphs">Loading...</div>

		switch (this.state.selectedGraph) {
			case 'MediaChannels':
			case 'Supermarkets':
			case 'eCommerce':
				if (!this.props.enrichmentData || !this.props.enrichmentData[this.state.selectedGraph]) {
					output = loading;
					style = { display : 'none' }
				}
				else {
					output = <ChannelConsumption graphData={this.props.enrichmentData[this.state.selectedGraph]} />;
				}
				break;
			case 'samplePlan': 
				output = <SamplePlanGraph data={this.props.samplePlan } />;
				break;
			case 'RelationshipStatus':{
				output = <RelationshipStatusGraph data={this.props.enrichmentData.RelationshipStatus}/>
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
						<MenuItem value={'MediaChannels'} primaryText="Media Channel consumption" />
						<MenuItem value={'Supermarkets'} primaryText="Supermarkets" />
						<MenuItem value={'eCommerce'} primaryText="eCommerce" />
						<MenuItem value={'samplePlan'} primaryText="Sample Plan" />
						<MenuItem value={'RelationshipStatus'} primaryText="Relationship Status" />
					</SelectField>
				</div>
				{ output }
			</div>
		);
	}
}

export default GraphContainer;