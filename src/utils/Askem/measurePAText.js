window.paTextCache = {};
const measurePAText = (textValue) => {
	if ($.trim(textValue) === '') { textValue = '&nbsp;'; }
	var result = window.paTextCache[textValue];
	if (result) {
		return result;
	}
	var elm = $('#measure-pa-text');
	if (!elm.length) {
		$('<div id="measure-pa-text" class="answer"/>')
		.appendTo(document.body)
		.wrap('<div id="measure-pa-text-container" class="question" style="visibility:hidden"><div class="question-photo" /></div>');
		elm = $('#measure-pa-text');
	}
	elm.html(textValue);
	result = {width: elm.outerWidth() + 8, height:elm.outerHeight()};
	window.paTextCache[textValue] = result;
	return result;
};

export default measurePAText;
