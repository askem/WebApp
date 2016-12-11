import React from 'react';
import numeral from 'numeral';
import blobURL from 'utils/Askem/blobURL';
import Loading from 'components/Common/Loading';
import Checkbox from 'components/Common/Checkbox/Checkbox';

const segmentsToMap = segments => {
	let segmentsMap = new Map();
	segments.forEach(segment => {
		segment.attributes.forEach(attr => {
			let typeMap = segmentsMap.get(attr.type) || new Map();
			let valueSet = typeMap.get(attr.value) || new Set()
			valueSet.add(segment.ID);
			typeMap.set(attr.value, valueSet);
			segmentsMap.set(attr.type, typeMap);
		});
	});
	return segmentsMap;
};

const displayAttributeType = (type = '') => {
	switch (type.toLowerCase()) {
	case 'no op':
		return 'Sample';
	case 'year of birth':
	case 'range of birth':
		return 'Ages';
	default:
		return type;
	}
}

const displayAttributeValue = (val = '') => {
	switch (val.toLowerCase()) {
	case 'il':
	case 'israel':
		return 'United States';
	case '1950':
	case '1951-1951':
		return '65+';
	case '1960':
	case '1952-1961':
		return '55-64';
	case '1970':
	case '1962-1971':
		return '45-54';
	case '1980':
	case '1972-1981':
		return '35-45';
	case '1990':
	case '1982-1991':
		return '25-34';
	case '1997':
	case '1992-1998':
		return '18-24';
	case '1999-2003':
		return '13-17';
	default:
		return val;
	}
}

class CustomResearchResults extends React.Component {
	constructor(props) {
    	super(props);
		this.toggleAttributeValue = this.toggleAttributeValue.bind(this);
		this.state = {
			filteredAttributesValues: new Set()
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.segmentsMap !== this.props.segmentsMap) {
			this.setState({
				filteredAttributesValues: new Set()
			});
		}
	}
	
	/* format:
		[
			'<SegmentType>-><SegmentValue>',
		]
	*/
	allAttributeValues(segmentsMap) {
		let allAttributeValues = new Set();
		segmentsMap.forEach((segmentValues, attributeType) => {
			segmentValues.forEach((segments, attributeValue) => {
				allAttributeValues.add(`${attributeType}->${attributeValue}`);
			})
		});
		return allAttributeValues;
	}
	filteredSegmentIDs(segmentsMap, filteredAttributesValues) {
		let segments = new Set();
		let filteredSegments = new Set();
		segmentsMap.forEach((segmentValues, attributeType) => {
			segmentValues.forEach((valueSegments, attributeValue) => {
				if (filteredAttributesValues.has(`${attributeType}->${attributeValue}`)) {
					filteredSegments = new Set([...filteredSegments, ...valueSegments]);
				} else {
					segments = new Set([...segments, ...valueSegments]);
				}
			});
		});
		segments = new Set([...segments].filter(s => !filteredSegments.has(s)));
		return segments;
	}
	// flatSegmentIDs(attributeValues, segmentsMap) {
	// 	let segments = new Set();
	// 	attributeValues.forEach(val => {
	// 		const attr = val.split('->');
	// 		const segmentsInAttrValue = segmentsMap.get(attr[0]).get(attr[1]);
	// 		segments = new Set([...segments, ...segmentsInAttrValue]);
	// 	});
	// 	return segments;
	// }
	toggleAttributeValue(e) {
		let val = e.target.dataset.val;
		let filteredAttributesValues = this.state.filteredAttributesValues;
		if (filteredAttributesValues.has(val)) {
			filteredAttributesValues.delete(val);
		} else {
			filteredAttributesValues.add(val);
		}
		this.setState({
			filteredAttributesValues
		});
	}
	render() {
		const segmentsMap = this.props.segmentsMap;
		if (!segmentsMap || !this.props.survey || !this.props.answers) {
			return <div className="survey-results">
				<Loading />
			</div>;
		}
		
		//console.info(segmentsMap);
		const filteredAttributesValues = this.state.filteredAttributesValues;
		const selectedSegments = this.filteredSegmentIDs(segmentsMap, filteredAttributesValues);
		
		const answersSubset = this.props.answers.filter(a => 
			selectedSegments.has(a.segmentID));
		const numberOfAnswers = answersSubset.length;
		console.info(`${selectedSegments.size} segments, ${numberOfAnswers} answers`);
		let results;
		if (numberOfAnswers > 0) {	
			results = <div>
				<div className="respondents-title">{numberOfAnswers} Respondents 
					{filteredAttributesValues.size > 0 && ' (Filtered)'}</div>
				{this.props.survey.questions.map(q => {
					return <div key={`question-result-${q.postID}`}>
						<img src={blobURL(q.mediaID)} style={{width:50, height: 50}} title={q.postID} />
						{q.textValue}
						{q.possibleAnswers.map(pa => {
							const paAnswers = answersSubset.filter(a => a.answers.includes(pa.possibleAnswerID)).length;
							return <div key={`pa-result-${pa.possibleAnswerID}`}>
								<strong title={pa.possibleAnswerID}>{pa.textValue} </strong>
								{paAnswers}
							</div>;
						})}
						<hr />
					</div>
				})}
			</div>;
		}
		
		return (
			<div className="survey-results">
				
				<div className="attributes-selection">			
				{Array.from(segmentsMap.keys()).map(type => <div className="attribute-div" key={type}>
					<div className="attribute-type">{displayAttributeType(type)}</div>
					{Array.from(segmentsMap.get(type).keys()).map(val => <div key={`${type}->${val}`}>
						<Checkbox label={displayAttributeValue(val)}
							data-val={`${type}->${val}`}
							onChange={this.toggleAttributeValue}
							checked={!filteredAttributesValues.has(`${type}->${val}`)} />	
						</div>)}
					</div>)}
				</div>
				
				<div>
					{results || <div className="respondents-title">No matches</div>}	
				</div>
				
			</div>
		)
	}
}

CustomResearchResults.propTypes = {
	/* format:
			{
				SegmentType: {
					SegmentValue : 
						[Segments]
				}
			}
			*/
	segmentsMap: React.PropTypes.object,
	survey: React.PropTypes.object,
};

export default CustomResearchResults;
