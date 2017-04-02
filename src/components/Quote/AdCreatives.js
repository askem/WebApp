import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import XButton from 'components/Common/XButton';
import FaRefresh from 'react-icons/lib/fa/refresh';
import blobURL from 'utils/Askem/blobURL';
import ImageUpload from 'components/Common/ImageUpload';
import { getImageData } from 'utils/ImageUtils';
import Dialog from 'material-ui/Dialog';
import genGUID from 'utils/Askem/genGUID';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AdPreview from 'components/Quote/AdPreview';

class AdCreatives extends React.Component {
	constructor(props) {
		super(props);

		this.addHeadlineField = this.addHeadlineField.bind(this);
		this.addTextField = this.addTextField.bind(this);
		this.addDescriptionField = this.addDescriptionField.bind(this);
		this.onTextFieldChange = this.onTextFieldChange.bind(this);
		this.refreshPreview = this.refreshPreview.bind(this);
		this.onUpload = this.onUpload.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleClickOnImage = this.handleClickOnImage.bind(this);
		this.onAdTypeChange = this.onAdTypeChange.bind(this);

		this.state = {		
			previewImage : null,
			previewHeadline : null,
			previewText : null,
			previewDescription : null,
			localImagesStorage : null,
			selectedAdType : 'desktop_news_feed'
		}
	}

	onTextFieldChange(event, arrayType, index) {
		const { id, value } = event.target;
		switch(arrayType) {
			case 'headline':
				this.props.updateCreativeHeadline(index, value);
				this.setState({ previewHeadline : value });
				break;
			case 'text':
				this.props.updateCreativeText(index, value);
				this.setState({ previewText : value})
				break;
			case 'description':
				this.props.updateCreativeDescription(index, value);
				this.setState({ previewDescription : value})
				break;
		}
	}


	handleFocus(event, type) {
		const { value } = event.target;
		switch(type) {
			case 'headline':
				this.setState({ previewHeadline : value });
				break;
			case 'text'	:
				this.setState({ previewText : value})
				break;
			case 'description':
				this.setState({ previewDescription : value})
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

		if (arr.length === 0)
			return null;

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

	onAdTypeChange(event, key, payload) {
		switch(payload) {
			case 'audience_network_interstitial':
			case 'audience_network_native':
				this.refs["preview-main-wrapper"].className = 'ad-creatives-preview height_audience_network_auto';
				break;
			default:
				this.refs["preview-main-wrapper"].className = 'ad-creatives-preview';
				break;
		}

		this.setState({ selectedAdType:payload });
	}


	deleteField(event, arrayName, index) {
		switch(arrayName) {
			case 'headlines':
				this.props.deleteCreativeHeadline(index);
				let headlines = [...this.props.surveyMetadata.adCreatives.imageAdCreatives.headlines];
				headlines = [...headlines.slice(0, index), ...headlines.slice(index+1)];
				const previewHeadline = this.getRandomElementFromArr(headlines, this.state.previewHeadline);
				this.setState({ previewHeadline });
				break;
			case 'texts':
				this.props.deleteCreativeText(index);
				let texts = [...this.props.surveyMetadata.adCreatives.imageAdCreatives.texts];
				texts = [...texts.slice(0, index), ...texts.slice(index+1)];
				const previewText = this.getRandomElementFromArr(texts, this.state.previewText);
				this.setState({ previewText });
				break;
			case 'descriptions':
				this.props.deleteCreativeDescription(index);
				let descriptions = [...this.props.surveyMetadata.adCreatives.imageAdCreatives.descriptions];
				descriptions = [...descriptions.slice(0, index), ...descriptions.slice(index+1)];
				const previewDescription = this.getRandomElementFromArr(descriptions, this.state.previewText);
				this.setState({ previewDescription });
				break;
		}
	}


	refreshPreview() {
		let { previewHeadline, previewText, previewDescription, previewImage } =  this.state;
		let { headlines = [], texts = [], descriptions = []} = (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.imageAdCreatives) || {};
		let images = this.props.surveyMetadata.croppedImages;

		previewHeadline = this.getRandomElementFromArr(headlines, previewHeadline);
		previewText = this.getRandomElementFromArr(texts, previewText);
		previewDescription = this.getRandomElementFromArr(descriptions, previewDescription);
		previewImage = this.getRandomNumber(images, previewImage);

		if (images.length > 0) {
			const key = this.state.localImagesStorage[previewImage];
			const img = images.find(image => image.key === key);
			const bigImagePreview = img ? img.cropData.croppedSrc : null;

			this.setState({
						previewHeadline,
						previewText,
						previewDescription,
						previewImage,
						bigImagePreview
			});
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
		let mediaID_Array;

		if (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.imageAdCreatives) {
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

				const images = this.props.surveyMetadata.croppedImages || [];
				this.handleBigImagePreview(images[imagePreviewNumber]);
				mediaID_Array = images.map(item => item.key);
			}

			if (hasAtLeastOneItem) {
				this.setState({
					previewHeadline : headline_preview,
					previewText : text_preview,
					previewDescription : description_preview,
					previewImage : imagePreviewNumber,
					showEmptyValuesModal : this.props.showEmptyValuesModal,
					localImagesStorage: mediaID_Array
				})
			}
		}
	}

	handleBigImagePreview(imageObject) {
		if (!imageObject) return;
		this.setState({ bigImagePreview: imageObject.cropData.croppedSrc });
	}

	componentWillReceiveProps(nextProps) {
		const croppedImagesArray = nextProps.surveyMetadata.croppedImages ? [...nextProps.surveyMetadata.croppedImages] : [];
		const localKeys = croppedImagesArray.map(item => item.key);

		this.setState({ localImagesStorage : localKeys, showEmptyValuesModal:nextProps.showEmptyValuesModal });

	}

	deleteImage(index) {
		let images = [...this.state.localImagesStorage];
		const key = images[index];

		this.props.deleteCreativeImage(index, key);

		images.splice(index, 1);
		const randomNumber = this.getRandomNumber(images, this.state.previewImage);
		if (randomNumber !== null) {
			const newKey = images[randomNumber];
			const croppedImage = this.props.surveyMetadata.croppedImages.find(item => item.key === newKey);

			if (croppedImage) {
				const src = croppedImage.cropData.croppedSrc;
				this.setState({
					localImagesStorage : images,
					bigImagePreview : src
				})
			}
			else {
				this.setState({
					localImagesStorage : images,
					previewImage : null
				})
			}
		}
		else {
			this.setState({
				localImagesStorage : images,
				previewImage : null
			})
		}
	}

	onUpload(croppedImage, originalImage, metadata) {
		const key = `temp_${genGUID()}`;
		let { x, y, width, height } = metadata;
		x = parseInt(x);
		y = parseInt(y);
		width = parseInt(width);
		height = parseInt(height);

		const imageMetadata = {
			crop191x100 : [
				[x, y],
				[x + width-1, y + height-1]
			],
			mediaID : originalImage.src,
			croppedSrc : croppedImage.src,
			key
		}


		let { images }  = (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.imageAdCreatives) || {};
		const index = images ? images.length : 0;

		const localImagesStorage = this.state.localImagesStorage === null ? [] : [...this.state.localImagesStorage];
		localImagesStorage.push(key);

		this.setState({
			localImagesStorage,
			bigImagePreview : croppedImage.src,
			previewImage : index
		 });
		this.props.addCreativeImage(index, imageMetadata);
	}

	handleClickOnImage(index) {
		const key = this.state.localImagesStorage[index];
		const croppedImageObject = this.props.surveyMetadata.croppedImages.find(croppedImage => croppedImage.key === key);
		this.setState({ 
			previewImage : index,
			bigImagePreview : croppedImageObject.cropData.croppedSrc
		});
	}


	render() {
		const { headlines = [], texts = [], descriptions = [], images = []} = (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.imageAdCreatives) || {};

		let imagesArr = this.props.surveyMetadata.croppedImages;

		const headlinesItems = headlines.map((headline, index) => {
				return (
					<div key={`headline_key_${index}`} className="input-item-container">
						<TextField
							value={headline}
							id={`headline_${index}`}
							inputStyle={{color: 'black'}}
							fullWidth={true}
							onChange={(event) => this.onTextFieldChange(event, 'headline', index)}
							onFocus={(event) => this.handleFocus(event, 'headline')} />
						<div>
							<XButton onClick={(event) => this.deleteField(event, 'headlines', index)} />
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
							onChange={(event) => this.onTextFieldChange(event, 'text', index)} 
							onFocus={(event) => this.handleFocus(event, 'text')} />
						<div>
							<XButton onClick={(event) => this.deleteField(event, 'texts', index)} />
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
							onChange={(event) => this.onTextFieldChange(event, 'description', index)}
							onFocus={(event) => this.handleFocus(event, 'description')} />
						<div>
							<XButton onClick={(event) => this.deleteField(event, 'descriptions', index)} />
						</div>
					</div>
			)
		});

		let imagePreview;
		if (this.state.previewImage === null) {
			imagePreview = null;
		}
		else {
			if (this.state.bigImagePreview) {
				imagePreview = this.state.bigImagePreview ;
			}
		}

		return (
			<div className="ad-creative-main-content-container">
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
							{ imagesArr && imagesArr.map((image, index) => 
									<div key={`img_${index}`} className="ad-creative-image-strip">
										<img src={blobURL(image.cropData.croppedSrc)} className="creative-img" onClick={this.handleClickOnImage.bind(this, index)} />
										<span className="delete-button-container">
											<XButton onClick={this.deleteImage.bind(this, index)} />
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
						<div className="">
							<SelectField
									value={this.state.selectedAdType}
									onChange={(event, key, payload) => {this.onAdTypeChange(event, key, payload)}}>
										<MenuItem value={'desktop_news_feed'} primaryText="Desktop News Feed" /> 
										<MenuItem value={'mobile_news_feed'} primaryText="Mobile News Feed" /> 
										<MenuItem value={'feature_phone'} primaryText="Feature Phone" /> 
										<MenuItem value={'instant_articles'} primaryText="Instant Articles" /> 
										<MenuItem value={'desktop_right_column'} primaryText="Desktop Right Column" /> 
										<MenuItem value={'audience_network_banner'} primaryText="Audience Network Banner" /> 
										<MenuItem value={'audience_network_interstitial'} primaryText="Audience Network Interstitial" /> 
										<MenuItem value={'audience_network_native'} primaryText="Audience Network Native" /> 
							</SelectField>
						</div>
						<div className="ad-creatives-preview" ref="preview-main-wrapper">
							<AdPreview 
								headlinePreview={this.state.previewHeadline}
								imagePreview={imagePreview}
								textPreview={this.state.previewText}
								descriptionPreview={this.state.previewDescription}
								adType={this.state.selectedAdType}
							/>							
						</div>
					</div>
				</div>
					 <Dialog
							title="Oops..."
							modal={true}
							open={typeof this.state.showEmptyValuesModal === 'undefined' ? false : this.state.showEmptyValuesModal}
							actions={[
									<FlatButton
										label="Fix it!"
										primary={false}
										onTouchTap={this.props.onModalStay} />
									,
									<FlatButton
										label="continue"
										primary={false}
										onTouchTap={this.props.onModalLeave} />
							]}
							autoDetectWindowHeight={true}>
							<div className="on-image-upload-error">
								You have some empty fields in your creative ads!
							</div>
					</Dialog>
			</div>
		)
	}
}

export default AdCreatives;
