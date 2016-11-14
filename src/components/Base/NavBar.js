import React from 'react';
import blobURL from 'utils/Askem/blobURL';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaBell from 'react-icons/lib/fa/bell';
// import FaBellO from 'react-icons/lib/fa/bell-o';

const NavBar = (props) => {
	let userIdentifier;
    if (props.loggedIn) {
        let userLink = null;
		const userURL = `https://askem.com/${props.username}`;
        if (props.profileImageMediaID && props.username) {
            userLink = (
				<span>
	                <a target="_blank">
	                    <img className="logged-in-profile-image" src={blobURL(props.profileImageMediaID, 'small')} />
	                    @{props.username}
	                </a> | </span>
			);
        }
        userIdentifier = <span>
            {/*<img style={{display: 'none'}} border="0" height="0" width="0" src="//fbm.mysocialpixel.com/track/{amount}/1392807273" alt="" />*/}
            {userLink}
            <a onClick={props.onLogout}>sign out</a>
        </span>
    } else {
        userIdentifier = <button className="btn btn-white login" onClick={props.onLogin}>Sign in</button>;
    }

    return <nav className="top-header">

		<div className="top-title">
			<div className="title">{props.title}</div>
			<div className="name">{props.name}</div>
		</div>
		<div className="top-prefs">
			<div className="notifications">
				<FaBell size={20} />
			</div>
			<div className="user">
				{props.username}
				<FaAngleDown size={15} style={{marginTop: -3}}/>
			</div>
		</div>

    </nav>;
	{/*<AskemLoginModal show={this.state.loginModalVisible} onRequestHide={this.toggleLoginModal} />*/}
}

NavBar.propTypes = {
	title: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	// researchID: React.PropTypes.string.isRequired,
	// research: React.PropTypes.object,
	username: React.PropTypes.string
}

export default NavBar;
