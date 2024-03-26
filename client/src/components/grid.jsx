import React from "react";
import { Box } from "./box";

export const Grid = ({
  socket,
  gameState,
  setGameState,
  currentPlayer,
  setCurrentPlayer,
  gameFinished,
  setGameFinished,
  finishedArrayState,
  playingAs,
  playAgain,
}) => {
  return !gameFinished ? (
    <div className="grid grid-cols-3 gap-4 w-[270px] m-auto">
      {gameState.map((row, i) =>
        row.map((value, j) => (
          <Box
            key={i * 3 + j}
            index={i * 3 + j}
            value={value}
            socket={socket}
            gameState={gameState}
            setGameState={setGameState}
            currentPlayer={currentPlayer}
            playingAs={playingAs}
            setCurrentPlayer={setCurrentPlayer}
            gameFinished={gameFinished}
            setGameFinished={setGameFinished}
            finishedArrayState={finishedArrayState}
          />
        ))
      )}
    </div>
  ) : (
    <div className="w-[270px] h-[270px] flex justify-center items-center m-auto bg-[#131c2b88] rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "rgb(31 46 71 / 53%)",
          cursor: "pointer",
        }}
        onClick={playAgain}
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M7.32.029a8 8 0 0 1 7.18 3.307V1.75a.75.75 0 0 1 1.5 0V6h-4.25a.75.75 0 0 1 0-1.5h1.727A6.5 6.5 0 0 0 1.694 6.424A.75.75 0 1 1 .239 6.06A8 8 0 0 1 7.319.03Zm-3.4 14.852A8 8 0 0 0 15.76 9.94a.75.75 0 0 0-1.455-.364A6.5 6.5 0 0 1 2.523 11.5H4.25a.75.75 0 0 0 0-1.5H0v4.25a.75.75 0 0 0 1.5 0v-1.586a8 8 0 0 0 2.42 2.217"
          clip-rule="evenodd"
          color="#fff"
        />
      </svg>
    </div>
  );
};
