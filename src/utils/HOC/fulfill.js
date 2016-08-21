import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from 'components/Common/Loading';

/// A HOC to manage verifying existance of required data and loading if necessary
const fulfill = (Comp, requiredProps, uniqueProps, loadData) => {
	return class DataRequirementHOC extends React.Component {
		constructor(props, context) {
			super(props, context);
			this.loadWithProps = this.loadWithProps.bind(this);
		}
		// getRef(instance) {
		// 	this._instance = instance;
		// }
		componentWillMount() {
			this.loadWithProps();
		}
		componentWillReceiveProps(nextProps) {
			const hasMeaningfulDiffs = uniqueProps.some(
				p => nextProps[p] !== this.props[p]);
			if (hasMeaningfulDiffs) {
				loadData(nextProps)
			}
		}
		loadWithProps() {
			loadData(this.props);
		}
		render() {
			let loadingFail, loadingError;
			const missingData = requiredProps.some(reqProp => {
				const prop = this.props[reqProp];
				if (!prop) { return true; }
				if (prop.loadingFail) {
					loadingError = prop.loadingError;
					loadingFail = true;
					return true;
				}
			});
			if (loadingFail) {
				return <div>
					<h1>Loading Error!</h1>
					<h3>{loadingError || ''}</h3>
					<RaisedButton onClick={this.loadWithProps}>Retry</RaisedButton>
				</div>;
			}
			if (missingData) {
				return <Loading />;
			}
			// const props = Object.assign({}, this.props, {ref: this.getRef.bind(this)})
			// return <Comp {...props}/>;
			return <Comp {...this.props} />;
		}
	}
}

export default fulfill;
