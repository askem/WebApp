import React from 'react';

const AskemUserText = (props) => {
	let textValue = '';
	if (props.children) {
		textValue = props.children.toString();
	}
	return <div dir="auto" style={{ color:'#FFF' }}>{textValue}</div>
};

// const AskemUserText = React.createClass({
// 	getInitialState () {
// 		return {
// 			textDirection: 'auto'
// 		};
// 	},
// 	componentDidMount() {
// 		if (Askem.env.isMSIE) {
// 			if (Askem.env.BidiPatterns.ltr.test(ReactDOM.findDOMNode(this))) {
// 				this.setState({textDirection: 'rtl'});
// 			}
// 		}
// 	},
// 	rawMarkup() {
// 		const textValue = this.props.children.toString();
// 		const rawMarkup = Askem.parseMarkdown(textValue);
// 		return { __html: rawMarkup };
// 	},
// 	render() {
// 		return <div {...this.props} dir={this.state.textDirection}>
// 			<span dangerouslySetInnerHTML={this.rawMarkup()} />
// 		</div>;
//  	}
// });

export default AskemUserText;
