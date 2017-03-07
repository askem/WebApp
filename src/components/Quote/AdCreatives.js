import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import XButton from 'components/Common/XButton';
import FaRefresh from 'react-icons/lib/fa/refresh';
import blobURL from 'utils/Askem/blobURL';
import ImageUpload from 'components/Common/ImageUpload';
import { getImageData } from 'utils/ImageUtils';

class AdCreatives extends React.Component {
	constructor(props) {
		super(props);

		this.addHeadlineField = this.addHeadlineField.bind(this);
		this.addTextField = this.addTextField.bind(this);
		this.addDescriptionField = this.addDescriptionField.bind(this);
		this.onTextFieldChange = this.onTextFieldChange.bind(this);
		this.refreshPreview = this.refreshPreview.bind(this);
		this.onUpload = this.onUpload.bind(this);
		this.handleImagesStrip = this.handleImagesStrip.bind(this);

		this.state = {		
			previewImage : null,
			previewHeadline : null,
			previewText : null,
			previewDescription : null,
			localComponentImages : null
		}
	}

	onTextFieldChange(event, arrayType, index) {
		const { id, value } = event.target;
		switch(arrayType) {
			case 'headline':
				this.props.updateCreativeHeadline(index, value);
				break;
			case 'text':
				this.props.updateCreativeText(index, value);
				break;
			case 'description':
				this.props.updateCreativeDescription(index, value);
				break;
		}
	}

	addHeadlineField() {
		this.props.addCreativeHeadline();
	}

	addTextField() {
		this.props.addCreativeText();
	}

	addDescriptionField() {
		this.props.addCreativeDescription();
	}

	getRandomElementFromArr(arr, originalValue) {
		//filter all the empty items
		const filteredArray = arr.filter(item => item !== '');

		if (filteredArray.length === 0) {
			return '';
		}

		if (filteredArray.length == 1) {
			return filteredArray[0];
		}

		const min = 0;
		const max = filteredArray.length - 1;
		let newRandomValue = originalValue || '';


		while (newRandomValue === originalValue || newRandomValue === '') {
			let randomNumber = Math.floor(Math.random()*(max-min+1)+min);
			newRandomValue= filteredArray[randomNumber];
		}

		return newRandomValue;
	}

	getRandomNumber(arr, currentValue) {	
		const min = 0;
		const max = arr.length - 1;

		if (arr.length === 1) {
			return 0;
		}
		else {
			let newValue = currentValue;
			while (newValue === currentValue) {
				newValue = Math.floor(Math.random()*(max-min+1)+min);
			}

			return newValue;
		}
	}

	removeField(event, arrayName, index) {
		switch(arrayName) {
			case 'headlines':
				this.props.deleteCreativeHeadline(index);
				break;
			case 'texts':
				this.props.deleteCreativeText(index);
				break;
			case 'descriptions':
				this.props.deleteCreativeDescription(index);
				break;
		}
	}

	refreshPreview() {
		let { previewHeadline, previewText, previewDescription, previewImage } =  this.state;
		let { headlines = [], texts = [], descriptions = [], images =[]} = (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.imageAdCreatives) || {};

		// debugger;
		previewHeadline = this.getRandomElementFromArr(headlines, previewHeadline);
		previewText = this.getRandomElementFromArr(texts, previewText);
		previewDescription = this.getRandomElementFromArr(descriptions, previewDescription);
		previewImage = this.getRandomNumber(images, previewImage);


		if (images.length > 0) {
			const metadata = this.getMetadataFromImage(images[previewImage]);

			getImageData(metadata)
				.then(newData => {
					this.setState({
						previewHeadline,
						previewText,
						previewDescription,
						previewImage,
						bigImagePreview : newData.dataURI
					});
				})
				.catch(err => { console.error(err)});
		}
		else {
			this.setState({
				previewHeadline,
				previewText,
				previewDescription,
				previewImage
			});
		}
	}

	componentWillMount() {
		let headline_preview, text_preview, description_preview, imagePreviewNumber;
		let hasAtLeastOneItem = false;

		if (this.props.surveyMetadata.adCreatives) {
			if (this.props.surveyMetadata.adCreatives.imageAdCreatives.headlines) {
				headline_preview = this.getRandomElementFromArr(this.props.surveyMetadata.adCreatives.imageAdCreatives.headlines, this.state.previewHeadline);
				hasAtLeastOneItem = true;
			}

			if (this.props.surveyMetadata.adCreatives.imageAdCreatives.texts) {
				text_preview = this.getRandomElementFromArr(this.props.surveyMetadata.adCreatives.imageAdCreatives.texts, this.state.previewText);
				hasAtLeastOneItem = true;
			}

			if (this.props.surveyMetadata.adCreatives.imageAdCreatives.descriptions) {
				description_preview = this.getRandomElementFromArr(this.props.surveyMetadata.adCreatives.imageAdCreatives.descriptions, this.state.previewDescription);
				hasAtLeastOneItem = true;
			}

			if (this.props.surveyMetadata.adCreatives.imageAdCreatives.images) {
				imagePreviewNumber = this.getRandomNumber(this.props.surveyMetadata.adCreatives.imageAdCreatives.images, this.state.previewImage);
				hasAtLeastOneItem = true;

				const { images } = this.props.surveyMetadata.adCreatives.imageAdCreatives || [];
				this.handleImagesStrip(images);
				this.handleBigImagePreview(this.props.surveyMetadata.adCreatives.imageAdCreatives.images[imagePreviewNumber]);
			}

			if (hasAtLeastOneItem) {
				this.setState({
					previewHeadline : headline_preview,
					previewText : text_preview,
					previewDescription : description_preview,
					previewImage : imagePreviewNumber
				})
			}
		}
	}

	handleBigImagePreview(imageObject) {
		const metadata = this.getMetadataFromImage(imageObject);
		getImageData(metadata)
				.then(data => {
					this.setState({
						bigImagePreview: data.dataURI
					});
				})
				.catch(err => {
					console.error(err);
				});
		
	}

	componentWillReceiveProps(nextProps) {
		if ((nextProps.surveyMetadata.adCreatives.imageAdCreatives.images && !this.props.surveyMetadata.adCreatives) || (nextProps.surveyMetadata.adCreatives.imageAdCreatives.images.length !== this.props.surveyMetadata.adCreatives.imageAdCreatives.images.length)) {
			const images = nextProps.surveyMetadata.adCreatives.imageAdCreatives.images || [];
			this.handleImagesStrip(images);
		}	
	}
	
	handleImagesStrip(arr) {
		const promisesArr = arr.map((image, index) => {
			const metadata = this.getMetadataFromImage(image, index);
			return getImageData(metadata);
		});

		Promise
			.all(promisesArr)
			.then(values => {
				// sort by index
				values = values.sort((a,b) => a.extraData.index - b.extraData.index);
				const imagesArr = values.map((image, index) => {
					return {
						dataURI:image.dataURI,
						index
					}
				})

				this.setState({
					localComponentImages : imagesArr
				});
			})
			.catch(err => {
				console.error('something got wrong....', err);
			})
	}

	getMetadataFromImage(imageData, index) {
		const imageSrc = imageData.mediaID ? blobURL(imageData.mediaID) : imageData.dataURI;
		const crop = imageData['crop191x100'][0];
		const [x1, y1] = crop;
		const [x2, y2] = imageData['crop191x100'][1];
		const width = x2 - x1;
		const height = y2 - y1;

		return {
			width,
			height,
			x: x1,
			y: y1,
			dataURI : imageSrc,
			extraData : {
				index
			}
		}
	}


	deleteImage(index) {
		this.props.deleteCreativeImage(index);

		if (this.state.localComponentImages) {
			let images = [...this.state.localComponentImages];
			images.splice(index, 1);

			//change the index order
			images.forEach((item, index) => {
				item.index = index;
			});

			this.setState({
				localComponentImages : images
			})

		}
	}

	onUpload(croppedImage, originalImage, metadata) {
		const imageMetadata = {
			"crop191x100" : [
				[metadata.x, metadata.y],
				[metadata.x + metadata.width, metadata.y + metadata.height]
			],
			"mediaID" : originalImage.src
		}

		let { images }  = (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.imageAdCreatives) || {};
		const index = images ? images.length : 0;
		this.props.addCreativeImage(index, imageMetadata);
	}


	render() {
		const { headlines = [], texts = [], descriptions = [], images = []} = (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.imageAdCreatives) || {};

		 let imagesArr;
		 if (this.state.localComponentImages) {
		 	imagesArr = this.state.localComponentImages;
		 }
		 else {
			 imagesArr = images;
		 }

		const headlinesItems = headlines.map((headline, index) => {
				return (
					<div key={`headline_key_${index}`} className="input-item-container">
						<TextField
							value={headline}
							id={`headline_${index}`}
							inputStyle={{color: 'black'}}
							fullWidth={true}
							onChange={(event) => this.onTextFieldChange(event, 'headline', index)} />
						<div>
							<XButton onClick={() => this.removeField(event, 'headlines', index)} />
						</div>
					</div>				
				)
		});

		const textsItems = texts.map((text, index) => {
			return (
					<div key={`text_key_${index}`} className="input-item-container">
						<TextField
							value={text}
							id={`text_${index}`}
							inputStyle={{color: 'black'}}
							fullWidth={true}
							onChange={(event) => this.onTextFieldChange(event, 'text', index)} />
						<div>
							<XButton onClick={() => this.removeField(event, 'texts', index)} />
						</div>
					</div>
			)
		});

		const descriptionsItems = descriptions.map((item, index) => {
			return (
					<div key={`desc_key__${index}`} className="input-item-container">
						<TextField
							value={item}
							id={`desc_${index}`}
							inputStyle={{color: 'black'}}
							fullWidth={true}
							onChange={(event) => this.onTextFieldChange(event, 'description', index)} />
						<div>
							<XButton onClick={() => this.removeField(event, 'descriptions', index)} />
						</div>
					</div>
			)
		});

		let imagePreview;
		if (this.state.previewImage === null) {
			imagePreview = <div style={{ backgroundImage:'../images/emptyMediaID.png', height:'474px', width:'248px' }}></div>
		}
		else {
			// const linkToImage = blobURL(this.props.surveyMetadata.adCreatives.imageAdCreatives.images[this.state.previewImage].mediaID);
			if (this.state.bigImagePreview) {
				imagePreview = <div style={{ backgroundImage:'url(' + this.state.bigImagePreview + ')', backgroundSize:'cover', width:'474px', height:'248px' }}></div>
			}
		}

		return (
			<div>
				<div className="quote-wizard-side-title" style={{ padding:'10px 0 20px 20px' }}>Ad Creatives</div>
				<div className="creative-container">
					<div className="creative-editable-section">
						<div>
							Images
							<FlatButton
								 label="Add Image"
								 style={{ marginLeft:30 + 'px' }}
								 onClick={() => this.refs.imageUploadControl.openUploadDialog()} />
						</div>
						<div className="image-upload-container">
							<ImageUpload
									ref="imageUploadControl"
									onUpload={this.onUpload}
									requiredAspectRatio={1.91}
									aspectRatioTolerance={0} />		
						</div>
						<div className="ad-images-array-container">
							{ imagesArr.map((image, index) => 
									<div key={`img_${index}`} className="ad-creative-image-strip">
										<img src={blobURL(image.dataURI)} className="creative-img" />
										<span className="delete-button-container">
											<XButton onClick={() => this.deleteImage(index)} />
										</span>
									</div>
							)}
						</div>
						<div className="ad-creatives-array-container">
							<div className="title">
								Headlines					
							</div>
							{ headlinesItems }
							<FlatButton onClick={this.addHeadlineField} label="Add"/>
						</div>
						<div className="ad-creatives-array-container">
							<div className="title">
								Texts					
							</div>
							{ textsItems }
							<FlatButton onClick={this.addTextField} label="Add" />					
						</div>
						<div className="ad-creatives-array-container">
							<div className="title">
								Descriptions
							</div>
							{ descriptionsItems }
							<FlatButton onClick={this.addDescriptionField} label="Add" />					
						</div>
					</div>
					<div className="creative-preview-section">
						<div className="ad-creative-facebook-title quote-wizard-side-title">
							Facebook Ad Preview
							<span className="refresh-preview">
								<FaRefresh onClick={this.refreshPreview}/>
							</span>
						</div>
						<div className="ad-creatives-preview">
							<div className="ad-creative-company-title">
								<img src="../images/color-logo.jpg" width="40" height="40"/>
								<div className="askem-title">askem</div>
								<div className="sponsered-text">sponsered</div>
							</div>
							<div className="creative-preview-headline">{ this.state.previewHeadline }</div>
							<div className="creative-preview-images">
							 	{ imagePreview }
							</div>
							<div className="creative-preview-text">{ this.state.previewText }</div>
							<div className="creative-preview-description">{ this.state.previewDescription }</div>
							<div className="askem-com-title">askem.com</div>

						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default AdCreatives;
