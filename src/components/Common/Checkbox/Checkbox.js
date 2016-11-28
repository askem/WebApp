import React from 'react';
import { Checkbox as ICheckbox } from 'react-icheck';
// require('icheck/skins/square/red.css');
require('components/Common/Checkbox/askem-check.css');

const Checkbox = (props) =>
	// Silly bug in ICheckbox - if label string is empty, onChange is not emmitted properly
	<ICheckbox checkboxClass="icheckbox_askem" {...props}
		label={props.label || ' '} />;

export default Checkbox;
