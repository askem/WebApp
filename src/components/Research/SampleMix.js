import React from 'react';

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
	return <div>
		<h2>Campaign {props.researchID}: {props.research.title}</h2>
		<h3>Survey {props.sampling.surveyID}: Sample Mix</h3>
		<table className="table table-bordered"
		style={{width:'70%', backgroundColor: 'rgba(136, 130, 130, 0.31)', textAlign: 'center'}}>
			<thead>
				<tr>
					<th style={{textAlign: 'center'}}>Age Groups</th>
					<th style={{textAlign: 'center'}}>Female</th>
					<th style={{textAlign: 'center'}}>Male</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><strong>13-17</strong></td>
					<td>8%</td>
					<td>11%</td>
				</tr>
				<tr>
					<td><strong>18-24</strong></td>
					<td>12%</td>
					<td>7%</td>
				</tr>
				<tr>
					<td><strong>25-34</strong></td>
					<td>24%</td>
					<td>30%</td>
				</tr>
				<tr>
					<td><strong>35-49</strong></td>
					<td>9%</td>
					<td>11%</td>
				</tr>

			</tbody>
		</table>
		<div style={{width: '70%', textAlign: 'right'}}>
			{isApproved ? 'Approved 2 days ago ' : ''}
			<button className="btn btn-default"
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
