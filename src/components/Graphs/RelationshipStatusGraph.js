import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

class RelationshipStatusGraph extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.data) {
			return (
				<div className="loading-graphs">Loading....</div>
			)
		}

		const { items }  = this.props.data;
		const data = {
			labels : items.map(item => item.name),
			datasets : [
				{ 
					label : 'Audience',
					backgroundColor: '#9665aa',
					data : items.map(item => (item.audience.distribution * 100).toFixed(2)) 
				},
				{
					label : 'General Population',
					backgroundColor: '#9ea8ba',
					data : items.map(item => (item.generalPopulation.distribution * 100).toFixed(2))
				}
			]	
		}

		return (
			<div>
				<div className="graph-container">
					<div className="specific-title">Relationship Status</div>
					<div>
						<HorizontalBar 
							data={ data }
							width={600}
							height={500}
							options={{maintainAspectRatio: false }} />
					</div>
				</div>
			</div>
		);
	}
}

export default RelationshipStatusGraph;