import React, { Component, PropTypes } from 'react';
import blobURL from 'Utils/Askem/blobURL';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';

class CarouselPreview extends React.Component {
	constructor(props) {
		super(props);
		this.moveLeft = this.moveLeft.bind(this);
		this.moveRight = this.moveRight.bind(this);
		this.state = {
			currentVisibleIndex : 0,
			hideLeftArrow : true
		}
	}


	moveLeft() {
		let { currentVisibleIndex:nextIndex, nextPosition } = this.state;
		if (nextIndex - 1 >= 0) {
			nextIndex--;
		}

		if (!nextPosition) {
			nextPosition = 225;
		}
		else {
			if (nextIndex === 0) {
				nextPosition = 0;
			}
			else {
				nextPosition += 300;
			}
		}

		this.setState({
			currentVisibleIndex : nextIndex,
			direction : 'left',
			nextPosition,
			hideLeftArrow : nextIndex === 0 ? true : false,
			hideRightArrow : false
		})

	}

	moveRight() {
		let { currentVisibleIndex:nextIndex, nextPosition } = this.state;
		if (nextIndex + 1 <= this.props.images.length) {
			nextIndex++;
		}

		if (!nextPosition) {
			nextPosition = -225;
		}
		else {
				nextPosition -= 300;
		}

		this.setState({
			currentVisibleIndex : nextIndex,
			direction: 'right',
			nextPosition,
			hideRightArrow : nextIndex === this.props.images.length ? true : false,
			hideLeftArrow : false
		})
	}


	render() {
		let style = null;
		const direction = this.state.direction;
		const { hideRightArrow, hideLeftArrow } = this.state;

		let moveTo = null;
		let rightArrowStyle = null;
		let leftArrowStyle = null;

		const length = this.props.images ? (this.props.images.length + 1) * 312 : null;

		if (direction) {
			style = { transform:`translateX(${this.state.nextPosition}px)`, width:`${length}px`}
		}

		rightArrowStyle = hideRightArrow ? { visibility:'hidden'} : { visibility:'visible' }
		leftArrowStyle = hideLeftArrow ? { visibility:'hidden'} : { visibility:'visible' }

		return (
			<div className="carousel-top-container">
				<div className="company-title">
					<img src="../images/color-logo.jpg" width="40" height="40"/>
					<div className="askem-title">askem</div>
					<div className="sponsered-text">sponsered</div>
				</div>

				<div className="question-text">
					{ this.props.question.textValue }
				</div>

				<div className="carousel-preview-main-container animation" style={ style }>
					{ this.props.images && this.props.images
							.sort((a,b) => a.imageIndex - b.imageIndex)
							.map((item, index) => {
								let divClass = 'image-in-carousel';
								if (this.state.currentVisibleIndex - 1 === index ||  this.state.currentVisibleIndex + 1 === index) {
									divClass = 'image-in-carousel on-carousel-hover';
								}
								return (
									<div key={`img_${index}`} className={ divClass }>
										<img src={blobURL(item.cropData.croppedSrc)} width={300} height={300} />
										<div className="possible-answer-carousel">
											{ this.props.question.possibleAnswers[index].textValue }
										</div>
										<div style={{ paddingLeft:'5px' }}>
											{ this.props.selectedDescription }
										</div>
									</div>	
								)
						})
					}
					<div className="last-item-in-carousel">
						<div  className="image-wrapper">
							<div className="image-placeholder"></div>
						</div>
						<div className="possible-answer-carousel">
							See more at <br/>ASKEM.COM
						</div>
					</div>	
				</div>
				<div className="arrows">
					<div className="arrow" onClick={ this.moveLeft } style={ leftArrowStyle }>
						<FaAngleLeft />
					</div>
					<div className="arrow" onClick={ this.moveRight } style={ rightArrowStyle }>
						<FaAngleRight />						 
					</div>
				</div>
				<div className="social-data-footer-carousel">
					<span>18 Reactions</span>
					<span>3 Comments</span>
					<span>1 Share</span>
					<div className="footer-border"></div>
				</div>
				<div className="social-container">
					<div className="like">Like</div>
					<div className="comment">Coment</div>
					<div className="share">Share</div>
				</div>
			</div>
			
		);
	}
}

CarouselPreview.propTypes = {

};

export default CarouselPreview;