import React  from 'react';
import { HorizontalBar } from 'react-chartjs-2';

class ChannelConsumption extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const items = this.props.graphData.items;
		const data = {
			labels : items.map(item => item.name),
			datasets : [
				{ 
					label : 'Audience',
					backgroundColor: '#9665aa',
					data : items.map(item => item.audience.distribution * 100) 
				},
				{
					label : 'General Population',
					backgroundColor: '#9ea8ba',
					data : items.map(item => item.generalPopulation.distribution * 100) 
				}
			]	
		}

		return (
				<div>
					<div className="graph-container">
						<HorizontalBar 
							data={ data }
							width={600}
							height={500}
							options={{maintainAspectRatio: false }} />
					</div>
				</div>
		)
	}
}

export default ChannelConsumption;