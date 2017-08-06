import React, {PropTypes} from 'react';
import Cropper from 'react-cropper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import 'cropperjs/dist/cropper.css';
import { calculateAspectRatio, isAspectRatioValid, getImageData } from 'utils/imageUtils';
import Slider from 'material-ui/Slider';

class ImageCropper extends React.Component {
	constructor(props) {
		super(props);
		this.cancelCrop = this.cancelCrop.bind(this);
		this.onCropComplete = this.onCropComplete.bind(this);
		this.onZoom = this.onZoom.bind(this);
		this.onReady = this.onReady.bind(this);

		this.state = {
			show : this.props.show,
			cropResult : null,
			zoomValue : 1,
			scalePercentage : null
		}
	}

	onCropComplete() {
		const croppedData = this.cropper.getData();
		const { height, width, x, y } = croppedData;
		const dataURI = this.props.imageUrl;
		const croppedMetaData = {
			height,
			width,
			x,
			y,
			zoomRatio : this.state.zoomValue,
			dataURI 
		}

		getImageData(croppedMetaData)
			.then(data => {
				const croppedImage = new Image();
				croppedImage.src = data.dataURI;

				const originalImage = new Image();
				originalImage.src = this.props.imageUrl;

				this.setState({
					show:false
				});

				//croppedMetaData.dataURI = data.dataURI;
				this.props.onUpload(croppedImage, originalImage, croppedMetaData);
			})
			.catch(err => {
				console.error('onCropComplete in imageCropper.js -->', err)
			});
	}

	cancelCrop() {
		this.setState({
			show : false
		});

		this.props.onCancel();
	}


	onZoom(event, value) {
		let currentZoomValue;
		let zoomRatio;

		if (value === 1) {
			this.cropper.zoomTo(0);
		}
		else {
			currentZoomValue = this.state.zoomValue;
			zoomRatio = value - currentZoomValue;
			this.cropper.zoom(zoomRatio);
		}

		this.setState({ zoomValue : value});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ show : nextProps.show});
	}

	onReady() {
		let cropBoxData = {
			width:null,
			height:null,
			top:0,
			// left:0
		};

		const imageData = this.cropper.getImageData();
		const { naturalWidth, naturalHeight } = imageData;
		let scalePercentage;

		if (this.props.requiredAspectRatio === 1) {
			if (naturalWidth > naturalHeight) {
				cropBoxData.width = cropBoxData.height = naturalHeight;
			}
			else if (naturalWidth <= naturalHeight) {
				cropBoxData.width = cropBoxData.height = naturalWidth;
			}
		}
		else {
			if (naturalWidth > naturalHeight) {
				cropBoxData.width = naturalHeight * this.props.requiredAspectRatio;
				cropBoxData.height = naturalHeight;
			}
			else {
				cropBoxData.width = naturalWidth;
				cropBoxData.height = naturalWidth/this.props.requiredAspectRatio; 
			}
		}

		const containerData = this.cropper.getContainerData();

		// if image size is greater than the bounds of the container
		if (naturalWidth > containerData.width || naturalHeight > containerData.height) {
			if (naturalWidth > naturalHeight) {
				scalePercentage = (containerData.height/naturalHeight);
			}
			else if (naturalWidth > containerData.width) {
				if (cropBoxData.height > containerData.height || cropBoxData.width > containerData.height){
					scalePercentage = containerData.height/naturalHeight;
				}
				else {
					scalePercentage = (containerData.width/naturalWidth);
				}
			}
			else {
				scalePercentage = (containerData.height/naturalHeight);
			}
		}
		else {
			scalePercentage = 1;
		}

		this.cropper.setCanvasData({
			width:naturalWidth,
			height:naturalHeight
		});


		this.cropper.setCropBoxData(cropBoxData);
		// this.cropper.zoomTo(scalePercentage);
		this.cropper.zoomTo(0);

		this.setState({
			scalePercentage
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.show !== nextProps.show) {
			return true;
		}

		return false;
	}

	render() {
		const actions = [
			<FlatButton
				label="Ok"
				primary={false}
				onTouchTap={this.onCropComplete} />,
			<FlatButton
				label="Cancel"
				primary={false}
				onTouchTap={this.cancelCrop} />
		];

		let contentStyle = {
			width: '800px',
			maxWidth: 'none',
			height:'calc(100% - 220px)',
			overflow:'auto',
			transform:'translate(0px)'
		}

		let cropperContainerStyle = {};
		 if (window.devicePixelRatio === 1.25) {
		//  	contentStyle.height = '600px';
			cropperContainerStyle.height = '400px';
			cropperContainerStyle.maxHeight = '400px';
		 }

		return (
			<Dialog
				title="Crop Image"
				modal={true}
				open={this.state.show}
				actions={actions}
				autoDetectWindowHeight={false}
				contentStyle={contentStyle}>
				<div className="image-cropper-container" style={cropperContainerStyle}>
					<Cropper
						guides={true}
						src={this.props.imageUrl}
						aspectRatio={this.props.requiredAspectRatio}
						ref={cropper => { this.cropper = cropper }}
						zoomOnWheel={false}
						cropBoxResizable={false}
						viewMode={1}
						dragMode={'move'}
						movable={true}
						cropBoxMovable={false}
						ready={this.onReady}
						checkCrossOrigin={false}
						background={false}
						width={600}
						restore={true}
						responsive={true}
					/>
				</div>
				<div className="cropper-slider">
					<Slider
						min={1}
						max={3}
						value={1}
						defaultValue={1}
						onChange={this.onZoom}
						style={{width:'600px'}}
					/>
				</div>
		</Dialog>
		);
	}
}

ImageCropper.propTypes = {
};


export default ImageCropper;
