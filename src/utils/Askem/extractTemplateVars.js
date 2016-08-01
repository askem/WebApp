const varRegex = /{{(.+?)}}/g;
const extractTemplateVars = (s) => {
	const matches = s.match(varRegex);
	if (matches) {
		return matches.map(s => s.slice(2, -2));
	} else {
		return [];
	}
}

export default extractTemplateVars;
