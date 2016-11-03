import React from 'react';
import UploadHiddenControl from 'components/Common/UploadHiddenControl';

class UploadButton extends React.Component {
	constructor(props) {
    	super(props);
		this.openUploadDialog = this.openUploadDialog.bind(this);
	}
	openUploadDialog() {
		this.refs.uploadControl.openUploadDialog();
	}
	render() {
		return (
			<button className="askem-button"
				onClick={this.openUploadDialog} >
				<UploadHiddenControl
					ref="uploadControl"
					accept={this.props.accept}
					onFileUpload={this.props.onFileUpload}
					/>
				{this.props.label || 'Upload'}
			</button>
		)
	}
}

UploadButton.propTypes = {
	accept: React.PropTypes.string,
	label: React.PropTypes.string,
	onFileUpload: React.PropTypes.func.isRequired
};

export default UploadButton;
