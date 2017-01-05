import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import blobURL from 'utils/Askem/blobURL';
import { POPUP_ARRANGEMENT_DEFAULT, AutomaticPopupArrangementTypes } from 'utils/Askem/AutoArrangement';
import XButton from 'components/Common/XButton';

class VariantsEditor extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			
		};
	}
	render() {
		const actions = [
			/*<FlatButton
		        label="Export"
		        secondary={true} labelStyle={{color: 'black'}}
			/>,
			<FlatButton
		        label="Import"
		        secondary={true} labelStyle={{color: 'black'}}
			/>,*/
			<FlatButton
		        label="Close"
		        onTouchTap={this.props.closeVariantsEditor}
				
			/>
		];
		const q = this.props.question;
		const questionID = q.questionID;
		const variants = (this.props.surveyMetadata.questionsVariants
			.find(qv => qv.questionID === questionID)).variants;
		return (
			<Dialog title={`Question ${questionID + 1} Variants`}
				actions={actions}
				contentStyle={{width: 1100, maxWidth: 'none'}}
				onRequestClose={this.props.closeVariantsEditor}
				modal={false} open={true}>
			<Table selectable={false}>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn style={{width: 60}}>Variant</TableHeaderColumn>
						<TableHeaderColumn style={{width: 60}}>Image</TableHeaderColumn>
						<TableHeaderColumn>Question</TableHeaderColumn>
						<TableHeaderColumn style={{width: 120}}>Arrangement</TableHeaderColumn>
						{q.possibleAnswers.map((pa, idx) => 
							<TableHeaderColumn key={`header-pa-${idx}`}>Answer {idx + 1}</TableHeaderColumn>)}
						<TableHeaderColumn ></TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{variants.map(v => {
					const selectedPopupsArangement = AutomaticPopupArrangementTypes.find(type => type.title === v.paArrangement).id;
	  				return <TableRow key={`variant-${v.ID}`} style={{borderBottom: 'none'}}>
						<TableRowColumn style={{width: 60}}>{String.fromCharCode(65 + v.ID)}</TableRowColumn>
						<TableRowColumn style={{width: 60}}>
							<img style={{width: 20, height: 20}} src={blobURL(v.mediaID)} />
						</TableRowColumn>
						<TableRowColumn>
							<TextField id={`variant-${v.ID}-qtext`} value={v.textValue}
								onChange={(e) => this.props.setQuoteQuestionText(questionID, e.target.value, v.ID)} />
						</TableRowColumn>
						<TableRowColumn style={{width: 120}}>
							<select value={selectedPopupsArangement}
								onChange={(e) => this.props.setQuoteQuestionAutoArrangement(questionID, Number(e.target.value), v.ID)}>
								{AutomaticPopupArrangementTypes.map(arrangement => <option value={arrangement.id} key={`paArrangement-${arrangement.id}`}>
									{arrangement.title}
								</option>)}
							</select>
						</TableRowColumn>
						{v.paTextValues.map((paText, paIdx) => <TableRowColumn key={`variant-${v.ID}-patext-${paIdx}`}>
							<TextField id={`variant-${v.ID}-patext-${paIdx}`} value={paText} 
								onChange={(e) => this.props.setQuotePossibleAnswerText(questionID, paIdx, e.target.value, v.ID)} /> />
						</TableRowColumn>)}
						<TableRowColumn >
							<XButton onClick={()=> this.props.deleteVariant(v.ID)}/>
							<FlatButton label="Duplicate"
								onClick={()=> this.props.addVariant(v.ID)} />	
						</TableRowColumn>
					</TableRow>
					})}
				</TableBody>
			</Table>
			</Dialog>
		)
	}
}

VariantsEditor.propTypes = {
	closeVariantsEditor: React.PropTypes.func.isRequired,
	addVariant: React.PropTypes.func.isRequired,
	deleteVariant: React.PropTypes.func.isRequired,
	question: React.PropTypes.object.isRequired,
};

export default VariantsEditor;
