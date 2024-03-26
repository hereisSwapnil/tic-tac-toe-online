import React from "react";

export const Result = ({ gameFinished, yourChance, playingAs }) => {
  return !gameFinished ? (
    <div className="text-white text-xl mt-5 text-center">
      {yourChance ? "It's your chance" : "Waiting for opponent to play..."}
    </div>
  ) : gameFinished === "draw" ? (
    <div className="text-white text-xl mt-5 text-center">It's a draw 😶</div>
  ) : gameFinished === "Opponent Left The Match" ? (
    <div className="text-white text-xl mt-5 text-center">
      Opponent left the game 😢
    </div>
  ) : (
    <div className="text-white text-xl mt-5 text-center">
      {gameFinished == playingAs
        ? "You won the game 🎉"
        : "Better luck next time 😢"}
    </div>
  );
};
