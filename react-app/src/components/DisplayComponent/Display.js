import './Display.css';
import React from "react";

class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="display">
        {this.props.value}
      </div>
    );
  }
}

export default Display;
