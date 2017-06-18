import React, { Component } from 'react';
import Checkbox from 'components/Common/Checkbox/Checkbox';

class AdAccounts extends Component {
	constructor(props) {
		super(props);

		this.onSelectAdAccount = this.onSelectAdAccount.bind(this);

		this.state = {
			selectedAdsAccounts : []
		}
	}

	onSelectAdAccount(event) {
		const accountID = event.target.dataset.accountId;
		const index = this.state.selectedAdsAccounts.indexOf(accountID);
		let accounts = [...this.state.selectedAdsAccounts];

		if (index === -1) {
			accounts.push(accountID);
		}	
		else {
			accounts = [...accounts.slice(0, index),
						...accounts.slice(index+1) 
			]
		}

		this.setState({
				selectedAdsAccounts :accounts
		});
	}

	render() {
		return (
			<div className="ads-accounts-container">
			    Accounts : 
				{ this.props.accounts.map((account, index) => {
					const key = `key_${account.id}`;
					return (<div key={key} className="ad-account">
						<div>
							<Checkbox 
								data-account-id={account.id}
								/*label={account.id}*/
								onChange={(event) => this.onSelectAdAccount(event)}
								/*checked={this.state.ageGroups.indexOf(g.id) > -1}*/
								/>
							 { account.name }
						</div>
					</div>)
				})}
			</div>
		);
	}
}

export default AdAccounts;