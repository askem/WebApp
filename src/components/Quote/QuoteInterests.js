import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ReactSelectize from 'react-selectize';
import Toggle from 'react-input-toggle/dist/react-input-toggle';
import FaClose from 'react-icons/lib/fa/close';
import numeral from 'numeral';

const FBInterest = (props) => <div className="quote-interest">
	<div className="name">{props.value}</div>
	<div className="topic">{props.description}</div>
	{/*<div className="reach">{numeral(props.reach).format('0[.]0a')} people</div>*/}
</div>

class QuoteInterests extends React.Component {
	constructor(props) {
    	super(props);
		this.toggleAdding = this.toggleAdding.bind(this);
		this.handleInterestSelect = this.handleInterestSelect.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.state = {
			adding: false
		};
	}
	toggleAdding() {
		this.setState({
			adding: !this.state.adding,
			searchResults: null,
			searchString: ''
		});
	}
	handleSearchChange(searchString) {
		this.setState({
			searchString
		});
		if (searchString.length === 0) {
			this.setState({
				searchResults: null
			});
			return;
		}
		const self = this;
		window.api.searchTargetingInterests(searchString)
		.then((results) => {
			// let searchResults = json.data.map(interest => ({
			// 	facebookID: interest.id,
			// 	name: interest.name,
			// 	topic: interest.topic,
			// 	reach: interest.audience_size
			// }));
			let searchResults = results.attributes;
			searchResults.sort((p1, p2) => p2.reach - p1.reach);
			self.setState({
				searchResults
			}, () => {
				self.refs.interestSelector.highlightFirstSelectableOption();
			})
		});
	}
	handleInterestSelect(interest) {
		if (!interest || !interest.facebookID) { return; }
		this.props.addQuoteAudienceInterest(interest);
		this.toggleAdding();
	}
	render() {
		let interestSelector;
		if (this.state.adding) {
			interestSelector = <ReactSelectize.SimpleSelect ref="interestSelector"
				style={{marginRight: 10}}
				open={true} autofocus={true} hideResetButton={true}
				renderNoResultsFound={() => <div className="no-results-found">Start typing an interest</div>}
				search={this.state.searchString}
				onSearchChange={this.handleSearchChange}
				options={this.state.searchResults}
				filterOptions={(options, search) => options}
				renderOption={FBInterest}
				renderValue={FBInterest}
				onValueChange={this.handleInterestSelect}
				onBlur={() => {
					this.refs.interestSelector.focus();
				}}
				/>;
		}
		return (
			<div>
				{this.props.audience.interests.map((interest, idx) =>
					<div key={interest.facebookID} className="quote-interest-container">
						<FBInterest {...interest} />
						<FlatButton style={{minWidth: 20, lineHeight: 0, height: 30}} onClick={() => {
							this.props.removeQuoteAudienceInterest(idx)
						}} icon={<FaClose />} />
					</div>
				)}
				<div style={{display: 'flex'}}>
					{interestSelector}
					<button onClick={this.toggleAdding} className="askem-button">
						{this.state.adding ? 'Cancel' : 'Add Interest'}
					</button>

				</div>
			</div>
		)
	}
}

QuoteInterests.propTypes = {

};

export default QuoteInterests;
