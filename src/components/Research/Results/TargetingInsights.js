import React from 'react';
import { Bar } from 'react-chartjs';


const TargetingInsights = (props) => {
	const labels = ['New', 'Monthly', 'Daily', 'Non-Consumers'];
	const chartData = {
		labels,
		datasets: [
			{
				label: "Exposed",
				backgroundColor: "#9665aa",
				// borderColor: "rgba(255,99,132,1)",
				// borderWidth: 1,
				// hoverBackgroundColor: "rgba(255,99,132,0.4)",
				// hoverBorderColor: "rgba(255,99,132,1)",
				data: [55, 35, 20, 10],
			},
			{
				label: "Control",
				backgroundColor: "#a3a9b1",
				// borderColor: "rgba(255,99,132,1)",
				// borderWidth: 1,
				// hoverBackgroundColor: "rgba(255,99,132,0.4)",
				// hoverBorderColor: "rgba(255,99,132,1)",
				data: [26, 31, 18, 50],
			}
		]
	};
	const chartOptions = {
		legend: {
			position: 'bottom'
		},
		scales: {
			xAxes: [{
				gridLines: {
					display: false
				}
			}],
			yAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
		        	beginAtZero:true,
				}
			}]
		}
	};
	return <div style={{width: 600, marginTop: 10}}>
		<Bar data={chartData} options={chartOptions} />
	</div>;
}

export default TargetingInsights;
