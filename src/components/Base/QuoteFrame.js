import React from 'react';
import NavBar from 'components/Base/NavBar';
import Footer from 'components/Base/Footer';

const QuoteHeader = () => <div>
	<header>
		<div className="main">
			<div className="side-anchor">
				<img src="/images/layout/logo-white.png" alt="Askem"/>
			</div>
			<div className="title">Get Quote</div>
			<div className="side-anchor"></div>
		</div>
		
	</header>
</div>;

const noop = () => {};
class QuoteFrame extends React.Component {
	render() {
		return <div>
			<div className="dashboard-main">
				<QuoteHeader />
				{this.props.children}
			</div>
			<Footer />
		</div>;
	}
}

QuoteFrame.propTypes = {

}

export default QuoteFrame;
