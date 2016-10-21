import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ReactSelectize from 'react-selectize';
import Toggle from 'react-input-toggle/dist/react-input-toggle';
import FaClose from 'react-icons/lib/fa/close';
import numeral from 'numeral';

const FBBehavior = (props) => <div className="quote-interest">
	<div className="name">{props.value}</div>
	<div className="topic">{props.description}</div>
	{/*<div className="reach">{numeral(props.reach).format('0[.]0a')} people</div>*/}
</div>

class QuoteBehaviors extends React.Component {
	constructor(props) {
    	super(props);
		this.toggleAdding = this.toggleAdding.bind(this);
		this.handleBehaviorSelect = this.handleBehaviorSelect.bind(this);
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
		window.api.searchTargetingBehaviors(searchString)
		.then((results) => {
			let searchResults = results.attributes;
			searchResults.sort((p1, p2) => p2.reach - p1.reach);
			self.setState({
				searchResults
			}, () => {
				self.refs.behaviorSelector.highlightFirstSelectableOption();
			})
		});
	}
	handleBehaviorSelect(behavior) {
		if (!behavior || !behavior.facebookID) { return; }
		this.props.addQuoteAudienceBehavior(behavior);
		this.toggleAdding();
	}
	render() {
		let behaviorSelector;
		if (this.state.adding) {
			behaviorSelector = <ReactSelectize.SimpleSelect ref="behaviorSelector"
				style={{marginRight: 10}}
				open={true} autofocus={true} hideResetButton={true}
				renderNoResultsFound={() => <div className="no-results-found">Start typing a behavior description</div>}
				search={this.state.searchString}
				onSearchChange={this.handleSearchChange}
				options={this.state.searchResults}
				filterOptions={(options, search) => options}
				renderOption={FBBehavior}
				renderValue={FBBehavior}
				onValueChange={this.handleBehaviorSelect}
				onBlur={() => {
					this.refs.behaviorSelector.focus();
				}}
				/>;
		}
		return (
			<div>
				{this.props.audience.behaviors.map((behavior, idx) =>
					<div key={behavior.facebookID} className="quote-interest-container">
						<FBBehavior {...behavior} />
						<FlatButton style={{minWidth: 20, lineHeight: 0, height: 30}} onClick={() => {
							this.props.removeQuoteAudienceBehavior(idx)
						}} icon={<FaClose />} />
					</div>
				)}
				<div style={{display: 'flex'}}>
					{behaviorSelector}
					<button onClick={this.toggleAdding} className="askem-button">
						{this.state.adding ? 'Cancel' : 'Add Behavior'}
					</button>
				</div>
			</div>
		)
	}
}

QuoteBehaviors.propTypes = {

};

export default QuoteBehaviors;
