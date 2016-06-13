import React from 'react';
import { blobURL } from 'utils/AskemUtils';

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

    return <nav className="navbar navbar-default navbar-static-top askem-header" role="navigation">
    	<div className="container">
    		<div className="row">
    			<div className="col-xs-2 col-md-offset-1">
    				<a className="logo" href="/"></a>
    			</div>
    			<div className="col-xs-10 col-md-8 col-lg-9">
    				<div className="row user-area">
    					<div className="col-xs-5 col-xs-offset-7 col-md-2 col-md-offset-10 login-button">
    						{userIdentifier}
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </nav>;
	{/*<AskemLoginModal show={this.state.loginModalVisible} onRequestHide={this.toggleLoginModal} />*/}
}

NavBar.propTypes = {
	// researchID: React.PropTypes.string.isRequired,
	// research: React.PropTypes.object,
}

export default NavBar;
