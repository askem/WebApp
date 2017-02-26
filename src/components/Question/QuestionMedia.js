import React from 'react';
import ReactDOM from 'react-dom';
import AnswerPopup from 'components/Question/AnswerPopup';
import measurePAText from 'utils/Askem/measurePAText';
import {DraggableCore} from 'react-draggable'

const clamp = (num, min, max) => 
	num <= min ? min : num >= max ? max : num;

class QuestionMedia extends React.Component {
	constructor(props) {
    	super(props);
		this.onClick = this.onClick.bind(this);
		this.state = {
			popupLocations: props.question.popupLocations
		};
	}
	onClick(group) {
		this.props.onToggle(group);
	}
	// isPopup - true=popup, false=dot
	dragStop(isPopup, paIndex, dragData) {
		const location = this.state.popupLocations[paIndex];
		this.props.onDragStop(this.props.question.questionID, paIndex, location, this.props.selectedVariant);	
	}
	dragMove(isPopup, paIndex, dragData) {
		const deltaX = dragData.deltaX / this.imageLength;
		const deltaY = dragData.deltaY / this.imageLength;
		let popupLocations = this.state.popupLocations;
		let location = popupLocations[paIndex];
		if (isPopup) {
			location.textXOffset = clamp(location.textXOffset + deltaX, 0.1, 0.9);
			location.textYOffset = clamp(location.textYOffset + deltaY, 0.1, 0.9);
		} else {
			location.uiXOffset = clamp(location.uiXOffset + deltaX, 0.1, 0.9);
			location.uiYOffset = clamp(location.uiYOffset + deltaY, 0.1, 0.9);
		}
		this.setState({
			popupLocations
		});
	}
	render() {
		const q = this.props.question;
		const { croppedMetadata } = q;
		let imageURL;
		if (croppedMetadata) {
			imageURL = croppedMetadata.dataURI;
		}
		else {
			imageURL = q.questionImageURL || '/images/emptyMediaID.png';
		}

		const canvasStyle = { backgroundImage: `url(${imageURL})` };
		//style={{width: 20, height: 20, backgroundColor:'#333'}}
		let children = [];
		children.push(<canvas className="photo-canvas" style={canvasStyle} ref="imageCanvas" key="imageCanvas" />);
		q.possibleAnswers.forEach((pa, paIndex) => {
			children.push(<DraggableCore key={`answer-${paIndex}`}
				disabled={!this.props.draggable}
				onDrag={(e, dragData) => this.dragMove(true, paIndex, dragData)}
				onStop={(e, dragData) => this.dragStop(true, paIndex, dragData)}
				><span>
				<AnswerPopup
					isMultiAnswerQuestion={!!q.isMultiAnswerQuestion}
					isChecked={this.props.checks.has(paIndex)}
					onCheck={this.props.checkAnswer}
					onUncheck={this.props.uncheckAnswer}
					ref={`answer-${paIndex}`}
					paIndex={paIndex} questionID={q.questionID}
					onSingleVote={this.props.onSingleVote}
					{...pa} />
		</span></DraggableCore>);
			const dotIDString = `dot-${paIndex}`;
			children.push(<DraggableCore key={dotIDString}
				disabled={!this.props.draggable}
				onDrag={(e, dragData) => this.dragMove(false, paIndex, dragData)}
				onStop={(e, dragData) => this.dragStop(false, paIndex, dragData)}
				>
				<div className="dot" ref={dotIDString} />
			</DraggableCore>);
		});
		// TODO: support for 'more than', textInput

		return <div className="question-photo">
			{children}
		</div>;
	}

	componentDidMount() {
		const $questionImage = $(ReactDOM.findDOMNode(this));
        this.fixImageSize($questionImage);
		this.placePossibleAnswers();
	}
	componentDidUpdate() {
		this.placePossibleAnswers();
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			popupLocations: nextProps.question.popupLocations
		});
	}

	currentPopupIndexes() {
		//return this.props.question.getIn(['popupIndexes', this.state.popupsGroupIndex]);
		return this.props.question.possibleAnswers.map((pa, paIndex) => paIndex);
	}

	fixImageSize($img) {
		const length = $img.width();
        $img.find('canvas, video, .photo-canvas').css({
			width: length,
			height: length
		}).attr({
			width: length,
			height: length
		});
		this.imageLength = length;
        return length;
	}
    getPossibleAnswerPosition(possibleAnswer, popupLocation, $possibleAnswer, $dot, $questionImage) {
		const textSize = measurePAText(possibleAnswer.textValue),
		questionLength = this.imageLength,
		answerWidth = textSize.width,//$possibleAnswer.outerWidth(),
		answerHeight = textSize.height;//$possibleAnswer.outerHeight(),		
		//dotWidth = $dot.outerWidth(),				8px
		//dotHeight = $dot.outerHeight();			8px

        return {
			possibleAnswer: {
				top: Math.max(0, Math.round(questionLength * popupLocation.textYOffset - answerHeight / 2)),
				left: Math.max(Math.round(questionLength * popupLocation.textXOffset - answerWidth / 2), 15)
			},
			dot: {
				// 4 for dotHeight / 2
				top: Math.max(0, Math.round(questionLength * popupLocation.uiYOffset - 4)),
				left: Math.max(Math.round(questionLength * popupLocation.uiXOffset - 4), 15)
			},
			line: [{
				top: Math.round(questionLength * popupLocation.uiYOffset),
				left: Math.round(questionLength * popupLocation.uiXOffset)
			}, {
				top: Math.round(questionLength * popupLocation.textYOffset),
				left: Math.round(questionLength * popupLocation.textXOffset)
			}],
			textSize: {
				width: answerWidth,
				height: answerHeight
			}
		};
	}
	drawLine(ctx, positions) {
		ctx.beginPath();
		ctx.moveTo(positions.line[0].left, positions.line[0].top);
		ctx.lineTo(positions.line[1].left, positions.line[1].top);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.stroke();
	}
    placePossibleAnswers() {
		const $questionImage = $(ReactDOM.findDOMNode(this));
        // this.fixImageSize($questionImage);
		if (this.shouldDrawPopups && !this.shouldDrawPopups()) {
			return;
		}

		var canvas = ReactDOM.findDOMNode(this.refs.imageCanvas);
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, this.imageLength, this.imageLength);
        this.currentPopupIndexes().forEach((paIndex, idx) => {
			const possibleAnswer = this.props.question.possibleAnswers[paIndex];
			const popupLocation = this.state.popupLocations[idx]; //this.props.question.popupLocations[idx];
			var $possibleAnswer = $(ReactDOM.findDOMNode(this.refs[`answer-${paIndex}`]));
			//fixAutoDir($possibleAnswer[0]);*/
			var $dot = $(ReactDOM.findDOMNode(this.refs[`dot-${paIndex}`]));
			var positions = this.getPossibleAnswerPosition(possibleAnswer, popupLocation, $possibleAnswer, $dot, $questionImage);
			this.drawLine(ctx, positions);
			var bgImage = $possibleAnswer.hasClass('checked') ? '' :
				['linear-gradient(to bottom, rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%)',
				`url("${this.props.question.questionImageURL}")`
				].join(',');
			let possibleAnswersCSS = Object.assign({}, positions.possibleAnswer, {
				'background-image': bgImage,
				//		v----border compensation--v
				'background-position': `0 0, -${positions.possibleAnswer.left + 1}px -${positions.possibleAnswer.top + 1}px`,
				'background-size': `100%, ${this.imageLength}px ${this.imageLength}px`,
				'background-repeat': 'no-repeat'
			});
			$possibleAnswer.css(possibleAnswersCSS);
			if ($possibleAnswer.children().length > 0) {
				$possibleAnswer.css(positions.textSize);
			}
			$dot.css(positions.dot);
			$possibleAnswer.children('textarea').css(positions.textSize);
        });
        return this;
	}
}

QuestionMedia.propTypes = {
	question: React.PropTypes.object.isRequired,
}

export default QuestionMedia;
