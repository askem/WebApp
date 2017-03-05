import React, {PropTypes} from 'react';
import FaChrome from 'react-icons/lib/fa/chrome';
import QuoteObjectiveList from 'components/Quote/QuoteObjectiveList';

class QuoteObjective extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="quote-wizard-description-container">
        <div className="quote-upper-stage-title-container">
          <div className=""><FaChrome size={ 20 }/></div>
          <div className="quote-upper-stage-title">{ this.props.title }</div>
          <div className="quote-upper-stage-description">
            Lorem ipsum dolor sit amet, eu sit utroque cotidieque instructior, ex nec odio solet, his iusto discere omittantur id. Labore cotidieque te usu. Denique accusata persecuti eu nam, ea ferri.
          </div>
        </div>

        <div>
            <QuoteObjectiveList {...this.props} />
        </div>
      </div>
    );
  }
}

QuoteObjective.propTypes = {
};


export default QuoteObjective;
