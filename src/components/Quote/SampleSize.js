import React from 'react';
import numeral from 'numeral';
import MarginIcon from 'components/Common/Icons/MarginIcon';

class SampleSize extends React.Component {
	constructor(props) {
    	super(props);
	}
	render() {
		const options = [
			{ sampleSize: 200, moe: 0.082 },
			{ sampleSize: 600, moe: 0.046 },
			{ sampleSize: 2000, moe: 0.025 }
		];
		return (
			<div className="quote-sample-size-options">
				{options.map(opt => {
					const isSelected = this.props.sampleSize === opt.sampleSize
					let className = 'option';
					if (isSelected) {
						className = `${className} selected`;
					}
					//const selectButton = isSelected ? <div style={{height:30}} /> : <button className="askem-button">Select</button>;
					const selectButton = isSelected ? <button className="askem-button-white selected" onClick={this.props.onAdvance}>Get Quote</button> : <button className="askem-button-white">Select</button>;
					return <div className={className}
						onClick={()=> {this.props.setSampleSize(opt.sampleSize)}}
						key={`ssopt-${opt.sampleSize}`} >
						<div>
							<div className="sample-size">{opt.sampleSize}</div>
							respondents
						</div>
						<div>
							<MarginIcon className={isSelected ? 'selected-icon' : null} size={44}/>
						</div>
						<div>
							<div className="moe">{numeral(opt.moe).format('0[.]0a%')}</div>
							Margin of Error
						</div>
						<div>
							{selectButton}
						</div>
					</div>
				})}
			</div>
		)
	}
}

SampleSize.propTypes = {
	sampleSize: React.PropTypes.number.isRequired,
	setSampleSize: React.PropTypes.func.isRequired,
	onAdvance: React.PropTypes.func.isRequired
};

export default SampleSize;
