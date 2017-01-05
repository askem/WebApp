import React from 'react';
import NavBar from 'components/Base/NavBar';
import Footer from 'components/Base/Footer';

const QuoteHeader = (props) => 
<div className={`header-fixed ${props.fullSizeHeader ? 'fullsize' : ''}`}>

	<header className={props.fullSizeHeader ? 'fullsize' : 'fixed'}>
		
		<div className="main">
			<div className="side-anchor">
				<img src="/images/layout/logo-white.png" alt="Askem"/>
			</div>
			<div className="title">{props.title}</div>
			<div className="side-anchor"></div>
		</div>
	</header>
</div>;

class QuoteFrame extends React.Component {
	render() {
		const lastRoute = this.props.routes[this.props.routes.length - 1];
		const title = lastRoute.name || 'Get Quote';
		document.title = `Askem | ${title}`;
		const fullSizeHeader = lastRoute.fullSizeHeader;
		return <div>
			<div className="dashboard-main">
				<QuoteHeader title={title} fullSizeHeader={fullSizeHeader} />
				{this.props.children}
			</div>
			<Footer />
		</div>;
	}
}

QuoteFrame.propTypes = {

}

export default QuoteFrame;
