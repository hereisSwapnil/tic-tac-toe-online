import React from "react";

export const Result = ({ gameFinished = false, whosChance }) => {
  return !gameFinished ? (
    <div className="text-white text-xl mt-5 text-center">
      {" "}
      {whosChance}'s chance
    </div>
  ) : gameFinished === "draw" ? (
    <div className="text-white text-xl mt-5 text-center"> It's a draw</div>
  ) : (
    <div className="text-white text-xl mt-5 text-center">
      {" "}
      {gameFinished} won the game
    </div>
  );
};
