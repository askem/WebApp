const calculateAspectRatio = (img) => {
	const { width, height } = img;
	return parseFloat(width/height);
}

const isAspectRatioValid = (aspectRatio, requireAspectRatio = 1, permittedMargin = 0.02) => {
	let actualMargin = requireAspectRatio - aspectRatio;
	actualMargin = actualMargin < 0 ? actualMargin*-1 : actualMargin;
	return actualMargin <= permittedMargin ? true : false;
}

const getImageData = (metaData) => {
	let canvas = document.querySelector('#tempCanvas');
	if (!canvas) {
		canvas = document.createElement('canvas');
		canvas.id = 'tempCanvas';
	}

	const { width , height, x, y, zoomRatio, questionID, extraData = null } = metaData;
	const context = canvas.getContext('2d');
	context.clearRect(0, 0, width, height);
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

	let img = new Image();
	return new Promise((resolve, reject) => {
		img.addEventListener('load', () => {
			const { width:actualImageWidth, height:actualImageHeight } = img;
			let url = '';

			try {
				context.drawImage(
					img,
					x, y,
					actualImageWidth, actualImageHeight,
					0, 0,
					actualImageWidth, actualImageHeight
				);

				url = canvas.toDataURL('image/jpeg', 0.85);
				resolve({
					dataURI : url,
					width,
					height,
					questionID,
					extraData
				})
			}
			catch(e) {
				console.error('e',e);
				reject({
					error : e,
					dataURI : '',
					questionID

				})
			}
		});

		img.crossOrigin = '';
		img.src = metaData.dataURI;
	});
}

export { calculateAspectRatio, isAspectRatioValid, getImageData }
