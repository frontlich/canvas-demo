import { memo, useMemo, useState } from "react";
import { robot } from "./robot";

type ISquare = "X" | "O" | null;
type Squares = ISquare[];

export default memo(() => {
  const [steps, setSteps] = useState<number[]>([]);

  const [currentSquares, winner] = useMemo(() => {
    const current = Array(9).fill(null);
    steps.forEach((step, i) => {
      current[step] = i % 2 === 0 ? "X" : "O";
    });
    const winner = calculateWinner(current);
    const len = steps.length;
    if (!winner && len < 9 && len % 2 === 1) {
      const robotStep = robot.next(steps[len - 1]);
      setSteps([...steps, robotStep]);
    }
    return [current, winner];
  }, [steps]);

  const nextPlayer = steps.length % 2 === 0 ? "X" : "O";

  return (
    <div style={{ padding: 20 }}>
      <button
        onClick={() => {
          robot.restart();
          setSteps([]);
        }}
      >
        restart
      </button>
      <div>
        {winner
          ? `the winner is ${winner}`
          : steps.length === 9
          ? "stalemate"
          : `next player: ${nextPlayer}`}
      </div>
      <div className="well-game-board">
        {currentSquares.map((value, i) => (
          <div
            className="well-game-square"
            key={i}
            onClick={() => {
              if (winner || value) return;
              setSteps([...steps, i]);
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
});

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
