import React from 'react';

class AdminHome extends React.Component {
	constructor(props) {
    	super(props);
		this.addNew = this.addNew.bind(this);
	}
	addNew() {
		this.props.manageNewQuote();
	}
	render() {
		return (
			<div className="quote-manage" style={{paddingTop: 30}}>
				<button onClick={this.addNew} className="askem-button-white">
					Add New Quote
				</button>
			</div>
		)
	}
}

AdminHome.propTypes = {

};

export default AdminHome;
