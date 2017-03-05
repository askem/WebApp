import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import XButton from 'components/Common/XButton';
import FaRefresh from 'react-icons/lib/fa/refresh';
import blobURL from 'utils/Askem/blobURL';
import ImageUpload from 'components/Common/ImageUpload';

class AdCreatives extends React.Component {
	constructor(props) {
		super(props);

		this.addHeadlineField = this.addHeadlineField.bind(this);
		this.addTextField = this.addTextField.bind(this);
		this.addDescriptionField = this.addDescriptionField.bind(this);
		this.onTextFieldChange = this.onTextFieldChange.bind(this);
		this.refreshPreview = this.refreshPreview.bind(this);
		this.onUpload = this.onUpload.bind(this);

		this.state = {		
			previewImage : null,
			previewHeadline : null,
			previewText : null,
			previewDescription : null
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
		const min = 0;
		const max = arr.length - 1;
		
		let isImage = originalValue === Object(originalValue);
		let newRandomValue;

		if (!isImage) {
			newRandomValue = originalValue || '';
			while (newRandomValue === originalValue || newRandomValue === '') {
				let randomNumber = Math.floor(Math.random()*(max-min+1)+min);
				newRandomValue= arr[randomNumber];
			}
		}
		else {
			// const originalIndex = arr.findIndex(item => {
			// 	item.mediaID === originalValue.mediaID && item['crop191x100'][0][0] === originalValue['crop191x100'][0][0] &&
			// 	 item['crop191x100'][0][1] === originalValue['crop191x100'][0][1] && 

			
			
			// 	item === originalValue
			// });

			const originalIndex = arr.findIndex(item => item === originalValue);
			
			let newIndex = originalIndex;
			while (newIndex === originalIndex) {
			 	let randomNumber = Math.floor(Math.random()*(max-min+1)+min);
			 	newIndex = randomNumber;
			}

			newRandomValue = newIndex;
		}

		return newRandomValue;
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
		// let previewHeadline, previewText, previewDescription, previewImage 
		let { headlines = [], texts = [], descriptions = [], images =[]} = (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.imageAdCreatives) || {};

		previewHeadline = this.getRandomElementFromArr(headlines, previewHeadline);
		previewText = this.getRandomElementFromArr(texts, previewText);
		previewDescription = this.getRandomElementFromArr(descriptions, previewDescription);
		previewImage = this.getRandomElementFromArr(images, previewImage);

		this.setState({
			previewHeadline,
			previewText,
			previewDescription,
			previewImage
		});
	}

	componentWillMount() {
		let headline_preview, text_preview, description_preview, imagePreview;
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
				imagePreview = this.getRandomElementFromArr(this.props.surveyMetadata.adCreatives.imageAdCreatives.images, this.state.previewImage);
				hasAtLeastOneItem = true;
			}
			
		}

		if (hasAtLeastOneItem) {
			this.setState({
				previewHeadline : headline_preview,
				previewText : text_preview,
				previewDescription : description_preview,
				// previewImage : {
				// 	mediaID : '6d074a8c-6f4e-40b6-86e2-de1c47483513' // -->  TODO: this is fake image!!!!
				// } 
				previewImage : imagePreview
			})
		}
	}

	deleteImage(index) {
		this.props.deleteCreativeImage(index);
	}

	onUpload(croppedImage, originalImage, metadata) {
		// this is 'fake' or mock data
		//-------------------------------------
		// const metadata = {
		// 			"crop191x100" : [[0, 0], [954, 499]],
		// 			"mediaID" : "6d074a8c-6f4e-40b6-86e2-de1c47483513"
		// };

		// const index = 0;
		// //-------------------------------------
		
		const imageMetadata = {
			"crop191x100" : [
				[metadata.x, metadata.y],
				[metadata.x + metadata.width, metadata.y + metadata.height]
			],
			"mediaID" : metadata.mediaID || null
		}


		debugger;
		let { images }  = (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.imageAdCreatives) || {};
		const index = images ? images.length : 0;
		this.props.addCreativeImage(index, imageMetadata);
	}


	render() {
		const { headlines = [], texts = [], descriptions = [], images = []} = (this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.imageAdCreatives) || {};
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


		/******************************/	 
		/*	mock data 			
			replace afake_images with 
			the real images array	
		/******************************/	 
		// const fake_images = [
		// 	{
		// 			"crop191x100" : [[0, 0], [954, 499]],
		// 			"mediaID" : "6d074a8c-6f4e-40b6-86e2-de1c47483513"
		// 	},
		// 	{
		// 			"crop191x100" : [[545, 1025], [1499, 1524]],
		// 			"mediaID" : "a35f46e1-a0c9-49fd-9e8b-e335bd4d6d5e"
		// 	}
		// ]
		// this.props.surveyMetadata.adCreatives.imageAdCreatives.images = fake_images;
		// //this.setState()

		//const { images } = this.props.surveyMetadata.adCreatives && this.props.surveyMetadata.adCreatives.imageAdCreatives || {};

		debugger;

		let imagesArr = images.map((image, index) => {
			return (
				<div key={image.mediaID} style={{ marginRight:10 + 'px'}}>
					<img src={blobURL(image.mediaID)}  width="120" height="62"/>
					<span style={{ position:'relative', top:-33 + 'px', left:-9 + 'px' }}>
						<XButton onClick={() => this.deleteImage(index)} />
					</span>
				</div>
			)
		})

		let imagePreview;
		if (!this.state.previewImage) {
			imagePreview = <img src="../images/emptyMediaID.png" width="474" height="248" />
		}
		else {
			const linkToImage = blobURL(this.props.surveyMetadata.adCreatives.imageAdCreatives.images[this.state.previewImage].mediaID);
			imagePreview = <img src={linkToImage} width="474" height="248"/>
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
						<div className="ad-creatives-array-container" style={{ display:'flex' }}>
							<div className="image-upload-container">
								<ImageUpload
									ref="imageUploadControl"
									onUpload={this.onUpload}
									requiredAspectRatio={1.91}
									aspectRatioTolerance={0} />
							</div>
							{ imagesArr }
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
