/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './css/board.css';

let root = document.documentElement;

export class TicTacToeBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      showingAlert: false
    };
  }

  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
  };

  onClick = id => {
    if (this.isNotActive(id)) {
      this.props.moves.placeBet(id);
    }
    this.setState({
      showingAlert: true
    });

    setTimeout(() => {
      this.setState({
        showingAlert: false
      });
    }, 8000);
  };


  isActive(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
  }

  isNotActive(id) {
    //if (this.props.isActive) return false;
    if (this.props.G.cells[id] == null) return false;
    return true;
  }

  resetGame(){
    // console.log('this is:', this);
    console.log('Reset!');
  }


  render() {
    let rouletteBody = [];
    let rcells = [];
    let tbody = [];
    let bowl = '';
    let otherPlayerMsg="";

      if (this.props.G.selectors.includes(-4)){
        rcells.push(<div class="btn dot centerContent">-4</div>);
      }else{rcells.push(<div class="btn dot-disabled centerContent disabled">-4</div>);}
      if (this.props.G.selectors.includes(-3)){
        rcells.push(<div class="btn dot centerContent">-3</div>);
      }else{rcells.push(<div class="btn dot-disabled centerContent disabled">-3</div>);}
      if (this.props.G.selectors.includes(-2)){
        rcells.push(<div class="btn dot centerContent">-2</div>);
      }else{rcells.push(<div class="btn dot-disabled centerContent disabled">-2</div>);}
      if (this.props.G.selectors.includes(-1)){
        rcells.push(<div class="btn dot centerContent">-1</div>);
      }else{rcells.push(<div class="btn dot-disabled centerContent disabled">-1</div>);}
      if (this.props.G.selectors.includes(1)){
        rcells.push(<div class="btn dot centerContent">1</div>);
      }else{rcells.push(<div class="btn dot-disabled centerContent disabled">1</div>);}
      if (this.props.G.selectors.includes(2)){
        rcells.push(<div class="btn dot centerContent">2</div>);
      }else{rcells.push(<div class="btn dot-disabled centerContent disabled">2</div>);}
      if (this.props.G.selectors.includes(3)){
        rcells.push(<div class="btn dot centerContent">3</div>);
      }else{rcells.push(<div class="btn dot-disabled centerContent disabled">3</div>);}
      if (this.props.G.selectors.includes(4)){
        rcells.push(<div class="btn dot centerContent">4</div>);
      }else{rcells.push(<div class="btn dot-disabled centerContent disabled">4</div>);}
      if (this.props.G.selectors.includes(5)){
        rcells.push(<div class="btn dot centerContent">5</div>);
      }else{rcells.push(<div class="btn dot-disabled centerContent disabled">5</div>);}
      if (this.props.G.selectors.includes(6)){
        rcells.push(<div class="btn dot centerContent">6</div>);
      }else{rcells.push(<div class="btn dot-disabled centerContent disabled">6</div>);}
      if (this.props.G.selectors.includes(7)){
        rcells.push(<div class="btn dot centerContent">7</div>);
      }else{rcells.push(<div class="btn dot-disabled centerContent disabled">7</div>);}
      if (this.props.G.selectors.includes(8)){
        rcells.push(<div class="btn dot centerContent">8</div>);
      }else{rcells.push(<div class="btn dot-disabled centerContent disabled">8</div>);}
    
    rouletteBody.push(<div class="container gray3 centerContent round"><div class="row">{rcells}</div></div>);


    
    if(this.props.playerID==this.props.ctx.currentPlayer){
      for (let i = 0; i < 3; i++) {
        let cells = [];
        for (let j = 0; j < 4; j++) {
          const id = 4*i + j;
          cells.push(
            <td
              key={id}
              className={this.isNotActive(id) ? 'active' : ''}
              onClick={() => this.onClick(id)}
            >
              {this.props.G.cells[id]}
            </td>
          );
        }
        tbody.push(<tr key={i}>{cells}</tr>);
      }
      //ori afisez la fiecare in parte
      //ori fac cate un obiect pt fiecare si updatez specific
      bowl=<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>;
    }
    else{
      otherPlayerMsg="Other player turn!";
    }

    let winner = null;
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
            <div id="winner">Draw!</div>
          );
    }

    let message = '';
    let resultMessage=this.props.G.message;
    let extra= <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>;
    let extractedNumber = <span>{this.props.G.extractedNumber}</span>;
    const p1disc = 1;
    const p2disc = 2;
    let p1Score= <span><div class="centerContent"><p align="center">Player 1 score</p></div> <hr></hr><div class="centerContent"> {this.props.G.player1Score}</div></span>;
    let p2Score= <span><div class="centerContent"><p align="center">Player 2 score</p></div> <hr></hr><div class="centerContent"> {this.props.G.player2Score}</div></span>;
    
    let meanVal = 0;
    
    if(this.props.ctx.currentPlayer==0){
      meanVal = this.props.G.player1Score/2.1;
    }else{
      meanVal = this.props.G.player2Score/2.1;
    }
    if (meanVal>9){
      meanVal=9;
    }
    root.style.setProperty('--hight-x', meanVal + "em");
    root.style.setProperty('--hight-y', meanVal/2 + "em");
    root.style.setProperty('--hight-z', meanVal/1.2 + "em");
    root.style.setProperty('--hight-q', meanVal/2.3 + "em");
    
    const selectors = <span>{this.props.G.selectors}</span>;
    const playerDiscLookup = {
      "0": p1disc,
      "1": p2disc,
    };
    //must be !== null but I changed!
    if (this.props.ctx.winner === null) {
      message = <span><div class="bg-danger">Winner: Player {playerDiscLookup[this.props.ctx.currentPlayer]}</div></span>;
    } else {
      message = <span><div class="bg-danger">Player {playerDiscLookup[this.props.ctx.currentPlayer]}</div></span>;
      message = <span><div class="bg-danger">Player {playerDiscLookup[this.props.playerID]}</div></span>;
    }

let resetButton=<button type="button" class="btn btn-warning btn-block btn-sm" onClick={(e) => this.resetGame(e)}>Reset</button>;
let alertDispl=<div className={`${this.state.showingAlert ? 'alert-shown' : 'alert-hidden'}`}>{resultMessage}</div>;
// let alertDispl=<div class={resultStatus}>{resultMessage}</div>;

return (<div class="container">
<div class="row centerContent">
    <div class="col-10 blue1 text-white centerContent rounded margin"><h1>Alchemy Market</h1></div>
    <div class="col-3 text-white float-left rounded margin">{p1Score}</div>
    <div class="col-4 centerContent"><div class="btn-circle col-5 border border-secondary centerContent gray">{extractedNumber} </div></div>
    <div class="col-3 text-white float-right rounded margin">{p2Score}</div>
    <div class="col-12 centerContent margin">{rouletteBody}</div>
    <div class="col-12 centerContent margin"><div class="col-5 rounded centerContent"><span2><p class="text-white"><b>{alertDispl}</b></p></span2></div></div>
    <div class="col-12 keepdistanceMiddleLevel centerContent">{bowl}{otherPlayerMsg}</div>
    <div class="col-12 keepdistanceBottomLevel centerContent"><table id="board"><tbody>{tbody}</tbody></table>{winner}</div>
</div>
{extra}
</div>);
  }
}