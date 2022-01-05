import './Calculator.css';
import React from "react";
import Button from "../ButtonComponent/Button";
import Display from "../DisplayComponent/Display";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      display: 0,
      currentNb: 0,
      waitOperation: true,
      waitNb: false,
      operation: false
    };
  }

  updateDisplay(value) {
    this.setState(state => {
      // Update display with specified value
      return { display: state[value] }
    });
  }

  select(nb) {
    // If display wait for a number
    if (this.state.waitNb) {
      this.setState({ total: 0 });
    }

    // If there is no operation
    if (!this.state.waitOperation) {
      this.setState(state => {
        return {
          total: parseFloat(state.currentNb) + parseFloat(state.total),
          waitOperation: true,
          currentNb: nb
        }
      });
    }
    // If an operation was pressed
    else {
      this.setState(state => {
        return { currentNb: parseFloat(state.currentNb + nb) }
      });
    }
    this.updateDisplay("currentNb");
  }

  addDot() {
    const regex = /\./;
    const foundDot = regex.test(this.state.currentNb);

    if (!foundDot) {
      // Wait for a number after a dot
      this.setState({ waitNb: true });
      this.setState(state => {
        return { currentNb: state.currentNb + "." }
      });
      this.updateDisplay("currentNb");
    }
  }

  operation(sign) {
    const regex = /\.$/;
    const foundDotAtEnd = regex.test(this.state.currentNb);

    // If the displayed number does not end with a dot
    if (this.state.display != 0 && !foundDotAtEnd) {
      this.equal();
      this.setState({
        operation: sign,
        waitOperation: false,
        waitNb: false
      });
    }
  }

  equal() {
    if (this.state.currentNb != 0) {
      this.setState(state => {
        return {
          total: eval(state.total + state.operation + state.currentNb),
          operation: false,
          currentNb: 0,
          waitNb: true
        }
      });
      this.updateDisplay("total");
    }
  }

  clear() {
    this.setState({
      total: 0,
      display: 0,
      currentNb: 0
    });
  }

  invert() {
    // Invert current number and update display with it
    if (this.state.total != 0 && this.state.currentNb != 0) {
      this.setState(state => {
        return {
          currentNb: parseFloat(state.currentNb) * -1
        }
      });
      this.updateDisplay("currentNb");
    }
    // After pressing equal : Invert the total and update display with it
    else if (this.state.total != 0 && this.state.currentNb == 0) {
      this.setState(state => {
        return {
          total: parseFloat(state.display) * -1
        }
      });
      this.updateDisplay("total");
    }
    // Update current number with the inverted display value
    else {
      this.setState(state => {
        return {
          currentNb: parseFloat(state.display) * -1,
        }
      });
      this.updateDisplay("currentNb");
    }
  }

  percent() {
    // Divide current number and update display with it
    if (this.state.total != 0 && this.state.currentNb != 0) {
      this.setState(state => {
        return {
          currentNb: parseFloat(state.currentNb) / 100
        }
      });
      this.updateDisplay("currentNb");
    }
    // After pressing equal : Divide the total and update display with it
    else if (this.state.total != 0 && this.state.currentNb == 0) {
      this.setState(state => {
        return {
          total: parseFloat(state.display) / 100
        }
      });
      this.updateDisplay("total");
    }
    // Update current number with the divided display value
    else {
      this.setState(state => {

        return {
          currentNb: parseFloat(state.display) / 100,
        }
      });
      this.updateDisplay("currentNb");
    }
  }


  render() {
    return (
      <div>
        <div>
          <Button buttonName="0" event={() => this.select("0")} />
          <Button buttonName="1" event={() => this.select("1")} />
          <Button buttonName="2" event={() => this.select("2")} />
          <Button buttonName="3" event={() => this.select("3")} />
          <Button buttonName="4" event={() => this.select("4")} />
          <Button buttonName="5" event={() => this.select("5")} />
          <Button buttonName="6" event={() => this.select("6")} />
          <Button buttonName="7" event={() => this.select("7")} />
          <Button buttonName="8" event={() => this.select("8")} />
          <Button buttonName="9" event={() => this.select("9")} />
          <Button buttonName="." event={() => this.addDot()} />
        </div>

        <div>
          <Button buttonName="÷" event={() => this.operation("/")} />
          <Button buttonName="X" event={() => this.operation("*")} />
          <Button buttonName="-" event={() => this.operation("-")} />
          <Button buttonName="+" event={() => this.operation("+")} />
          <Button buttonName="=" event={() => this.equal()} />
        </div>

        <div>
          <Button buttonName="AC" event={() => this.clear()} />
          <Button buttonName="+/-" event={() => this.invert()} />
          <Button buttonName="%" event={() => this.percent()} />
        </div>

        <Display value={this.state.display} />

        <hr />
        <div>
          Debug values : <br />
          total : {this.state.total}
          <br />
          display : {this.state.display}
          <br />
          currentNb : {this.state.currentNb}
          <br />
          waitOperation : {this.state.waitOperation ? "true" : "false"}
          <br />
          waitNb : {this.state.waitNb ? "true" : "false"}
          <br />
          operation : {this.state.operation ? "true" : "false"}
          <br />
        </div>
      </div>
    );
  }
}

export default Calculator;
