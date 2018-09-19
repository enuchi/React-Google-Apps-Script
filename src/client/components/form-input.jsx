import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

export default class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length) {
      this.props.newSheetFormHandler(e, this.state.text);
      this.setState({text: ''});
    }
  }

  render() {
    return (
      <div className="formBlock">
        <span>Add a sheet: </span>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input onChange={this.handleChange} value={this.state.text} />
        </form>
      </div>
    );
  }
}

FormInput.propTypes = {
  newSheetFormHandler: PropTypes.func,
};
