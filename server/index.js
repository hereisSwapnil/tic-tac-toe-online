import { createServer } from "http";
import { Server } from "socket.io";
const dotenv = require("dotenv");

dotenv.config({
  path: ".env",
});

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URI,
  },
});

let players = {};

io.on("connection", (socket) => {
  players[socket.id] = {
    socket: socket,
    status: "Online",
  };
  socket.on("request_to_play", ({ playerName }) => {
    const currPlayer = players[socket.id];
    currPlayer.playerName = playerName;
    let opponentPlayer;
    for (const playerId in players) {
      if (
        players[playerId].status === "Online" &&
        !players[playerId].playing &&
        playerId !== socket.id
      ) {
        opponentPlayer = players[playerId];
        break;
      }
    }
    if (opponentPlayer) {
      currPlayer.playing = true;
      opponentPlayer.playing = true;
      currPlayer.opponent = opponentPlayer;
      opponentPlayer.opponent = currPlayer;

      currPlayer.socket.emit("OpponentFound", {
        opponentName: opponentPlayer.playerName,
        playingAs: "O",
        turn: true,
      });
      opponentPlayer.socket.emit("OpponentFound", {
        opponentName: currPlayer.playerName,
        playingAs: "X",
        turn: false,
      });

      currPlayer.socket.on("playerMoveFromClient", ({ gameState }) => {
        // console.log(gameState);
        opponentPlayer.socket.emit("playerMoveFromServer", { gameState });
      });
      opponentPlayer.socket.on("playerMoveFromClient", ({ gameState }) => {
        // console.log(gameState);
        currPlayer.socket.emit("playerMoveFromServer", { gameState });
      });
    } else {
      currPlayer.socket.emit("OpponentNotFound");
    }
  });
  socket.on("disconnect", () => {
    const disconnectedPlayer = players[socket.id];
    disconnectedPlayer.playing = false;
    disconnectedPlayer.status = "Offline";
    if (disconnectedPlayer.opponent) {
      disconnectedPlayer.opponent.socket.emit("OpponentLeftTheMatch");
      delete disconnectedPlayer.opponent.opponentName;
      delete disconnectedPlayer.opponent.playingAs;
      delete disconnectedPlayer.opponent.turn;
    }
    // delete players[socket.id];
    // console.log(players);
  });
});

httpServer.listen(3000);
