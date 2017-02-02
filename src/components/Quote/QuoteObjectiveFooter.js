import React, {PropTypes} from 'react';

class QuoteObjectiveFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="quote-objective-footer">
        <button className="askem-button-white">Define Custom Objective</button>
      </div>
    );
  }
}

QuoteObjectiveFooter.propTypes = {
};


export default  QuoteObjectiveFooter;
