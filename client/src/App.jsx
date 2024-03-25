import React, { useEffect, useState } from "react";
import { Grid } from "./components/grid";
import { Heading } from "./components/heading";
import { Result } from "./components/result";
import { Vs } from "./components/vs";

const renderGrid = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function App() {
  const [gameState, setGameState] = useState(renderGrid);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [gameFinished, setGameFinished] = useState(false);
  const [gameFinishedArray, setGameFinishedArray] = useState([]);
  const [playOnline, setPlayOnline] = useState(false);

  const checkWin = () => {
    for (let k = 0; k < 3; k++) {
      if (
        gameState[k][0] === gameState[k][1] &&
        gameState[k][1] === gameState[k][2] &&
        gameState[k][0] !== ""
      ) {
        setGameFinishedArray([k * 3, k * 3 + 1, k * 3 + 2]);
        return gameState[k][0];
      }
      if (
        gameState[0][k] === gameState[1][k] &&
        gameState[1][k] === gameState[2][k] &&
        gameState[0][k] !== ""
      ) {
        setGameFinishedArray([k, k + 3, k + 6]);
        return gameState[0][k];
      }
    }
    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2] &&
      gameState[1][1] !== ""
    ) {
      setGameFinishedArray([0, 4, 8]);
      return gameState[1][1];
    }
    if (
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0] &&
      gameState[1][1] !== ""
    ) {
      setGameFinishedArray([2, 4, 6]);
      return gameState[1][1];
    }
    if (gameState.flat().every((val) => val !== "")) {
      return "draw";
    }
    return false;
  };

  useEffect(() => {
    const winner = checkWin();
    if (winner) {
      setGameFinished(winner);
    }
  }, [gameState]);

  if (!playOnline) {
    return (
      <div className="flex flex-col items-center justify-center lg:h-screen h-[80vh]">
        <h1 className="mb-5 w-auto text-[#ffffffc9] rounded-lg justify-center text-center flex font-bold items-center text-4xl">
          Tic Tac Toe <br /> Online
        </h1>
        <button
          onClick={() => setPlayOnline(true)}
          className="mt-5 bg-[#E3B505] hover:bg-[#A08103] text-2xl text-white font-bold py-2 px-4 rounded"
        >
          Play Online
        </button>
      </div>
    );
  }

  return (
    <>
      <Vs currentPlayer={currentPlayer} />
      <Heading />
      <Grid
        gameState={gameState}
        setGameState={setGameState}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        gameFinished={gameFinished}
        setGameFinished={setGameFinished}
        finishedArrayState={gameFinishedArray}
      />
      <Result
        gameFinished={gameFinished}
        whosChance={currentPlayer}
        won={checkWin}
      />
    </>
  );
}

export default App;
