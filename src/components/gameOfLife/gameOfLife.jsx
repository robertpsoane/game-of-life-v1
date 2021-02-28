import React, { Component } from "react";
import Cell from "./cell/cell";
import Header from "./headerfooter/header";
import Footer from "./headerfooter/footer";
import "./gameOfLife.css";

const WIDTH = 50;
const HEIGHT = 25;

class Controls extends Component {
  /** Set of control buttons, each are passed a function call via props */
  state = {};
  render() {
    return (
      <div>
        <div
          class="btn-group mini-margin"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            class="btn btn-success"
            style={{ width: 100 }}
            onClick={this.props.start}
          >
            Start
          </button>

          <button
            type="button"
            class="btn btn-primary"
            style={{ width: 100 }}
            onClick={this.props.pause}
          >
            Pause
          </button>

          <button
            type="button"
            class="btn btn-secondary"
            style={{ width: 100 }}
            onClick={this.props.reset}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

class GameOfLife extends Component {
  /** Main entry point to the app. */

  // Maintains state of grid, timeout, whether game is running and
  // whether mouse button currently down
  state = {
    grid: [],
    mouseDown: false,
    running: false,
    timeOut: 250,
    neighbours: [
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
    ],
  };

  componentDidMount() {
    /** Runs on load.  Creates grid and sets initial states.  Also used for
     * resetting app  */
    const grid = this.makeGrid(WIDTH, HEIGHT);
    this.setState({ grid: grid, mouseDown: false, running: false });
  }

  handleMouseDown(row, col) {
    /** Called by cells when clicked - sets mouseDown to true and starts
     * to change state */
    this.setState({ mouseDown: true, grid: this.changeCell(row, col) });
  }

  handleMouseUp() {
    /** Sets mouseDown false when mouse button released */
    this.setState({ mouseDown: false });
  }

  handleMouseEnter(row, col) {
    /** Called when mouse over a cell.  If mouse is down, then 'clicks' cell */
    if (!this.state.mouseDown) return;
    this.handleMouseDown(row, col);
  }

  changeCell(row, col) {
    /** Takes a cell and flips value from alive to dead and vice
     * versa */

    let newGrid = this.state.grid;
    // updates grid switching value of element
    if (newGrid[row][col][0] === 0) {
      newGrid[row][col][0] = 1;
    } else {
      newGrid[row][col][0] = 0;
    }
    return newGrid;
  }

  makeGrid = (x, y) => {
    /** Produces a grid of dead cells with x columns and y rows */
    const grid = [];
    for (let row = 0; row < y; row++) {
      const currentRow = [];
      for (let col = 0; col < x; col++) {
        currentRow.push([0]);
      }
      grid.push(currentRow);
    }
    return grid;
  };

  startGame() {
    /** Starts running game:
     * - Sets running state to true
     * - Sets timeout to run a step after the timeout
     */
    this.setState({ running: true });
    this.timeoutHandler = window.setTimeout(() => {
      this.runStep();
    }, this.state.timeOut);
  }

  pauseGame() {
    /** Stops running game */
    this.setState({ running: false });
  }

  countLivingNeighbours(grid, row, col) {
    /** Counts number of direct neighbours to a cell that are alive on
     * a given grid.  Uses neighbours vector to store al permutations
     */
    const neighbours = this.state.neighbours;
    let count = 0;
    for (let i = 0; i < 8; i++) {
      const neighbour = neighbours[i];
      const rown = row + neighbour[0];
      const coln = col + neighbour[1];
      if (rown > 0 && coln > 0 && rown < HEIGHT && coln < WIDTH) {
        if (grid[rown][coln][0] === 1) {
          count++;
        }
      }
    }
    return count;
  }

  runStep() {
    /** Runs a generation of the Game of Life
     * - Checks if running
     * - Iterates over grid, building the grid for the next generation
     * based on rules of game of life
     * - Sets a timeout to run again
     */
    if (!this.state.running) {
      return;
    }
    console.log("RUNNING");
    let oldGrid = this.state.grid;
    let newGrid = [];

    for (let row = 0; row < HEIGHT; row++) {
      let newRow = [];
      for (let col = 0; col < WIDTH; col++) {
        if (oldGrid[row][col][0] === 0) {
          if (this.countLivingNeighbours(oldGrid, row, col) === 3) {
            newRow.push([1]);
          } else {
            newRow.push([0]);
          }
        } else {
          const living = this.countLivingNeighbours(oldGrid, row, col);

          if ((living === 2) | (living === 3)) {
            newRow.push([1]);
          } else {
            newRow.push([0]);
          }
        }
      }
      newGrid.push(newRow);
    }
    this.setState({ grid: newGrid });

    this.timeoutHandler = window.setTimeout(() => {
      console.log(this.state.grid);
      this.runStep();
    }, this.state.timeOut);
  }

  render() {
    /** render function - renders game of life on screen */
    const { grid } = this.state;
    return (
      <div>
        {/* Adding header component with Game of Life info */}
        <header>
          <Header />
        </header>
        {/* Adding controls to grid board */}
        <Controls
          reset={() => this.componentDidMount()}
          start={() => this.startGame()}
          pause={() => this.pauseGame()}
        />
        {/* Render grid of divs representing our board */}
        <div className="board">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="cellrow">
                {row.map((col, colIdx) => {
                  const cell_id = [rowIdx, colIdx];
                  // Passes life prop to div based on value of element
                  // on grid array
                  const life =
                    this.state.grid[rowIdx][colIdx][0] === 1 ? "alive" : "dead";

                  return (
                    <Cell
                      key={cell_id}
                      id={cell_id}
                      life={life}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={(row, col) => this.handleMouseUp()}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        {/* Adds footer component containing other links to the page */}
        <Footer />
      </div>
    );
  }
}

export default GameOfLife;
