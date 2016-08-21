import React from 'react';
import Spinner from 'react-spinkit';

const Loading = () =>
	<div className="spinner-loading">
		<Spinner spinnerName='three-bounce' noFadeIn />
	</div>;

export default Loading;
