import React from "react";

export const Vs = ({
  currentPlayer,
  yourPlayer,
  opponentPlayer,
  playingAs,
}) => {
  return (
    <div className="w-auto justify-center flex flex-col text-xl my-3 text-white">
      <h2
        className={`text-left underline-offset-4 ${
          currentPlayer == playingAs ? "underline" : ""
        }`}
      >
        {yourPlayer} ({playingAs}){/* (O) */}
      </h2>
      <h3 className="text-center">Vs</h3>
      <h2
        className={`text-right underline-offset-4 ${
          currentPlayer == playingAs ? "" : "underline"
        }`}
      >
        {opponentPlayer} ({playingAs === "O" ? "X" : "O"}){/* (X) */}
      </h2>
    </div>
  );
};
