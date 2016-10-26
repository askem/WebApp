import React from 'react';
import { Checkbox as ICheckbox } from 'react-icheck';
// require('icheck/skins/square/red.css');
require('components/Common/Checkbox/askem-check.css');

const Checkbox = (props) =>
	<ICheckbox checkboxClass="icheckbox_askem" {...props} />;

export default Checkbox;
