import AGE_GROUPS from 'constants/AGE_GROUPS';
const consolidateAgeGroups = (groups) => {
	let currentRangeStart, currentRangeEnd;
	let contiguousRanges = [];
	AGE_GROUPS.map(group => {
		let range = group.id.split('-');
		let groupRange, rangeStart, rangeEnd;
		if (range.length === 2) {
		 	rangeStart = Number(range[0]);
			rangeEnd = Number(range[1]);
			groupRange = [rangeStart, rangeEnd];
		} else {
			range = group.id.split('+');
			rangeStart = Number(range[0]);
			groupRange = [group.id];
		}
		if (groups.indexOf(group.id) > -1) {
			if (contiguousRanges.length === 0) {
				contiguousRanges.push(groupRange);
			} else {
				const lastRangeEnd = contiguousRanges[contiguousRanges.length - 1][1];
				if (lastRangeEnd + 1 === rangeStart) {	// contiguous
					if (rangeEnd) {
						contiguousRanges[contiguousRanges.length - 1][1] = rangeEnd;
					} else {
						// reached the end - show as '...-65+';
						contiguousRanges[contiguousRanges.length - 1][1] = group.id;
					}
				} else {	// Non-contiguous
					contiguousRanges.push(groupRange)
				}
			}
		}

	});
	const text = contiguousRanges.map(r => r.join('-')).join(', ');
	return text;
}

export default consolidateAgeGroups;
