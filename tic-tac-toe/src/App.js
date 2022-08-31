import React, { useState } from "react";

import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ResultBoard } from "./components/ResultBoard";
import './App.css';

const App = () => {

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null))
  const [scores, setResult] = useState({ resultScore: "" })
  const [gameOver, setGameOver] = useState(false);


  const handleBoxClick = (boxIdx) => {
    
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    })

    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        let { resultScore } = scores;
        resultScore = "O Kazandı Tebrikler";
        setResult({ ...scores, resultScore })
      } else if(winner === "X") {
        let { resultScore } = scores;
        resultScore = "X Kazandı Tebrikler";
        setResult({ ...scores, resultScore })
      } else if(winner ==="berabere" && winner !== "O" && winner !== "X"){
        let { resultScore } = scores;
        resultScore = "Berabere Kaldınız";
        setResult({ ...scores, resultScore })
      }
    }


    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      if (board[x] && board[y] && board[z]) {
        if (board[x] && board[x] === board[y] && board[y] === board[z]) {
          setGameOver(true);
          return board[x];
        } else if(board[0] && board[1] && board[2] && board[3] && board[4] && board[5] && board[6] && board[7] && board[8]){
          return "berabere";
        }
      }
      
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  }

  return (
    <div className="App">
      <ResultBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;