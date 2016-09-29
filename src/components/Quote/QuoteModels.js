import React from 'react';
import UseMySurvey from 'components/Quote/UseMySurvey';
import CreateSurvey from 'components/Quote/CreateSurvey';

const models = [
	{id: 'dce', title: 'Digital CampaMust ign Effectiveness'},
	{id: 'logo', title: 'Logo Design'},
	{id: 'packaging', title: 'Package Design'},
	{id: 'pricing', title: 'Pricing Testing'},
	{id: 'perception', title: 'Brand Perception'},
	{id: 'naming', title: 'Product Naming'},
	{id: 'monitoring', title: 'Brand Monitoring'},
];

class QuoteModels extends React.Component {
	constructor(props) {
    	super(props);
		this.toggleUseMySurvey = this.toggleUseMySurvey.bind(this);
		this.completeUseMySurvey = this.completeUseMySurvey.bind(this);
		this.toggleCustomSurvey = this.toggleCustomSurvey.bind(this);
		this.state = {
			createCustomSurvey: false,
			useMySurvey: false
		};
	}
	toggleCustomSurvey() {
		this.setState({
			createCustomSurvey: !this.state.createCustomSurvey
		});
	}
	toggleUseMySurvey() {
		this.setState({
			useMySurvey: !this.state.useMySurvey
		});
	}
	completeUseMySurvey(url) {
		console.info('@@@ url ' + url);
		this.toggleUseMySurvey();
	}
	render() {
		const mySurvey = this.state.useMySurvey ?
			<UseMySurvey onComplete={this.completeUseMySurvey} onCancel={this.toggleUseMySurvey} /> :
			<button onClick={this.toggleUseMySurvey}>Use an Existing Survey</button>;
		const customSurvey = this.state.createCustomSurvey ?
			<CreateSurvey onCancel={this.toggleCustomSurvey} {...this.props} /> :
			<button onClick={this.toggleCustomSurvey}>Create a Custom Survey</button>;
		return (
			<div>
				<ul>
					{models.map(model => <li key={model.id}>
							{model.title}
						</li>)}
				</ul>

				<div className="strike"><span>Or</span></div>

				{customSurvey}

				<div className="strike"><span>Or</span></div>
				{mySurvey}

			</div>



		)
	}
}

QuoteModels.propTypes = {

};

export default QuoteModels;
