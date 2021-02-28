import "./App.css";
import React, { Component } from "react";

import GameOfLife from "./components/gameOfLife/gameOfLife";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <GameOfLife />
      </div>
    );
  }
}

export default App;
