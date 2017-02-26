import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const ImageContainer = (props) => {
	return (
		<div
			title={props.imageButtonLabel}
			style={{backgroundImage: `url('${props.imageURL}')`}}
			className="image-preview">
				<div className="image-action-buttons">
					<div className="adjust-image-div">
					<FlatButton
						label="Adjust Image"
						primary={false}
						onTouchTap={props.onAdjust}
					/>
					</div>
					<div className="change-image-div">
						<FlatButton
							label="Change Image"
							primary={false}
							onTouchTap={props.onChangeImage}
						/>
					</div>
				</div>
		</div>
	)
}

export default ImageContainer;
