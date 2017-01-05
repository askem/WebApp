import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import MdHighlightRemove from 'react-icons/lib/md/highlight-remove';

const XButton = (props) => {
	// height: 30
	const style = Object.assign({minWidth: 20, lineHeight: 0, height: 30}, props.style);
	return <FlatButton
		onClick={props.onClick}
		style={style}
		icon={<MdHighlightRemove size={23}/>}
		{...props} />;
};
export default XButton;
