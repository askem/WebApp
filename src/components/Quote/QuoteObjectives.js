import React, {PropTypes} from 'react';

const QuoteObjectivesTitle = 'Select MArket Objective';

class QuoteObjectives extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>{ QuoteObjectivesTitle }</div>
        <div></div>
      </div>
    );
  }
}

QuoteObjectives.propTypes = {
};


export default QuoteObjectives;
