const blobURL = (mediaID, container = 'askemstorage') => {
	if (!mediaID) { return '/images/emptyMediaID.png'; }
	if (mediaID.startsWith('https://') ||
		mediaID.startsWith('data:') ||
		mediaID.startsWith('//')) {
			return mediaID;
	}
	return `//az414181.vo.msecnd.net/${container}/${mediaID}`;
}

export default blobURL;
