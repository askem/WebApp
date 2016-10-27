import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ReactSelectize from 'react-selectize';
import Toggle from 'react-input-toggle/dist/react-input-toggle';
import FaClose from 'react-icons/lib/fa/close';
import numeral from 'numeral';

const BehaviorTopic = (props) =>
	props.description === props.value ? null : <div className="topic">{props.description}</div>;

const FBBehavior = (props) => <div className="quote-interest">
	<div className="name">{props.value}</div>
	<BehaviorTopic {...props} />
	{/*<div className="reach">{numeral(props.reach).format('0[.]0a')} people</div>*/}
</div>

const FBBehaviorSelected = (props) => <div onClick={props.onClick} className="quote-interest-selected">
	<div className="name">{props.value}</div>
	<BehaviorTopic {...props} />
	<FaClose style={{height: 30}} />
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
		const existingBehaviorsIDs = this.props.audience.behaviors.map(i => i.facebookID);
		window.api.searchTargetingBehaviors(searchString)
		.then((results) => {
			let searchResults = results.attributes;
			searchResults = searchResults.filter(i => !existingBehaviorsIDs.includes(i.facebookID));
			searchResults.sort((p1, p2) => p2.reach - p1.reach);
			self.setState({
				searchResults,
				searching: false
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
				renderNoResultsFound={(item, search) => {
					let label;
					if (this.state.searching) {
						label = '';
					} else {
						label = search === '' ? 'Start typing a behavior description': 'No results found';
					}
					return <div className="no-results-found">
						{label}
					</div>
				}}
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
				<div className="quote-interests-selection">
					{this.props.audience.behaviors.map((behavior, idx) =>
						<div key={behavior.facebookID} className="quote-interest-container">
							<FBBehaviorSelected {...behavior} onClick={() => {
								this.props.removeQuoteAudienceBehavior(idx)
							}} />
						</div>
					)}
				</div>
				<div style={{display: 'flex'}}>
					{behaviorSelector}
					<FlatButton onClick={this.toggleAdding} >
						{this.state.adding ? 'Cancel' : '+ Add Behavior'}
					</FlatButton>
				</div>
			</div>
		)
	}
}

QuoteBehaviors.propTypes = {

};

export default QuoteBehaviors;
