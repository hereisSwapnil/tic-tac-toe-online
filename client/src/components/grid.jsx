import React from "react";
import { Box } from "./box";

export const Grid = ({
  gameState,
  setGameState,
  currentPlayer,
  setCurrentPlayer,
  gameFinished,
  setGameFinished,
  finishedArrayState,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-[270px] m-auto">
      {gameState.map((row, i) =>
        row.map((value, j) => (
          <Box
            key={i * 3 + j}
            index={i * 3 + j}
            value={value}
            gameState={gameState}
            setGameState={setGameState}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            gameFinished={gameFinished}
            setGameFinished={setGameFinished}
            finishedArrayState={finishedArrayState}
          />
        ))
      )}
    </div>
  );
};
