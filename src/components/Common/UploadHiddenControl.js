import React from 'react';

class UploadHiddenControl extends React.Component {
	constructor(props) {
    	super(props);
		this.openUploadDialog = this.openUploadDialog.bind(this);
		this.handleChange = this.handleChange.bind(this);
		const randomID = Math.random().toString(36).substr(2, 10);
		this.uploadElementID = randomID;
	}
	openUploadDialog() {
		document.getElementById(this.uploadElementID).click();
	}
	handleChange(e) {
		e.preventDefault();
		if (e.target.files < 1) { return; }
		const reader = new FileReader();
		const file = e.target.files[0];
		if (file) {
			reader.onload = (loadE) => {
				const dataURI = loadE.target.result;
				this.props.onFileUpload(dataURI);
			}
			reader.readAsDataURL(file);
		}
	}
	render() {
		return (
				<input type="file" id={this.uploadElementID}
					style={{display: 'none'}}
					accept={this.props.accept}
					onChange={this.handleChange} />
		);
	}
}

UploadHiddenControl.propTypes = {
	accept: React.PropTypes.string,
	onFileUpload: React.PropTypes.func.isRequired
};

export default UploadHiddenControl;
