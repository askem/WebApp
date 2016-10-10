import React from 'react';
import Spinner from 'react-spinkit';

const Loading = (props) =>
	<div className={props.className === undefined ? "spinner-loading" : props.className}>
		<Spinner spinnerName='three-bounce' noFadeIn />
	</div>;

export default Loading;
