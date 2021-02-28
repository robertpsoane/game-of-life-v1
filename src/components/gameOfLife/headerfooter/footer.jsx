import React, { Component } from "react";

class Footer extends Component {
  /** Footer - provides a couple of links to wikipedia and my website */
  state = {};
  render() {
    return (
      <div class="mini-margin">
        <p>
          This was produced by Robert Soane to get exposure to React JS. You can
          find the code on my{" "}
          <a href="https://github.com/robertpsoane/game-of-life">GitHub</a>. To
          see more of my work, checkout{" "}
          <a href="https://robertsoane.me">robertsoane.me</a>
        </p>
        <div class="alert alert-warning" role="alert">
          Note: This has been redesigned. The latest version is{" "}
          <a href="https://robertsoane.me/game-of-life/">here</a>.
        </div>
      </div>
    );
  }
}

export default Footer;
