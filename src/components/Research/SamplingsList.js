import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import GoHome from 'react-icons/lib/go/home';

const PlayPauseButton = (props) => {
	const className = "btn btn-default";
	switch (props.status) {
		case 'Running':
			return <button style={{width: 165, color: '#555'}} className={className}>
				<i className="fa fa-fw fa-pause" aria-hidden="true"></i>
				Pause Collection
			</button>;
		default:
			return <button style={{width: 165, color: '#555'}} className={className}>
				<i className="fa fa-fw fa-play" aria-hidden="true"></i>
				Start Collection
			</button>;
	}
}

const SamplingsList = (props) => {
	if (!props.research) {
		return <h2>Research Campaign #{props.researchID} does not exist</h2>
	}
	return <div>

	{/*
		<div style={{paddingTop: 8, paddingBottom: 8}}>
			<button className="btn btn-default">Add Survey</button>
		</div>
		<table className="table table-hover">
			<thead>
				<tr>
					<th>Survey</th>
					<th>Status</th>
					<th>Sample Mix</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{props.samplings.map(sampling => (
					<tr key={sampling.samplingID}>
						<td>
							<strong>Survey {sampling.surveyID}</strong> {' '}
							{sampling.surveyType}{' '}
							<a href="">preview</a></td>
						<td>{sampling.status}</td>
						<td>
							<a href={`#/campaigns/${props.researchID}/samplings/${sampling.samplingID}/samplemix`}>
								{sampling.approvedSampleMix ? 'View' : 'Approve'}
							</a>
						</td>
						<td>
							<PlayPauseButton status={sampling.status} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
*/}

	<div style={{paddingTop: 8, paddingBottom: 8, textAlign: 'right', width: '95%'}}>
		<PlayPauseButton status="Paused" />
	</div>

		<table className="table table-hover" style={{width: '95%'}}>
			<thead>
				<tr>
					<th>Sample</th>
					<th>Size</th>
					<th>Sample Mix</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Exposed</td>
					<td>340</td>
					<td>
						<a href={`#/campaigns/${props.researchID}/samplings/1/samplemix`}>
							Approve
						</a>
					</td>
					<td></td>
				</tr>
				<tr>
					<td>Control</td>
					<td>250</td>
					<td>
						<a href={`#/campaigns/${props.researchID}/samplings/0/samplemix`}>
							View
						</a>
					</td>
					<td></td>
				</tr>

			</tbody>
		</table>

		<div style={{paddingTop: 8, paddingBottom: 8}}>
			<button className="btn btn-default btn-sm">Add Sample</button>
		</div>

	</div>
}

SamplingsList.propTypes = {
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object,
	samplings: React.PropTypes.arrayOf(React.PropTypes.object),
}

export default SamplingsList;
