import React from 'react';
import { Button } from 'react-bootstrap';
import intersection from 'utils/array/intersection';
import Question from 'components/Question/Question';

class ModelInputsWizard extends React.Component {
	constructor(props) {
    	super(props);
		this.moveFwd = this.moveFwd.bind(this);
		this.initWizard(props);
	}
	initWizard(props) {
		const kpis = props.research.kpis;
		const relevantQuestions = props.model.survey.questions.filter(
			q => q.kpis === null || intersection(q.kpis, kpis).length > 0);
		console.info(relevantQuestions);

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
			console.log(`for q ${q.questionID}: vars ${vars}`);
			console.log(vars);
			vars = vars.filter(v => !allVarNames.includes(v));
			console.log(vars);
			allVarNames = allVarNames.concat(vars);
			if (vars.length > 0) {
				//debugger;
				vars = vars.map(v => {
					console.info('v: ' + v);
					console.info(props.model.variables);
					return props.model.variables.find(va => va.id === v)
				});
				console.log(vars);
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
						{vars.map(v => <input key={`var_${v.id}`} type="text" value={v.name} />)}
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
	//toggleResearchKPI: React.PropTypes.func.isRequired
}

export default ModelInputsWizard;
