import React, { Component } from "react";
import "./cell.css";

class Cell extends Component {
  /** Cell - represents a cell on the board.  Coloured based on
   * property for life passed in
   */
  state = {
    id: this.props.id,
    divId: "cell:" + this.props.id[0] + "," + this.props.id[1],
  };
  styling = {
    backgroundColor: "black",
  };

  contextMenu() {
    return false;
  }

  render() {
    const onMouseDown = this.props.onMouseDown;
    const onMouseEnter = this.props.onMouseEnter;
    const onMouseUp = this.props.onMouseUp;
    const styling = {
      backgroundColor: this.props.life === "dead" ? "black" : "white",
    };
    return (
      <div
        id={this.state.divId}
        className="cell"
        style={styling}
        onMouseDown={() => onMouseDown(this.state.id[0], this.state.id[1])}
        onMouseEnter={() => onMouseEnter(this.state.id[0], this.state.id[1])}
        onMouseUp={() => onMouseUp()}
        onContextMenu={(e) => e.preventDefault()}
      ></div>
    );
  }
}

export default Cell;
