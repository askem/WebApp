import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FaClose from 'react-icons/lib/fa/close';

const XButton = (props) => {
	// height: 30
	const style = Object.assign({minWidth: 20, lineHeight: 0, height: 'auto'}, props.style);
	return <FlatButton
		onClick={props.onClick}
		style={style}
		icon={<FaClose />} />;
};
export default XButton;
