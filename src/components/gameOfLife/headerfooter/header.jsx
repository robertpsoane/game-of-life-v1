import React, { Component } from "react";

class Header extends Component {
  /** Header renders some text about the game of life, and an alert
   * warning currently WIP
   */
  state = {};
  render() {
    return (
      <div>
        <header>
          <h1>Conway's Game of Life</h1>
        </header>
        <p class="mini-margin">
          Conway's Game of Life (aka <em>Life</em>) was created by{" "}
          <a href="https://en.wikipedia.org/wiki/John_Horton_Conway">
            {" "}
            John Conway
          </a>
          . The idea is to simulate life in a 2d grid with a set of simple
          rules:
          <ul
            style={{
              display: "inline",
              fontStyle: "italic",
            }}
          >
            <li>A live cell with less than 2 living neighbours dies.</li>
            <li>A live cell with 2 or 3 live neighbours survives.</li>
            <li>A live cell with 4+ live neighbours dies.</li>
            <li>A dead cell with 3 live neighbours comes back to life. </li>
          </ul>
          To use this simulation, click on the cells in the grid to bring them
          to life, and click the start button below to start the simulation.
        </p>
        <div class="alert alert-warning" role="alert">
          Note: This is currently a work in progress.
        </div>
      </div>
    );
  }
}

export default Header;
