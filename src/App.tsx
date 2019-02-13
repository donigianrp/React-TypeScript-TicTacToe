import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

type ONGOING_GAME = -1;
const ONGOING_GAME = -1;

enum Player {
  None,
  One,
  Two
}

interface IState {
  board: Player[];
  nextPlayerTurn: Player;
  gameOver: Player | ONGOING_GAME;
}

class App extends Component<{}, IState> {
  state = {
    board: [
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None
    ],
    nextPlayerTurn: Player.One,
    gameOver: ONGOING_GAME
  };

  public gameWinnerConditional = (
    cell1: number,
    cell2: number,
    cell3: number
  ) => {
    return cell1 === cell2 && cell1 === cell3 && cell1 !== Player.None;
  };

  public checkGameOver = (board: Player[]) => {
    if (this.gameWinnerConditional(board[0], board[1], board[2])) {
      return board[0];
    } else if (this.gameWinnerConditional(board[3], board[4], board[5])) {
      return board[3];
    } else if (this.gameWinnerConditional(board[6], board[7], board[8])) {
      return board[6];
    } else if (this.gameWinnerConditional(board[0], board[3], board[6])) {
      return board[0];
    } else if (this.gameWinnerConditional(board[1], board[4], board[7])) {
      return board[1];
    } else if (this.gameWinnerConditional(board[2], board[5], board[8])) {
      return board[2];
    } else if (this.gameWinnerConditional(board[0], board[4], board[8])) {
      return board[0];
    } else if (this.gameWinnerConditional(board[2], board[4], board[6])) {
      return board[2];
    }

    return board.includes(Player.None) ? -1 : Player.None;
  };

  public createOnClickHandler = (index: number) => () => {
    const { board, nextPlayerTurn, gameOver } = this.state;
    if (gameOver !== ONGOING_GAME || board[index] !== Player.None) {
      return;
    }
    if (board[index] === 0) {
      const newBoard = board.slice();
      newBoard[index] = nextPlayerTurn;
      const gameIsOver = this.checkGameOver(newBoard);

      this.setState({
        board: newBoard,
        nextPlayerTurn: 3 - nextPlayerTurn,
        gameOver: gameIsOver
      });
    }
  };

  public renderCell = (index: number) => {
    const { board } = this.state;
    return (
      <div
        className="cell"
        onClick={this.createOnClickHandler(index)}
        data-player={board[index]}
      />
    );
  };

  public renderStatus = () => {
    const { gameOver } = this.state;
    const gameOverText =
      gameOver === Player.None
        ? "The game is a draw"
        : `Player ${gameOver} won`;
    return (
      <div>
        {"player 1 is green"}
        <br />
        {"player 1 is yellow"}
        <br />
        {gameOver === ONGOING_GAME ? "game is ongoing." : gameOverText}
      </div>
    );
  };

  public renderBoard = () => {
    const { board } = this.state;
    return (
      <div className="board-container">
        {board.map((val, k) => {
          return this.renderCell(k);
        })}
      </div>
    );
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tic Tac Toe using React Typescript</h1>
        </header>
        <div className="boardWrapper">{this.renderBoard()}</div>
        <div className="statusWrapper">{this.renderStatus()}</div>
      </div>
    );
  }
}

export default App;
