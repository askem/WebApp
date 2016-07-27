import React from 'react';
import { Button } from 'react-bootstrap';
import intersection from 'utils/array/intersection';
import Question from 'components/Question/Question';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FaClose from 'react-icons/lib/fa/close';

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
		this.onChange = this.onChange.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.state = {errorMessage: ''};
	}
	onChange(idx, event) {
		const newText = event.target.value;
		if (newText.length > this.props.variable.validations.length) {
			console.error('Change: Fails validation for %o', this.props.variable);
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
			console.error('Add: Fails validation for %o', this.props.variable);
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
			console.error('Delete: Fails validation for %o', this.props.variable);
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
				/>
		</div>
	}
}
TextArrayVariable.defaultProps = {
	value: ['']
};

class ModelInputsWizard extends React.Component {
	constructor(props) {
    	super(props);
		this.moveFwd = this.moveFwd.bind(this);
		this.renderVariableInput = this.renderVariableInput.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
		this.initWizard(props);
	}
	initWizard(props) {
		const kpis = props.research.kpis;
		const relevantQuestions = props.model.survey.questions.filter(
			q => q.kpis === null || intersection(q.kpis, kpis).length > 0);

		const varRegex = /{{(.+?)}}/g;
		const extractVariables = (s) => {
			const matches = s.match(varRegex);
			if (matches) {
				return matches.map(s => s.slice(2, -2));
			} else {
				return [];
			}
		}

		let variablesPerQuestion = {};
		let allVarNames = [];
		relevantQuestions.forEach(q => {
			let vars = extractVariables(q.textValue);
			vars = vars.concat(extractVariables(q.mediaID));
			q.possibleAnswers.forEach(pa => {
				const paVars = extractVariables(pa.textValue);
				vars = vars.concat(paVars);
			});
			vars = vars.filter(v => !allVarNames.includes(v));
			allVarNames = allVarNames.concat(vars);
			if (vars.length > 0) {
				vars = vars.map(v => {
					return props.model.variables.find(va => va.id === v)
				});
				variablesPerQuestion[q.questionID] = vars;
			}
		})

		this.variablesPerQuestion = variablesPerQuestion;
		this.questions = relevantQuestions.filter(q => variablesPerQuestion[q.questionID] !== undefined);
		this.state = {
			questionIdx: 0
		};
	}
	moveFwd() {
		this.setState({
			questionIdx: this.state.questionIdx + 1
		})
	}
	onValueChange(variable, value) {
		this.props.onModelVariableChange(this.props.researchID, variable.id, value);
	}
	renderVariableInput(v) {
		const key = `var_${v.id}`;
		let value = this.props.modelData.variableValues.find(val => val.id === v.id);
		if (value) { value = value.value; }

		switch (v.type) {
			case 'string':
			case 'category':
				return <TextVariable key={key} variable={v} value={value} onValueChange={this.onValueChange} />;
			case 'string[]':
				return <TextArrayVariable key={key} variable={v} value={value} onValueChange={this.onValueChange} />;
			default:
				return <div key={key}>
					Unsupported type {v.type}
				</div>;
		}
	}
	render() {
		if (this.state.questionIdx >= this.questions.length) {
			return <div>Done</div>;
		}
		const q = this.questions[this.state.questionIdx];
		const vars = this.variablesPerQuestion[q.questionID];
		return (
			<div>
				<div className="brief-wizard">
					<div className="inputs">
						{vars.map(v =>this.renderVariableInput(v))}
					</div>
					<div className="preview">
						<Question question={q} />
					</div>
				</div>
				<Button onClick={this.moveFwd}>Next</Button>
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
