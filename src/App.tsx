import { useState } from "react";
import { wonConditions } from "./constants";
import "./App.css";

type CurrentPanel = { X: number[]; O: number[] };

const App = () => {
  const [panel, setPanel] = useState(new Array(9).fill(null));
  const [player, setPlayer] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>("");

  const findWinnerPlayer = (
    currentPanel: CurrentPanel,
    panelLength: number
  ) => {
    const won = wonConditions.reduce(
      (acc, crr) => {
        if (crr.every((item) => currentPanel.X.includes(item))) {
          acc.X = true;
          acc.XMoves = currentPanel.X;
        }
        if (crr.every((item) => currentPanel.O.includes(item))) {
          acc.O = true;
          acc.OMoves = currentPanel.O;
        }
        return acc;
      },
      { X: false, XMoves: [] as number[], O: false, OMoves: [] as number[] }
    );

    if (won.X || won.O) {
      setWinner(won.X ? "X" : "O");
    }

    if (!won.X && !won.O && panelLength === 9) {
      setWinner("Game Draw !");
    }
  };

  const onPlayerAction = (index: number) => {
    if (panel[index] || winner) return;
    const newPanel = [...panel];
    newPanel[index] = player ? "X" : "O";

    const currentPanel = newPanel.reduce(
      (acc, crr, index) => {
        if (crr === "X") acc.X.push(index);
        if (crr === "O") acc.O.push(index);
        return acc;
      },
      { X: [], O: [] }
    );

    if (newPanel.filter(Boolean).length >= 5) {
      findWinnerPlayer(currentPanel, newPanel.filter(Boolean).length);
    }

    setPanel(newPanel);
    setPlayer(!player);
  };

  const reset = () => {
    setPanel(new Array(9).fill(null));
    setPlayer(true);
    setWinner("");
  };

  return (
    <div className="App">
      {!winner && (
        <div className="panel">
          {panel.map((item: number, index: number) => {
            return (
              <div
                className="item"
                key={index}
                onClick={() => onPlayerAction(index)}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
      {winner && (
        <div className="win">
          {winner === "X" || winner === "O" ? `${winner} winner !` : winner}
          <button onClick={reset} className="button-reset">
            New Game
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
