import React from 'react';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

const items = [
	{id: 'brief', title: 'Brief'},
	{id: 'tagging', title: 'Tagging'},
	{id: 'audiences', title: 'Audiences'},
	{id: 'samplings', title: 'Surveys'},
	{id: 'results', title: 'Results'}
]

class DashboardSidebar extends React.Component {
	onSelectItem(item) {
		console.log(item);
	}
	render() {
		const pathArray = this.props.location.pathname.split('/');
		const selected = pathArray[pathArray.length - 1];
		const researchID = this.props.params.researchID;

		return <nav className="dashboard-sidebar">
			<header>
				<img src="" />
				<div>Alcon 2016-06</div>
				<div><FaAngleDown /></div>
			</header>
			<div>
				{items.map(i => (
					<a key={i.id} onClick={this.onSelectItem}
						href={`#/campaigns/${researchID}/${i.id}`}
						className={`sidebar-item ${i.id === selected ? 'selected' : ''}`}>
						{i.title}
					</a>
				))}
			</div>
		</nav>
	}
}

DashboardSidebar.propTypes = {
	// researchID: React.PropTypes.string.isRequired,
	// research: React.PropTypes.object,
}

export default DashboardSidebar;
