import './Button.css';
import React from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonName : props.buttonName,
      event : props.event
    };
  }

  render() {
    return (
      <button onClick={this.state.event}>{this.state.buttonName}</button>
    );
  }
}

export default Button;
