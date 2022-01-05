import './App.css';
import React from "react";
import Calculator from "../CalculatorComponent/Calculator";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Calculator />
      </div>
    );
  }
}

export default App;
