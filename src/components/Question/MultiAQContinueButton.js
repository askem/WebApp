import React from 'react';

class MultiAQContinueButton extends React.Component {
	constructor(props) {
    	super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({hasError: false, errorMessage: null});
	}
	handleClick(evt) {
		if (this.props.canContinue) {
			this.props.onClick(evt);
		} else {
			let message = this.props.cantContinueReasonHandler();
			this.setState({hasError: true, errorMessage: message});
			// this[_timeouts] && this[_timeouts].forEach(this.clearTimeout);
			// this.setTimeout(() => {
			// 	this.setState({hasError: false, errorMessage: null});
			// }, 3200);
		}
	}
	render() {
		let messagePopover;
		let className = 'multiAQContinue';
		if (this.props.canContinue) {
			className += ' enabled '//animated pulse';
		} else if (this.state.hasError) {
			className += ' animated shake';
			if (this.state.errorMessage) {
				messagePopover = <div className="multiaq-continue-error">{this.state.errorMessage}</div>;
				// messagePopover = <div style={{position: 'absolute', width:'100%'}}>
				// 	<ReactBootstrap.Popover placement="bottom">{this.state.errorMessage}</ReactBootstrap.Popover>
				// </div>;
			}
		}
		return <div style={{textAlign: 'center'}}>
			<button className={className} onClick={this.handleClick}>Continue</button>
			{messagePopover}
		</div>
	}
}

MultiAQContinueButton.propTypes = {

};

export default MultiAQContinueButton;
