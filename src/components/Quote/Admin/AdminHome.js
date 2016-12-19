import React from 'react';
import DataGrid from 'react-datagrid';
require('react-datagrid/index.css');
//import sorty from 'sorty';
import Loading from 'components/Common/Loading';
import dateStringToDate from 'utils/dateStringToDate';

const renderStatus = status => {
	switch (status) {
		case 'InProgress':
			return 'In Progress';
		default:
			return status;
	}
};
const renderDate = windowsDate => dateStringToDate(windowsDate).toDateString();

class AdminHome extends React.Component {
	constructor(props) {
    	super(props);
		this.addNew = this.addNew.bind(this);
		this.state = { };
		window.api.getAllQuotes()
		.then(leads => {
if (__PRODUCTION__) {
			leads = leads.filter(lead => lead.email !== 'test@askem.com');
}
			this.setState({ leads });
		});
	}
	addNew() {
		this.props.manageNewQuote();
	}
	render() {
		let list;
		if (this.state.leads) {
			const columns = [
				{name: 'name', title: 'Name'},
				{name: 'email', title: 'Email'},
				{name: 'phone', title: 'Phone'},
				{name: 'dateModified', title: 'Last Modified', render:renderDate},
				{name: 'status', title: 'Status', render: renderStatus},
				{name: 'internalDescription', title: 'Description'},
				{name: 'source', title: 'Source'},
				{name: 'ID', title: ' ', render: 
					leadID => <a href={`/${leadID}/manage`} target="_blank">Manage</a>},
			];
			// sortInfo={this.state.sortInfo || [{name: "dateModified", dir: 'desc'}]}
			// onSortChange={sortInfo => this.setState({
			// 	sortInfo,
			// 	leads: sorty(sortInfo, this.state.leads)
			// })}
			list = <div>
				<DataGrid idProperty="ID"
					
					dataSource={this.state.leads}
					columns={columns}
					style={{height: 400}} />
			</div>;
		} else {
			list = <Loading />;
		}
		return (
			<div className="quote-manage" style={{paddingTop: 30}}>
				<button onClick={this.addNew} className="askem-button-white" style={{marginBottom: 30}}>
					Add New Quote
				</button>
				{list}
			</div>
		)
	}
}

AdminHome.propTypes = {

};

export default AdminHome;
