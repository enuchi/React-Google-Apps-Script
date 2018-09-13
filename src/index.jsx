import React from "react";
import ReactDOM from "react-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

import css from "./styles.css";


class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) return;
    this.props.newSheetFormHandler(e, this.state.text)
    this.setState(prevState => ({
      text: ""
    }));
  }

  render() {
    return (
      <div className="formBlock">
        <span>Add a sheet: </span>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            onChange={this.handleChange}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}

class SheetEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {names: []};
    this.deleteButtonHandler = this.deleteButtonHandler.bind(this);
    this.newSheetFormHandler = this.newSheetFormHandler.bind(this);
  }

  componentDidMount() {
    google.script.run
      .withSuccessHandler((data) => this.setState({names: data}))
      .withFailureHandler((error) => alert(error))
      .getSheetsData()
  }

  deleteButtonHandler(e, sheetIndex) {
    return google.script.run
      .withSuccessHandler((data) => this.setState({names: data}))
      .withFailureHandler((error) => alert(error))
      .deleteSheet(sheetIndex)
  }

  newSheetFormHandler(e, newSheetTitle) {
    google.script.run
      .withSuccessHandler((data) => this.setState({names: data}))
      .withFailureHandler((error) => alert(error))
      .addSheet(newSheetTitle);
  }

  render() {
    let names = this.state.names
    return (
      <div>
        <FormInput newSheetFormHandler={this.newSheetFormHandler}/>
        <ReactCSSTransitionGroup
          transitionName="sheetNames"
          transitionAppear={true}
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}>
          {
            names.length ? 
            names.map((name) => {
              return (
                <SheetButton name={name} deleteButtonHandler={this.deleteButtonHandler}/>
              )
            })
            : null
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

class SheetButton extends React.Component {
  render() {
    let sheetIndex = this.props.name.sheetIndex;
    let sheetName = this.props.name.text;
    let isActiveSheet = this.props.name.isActive;
    return (
      <div className="sheetLine">
        <button
          onClick={(e) => this.props.deleteButtonHandler(e,sheetIndex)}
        >
          X
        </button>
        <span className={"sheetNameText " + (isActiveSheet ? "active-sheet" : "")}>
          {sheetName}
        </span>
      </div>
    )
  }
}

ReactDOM.render(
  <SheetEditor />,
  document.getElementById("index")
);