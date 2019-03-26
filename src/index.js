/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import { render } from "react-dom";
import { Client } from "boardgame.io/react";
import { TicTacToe } from "./game";
import { TicTacToeBoard } from "./board";

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  debug: false,
  multiplayer: { server: "localhost:8000" }
  // multiplayer: { server: "192.168.2.9:8000" }
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <section class="game-intro" data-game-wrapper="select-type-player">
            <header class="game-intro__heading">
              <h2 class="game-intro__title">Alchemy Market</h2>
            </header>
            <div class="game-intro__body">
              <div class="game-intro__wrapper game-intro__wrapper--single" data-game-action="select-type-player" data-game-player-option="X">        
                <div class="game-intro__content game-intro__content--large" onClick={() => this.setState({ playerID: "0" })}>Player 1</div>        
              </div>
              <div class="game-intro__wrapper game-intro__wrapper--separator">OR</div>
              <div class="game-intro__wrapper game-intro__wrapper--multiplay" data-game-action="select-type-player" data-game-player-option="O">
              <div class="game-intro__content game-intro__content--large" onClick={() => this.setState({ playerID: "1" })}>Player 2</div>
              </div>
            </div>
          </section>
        </div>
      );
    }
    return (
      <div>
        <TicTacToeClient playerID={this.state.playerID} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));