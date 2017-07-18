import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ImageUpload from 'components/Common/ImageUpload';
import genGUID from 'Utils/Askem/genGuid';
import blobURL from 'Utils/Askem/blobURL';
import XButton from 'components/Common/XButton';
import QuestionPreview from 'components/Quote/Preview/QuestionPreview';
import CarouselPreview from 'components/Quote/Preview/CarouselPreview';
import TextField from 'material-ui/TextField';

class CarouselCreatives extends React.Component {
	constructor(props) {
		super(props);
		this.onUpload = this.onUpload.bind(this);
		this.renderCarouselSet = this.renderCarouselSet.bind(this);
		this.addNewSet = this.addNewSet.bind(this);	
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.addDescription = this.addDescription.bind(this);
		this.getRandomDescription = this.getRandomDescription.bind(this);
		this.replaceImage = this.replaceImage.bind(this);
		this.state = {
			selectedSet : 0
		}
	}	

	componentDidMount() {
		window.addEventListener('scroll',this.stickCarouselPreview);

		if (!this.props.surveyMetadata.adCreatives || (!this.props.surveyMetadata.adCreatives.carouselAdCreatives.carousels || this.props.surveyMetadata.adCreatives.carouselAdCreatives.carousels.length === 0)) {
			this.props.addNewSet(this.props.selectedQuestion.possibleAnswers.length);
		}

	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.stickCarouselPreview);
	}


	stickCarouselPreview() {
		const container = document.querySelector('.carousel-main-container');
		let carouselContainer  = document.querySelector('.carousel-preview-container');
		let titleForPreview = carouselContainer.parentNode.children[0];

		const clientRect = container.getBoundingClientRect();

		if (clientRect.top < 78) {
			titleForPreview.style.position = 'fixed';
			titleForPreview.style.top = '90px';;
			carouselContainer.style.position = 'fixed';
			carouselContainer.style.top = '60px';
		}
		else {
			titleForPreview.style.position = 'static';
			carouselContainer.style.position = 'relative';
			carouselContainer.style.top = '-70px';
		}
	}

	

	onUpload(croppedImage, originalImage, metadata) {
		const { x,y, width, height } = metadata !== null ? metadata : originalImage;
		const key = `temp_${genGUID()}`;
		const carouselJson = {
			crop100x100 : [
				[x, y],
				[x + width-1, y + height-1]
			],
			mediaID : originalImage.src,
			croppedSrc : croppedImage ? croppedImage.src : originalImage.src,
			key
		}
		
		this.props.replaceImageCarouselInSet(this.state.setIndex, this.state.imageIndex, carouselJson);
	}

	replaceImage(event, setIndex, imageIndex) {
		const allowedClasses = ['carousel-image', 'replace-image-div', 'empty-image-placeholder'];
		const proceed = allowedClasses.some(item => item === event.target.className);
		if (!proceed) return;

		this.refs.imageUploadControl.openUploadDialog();
		this.setState({ 
			setIndex,
			imageIndex
		});
	}

	

	renderCarouselSet(set, setIndex = 0) {
		return this.props.selectedQuestion.possibleAnswers.map((possibleAnswer, index) => {
			let imageForAnswer = null;
			if (set) { 
				if (this.props.surveyMetadata.croppedCarouselImages){
					const croppedImage = this.props.surveyMetadata.croppedCarouselImages.find(img => {
						return img.setIndex === setIndex && img.imageIndex === index;
					});

					if (croppedImage) {
						imageForAnswer = <img src={blobURL(croppedImage.cropData.croppedSrc)} className="carousel-image"/> 
					}					
				}
			}

			if (!imageForAnswer) { 
				imageForAnswer = <div className="empty-image-placeholder"></div> 
			}
				
			return (
				<div key={ `set_${index}`} className="image-wrapper" onClick={(event) => this.replaceImage(event, setIndex, index) }>
					{ imageForAnswer }
					<div className="replace-image-div" >Replace image</div>
					<div className="possible-answer-text">{ possibleAnswer.textValue }</div>
				</div>
			)
		})
	}

	addNewSet() {
		this.props.addNewSet(this.props.selectedQuestion.possibleAnswers.length);
	}	

	deleteSet(setIndex) {
		this.props.deleteCarousel(setIndex);
	}


	setSelectedSet(index) {
		this.setState({selectedSet:index});
	}

	onDescriptionChange(event, index) {
		this.props.updateCarouselDescription(index, event.target.value);
		this.setState({
			selectedDescription : event.target.value
		})
	}

	deleteDescription(index) {
		this.props.deleteCarouselDescription(index);
		this.setState({
			selectedDescription : this.getRandomDescription()
		});
	}


	addDescription() {
		this.props.addNewDescriptionInCarousels();
	}

	handleFocus(event) {
		this.setState({
			selectedDescription : event.target.value
		});
	}

	getRandomDescription() {
		if (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.carouselAdCreatives.descriptions) {
			if (this.props.surveyMetadata.adCreatives.carouselAdCreatives.descriptions.length === 1) {
				return this.props.surveyMetadata.adCreatives.carouselAdCreatives.descriptions[0];
			}

			const min = 0;
			const max = this.props.surveyMetadata.adCreatives.carouselAdCreatives.descriptions.length-1;
			let newRandomValue = '';
			let originalValue = '';

			// check if all values are empty inside the list
			const allEmpty = this.props.surveyMetadata.adCreatives.carouselAdCreatives.descriptions.every(item => item === '');
			if (allEmpty)
				return '';
			else {
				while (newRandomValue === originalValue || newRandomValue === '') {
					let randomNumber = Math.floor(Math.random()*(max-min+1)+min);
					newRandomValue= this.props.surveyMetadata.adCreatives.carouselAdCreatives.descriptions[randomNumber];
				}

				return newRandomValue;
			}
		}
	}

	render() {
		const questionsVariants = this.props.surveyMetadata.questionsVariants || [];
		const hasQuestions = this.props.surveyMetadata.questions && this.props.surveyMetadata.questions.length > 0;

		let carousels = null;
		let previewImages = null;
		let descriptions = null;
		let selectedDescription = null;

		if (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.carouselAdCreatives.carousels) {
			carousels = this.props.surveyMetadata.adCreatives.carouselAdCreatives.carousels.map((item, index) => {
				return (
					<div key={ `set_${index}`} onClick={ this.setSelectedSet.bind(this, index) }> 
						<div className="set-title">
							{ `set ${index+1}` }
							<FlatButton
								 label="Delete Set"
								 onTouchTap={this.deleteSet.bind(this, index)} />
						</div>
						<div className="set-wrapper">
							{ this.renderCarouselSet(item, index) }
						</div>
					</div>
				);
			});

		previewImages = this.props.surveyMetadata.croppedCarouselImages ? this.props.surveyMetadata.croppedCarouselImages.filter(item => item.setIndex === this.state.selectedSet) : null;
			
		}
		else {
			carousels = (
						<div onClick={ this.setSelectedSet.bind(this, 0) }>
							<div className="set-title">Set 1</div>
							<div className="set-wrapper">
								{ this.renderCarouselSet() }
							</div>
						</div>
			)
		}

		if (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.carouselAdCreatives.descriptions) {
			descriptions = this.props.surveyMetadata.adCreatives.carouselAdCreatives.descriptions.map((item, index) => {
				return (
					<div key={`desc_${index}`} className="description-in-carousel">
						<TextField
							value={item}
							id={`desc_id_${index}`}
							inputStyle={{color: 'black'}}
							fullWidth={true}
							onChange={(event) => this.onDescriptionChange(event, index) }
							onFocus={(event) => this.handleFocus(event)} /> 
						<div>
							<XButton onClick={ this.deleteDescription.bind(this, index) } />
						</div>
					</div>
				)
			})
		}

		selectedDescription = !this.state.selectedDescription ? this.getRandomDescription() : this.state.selectedDescription;

		return (
			<div className="carousel-main-container">
					<div className="carousel-images-wrapper">
						<div className="quote-wizard-side-title" style={{ padding:'10px 0 10px 20px' }}>Carousel Creatives</div>
						{ !hasQuestions &&  
							<div className="empty-container-when-no-questions">Add question to the survey</div>
						}

						{ hasQuestions && 
						<div>
							<div className="first-question-preview">
								<div className="quote-wizard-side">
									<QuestionPreview
										title={'Preview'}
										questions={this.props.surveyMetadata.questions}
										selectedQuestion={0}
										variants={this.props.surveyMetadata.variants} 
										questionsVariants={questionsVariants} 
										selectedVariant={0} 
										setQuotePossibleAnswerLocation={this.props.setQuotePossibleAnswerLocation} />
								</div>
							</div>
							<ImageUpload
								ref="imageUploadControl"
								onUpload={this.onUpload}
								requiredAspectRatio={1}
								aspectRatioTolerance={0} />	

						<div className="add-new-set">
							<FlatButton label="Add New Set" onTouchTap={this.addNewSet} />
							<FlatButton label="Add Description" onTouchTap={this.addDescription} />

						</div>		
						{ carousels }
						<div className="descriptions">
							<div className="description-title">Descriptions</div>
							{ descriptions }
							</div>
						</div>
						}
					</div>
					{ hasQuestions && 
						<div>
							<div className="quote-wizard-side-title" style={{ padding:'10px 0 10px 20px' }}>Carousel Preview</div>
							<div className="carousel-preview-container">
								<CarouselPreview 
									images={previewImages}
									question={ this.props.selectedQuestion }
									selectedDescription={ selectedDescription } />
							</div>
						</div>
					}
			</div>
		);
	}
}

export default CarouselCreatives;