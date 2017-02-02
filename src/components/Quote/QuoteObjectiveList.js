import React, {PropTypes} from 'react';
import RESEARCH_OBJECTIVE_CATEGORIES from 'constants/RESEARCH_OBJECTIVE_CATEGORIES';
import QuoteObjectiveFooter from 'components/Quote/QuoteObjectiveFooter';

class QuoteObjectiveList extends React.Component {
  constructor(props) {
    super(props);
    this.mapObjectiveToIcon = this.mapObjectiveToIcon.bind(this);
    this.mapSubItems = this.mapSubItems.bind(this);
    //this.handleClickOnObjective = this.handleClickOnObjective.bind(this);
  }

  mapObjectiveToIcon(id) {
    let imgPath = '';

    switch(id) {
      case 'advertising':
        imgPath = 'https://know.askem.com/img/insights-adv-ico.png';
        break;
      case 'consumer':
        imgPath = 'https://know.askem.com/img/insights-con-ico.png';
        break;
      case 'brand':
        imgPath = 'https://know.askem.com/img/insights-cs-ico.png';
        break;
      case 'marketing':
        imgPath = 'https://know.askem.com/img/insights-brand-ico.png';
        break;
      case 'startups':
        imgPath = 'https://know.askem.com/img/insights-su-ico.png';
        break;
      default:
        imgPath = '';
        break;
    }

    return (
      <img src={ imgPath }/>
    )
  }

  setResearchObjective(item) {
    const { id, description = '' } = item;
    this.props.setResearchObjective(id, description);
    this.props.onAdvance();
  }

  mapSubItems(items) {
    return items.map(item => {
      return (
        <div
           className="quote-objective-item"
           key={ item.id }
           onClick={ () => this.setResearchObjective(item) }>
          { item.title }
        </div>
      )
    });
  }

  render() {
    let objectiveBoxes = RESEARCH_OBJECTIVE_CATEGORIES.map(obj => {
          return (
              <div className="quote-objective-box" key={ obj.id }>
                  <div className="quote-objective-header">
                    <div>{ this.mapObjectiveToIcon(obj.id) }</div>
                    <div className="quote-objective-title">{ obj.title }</div>
                  </div>
                  { this.mapSubItems(obj.items) }
              </div>
          )
    });

    return (
      <div>
        <div className="quote-objective-container">
          { objectiveBoxes }
        </div>
        <QuoteObjectiveFooter />
      </div>
    )
  }
}

QuoteObjectiveList.propTypes = {
};

export default QuoteObjectiveList;
