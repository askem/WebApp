import React from 'react';
import DashboardSidebarContainer from 'containers/DashboardSidebarContainer';
import NavBar from 'components/Base/NavBar';
import { keyToggleHandler, KEYPRESS } from 'react-key-handler';
import DebugMenu from 'components/Base/DebugMenu';

const noop = () => {};
const DEBUG_SCREEN_HOTKEY = '?';

class DashboardFrame extends React.Component {
	render() {
		let debugMenu;
		if (this.props.keyValue === DEBUG_SCREEN_HOTKEY) {
			debugMenu = <DebugMenu />;
		}
		return <div>
			{debugMenu}
			<NavBar onLogout={noop} onLogin={noop} profileImageMediaID="6d4f9866-ef41-4db5-8c35-b32f20791ec4" username="superadmin" loggedIn={true} />
			<div className="dashboard-container">
				<DashboardSidebarContainer {...this.props} />
				<div className="dashboard-main">
					{this.props.children}
				</div>
			</div>
		</div>
	}
}

DashboardFrame.propTypes = {

}

DashboardFrame = keyToggleHandler({keyEventName: KEYPRESS, keyValue: DEBUG_SCREEN_HOTKEY})(DashboardFrame);

export default DashboardFrame;
