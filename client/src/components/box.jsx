import React, { useState } from "react";

const Box = ({
  value,
  index,
  socket,
  gameState,
  setGameState,
  currentPlayer,
  setCurrentPlayer,
  gameFinished,
  finishedArrayState,
  playingAs,
}) => {
  const clickOnBox = () => {
    setGameState((prevState) => {
      const newState = [...prevState];
      const rowIndex = Math.floor(index / 3);
      const colIndex = index % 3;
      if (
        newState[rowIndex][colIndex] !== "" ||
        gameFinished ||
        currentPlayer !== playingAs
      ) {
        return newState;
      }
      newState[rowIndex][colIndex] = currentPlayer;
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      if (newState.flat().includes("X") || newState.flat().includes("O")) {
        socket?.emit("playerMoveFromClient", {
          gameState: newState,
          currentPlayer: currentPlayer === "X" ? "O" : "X",
        });
      }
      return newState;
    });
  };

  return (
    <div
      className={`bg-[#131C2B] h-20 w-20 text-white rounded-lg justify-center flex items-center font-bold text-6xl ${
        gameState[Math.floor(index / 3)][index % 3] !== "" ||
        gameFinished ||
        currentPlayer !== playingAs
          ? "cursor-not-allowed"
          : "cursor-pointer hover:bg-[#385280]"
      } ${
        finishedArrayState.includes(index) && gameFinished
          ? gameFinished == playingAs
            ? "bg-green-700"
            : "bg-red-700"
          : ""
      }`}
      onClick={clickOnBox}
    >
      {value}
    </div>
  );
};

export { Box };
