import React from 'react';
import numeral from 'numeral';

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
			<div>
				<div className="quote-sample-size-options">
					{options.map(opt => {
						const isSelected = this.props.sampleSize === opt.sampleSize
						let className = 'option';
						if (isSelected) {
							className = `${className} selected`;
						}
						const selectButton = isSelected ? <div style={{height:30}} /> : <button className="askem-button">Select</button>;
						return <div className={className}
							onClick={()=> {this.props.setSampleSize(opt.sampleSize)}}
							key={`ssopt-${opt.sampleSize}`} >
							<div>
								<h1>{opt.sampleSize}</h1>
								respondents
							</div>
							<div>
								<h3>{numeral(opt.moe).format('0[.]0a%')}</h3>
								Margin of Error
							</div>
							<div>
								{selectButton}
							</div>
						</div>
					})}

				</div>
			</div>
		)
	}
}

SampleSize.propTypes = {
	sampleSize: React.PropTypes.number.isRequired,
	setSampleSize: React.PropTypes.func.isRequired
};

export default SampleSize;
