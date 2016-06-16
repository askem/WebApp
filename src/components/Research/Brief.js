import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import GoHome from 'react-icons/lib/go/home';

class Brief extends React.Component {
	constructor(props) {
    	super(props);
	}
	render() {
		return (
			<div>
				<Breadcrumb>
					<Breadcrumb.Item>
						<GoHome size={26} />
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<img src="/images/temp/brand.jpg" />
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<img src="/images/temp/campaign.jpg" />
					</Breadcrumb.Item>
					<Breadcrumb.Item active={true}>
						Brief
					</Breadcrumb.Item>
				</Breadcrumb>
				<h1>Brief</h1>
			</div>);
	}
}

Brief.propTypes = {

}

export default Brief;
