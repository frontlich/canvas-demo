import { useState } from "react";
import { robot } from "./robot";

type ISquare = "X" | "O";
type Squares = ISquare[];
interface SquareProps {
  value: ISquare;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <div className="well-game-square" onClick={onSquareClick}>
      {value}
    </div>
  );
}

interface BoardProps {
  squares: Squares;
  onPlay: (nextSquares: Squares) => void;
}

function Board({ squares, onPlay }: BoardProps) {
  const winner = calculateWinner(squares);

  function handleClick(i: number) {
    if (winner || squares[i]) {
      return;
    }
    const robotIndex = robot.next(i);
    const nextSquares = squares.slice();
    nextSquares[robotIndex] = "O";
    nextSquares[i] = "X";
    onPlay(nextSquares);
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: X";
  }

  return (
    <>
      <div>{status}</div>
      <div className="well-game-board">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Squares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <>
      <button
        onClick={() => {
          setHistory([Array(9).fill(null)]);
          setCurrentMove(0);
          robot.restart();
        }}
      >
        重新开始
      </button>
      <Board squares={currentSquares} onPlay={handlePlay} />
    </>
  );
}

function calculateWinner(squares: Squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
