/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game,TurnOrder } from 'boardgame.io/core';

function IsVictory(cells) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let pos of positions) {
    const symbol = cells[pos[0]];
    let winner = symbol;
    for (let i of pos) {
      if (cells[i] != symbol) {
        winner = null;
        break;
      }
    }
    if (winner != null) return false; //true;
  }

  return false;
}

export const TicTacToe = Game({
  name: "tic-tac-toe",

  setup: () => ({
    cells: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    cellsP1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    cellsP2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    selectors : [-4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8], //0 will never be choosed as rnd[1:12]
    extractedNumber: null,
    player1Bet: null,
    player2Bet: null,
    player1Score: 0,
    player2Score: 0,
    message: 'P1 vs P2',
  }),

  moves: {
    placeBet(G, ctx, id) {
      var crtPlayer = ctx.currentPlayer;
        G.cells[id] = null;
        if (crtPlayer == 0){
          G.player1Bet = id+1;
          G.cellsP1=G.cells;
        }
        else{
          G.player2Bet = id+1;
          G.cellsP2=G.cells;
        }
    },
  },

  flow: {
    movesPerTurn: 1,
    startingPhase: 'play',

    endGameIf: (G, ctx) => {
      //end game after player 2 put bet; no more moves, but on points!
      if (G.selectors.length == -1) { //0 ; -1 wis never
        return { winner: ctx.currentPlayer };
      }
    },

    phases: {
      play: {
        onPhaseBegin: (G, ctx) => {
          var rnd = Math.floor(Math.random()*G.selectors.length);
          G.extractedNumber = G.selectors[rnd];
          G.selectors.splice(rnd, 1);
        },
        onTurnEnd: (G, ctx) => {
          var crtPlayer = ctx.currentPlayer;
          if (crtPlayer == 1){
            G.cells=G.cellsP1;
          }
          else{
            G.cells=G.cellsP2;
          }
        },
        allowedMoves: ['placeBet'],
        turnOrder: TurnOrder.ONCE,
        next: 'play',
        onPhaseEnd: (G, ctx) => {
          if(G.player1Bet==G.player2Bet){
            G.message='DRAW';
          }
          else if(G.player1Bet>G.player2Bet){
            G.message='P1: '+G.player1Bet+' - P2: '+G.player2Bet;
            if(G.extractedNumber<0){
              G.player2Score+=G.extractedNumber
            }else{
              G.player1Score+=G.extractedNumber
            }
          }
          else{
            G.message='P1: '+G.player1Bet+' - P2: '+G.player2Bet;
            if(G.extractedNumber<0){
              G.player1Score+=G.extractedNumber
            }else{
              G.player2Score+=G.extractedNumber
            }
          }
        },
      },
    }
  }
});

export default TicTacToe;
