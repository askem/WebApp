import React from 'react';
import FlatButton from 'material-ui/FlatButton';
//import Select from 'react-select';
import ReactSelectize from 'react-selectize';
import Toggle from 'react-input-toggle/dist/react-input-toggle';
import FaClose from 'react-icons/lib/fa/close';
import numeral from 'numeral';

const FBPage = (props) => <div className="quote-fbpage">
	<div className="icon"><img src={props.imageURL} /></div>
	<div className="name">{props.value}</div>
	<div className="fans">{numeral(props.reach).format('0[.]0a')} fans</div>
</div>

class QuoteFBPages extends React.Component {
	constructor(props) {
    	super(props);
		this.toggleAdding = this.toggleAdding.bind(this);
		this.handlePageSelect = this.handlePageSelect.bind(this);
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
		if (searchString.length === 0) { return; }
		const self = this;

		// fetch(`https://graph.facebook.com/v2.8/search?q=${searchString.replace(/ /g, '+')}&type=page&fields=picture.type(large),name,fan_count&access_token=1160541464012998|iQI7gMB2GTQ-3oO4A07lzjjgNWE`)
		// .then((response) => {
		// 	return response.json();
		// }).then((json) => {
		// 	let searchResults = json.data.map(page => ({
		// 		facebookID: page.id,
		// 		name: page.name,
		// 		iconURL: page.picture.data.url,
		// 		fans: page.fan_count
		// 	}));
		window.api.searchTargetingFBPages(searchString)
		.then(results => {
			let searchResults = results.attributes;
			searchResults.sort((p1, p2) => p2.reach - p1.reach);
			self.setState({
				searchResults
			}, () => {
				self.refs.pageSelector.highlightFirstSelectableOption();
			})
		});
	}
	handlePageSelect(page) {
		if (!page || !page.facebookID) { return; }
		page.targetConnected = true;
		this.props.addQuoteAudiencePage(page);
		this.toggleAdding();
	}
	render() {
		let pageSelector;
		if (this.state.adding) {
			// pageSelector = <Select.Async name="fbpage"
			// 	placeholder="Enter Page name ..."
			// 	value={this.state.fbpage}
			// 	autoload={false}
			// 	optionRenderer={renderFacebookPageOption}
			// 	valueRenderer={renderFacebookPageOption}
			// 	onChange={(page) => this.setState({fbpage: page})}
			// 	loadOptions={getFacebookPages} />
			pageSelector = <ReactSelectize.SimpleSelect ref="pageSelector"
				open={true} autofocus={true} hideResetButton={true}
				search={this.state.searchString}
				onSearchChange={this.handleSearchChange}
				options={this.state.searchResults}
				filterOptions={(options, search) => options}
				renderOption={FBPage}
				renderValue={FBPage}
				onValueChange={this.handlePageSelect}
				onBlur={() => {
					this.refs.pageSelector.focus();
				}}
				/>;
		}
		return (
			<div>
				{this.props.audience.facebookPages.map((page, idx) =>
					<div key={page.facebookID} style={{display: 'flex'}}>
						<FBPage {...page} />
						<Toggle label="Connected to Page" effect="echo" labelPosition="left"
							onChange={() => {
								this.props.toggleQuoteAudiencePageConnected(idx)
							}}
							checked={page.targetConnected} />
						<FlatButton style={{minWidth: 20}} onClick={() => {
							this.props.removeQuoteAudiencePage(idx)
						}} icon={<FaClose />} />
					</div>
				)}
				<div style={{display: 'flex'}}>
					{pageSelector}
					<FlatButton
						label={this.state.adding ? 'Cancel' : 'Add Page'}
						onClick={this.toggleAdding} />
				</div>
			</div>
		)
	}
}

QuoteFBPages.propTypes = {

};

export default QuoteFBPages;
