import React, {PropTypes} from 'react';
import UploadHiddenControl from 'components/Common/UploadHiddenControl';
import { calculateAspectRatio, isAspectRatioValid } from 'utils/imageUtils';
import ImageCropper from 'components/Editor/ImageCropper';
import blobURL from 'utils/Askem/blobURL';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class ImageUpload extends React.Component {
	constructor(props) {
		super(props);
		this.onImageUploadComplete = this.onImageUploadComplete.bind(this);
		this.openUploadDialog = this.openUploadDialog.bind(this);
		this.onCropComplete = this.onCropComplete.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.imageDimentionsAreValid = this.imageDimentionsAreValid.bind(this);
		this.closeErrorDialog = this.closeErrorDialog.bind(this);

		this.state = {
			showCropper : false,
			uploadError : false,
			showErrorDialog : false
		}
	}	

	onImageUploadComplete(dataURI) {
		const img = new Image();
		img.src= dataURI;
		img.onload = (img) => {
			const { width, height } = img.target;
			const validImage = this.imageDimentionsAreValid(width, height);
			if (!validImage) {
				this.setState({uploadError : true, showErrorDialog:true})
				return;
			}

			const currentAspectRatio = calculateAspectRatio(img.target);
			const aspectRatioValid = isAspectRatioValid(currentAspectRatio, this.props.requiredAspectRatio, this.props.aspectRatioTolerance);

			let stateObj;
			if (!aspectRatioValid) {
				stateObj = {
					showCropper : true,
					imageUrl : dataURI,
					imageWidth: img.target.width,
					imageHeight: img.target.height
				}
			}
			else {
				stateObj = { showCropper : false };
				this.props.onUpload(null, img.target, null);
			}

			this.setState(stateObj);
		}
	}

	imageDimentionsAreValid(width, height) {
		const { minWidth, minHeight } = this.props;
		if (!minWidth && !minHeight) {
			return true;
		}

		if (minWidth && minHeight) {
			return (width >= minWidth && height >= minHeight);
		}
		else if (minWidth) {
			return (width >= minWidth);
		} 
		else if (minHeight) {
			return (height >= minHeight);
		}
	}


	onCropComplete(croppedImage, originalImage, croppedMetaData) {
		croppedMetaData.useCroppedImage = this.state.useCroppedImage;
		this.setState({ showCropper:false, useCroppedImage:false });
		this.props.onUpload(croppedImage, originalImage, croppedMetaData);
	}

	openUploadDialog() {
		this.refs.uploadControl.openUploadDialog();
	}

	showCropper(mediaID, useCroppedImage) {
		const imageUrl = blobURL(mediaID);
		
		this.setState({
			showCropper:true,
			imageUrl,
			useCroppedImage
		});
	}


	onCancel() {
		this.setState({ showCropper:false, useCroppedImage:false });
	}

	closeErrorDialog() {
		this.setState({ showErrorDialog : false, useCroppedImage:false})
	}

	render() {
		let errorDiv = '';
		if (this.state.uploadError) {
			const actions = [
				<FlatButton
					label="ok"
					primary={false}
					onTouchTap={this.closeErrorDialog} />
			]

			let text = 'Please upload a diffrent image';
			if (this.props.minWidth ) {
				if (this.props.minHeight)	 {
					text += ` with minimum width of ${this.props.minWidth}px and minimum height of ${this.props.minHeight}px`;
				}
				else {
					text += ` with minimum width of ${this.props.minWidth}px`;
				}
			}
			else {
				text += ` with minimum height of ${this.props.minHeight}px`;
			}


			errorDiv = <Dialog
				title="Image is too small!"
				modal={true}
				actions={actions}
				open={this.state.showErrorDialog}
				autoDetectWindowHeight={true}>
					<div className="on-image-upload-error">
						The image you have uploaded is too small!
						<br/>
						{ text }
					</div>
			</Dialog>
		}

		return (
			<div>
				{ errorDiv }
			
				<UploadHiddenControl ref="uploadControl"
				accept="image/jpeg, image/png"
				onFileUpload={this.onImageUploadComplete}	/>

				<ImageCropper
						show={this.state.showCropper}
						imageUrl={this.state.imageUrl}
						onUpload={this.onCropComplete}
						requiredAspectRatio={this.props.requiredAspectRatio}
						tolerance={this.props.aspectRatioTolerance }
						imageWidth={this.state.imageWidth}
						imageHeight={this.state.imageHeight}
						onCancel={this.onCancel}
				/>
			</div>
		);
	}
}

ImageUpload.propTypes = {
	onUpload : React.PropTypes.func.isRequired,
	requiredAspectRatio : React.PropTypes.number.isRequired,
	aspectRatioTolerance: React.PropTypes.number,
	minWidth: React.PropTypes.number,
	minHeight: React.PropTypes.number
};


export default ImageUpload;
