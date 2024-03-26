import React, { useEffect, useState } from "react";
import { Grid } from "./components/grid";
import { Heading } from "./components/heading";
import { Result } from "./components/result";
import { Vs } from "./components/vs";
import io from "socket.io-client";

const renderGrid = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function App() {
  const [gameState, setGameState] = useState(renderGrid);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameFinishedArray, setGameFinishedArray] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [playOnline, setPlayOnline] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [socket, setSocket] = useState(null);
  const [playerNameError, setPlayerNameError] = useState(false);
  const [opponentName, setOpponentName] = useState(null);
  const [playingAs, setPlayingAs] = useState(null);

  const playOnlineClick = () => {
    const newSocket = io("http://localhost:3000", {
      autoConnect: true,
    });
    newSocket?.emit("request_to_play", {
      playerName,
    });
    setSocket(newSocket);
  };

  const playAgain = () => {
    setGameState([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setGameFinished(false);
    setGameFinishedArray([]);
    setCurrentPlayer(null);
    setPlayOnline(false);
    setOpponentName(null);
    setPlayingAs(null);
    playOnlineClick();
  };

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

  // socket?.on("connect", () => {
  //   setPlayOnline(true);
  // });

  socket?.on("playerMoveFromServer", ({ gameState }) => {
    setGameState(gameState);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    // console.log(gameState);
  });

  socket?.on("OpponentNotFound", () => {
    setOpponentName(null);
  });

  socket?.on("OpponentFound", ({ opponentName, playingAs, turn }) => {
    setOpponentName(opponentName);
    setPlayOnline(true);
    setPlayingAs(playingAs);
    setCurrentPlayer(turn ? playingAs : playingAs === "O" ? "X" : "O");
  });

  socket?.on("OpponentLeftTheMatch", () => {
    console.log("left");
    gameFinished("Opponent Left The Match");
  });

  // useEffect(() => {
  //   if (socket?.connected) {
  //     console.log(socket);
  //     setPlayOnline(true);
  //   }
  // }, [socket]);

  useEffect(() => {
    const winner = checkWin();
    if (winner) {
      setGameFinished(winner);
    }
  }, [gameState]);

  const handleStartOnlineGame = () => {
    setShowPopup(false);
    playOnlineClick();
  };

  return (
    <>
      {showPopup ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-white w-[80vw] lg:w-[500px] rounded-lg p-8">
            <h1 className="mb-5 w-auto bg-white text-[#1b1818c9] rounded-lg flex font-bold items-center text-4xl">
              Enter your name
            </h1>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 bg-white border text-[#1b1818c9] border-gray-300 rounded-md"
            />
            {playerNameError && playerNameError ? (
              <p className="text-red-500 text-sm mt-2 bg-white">
                Please enter a valid name...
              </p>
            ) : null}
            <button
              onClick={() => {
                if (playerName === "") {
                  setPlayerNameError(true);
                  return;
                }
                setPlayerNameError(false);
                setShowPopup(false);
                handleStartOnlineGame();
              }}
              className="mt-5 bg-[#E3B505] hover:bg-[#A08103] text-2xl text-white font-bold py-2 px-4 rounded"
            >
              Start
            </button>
          </div>
        </div>
      ) : playerName ? (
        playOnline ? (
          <>
            <Vs
              currentPlayer={currentPlayer}
              playingAs={playingAs}
              yourPlayer={playerName}
              opponentPlayer={opponentName}
            />
            <Heading />
            <Grid
              socket={socket}
              gameState={gameState}
              setGameState={setGameState}
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              gameFinished={gameFinished}
              setGameFinished={setGameFinished}
              finishedArrayState={gameFinishedArray}
              playAgain={playAgain}
              playingAs={playingAs}
            />
            <Result
              gameFinished={gameFinished}
              yourChance={currentPlayer == playingAs ? true : false}
              won={checkWin}
              playingAs={playingAs}
            />
          </>
        ) : (
          <h1 className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            {!opponentName ? (
              <h1 className="mb-5 w-auto text-[#ffffffc9] rounded-lg text-center font-bold text-4xl">
                Searching for opponent
              </h1>
            ) : null}
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </h1>
        )
      ) : (
        <div className="flex flex-col items-center justify-center lg:h-screen h-[80vh]">
          <h1 className="mb-5 w-auto text-[#ffffffc9] rounded-lg justify-center text-center flex font-bold items-center text-4xl">
            Tic Tac Toe <br /> Online
          </h1>
          <button
            onClick={() => setShowPopup(true)}
            className="mt-5 bg-[#E3B505] hover:bg-[#A08103] text-2xl text-white font-bold py-2 px-4 rounded"
          >
            Play Online
          </button>
        </div>
      )}
    </>
  );
}

export default App;
