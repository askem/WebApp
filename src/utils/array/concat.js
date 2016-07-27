const concat = (...arrs) => {
	let newArr = [];
	arrs.forEach(arr => arr.forEach(i => newArr.push(i)));
	return newArr;
};

export default concat;
