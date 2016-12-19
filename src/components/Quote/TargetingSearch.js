import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ReactSelectize from 'react-selectize';
import Toggle from 'react-input-toggle/dist/react-input-toggle';
import FaClose from 'react-icons/lib/fa/close';
import MdAdd from 'react-icons/lib/md/add';
import numeral from 'numeral';

const typesWithPossibleTopic = new Set(['interests', 'behaviors']);
const AttributeTopic = (props) => {
	if (!typesWithPossibleTopic.has(props.type)) { return null; }
	return props.description === props.value ? null : <div className="topic">{props.description}</div>;
};

const Attribute = (props) => <div className="quote-interest">
	<div className="name">{props.value}</div>
	<AttributeTopic {...props} />
	{/*<div className="reach">{numeral(props.reach).format('0[.]0a')} people</div>*/}
</div>

const SelectedAttribute = (props) => <div onClick={props.onClick} title="Remove" className="quote-interest-selected">
	<div className="name">{props.value}</div>
	<AttributeTopic {...props} />
	<FaClose style={{height: 30}} />
</div>

class TargetingSearch extends React.Component {
	constructor(props) {
    	super(props);
		this.toggleAdding = this.toggleAdding.bind(this);
		this.handleAttributeSelect = this.handleAttributeSelect.bind(this);
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
		const existingAttributeIDs = this.props.attributes.map(i => i.facebookID);
		window.api.searchTargetingAttributes(this.props.attributeType, searchString)
		.then((results) => {
			let searchResults = results.attributes;
			searchResults = searchResults.filter(i => !existingAttributeIDs.includes(i.facebookID));
			searchResults.sort((p1, p2) => p2.reach - p1.reach);
			self.setState({
				searchResults,
				searching: false
			}, () => {
				self.refs.attributeSelector.highlightFirstSelectableOption();
			})
		}).catch(error => {
			self.setState({
				searchResults: [],
				searching: false
			});
		});
	}
	handleAttributeSelect(attribute) {
		if (!attribute || !attribute.facebookID) { return; }
		this.props.onToggle(this.props.attributeType, attribute);
		this.toggleAdding();
	}
	render() {
		let attributeSelector;
		if (this.state.adding) {
			attributeSelector = <ReactSelectize.SimpleSelect ref="attributeSelector"
				style={{marginRight: 10}}
				open={true} autofocus={true} hideResetButton={true}
				renderNoResultsFound={(item, search) => {
					let label;
					if (this.state.searching) {
						label = '';
					} else {
						label = search === '' ? 'Start typing to search': 'No results found';
					}
					return <div className="no-results-found">
						{label}
					</div>
				}}
				search={this.state.searchString}
				onSearchChange={this.handleSearchChange}
				options={this.state.searchResults}
				filterOptions={(options, search) => options}
				renderOption={Attribute}
				renderValue={Attribute}
				onValueChange={this.handleAttributeSelect}
				onBlur={() => {
					this.refs.attributeSelector.focus();
				}}
				/>;
		}
		return (
			<div>
				<div className="quote-interests-selection">
					{this.props.attributes.map((attribute, idx) =>
						<div key={attribute.facebookID} className="quote-interest-container">
							<SelectedAttribute {...attribute}
								onClick={() => this.props.onToggle(this.props.attributeType, attribute)} />
						</div>
					)}
				</div>
				<div style={{display: 'flex'}}>
					{attributeSelector}
					<FlatButton onClick={this.toggleAdding}
						label={this.state.adding ? 'Cancel' : this.props.addTitle}
						icon={this.state.adding ? null : <MdAdd size={20}/>}
					/>
				</div>
			</div>
		)
	}
}

TargetingSearch.propTypes = {
	attributeType: React.PropTypes.string.isRequired,
	title: React.PropTypes.string,
	addTitle: React.PropTypes.string,
	onToggle: React.PropTypes.func.isRequired,
};

TargetingSearch.defaultProps = {
	addTitle: 'Add',
};

export default TargetingSearch;
