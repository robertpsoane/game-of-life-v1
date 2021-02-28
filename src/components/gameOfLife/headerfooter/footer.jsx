import React, { Component } from "react";

class Footer extends Component {
  /** Footer - provides a couple of links to wikipedia and my website */
  state = {};
  render() {
    return (
      <div class="mini-margin">
        <p>
          To find out more about the game, see the{" "}
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            Wikipedia Page
          </a>
          .
        </p>
        <p>
          This was produced by Robert Soane to get exposure to React JS. You can
          find the code on my{" "}
          <a href="https://github.com/robertpsoane/game-of-life">GitHub</a>. To
          see more of my work, checkout{" "}
          <a href="https://robertsoane.me">robertsoane.me</a>
        </p>
      </div>
    );
  }
}

export default Footer;
