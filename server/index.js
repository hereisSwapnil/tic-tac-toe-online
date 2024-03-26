import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let players = [];

io.on("connection", (socket) => {
  players[socket.id] = {
    socket: socket,
    status: "Online",
  };
  socket.on("request_to_play", ({ playerName }) => {
    const currPlayer = players[socket.id];
    currPlayer.playerName = playerName;
    let opponentPlayer;
    for (const player in players) {
      if (
        players[player].status === "Online" &&
        !players[player].playing &&
        player !== socket.id
      ) {
        opponentPlayer = players[player];
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
        console.log(gameState);
        opponentPlayer.socket.emit("playerMoveFromServer", { gameState });
      });
      opponentPlayer.socket.on("playerMoveFromClient", ({ gameState }) => {
        console.log(gameState);
        currPlayer.socket.emit("playerMoveFromServer", { gameState });
      });
    } else {
      currPlayer.socket.emit("OpponentNotFound");
    }
  });
  socket.on("disconnect", () => {
    players[socket.id] = {
      socket: { ...socket, online: false },
      playerName: players[socket.id].playerName,
      status: "Offline",
    };
    const currPlayer = players[socket.id];
    console.log(currPlayer);
    // socket.emit("Opponent Left The Match");
  });
});

httpServer.listen(3000);
