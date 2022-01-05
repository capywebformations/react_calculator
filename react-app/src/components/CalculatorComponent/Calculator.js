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
      return { display: state[value] }
    });
  }

  select(nb) {
    if (!this.state.waitOperation) {
        this.setState(state => {
          return {
            total: parseFloat(state.currentNb) + parseFloat(state.total),
            waitOperation: true,
            currentNb: nb
          }
        });
    }
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

    if (this.state.display != 0 && !foundDotAtEnd) {
      this.equal();
      this.setState({
        operation: sign,
        waitOperation: false
      });
    }
  }

  equal() {
    if (this.state.currentNb != 0){
      this.setState(state => {
        return {
          total: eval(state.total + state.operation + state.currentNb),
          operation: false,
          currentNb : 0
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
    if (this.state.total != 0 && this.state.currentNb != 0) {
      this.setState(state => {
        return {
          currentNb: parseFloat(state.currentNb) * -1
        }
      });
      this.updateDisplay("currentNb");
    }
    else if (this.state.total != 0 && this.state.currentNb == 0) {
      this.setState(state => {
        return {
          total: parseFloat(state.display) * -1
        }
      });
      this.updateDisplay("total");
    }
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
    if (this.state.total != 0 && this.state.currentNb != 0) {
      this.setState(state => {
        return {
          currentNb: parseFloat(state.currentNb) / 100
        }
      });
      this.updateDisplay("currentNb");
    }
    else if (this.state.total != 0 && this.state.currentNb == 0) {
      this.setState(state => {
        return {
          total: parseFloat(state.display) / 100
        }
      });
      this.updateDisplay("total");
    }
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
      </div>
    );
  }
}

export default Calculator;
