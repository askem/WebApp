import React from 'react';
import ReactDOM from 'react-dom';
import AnswerPopup from 'components/Question/AnswerPopup';
import measurePAText from 'utils/Askem/measurePAText';

class QuestionMedia extends React.Component {
	constructor(props) {
    	super(props);
		this.onClick = this.onClick.bind(this);
		this.state = {};
	}
	onClick(group) {
		this.props.onToggle(group);
	}
	render() {
		const q = this.props.question;
		const imageURL = q.questionImageURL || '/images/emptyMediaID.png';
		const canvasStyle = { backgroundImage: `url(${imageURL})` };
		//style={{width: 20, height: 20, backgroundColor:'#333'}}
		let children = [];
		children.push(<canvas className="photo-canvas" style={canvasStyle} ref="imageCanvas" key="imageCanvas" />);
		q.possibleAnswers.forEach((pa, paIndex) => {
			children.push(<AnswerPopup
				isMultiAnswerQuestion={!!q.isMultiAnswerQuestion}
				key={`answer-${paIndex}`} ref={`answer-${paIndex}`}
				paIndex={paIndex} questionID={q.questionID}
				onSingleVote={this.props.onSingleVote}
				onMultiVote={this.props.onMultiVote}
				{...pa} />);
			const dotIDString = `dot-${paIndex}`;
			children.push(<div className="dot" key={dotIDString} ref={dotIDString} />);
		});
		// TODO: support for 'more than', textInput

		return <div className="question-photo">
			{children}
		</div>;
	}

	componentDidMount() {
		this.placePossibleAnswers();
	}
	componentDidUpdate() {
		this.placePossibleAnswers();
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
		padding = parseInt($questionImage.css('padding-left').split('px').shift(), 10),
		answerWidth = textSize.width,//$possibleAnswer.outerWidth(),
		answerHeight = textSize.height,//$possibleAnswer.outerHeight(),
		dotWidth = $dot.outerWidth(),
		dotHeight = $dot.outerHeight();

        return {
			possibleAnswer: {
				top: Math.max(0, Math.round(questionLength * popupLocation.textYOffset - answerHeight / 2)),
				left: Math.max(Math.round(questionLength * popupLocation.textXOffset - answerWidth / 2 + padding), 15)
			},
			dot: {
				top: Math.max(0, Math.round(questionLength * popupLocation.uiYOffset - dotHeight / 2)),
				left: Math.max(Math.round(questionLength * popupLocation.uiXOffset - dotWidth / 2 + padding), 15)
			},
			line: [{
				top: Math.round(questionLength * popupLocation.uiYOffset),
				left: Math.round(questionLength * popupLocation.uiXOffset)
			}, {
				top: Math.round(questionLength * popupLocation.textYOffset),
				left: Math.round(questionLength * popupLocation.textXOffset)
			}],
			padding: padding,
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
        this.fixImageSize($questionImage);
		if (this.shouldDrawPopups && !this.shouldDrawPopups()) {
			return;
		}

		var canvas = ReactDOM.findDOMNode(this.refs.imageCanvas);
		var ctx = canvas.getContext('2d');
        this.currentPopupIndexes().forEach((paIndex, idx) => {
			const possibleAnswer = this.props.question.possibleAnswers[paIndex];
			const popupLocation = this.props.question.popupLocations[idx];
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
				'background-position': `0 0, -${positions.possibleAnswer.left - positions.padding + 1}px -${positions.possibleAnswer.top + 1}px`,
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
