import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ReactSelectize from 'react-selectize';
import Toggle from 'react-input-toggle/dist/react-input-toggle';
import FaClose from 'react-icons/lib/fa/close';
import MdAdd from 'react-icons/lib/md/add';
import numeral from 'numeral';

const InteresTopic = (props) =>
	props.description === props.value ? null : <div className="topic">{props.description}</div>;

const FBInterest = (props) => <div className="quote-interest">
	<div className="name">{props.value}</div>
	<InteresTopic {...props} />
	{/*<div className="reach">{numeral(props.reach).format('0[.]0a')} people</div>*/}
</div>

const FBInterestSelected = (props) => <div onClick={props.onClick} className="quote-interest-selected">
	<div className="name">{props.value}</div>
	<InteresTopic {...props} />
	<FaClose style={{height: 30}} />
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
			searchString,
			searching: true
		});
		if (searchString.length === 0) {
			this.setState({
				searchResults: null,
				searching: false
			});
			return;
		}
		const self = this;
		const existingInterestsIDs = this.props.audience.interests.map(i => i.facebookID);
		window.api.searchTargetingInterests(searchString)
		.then((results) => {
			// let searchResults = json.data.map(interest => ({
			// 	facebookID: interest.id,
			// 	name: interest.name,
			// 	topic: interest.topic,
			// 	reach: interest.audience_size
			// }));
			let searchResults = results.attributes;
			searchResults = searchResults.filter(i => !existingInterestsIDs.includes(i.facebookID));
			searchResults.sort((p1, p2) => p2.reach - p1.reach);
			self.setState({
				searchResults,
				searching: false
			}, () => {
				self.refs.interestSelector.highlightFirstSelectableOption();
			})
		}).catch(error => {
			self.setState({
				searchResults: [],
				searching: false
			});
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
				renderNoResultsFound={(item, search) => {
					let label;
					if (this.state.searching) {
						label = '';
					} else {
						label = search === '' ? 'Start typing an interest': 'No results found';
					}
					return <div className="no-results-found">
						{label}
					</div>
				}}
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
				<div className="quote-interests-selection">
					{this.props.audience.interests.map((interest, idx) =>
						<div key={interest.facebookID} className="quote-interest-container">
							<FBInterestSelected {...interest} onClick={() => {
								this.props.removeQuoteAudienceInterest(idx)
							}} />
						</div>
					)}
				</div>
				<div style={{display: 'flex'}}>
					{interestSelector}
					<FlatButton onClick={this.toggleAdding}
						label={this.state.adding ? 'Cancel' : 'Add Interest'}
						icon={this.state.adding ? null : <MdAdd size={20}/>}
					/>
				</div>
			</div>
		)
	}
}

QuoteInterests.propTypes = {

};

export default QuoteInterests;
