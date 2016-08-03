import React from 'react';
import { Button } from 'react-bootstrap';
import intersection from 'utils/array/intersection';
import KPISelector from 'components/Research/Brief/KPISelector'
import Question from 'components/Question/Question';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FaClose from 'react-icons/lib/fa/close';
import questionFromTemplate from 'utils/Askem/questionFromTemplate';
import extractTemplateVars from 'utils/Askem/extractTemplateVars';
import blobURL from 'utils/Askem/blobURL';
import FaArrowCircleORight from 'react-icons/lib/fa/arrow-circle-o-right';
import FaArrowCircleOLeft from 'react-icons/lib/fa/arrow-circle-o-left';


class TextVariable extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}
	onChange(event) {
		this.props.onValueChange(this.props.variable, event.target.value);
	}
	render() {
		return <TextField id={`${this.props.variable.id}_textfield`} hintText={this.props.variable.name} floatingLabelText={this.props.variable.name}
			value={this.props.value} onChange={this.onChange} />
	}
}
TextVariable.defaultProps = {
	value: ''
};

class TextArrayVariable extends React.Component {
	constructor(props) {
		super(props);
		this.clearErrorMessage = this.clearErrorMessage.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.state = {errorMessage: ''};
	}
	clearErrorMessage() {
		this.setState({errorMessage: ''})
	}
	onChange(idx, event) {
		const newText = event.target.value;
		if (newText.length > this.props.variable.validations.length) {
			console.warn('User error - Change: Fails validation for %o', this.props.variable);
			this.setState({
				errorMessage: `⚠️Maximum length should not exceed ${this.props.variable.validations.length}`
			});
		} else {
			let newVal = this.props.value.slice();
			newVal[idx] = newText;
			this.props.onValueChange(this.props.variable, newVal);
		}
	}
	onAdd() {
		let newVal = this.props.value.slice();
		newVal.push('');
		if (newVal.length > this.props.variable.validations.max) {
			console.warn('User error - Add: Fails validation for %o', this.props.variable);
			this.setState({
				errorMessage: `⚠️There can be only ${this.props.variable.validations.max} ${this.props.variable.name.toLowerCase()}`
			});
		} else {
			this.props.onValueChange(this.props.variable, newVal);
		}
	}
	onDelete(idx) {
		let newVal = this.props.value.slice();
		newVal.splice(idx, 1);
		if (newVal.length < this.props.variable.validations.min) {
			console.warn('User error - Delete: Fails validation for %o', this.props.variable);
			this.setState({
				errorMessage: `⚠️There must be at least ${this.props.variable.validations.min} ${this.props.variable.name.toLowerCase()}`
			});
		} else {
			this.props.onValueChange(this.props.variable, newVal);
		}
	}
	render() {
		const varID = this.props.variable.id;
		const hintTemplate = this.props.variable.hint || '';
		return <div>
			{this.props.value.map((text, idx) => {
				const hint = hintTemplate.replace('{{#}}', idx + 1);
				const boundChange = this.onChange.bind(this, idx);
				const boundDelete = this.onDelete.bind(this, idx);
				return <div key={`text_${idx}`}>
					<TextField id={`${varID}_textfield_${idx}`} value={text}
						hintText={hint} floatingLabelText={hint}
						onChange={boundChange} />
					<FlatButton onClick={boundDelete}><FaClose /></FlatButton>
				</div>;
				})
			}

			<FloatingActionButton mini={true} onClick={this.onAdd}>
				<ContentAdd />
			</FloatingActionButton>
			<Snackbar
	    		open={!!this.state.errorMessage}
				message={this.state.errorMessage}
				autoHideDuration={2000}
				onRequestClose={this.clearErrorMessage}
				/>
		</div>
	}
}
TextArrayVariable.defaultProps = {
	value: ['']
};

class ImageVariable extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}
	onChange(event) {
		//this.props.onValueChange(this.props.variable, event.target.value);
	}
	render() {
		const hasValue = this.props.value && this.props.value.mediaID;
		const imageURL = hasValue ? blobURL(this.props.value.mediaID) : '/images/emptyMediaID.png';
		let button;
		if (hasValue) {
			button = <FlatButton><FaClose /></FlatButton>;
		} else {
			button = <RaisedButton style={{marginLeft: 15}}>Upload</RaisedButton>;
		}
		return <div style={{paddingTop: 20}}>
			<div style={{paddingBottom: 5, fontSize: 12, fontWeight: 'bold', color: 'rgba(150, 101, 170, 0.498039)'}}>
				{this.props.variable.name}
			</div>
			<img style={{width: 100, height: 100}} src={imageURL} />
			{button}
		</div>;
	}
}
ImageVariable.defaultProps = {
	value: null
};

const WizardProgressButtons = (props) => {
	let goBackButton, goFwdButton;
	if (props.canGoBack) {
		goBackButton = <FlatButton style={{width: 30, minWidth: 30}} onClick={props.goBack}>
			<FaArrowCircleOLeft size={30}/>
		</FlatButton>
	}
	if (props.canGoFwd) {
		goFwdButton = <FlatButton style={{width: 30, minWidth: 30}} onClick={props.goFwd}>
			<FaArrowCircleORight size={30} />
		</FlatButton>
	}
	const style = Object.assign({}, {width: '70%', textAlign: 'right', marginRight: 'auto', marginLeft: 'auto'}, props.style);
	return <div style={style}>
		{goBackButton}
		{goFwdButton}
	</div>
}

class ModelInputsWizard extends React.Component {
	constructor(props) {
    	super(props);
		this.goFwd = this.goFwd.bind(this);
		this.goBack = this.goBack.bind(this);
		this.renderVariableInput = this.renderVariableInput.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
		this.initWizard(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.research.kpis.join(',') !== this.props.research.kpis.join(',')) {
			this.initWizard(nextProps);
		}
	}
	initWizard(props) {
		const kpis = props.research.kpis;
		const relevantQuestions = props.model.survey.questions.filter(
			q => q.kpis === null || intersection(q.kpis, kpis).length > 0);

		let variablesPerQuestion = {};
		let allVarNames = [];
		let allVars = [];
		relevantQuestions.forEach(q => {
			let qVars = extractTemplateVars(q.textValue);
			q.possibleAnswers.forEach(pa => {
				const paVars = extractTemplateVars(pa.textValue);
				qVars = qVars.concat(paVars);
			});
			qVars = qVars.concat(extractTemplateVars(q._imageFileName));

			qVars = qVars.filter(v => !allVarNames.includes(v));
			allVarNames = allVarNames.concat(qVars);
			if (qVars.length > 0) {
				qVars = qVars.map(v => {
					return props.model.variables.find(va => va.id === v)
				});
				allVars = allVars.concat(qVars);
				variablesPerQuestion[q.questionID] = qVars;
			}
		})

		this.variablesPerQuestion = variablesPerQuestion;
		this.allVariables = allVars;
		this.questions = relevantQuestions.filter(q => variablesPerQuestion[q.questionID] !== undefined);
		this.state = {
			questionIdx: -1
		};
	}
	goFwd() {
		let questionIdx = this.state.questionIdx;
		questionIdx++;
		this.setState({
			questionIdx
		})
	}
	goBack() {
		let questionIdx = this.state.questionIdx;
		questionIdx--;
		this.setState({
			questionIdx
		})
	}
	onValueChange(variable, value) {
		this.props.onModelVariableChange(this.props.researchID, variable.id, value);
	}
	renderVariableInput(v, value) {
		const key = `var_${v.id}`;
		switch (v.type) {
			case 'string':
			case 'category':
				return <TextVariable key={key} variable={v} value={value} onValueChange={this.onValueChange} />;
			case 'string[]':
				return <TextArrayVariable key={key} variable={v} value={value} onValueChange={this.onValueChange} />;
			case 'image':
				return <ImageVariable key={key} variable={v} value={value} onValueChange={this.onValueChange} />
			default:
				return <div key={key}>
					Unsupported type {v.type}
				</div>;
		}
	}
	render() {
		const questionIdx = this.state.questionIdx;
		if (questionIdx < 0) {
			return <div>
				<KPISelector {...this.props} selected={new Set(this.props.research.kpis)} />
				<WizardProgressButtons canGoFwd={true} goFwd={this.goFwd} />
			</div>;
		}
		if (questionIdx >= this.questions.length) {
			return <div>Done</div>;
		}
		const qTemplate = this.questions[questionIdx];
		const vars = this.variablesPerQuestion[qTemplate.questionID];
		const valueFinder = v => {
			let value = this.props.modelData.variableValues.find(val => val.id === v.id);
			if (value) { value = value.value; }
			return value;
		};
		const varValues = vars.map(valueFinder);
		const q = questionFromTemplate(qTemplate, this.allVariables, this.allVariables.map(valueFinder));
		return (
			<div>
				<div className="brief-wizard">
					<div className="inputs">
						<div className="pane" style={{width: '90%'}}>
							{vars.map((v, idx) => this.renderVariableInput(v, varValues[idx]))}
						</div>
						<WizardProgressButtons style={{width: '90%'}} canGoBack={true} canGoFwd={questionIdx < this.questions.length - 1}
							goFwd={this.goFwd} goBack={this.goBack} />
					</div>
					<div key={`q-${questionIdx}`}
						className="preview animated fadeIn"
						style={{animationDuration: '4s'}}>
						<Question question={q} />
					</div>
				</div>

			</div>
		);
	}
};

ModelInputsWizard.propTypes = {
	model: React.PropTypes.object.isRequired,
	modelData: React.PropTypes.object.isRequired,
	researchID: React.PropTypes.string.isRequired,
	research: React.PropTypes.object.isRequired,
	onModelVariableChange: React.PropTypes.func.isRequired
}

export default ModelInputsWizard;
