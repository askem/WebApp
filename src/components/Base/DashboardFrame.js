import React from 'react';
import DashboardSidebarContainer from 'containers/DashboardSidebarContainer';
import NavBar from 'components/Base/NavBar';

const noop = () => {};

const DashboardFrame = (props) => (
	<div>
		<NavBar onLogout={noop} onLogin={noop} profileImageMediaID="6d4f9866-ef41-4db5-8c35-b32f20791ec4" username="superadmin" loggedIn={true} />
		<div className="dashboard-container">
			<DashboardSidebarContainer {...props} />
			<div className="dashboard-main">
			{/*<div className="col-xs-12 col-sm-9 content container-fluid">*/}
				{props.children}
			</div>
		</div>
	</div>
);

DashboardFrame.propTypes = {

}

export default DashboardFrame;
