import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { generalPopultionFemale, generalPopultionMale, totalFemalePopulation, totalMalePopulation, facebookPopulation } from 'Utils/facebookPopulation.js';

class SamplePlanGraph extends Component {
	constructor(props) {
		super(props);
		this.convertSamplePlanDataToGraph = this.convertSamplePlanDataToGraph.bind(this);
	}

	convertSamplePlanDataToGraph() {
		const { cells, dimensions } = this.props.data;
		const genderIndex = dimensions.findIndex(item => item.name.toLowerCase() === 'gender');
		const ageRangeIndex = dimensions.findIndex(item => item.name.toLowerCase() === 'age range');
		const censusDistrict = dimensions.findIndex(item => item.name === 'Census District');
		const maleIndex = dimensions[genderIndex].segmentations.findIndex(item => item.name === 'Male');
		const femaleIndex = maleIndex === 0 ? 1 : 0;

		const ages = dimensions[ageRangeIndex].segmentations.map((item, index) => { return { name:item.name, index}});

		const femaleCells = cells.filter(cell => cell.indices[genderIndex] === femaleIndex);
		const maleCells = cells.filter(cell => cell.indices[genderIndex] === maleIndex);
			
		let femaleDataArray = [];
		let maleDataArray = [];

		ages.forEach((ageRange, index) => {
			const femaleAgeGroup = femaleCells.filter(cell => cell.indices[ageRangeIndex] === index);
			const maleAgeGroup = maleCells.filter(cell => cell.indices[ageRangeIndex] === index);

			const distributionTotalFemale = femaleAgeGroup.reduce((totalDistribution, item) => {
				return totalDistribution + item.distribution; 
			}, 0);

			const reachTotalFemale = femaleAgeGroup.reduce((totalReach, item) => {
				return totalReach + item.reach;
			 }, 0);

			const distributionTotalMale = maleAgeGroup.reduce((totalDistribution, item) => {
				return totalDistribution + item.distribution; 
			}, 0);

			const reachTotalMale = maleAgeGroup.reduce((totalReach, item) => {
				return totalReach + item.reach;
			 }, 0);

			 femaleDataArray.push({
				age : ageRange.name,
				distribution : distributionTotalFemale,
				reach : reachTotalFemale
			 });

			 maleDataArray.push({
				age : ageRange.name,
				distribution : distributionTotalMale,
				reach : reachTotalMale
			 });
		})


		const totalAudienceFemale = femaleDataArray.reduce((totalAudienceFemale, item) => {
			return totalAudienceFemale + item.reach;
		}, 0);

		const totalAudienceMale = maleDataArray.reduce((totalAudienceMale, item) => {
			return totalAudienceMale + item.reach;
		}, 0);


		let femaleAudience = totalAudienceFemale/(totalAudienceFemale + totalAudienceMale); 
		femaleAudience = (femaleAudience*100).toFixed(2);
		let maleAudience = totalAudienceMale/(totalAudienceFemale + totalAudienceMale);
		maleAudience = (maleAudience*100).toFixed(2);
		
		const femaleGeneral = ((totalFemalePopulation/(totalFemalePopulation + totalMalePopulation))*100).toFixed(2);
		const maleGeneral = ((totalMalePopulation/(totalFemalePopulation + totalMalePopulation))*100).toFixed(2);

		// calculate total height of bars
		const distributionMaleArray = maleDataArray.map(item => totalAudienceMale === 0 ? 0 : (item.reach/totalAudienceMale) * 100);
		const distibutionFemaleArray = femaleDataArray.map(item => totalAudienceFemale === 0 ? 0 : (item.reach/totalAudienceFemale)* 100);
		const generalPopulationMaleArray = generalPopultionMale.map(item => ((item.reach/totalMalePopulation)*100));
		const generalPopulationFemaleArray = generalPopultionFemale.map(item => ((item.reach/totalFemalePopulation)*100));

		const maxAudienceMale = Math.max(...distributionMaleArray);
		const maxAudienceFemale = Math.max(...distibutionFemaleArray);
		const maxGeneralPopulationMale = Math.max(...generalPopulationMaleArray);
		const maxGeneralPopulationFemale = Math.max(...generalPopulationFemaleArray);
		const tempArr = [maxAudienceMale, maxAudienceFemale, maxGeneralPopulationMale, maxGeneralPopulationFemale];
		let maxBarHeight = Math.ceil(Math.max(...tempArr));

		let decimalDigits = parseInt(maxBarHeight/10);
		let floatingPoint = parseInt(maxBarHeight % 10);

		if (floatingPoint <= 5) {
			maxBarHeight = decimalDigits*10 + 5;
		}
		else {
			maxBarHeight = (decimalDigits+1)*10;
		}


		return {
			genderTotalDistributionGraph : {
				labels : ['Women', 'Men'],
				datasets : [
					{
							label : 'Audience',
							backgroundColor: '#9665aa',
							data : [femaleAudience, maleAudience]
					},
					{
							label : 'General Population',
							backgroundColor: '#9ea8ba',
							data : [femaleGeneral, maleGeneral]
					}
				]
			},
			femaleDataGraph :  {
					labels : femaleDataArray.map(item => item.age),
					datasets : [
						{ 
							label : 'Audience',
							backgroundColor: '#9665aa',
							data : distibutionFemaleArray.map(item => item.toFixed(2)),
						},
						{
							label : 'General Population',
							backgroundColor: '#9ea8ba',
							data : generalPopulationFemaleArray.map(item => item.toFixed(2)),
						}
					]	
			},
			maleGraphData : {
					labels : maleDataArray.map(item => item.age),
					datasets : [
						{ 
							label : 'Audience',
							backgroundColor: '#9665aa',
							data : distributionMaleArray.map(item => item.toFixed(2)),
						},
						{
							label : 'General Population',
							backgroundColor: '#9ea8ba',
							data : generalPopulationMaleArray.map(item => item.toFixed(2)),
						}
					]
			},
			totalFemalePopulation,
			totalMalePopulation,
			maxBarHeight
		}
	}

	render() {
		if (!this.props.data) {
			return (
				<div className="empty-data-message">No sample plan available... go back and click on the GET SAMPLE PLAN button</div>
			)
		}

		const convertedData = this.convertSamplePlanDataToGraph();
		const femaleData = convertedData.femaleDataGraph;
		const maleData = convertedData.maleGraphData;
		const { totalFemalePopulation, totalMalePopulation, maxBarHeight } = convertedData;

		const womenPercentageAllFacebook = (totalFemalePopulation/(totalFemalePopulation + totalMalePopulation))*100;
		const menPercentageAllFacebook = (totalMalePopulation/(totalFemalePopulation + totalMalePopulation))*100;

		const generalGraphOptions = {
			maintainAspectRatio:false,
			scales: { 
				yAxes: [{
					ticks: {
							beginAtZero:true,
					},
				}],
				xAxes : [{
					barThickness : 80,
					categoryPercentage : 0.35
				}]
			}
		}
	
		const graphOptions =  {
			maintainAspectRatio:false,
			scales: { 
				yAxes: [{
					ticks: {
							beginAtZero:true,
							max : maxBarHeight,
							steps : 5
					},
				}],
			}
		}

		return (
			<div>
				<div className="graph-container">
					<div className="specific-title">Total Gender</div>
					<div>
						<Bar 
							data={ convertedData.genderTotalDistributionGraph }
							width={600}
							height={500}
							options={ generalGraphOptions } />
					</div>
					
					<div className="specific-title">Age And Gender</div>
					<div className="graphs-wrapper">
							<div className="gender-graph-container">
								<div>{ womenPercentageAllFacebook.toFixed(2) }% Women</div>
								<Bar 
									data={ femaleData }
									width={800}
									height={500}
									options={ graphOptions }  />
							</div>
							<div className="gender-graph-container">
									<div>{ menPercentageAllFacebook.toFixed(2) }% Men </div>
									<Bar 
										data={ maleData }
										width={800}
										height={500}
										options={ graphOptions } />
							</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SamplePlanGraph;