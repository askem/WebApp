import React from 'react';
import NavBar from 'components/Base/NavBar';
import Footer from 'components/Base/Footer';

const noop = () => {};
class QuoteFrame extends React.Component {
	render() {
		return <div>
			<div className="dashboard-main">
				<NavBar onLogout={noop} onLogin={noop}
					title="Consumer Survey" name="Quote"
					username="" loggedIn={false} />
				<div className="dashboard-content">
					{this.props.children}
				</div>
			</div>
			<Footer />
		</div>;
	}
}

QuoteFrame.propTypes = {

}

export default QuoteFrame;
