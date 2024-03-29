const copyToClipboard = text => {
	const input = document.createElement('textarea');
	document.body.appendChild(input);
	input.value = (text);
	input.focus();
	input.select();
	document.execCommand('Copy');
	input.remove();
}

export default copyToClipboard;
