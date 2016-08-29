import React from 'react';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleRight from 'react-icons/lib/fa/angle-right';

import FaDashboard from 'react-icons/lib/fa/dashboard';
import MdContentPaste from 'react-icons/lib/md/content-paste';
import FaTags from 'react-icons/lib/fa/tags';
import FaListUl from 'react-icons/lib/fa/list-ul';
import FaGroup from 'react-icons/lib/fa/group';
import TiPipette from 'react-icons/lib/ti/pipette';
import FaPieChart from 'react-icons/lib/fa/pie-chart';
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o';

const iconStyle = {size: 30, marginRight: 10, color: 'rgba(255, 255, 255, 0.9)'};
const items = [
	{id: '', title: 'Dashboard', icon: <FaDashboard size={27} style={iconStyle}/>},
	{id: 'brief', title: 'Brief', icon: <FaListUl size={27} style={iconStyle}/>},
	{id: 'media', title: 'Media Plan', icon: <MdContentPaste size={27} style={iconStyle}/>},
	{id: 'tagging', title: 'Tagging', icon: <FaTags size={27} style={iconStyle}/>},
	{id: 'audiences', title: 'Audiences', icon: <FaGroup size={25} style={iconStyle}/>},
	{id: 'samplings', title: 'Samples', icon: <TiPipette size={27} style={iconStyle}/>},
	{id: 'survey', title: 'Survey', icon: <FaPieChart size={27} style={iconStyle}/>},
	'DIVIDER',
	{id: 'results', title: 'Results', icon: <FaCheckCircleO size={27} style={iconStyle}/>}
]

class DashboardSidebar extends React.Component {
	onSelectItem(item) {
	}
	render() {
		const pathArray = this.props.location.pathname.split('/');
		let selected = pathArray[pathArray.length - 1];
		if (selected === 'samplemix') { selected = 'samplings'; }
		const researchID = this.props.params.researchID;

		return <nav className="dashboard-sidebar">
			<a href={`#/campaigns/${researchID}`}>
				<header>
					<img src="/images/temp/campaign.jpg" />
					<div>Alcon 2016-06</div>
					<div><FaAngleDown /></div>
				</header>
			</a>
			<div>
				{items.map(i => {
					if (i === 'DIVIDER') {
						return <div key="divider">
							<hr style={{width: '80%', borderTop: '1px solid #836592'}}/>
						</div>;
					}
					const isSelected = i.id === selected;
					const chevron = isSelected ? <FaAngleRight style={{float: 'right'}} size={27} /> : null;
					return <a key={i.id} onClick={this.onSelectItem}
						href={`#/campaigns/${researchID}/${i.id}`}
						className={`sidebar-item ${isSelected ? 'selected' : ''}`}>
						{i.icon}
						{i.title}
						{chevron}
					</a>
				})}
			</div>
			<a href="/">
				<footer></footer>
			</a>
		</nav>
	}
}

DashboardSidebar.propTypes = {
	// researchID: React.PropTypes.string.isRequired,
	// research: React.PropTypes.object,
}

export default DashboardSidebar;
