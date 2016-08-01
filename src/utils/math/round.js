const round = (number, decimals) => {
	return +(Math.round(number + "e+" + decimals) + "e-" + decimals);
}

export default round;
