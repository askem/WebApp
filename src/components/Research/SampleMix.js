import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { FaFilePdfO, FaFileExcelO, FaTable, FaAreaChart } from 'react-icons/lib/fa';
import { Breadcrumb, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import GoHome from 'react-icons/lib/go/home';
import { Bar } from 'react-chartjs';
import AGE_GROUPS from 'constants/AGE_GROUPS';

require('react-data-grid/themes/react-data-grid.css');

const SampleMix = (props) => {
	if (!props.research) {
		return <h2>Research Campaign #{props.researchID} does not exist</h2>
	}
	const isApproved = props.sampling.approvedSampleMix;
	const clickHandler = () => {
		if (!isApproved) {
			props.onApprove(props.samplingID);
		}
		location.href = `#/campaigns/${props.researchID}/samplings`;
	};

	const rows = [
		{age: '18-24', female: 55, male: 56},
		{age: '25-34', female: 35, male: 31},
		{age: '35-44', female: 20, male: 18},
		{age: '45-54', female: 10, male: 10},
		{age: '55-64', female: 7, male: 5},
		{age: '65+', female: 3, male: 0},
		{age: 'Total', female: 130, male: 120}
	];
	const columns = [
		{key: 'age', name: 'Age', locked: true},
		{key: 'female', name: 'Female'},
		{key: 'male', name: 'Male'},
	];
	const rowGetter = (i) => rows[i];

	const labels = AGE_GROUPS.map(g => g.id);
	const chartData = {
	    labels,
	    datasets: [
	        {
	            label: "Female",
	            backgroundColor: "#f15a40",
	            // borderColor: "rgba(255,99,132,1)",
	            // borderWidth: 1,
	            // hoverBackgroundColor: "rgba(255,99,132,0.4)",
	            // hoverBorderColor: "rgba(255,99,132,1)",
	            data: [55, 35, 20, 10, 7, 3],
	        },
			{
	            label: "Male",
	            backgroundColor: "#005a96",
	            // borderColor: "rgba(255,99,132,1)",
	            // borderWidth: 1,
	            // hoverBackgroundColor: "rgba(255,99,132,0.4)",
	            // hoverBorderColor: "rgba(255,99,132,1)",
	            data: [56, 31, 18, 10, 5, 0],
	        }
	    ]
	};
	const chartOptions = {
		scales: { display: false }
	};

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
			<Breadcrumb.Item>
				Survey {props.sampling.surveyID}
			</Breadcrumb.Item>
			<Breadcrumb.Item active={true}>
				Sample Mix
			</Breadcrumb.Item>
		</Breadcrumb>
		<h1>Sample Mix</h1>

		<Tab.Container id="left-tabs-example" defaultActiveKey="first">
			<div className="sample-mix-container" >
				<div style={{width: 120}}>
					<Nav bsStyle="sample-mix-pills" stacked>
						<NavItem eventKey="first">
							<FaAreaChart size={40} color="#9665aa" />
						</NavItem>
						<NavItem eventKey="second">
							<FaTable size={40} color="#9665aa "/>
						</NavItem>
					</Nav>
				</div>
				<div style={{width: 480}}>
					<Tab.Content animation>
						<Tab.Pane eventKey="first">
							<Bar data={chartData} options={chartOptions} />
						</Tab.Pane>
						<Tab.Pane eventKey="second">
							<ReactDataGrid columns={columns} rowGetter={rowGetter}
  				rowsCount={rows.length} rowHeight={35} minWidth={480}
  				minHeight={35 * (rows.length + 1)} />
						</Tab.Pane>
					</Tab.Content>
				</div>
			</div>
		</Tab.Container>

		<div style={{width: 600, textAlign: 'right', paddingTop: 10}}>
			<FaFilePdfO size={40} color="#F15B40"/>
			<FaFileExcelO size={40} color="#3DBB95"/>
		</div>
		<div style={{width: 600, textAlign: 'center', paddingTop: 20}}>
			{isApproved ? 'Approved 2 days ago ' : ''}
			<button className="btn btn-default btn-lg"
			onClick={clickHandler}>
				{isApproved ? 'OK' : 'Approve'}
			</button>
		</div>

	</div>
}

SampleMix.propTypes = {
	researchID: React.PropTypes.string.isRequired,
	samplingID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object,
	sampling: React.PropTypes.object,
	onApprove: React.PropTypes.func
}

export default SampleMix;
