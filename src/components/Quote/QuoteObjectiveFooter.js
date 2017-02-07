import React, {PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const placeHolderText = 'Please describe your research needs...';

class QuoteObjectiveFooter extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
    this.setResearchObjective = this.setResearchObjective.bind(this);
    this.cancelForm = this.cancelForm.bind(this);

    this.state = {
      visible : false,
      researchObjective : {
          id: null,
          description: null
      },
      tempValue : ''
    }
  }

  toggleFormVisibility() {
    let visible = !this.state.visible;
    let researchObjective = {
      id : null,
      description:null
    }

    let tempValue = '';

    this.setState({
      visible,
      researchObjective,
      tempValue
    });
  }

  cancelForm(event) {
    event.preventDefault();
    this.toggleFormVisibility();
  }

  setResearchObjective(event) {
    event.preventDefault();

    const researchObjective = {
      id : 'custom',
      description : this.state.tempValue,
    }

    this.props.setObjective(researchObjective);
  }

  render() {
    let button = <FlatButton label="+ other objective" onClick={ this.toggleFormVisibility } />;
    let form = (
                  <form className="form" onSubmit={ this.setResearchObjective }>
                    <div className="textfield-wrapper">
                      <TextField fullWidth={true} id="setResearchObjectiveTextField" floatingLabelText={placeHolderText}
                        value={this.state.tempValue} onChange={(e) => this.setState({tempValue:e.target.value})}/>
                    </div>
                    <div className="action-buttons">
                      <button className="askem-button" onClick={this.setResearchObjective}>Submit</button>
                      <FlatButton onClick={this.cancelForm} label="cancel" style={{ marginLeft:10 + 'px'}}/>
                    </div>
                  </form>
              );

    let footer = this.state.visible ? form : button;

    return (
      <div className="quote-objective-footer">
        { footer }
      </div>
    );
  }
}

QuoteObjectiveFooter.propTypes = {
};

export default  QuoteObjectiveFooter;
