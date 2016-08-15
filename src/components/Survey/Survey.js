import React from 'react';
import Question from 'components/Question/Question'
import SurveyEnding from 'components/Survey/SurveyEnding';
import TimeoutTransitionGroup from 'timeout-transition-group';

class Survey extends React.Component {
	constructor(props) {
    	super(props);
		this.preloadImages = this.preloadImages.bind(this);
		this.singleVote = this.singleVote.bind(this);
		this.multiVote = this.multiVote.bind(this);
		this.moveForwardFromPA = this.moveForwardFromPA.bind(this);
		this.moveForward = this.moveForward.bind(this);
		this.getDefaultEnding = this.getDefaultEnding.bind(this);
		const currentEntity = props.initialEntity || props.survey.connections.start
		this.state = {
			currentEntity
		};
	}
	preloadImages(questions) {
		if (questions === null) { return; }
		for (const q in questions) {
			$('<img />').attr('src', q.questionImageURL).appendTo('body').css('display','none');
		}
	}
	componentDidMount() {
		this.preloadImages(this.props.questions);
	}
	componentWillUpdate(nextProps, nextState) {
		if (this.props.questions !== nextProps.questions) {
			this.preloadImages(nextProps.questions);
		}
	}
	singleVote(questionID, sourcePAID, textValue, numericValue) {
		if (this.props.onSingleVote) {
			this.props.onSingleVote(questionID, sourcePAID, textValue, numericValue);
		}
		this.moveForwardFromPA(questionID, sourcePAID);
	}
	multiVote(questionID, answers) {
		if (this.props.onMultiVote) {
			this.props.onMultiVote(questionID, answers);
		}
		// Temporary logic: get the next state according to an arbitrary possible answer (1st).
		// This should be handled by ensuring Multi A Questions only have a connection from question level
		const tempPAID = answers[0].sourcePossibleAnswerID;
		this.moveForwardFromPA(questionID, tempPAID);
	}
	getDefaultEnding() {
		const defaultEndingID = this.props.survey.connections.defaultEnding;
		return {type: 'end', ID: defaultEndingID};
	}
	moveForwardFromPA(questionID, sourcePAID) {
		let nextEntity = this.props.survey.connections.possibleAnswers[sourcePAID];
		if (!nextEntity) {
			nextEntity = this.props.survey.connections.questions[questionID];
		}
		this.moveForward(nextEntity);
	}
	moveForward(nextEntity) {
		if (!nextEntity) {
			nextEntity = this.getDefaultEnding();
		}
		this.setState({currentEntity: nextEntity});
		if (nextEntity.type === 'end' && this.props.onEnd) {
			this.props.onEnd(nextEntity);
		}
	}
	render() {
		var entity;
		const entityID = this.state.currentEntity.ID;
		const entityType = this.state.currentEntity.type;
		switch (entityType) {
			case 'question':
				const q = this.props.questions[entityID];
				entity = <Question
					question={q}
					onSingleVote={this.singleVote}
					onMultiVote={this.multiVote} />;
				//ASKEM.trackEvent('Survey', 'ViewQuestion', entityID);
				//ASKEM.trackQuestionView(entityID);
				break;
			case 'questionSet':
				entity = <QuestionSet
					questionSetID={entityID}
					questionIDs={this.props.survey.questionSets[entityID].questionIDs}
					onSingleVote={this.props.onSingleVote}
					onMultiVote={this.props.onMultiVote}
					onComplete={this.moveForwardFromSet} />;
				//ASKEM.trackEvent('Survey', 'ViewQuestionSet', entityID);
				break;
			case 'end':
				let ending;
				if (typeof(entityID) !== 'undefined' && entityID !== null) {
					ending = this.props.survey.endings[entityID];
				}
				entity = <SurveyEnding ending={ending} />;
				//ASKEM.trackEvent('Survey', 'ViewEnd');
				break;
		}
		const key = `fadeElement-${entityType}-${entityID}`;
		return <TimeoutTransitionGroup key="surveyFadeTransitionGroup" transitionName="crossFade"
			component="div" className="crossFadeParent" enterTimeout={1200} leaveTimeout={1200}>
				<div className="crossFadeElement" key={key}>
					{entity}
				</div>
			</TimeoutTransitionGroup>;
	}
}

Survey.propTypes = {
	survey: React.PropTypes.object.isRequired,
	questions: React.PropTypes.object.isRequired,
	initialEntity:  React.PropTypes.object,
	onSingleVote: React.PropTypes.func,
	onMultiVote: React.PropTypes.func,
	onEnd: React.PropTypes.func,
};

export default Survey;
