import React from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import blobURL from 'utils/Askem/blobURL';

const MiniQuestion = SortableElement((props) => (
	<div className={`mini-question ${props.selected ? 'selected' : ''}`}
		onClick={props.selected ? null : ()=> {props.onQuestionClick(props.question.questionID)}}>
		<img
			style={{objectFit: 'cover'}}
			src={blobURL(props.question.mediaID)}
			alt={`Question ${props.question.questionID + 1} Image`} />
		<div>Question {props.question.questionID + 1}</div>
	</div>
));

const SortableStrip = SortableContainer((props) => {
	return <div className="questions-grid">
		{props.questions.map(q => <MiniQuestion
			key={`miniq-${q.questionID}`}
			index={q.questionID}
			question={q}
			selected={props.selectedQuestion === q.questionID}
			onQuestionClick={props.onSelectQuestion} />
		)}
	</div>;
});

class QuestionsStrip extends React.Component {
	constructor(props) {
    	super(props);
		this.onSortEnd = this.onSortEnd.bind(this);
	}
	onSortEnd({oldIndex, newIndex}) {
		if (oldIndex !== newIndex) {
			this.props.swapQuoteQuestions(oldIndex, newIndex);
		}
		this.props.onSelectQuestion(newIndex);
	}
	render() {
		return <SortableStrip
			axis="x" distance={1} helperClass="dragging"
			onSortEnd={this.onSortEnd} {...this.props} />;
	}
}

QuestionsStrip.propTypes = {
	questions: React.PropTypes.array,
	selectedQuestion: React.PropTypes.number,
	onSelectQuestion: React.PropTypes.func
};

export default QuestionsStrip;
