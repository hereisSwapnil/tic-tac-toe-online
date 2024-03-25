import React, { useState } from "react";

const Box = ({
  value,
  index,
  gameState,
  setGameState,
  currentPlayer,
  setCurrentPlayer,
  gameFinished,
  setGameFinished,
  finishedArrayState,
}) => {
  const clickOnBox = () => {
    setGameState((prevState) => {
      const newState = [...prevState];
      const rowIndex = Math.floor(index / 3);
      const colIndex = index % 3;
      if (newState[rowIndex][colIndex] !== "" || gameFinished) {
        return newState;
      }
      newState[rowIndex][colIndex] = currentPlayer;
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      console.log(newState);
      return newState;
    });
  };

  return (
    <div
      className={`bg-[#131C2B] h-20 w-20 text-white rounded-lg justify-center flex items-center font-bold text-6xl ${
        gameState[Math.floor(index / 3)][index % 3] !== "" || gameFinished
          ? "cursor-not-allowed"
          : "cursor-pointer hover:bg-[#385280]"
      } ${finishedArrayState.includes(index) ? "bg-green-700" : "bg-red-700"}`}
      onClick={clickOnBox}
    >
      {value}
    </div>
  );
};

export { Box };
