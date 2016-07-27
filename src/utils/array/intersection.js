import concat from 'utils/array/concat';

const intersection = (...arrs) => {
	let newArr = [];

	concat(...arrs).forEach((item, index) => {
		concat(...arrs).forEach((newItem, newIndex) => {
			let isOtherIndex = index !== newIndex;
			let isOtherItem = item === newItem;
			let notExist = newArr.indexOf(newItem) < 0;
			(isOtherIndex && isOtherItem && notExist) && (newArr.push(newItem));
		});
 	});
	return newArr;
};

export default intersection;
