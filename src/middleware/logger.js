
window.actionsLog = [];
const logger = store => next => action => {
	action.t = new Date().toISOString();
	window.actionsLog.push(action);
	const result = next(action)
	return result
}

export default logger;
