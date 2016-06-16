import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { FaFilePdfO, FaFileExcelO } from 'react-icons/lib/fa';
import { Breadcrumb } from 'react-bootstrap';
import GoHome from 'react-icons/lib/go/home';

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

		<div className="sample-mix-container">
			<ReactDataGrid columns={columns} rowGetter={rowGetter}
				rowsCount={rows.length} rowHeight={35}
				minHeight={35 * (rows.length + 1)} />
			<div style={{textAlign: 'right'}}>
				<FaFilePdfO size={40} color="#F15B40"/>
				<FaFileExcelO size={40} color="#3DBB95"/>
			</div>
			<div>
				{isApproved ? 'Approved 2 days ago ' : ''}
				<button className="btn btn-default"
				onClick={clickHandler}>
					{isApproved ? 'OK' : 'Approve'}
				</button>
			</div>
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
