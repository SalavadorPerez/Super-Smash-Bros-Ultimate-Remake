const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://ssbu-remake.joshkeesee.repl.co", "https://3d-rendering-with-threejs.joshkeesee.repl.co"],
    credentials: true,
  }
});
const port = process.env.PORT || 3000;
const players = {};

function chooseColor(l) {
  if (l < 2) {
    return "blue";
  } else if (l < 3) {
    return "red";
  } else if (l < 4) {
    return "green";
  } else if (l < 5) {
    return "yellow";
  } else if (l < 6) {
    return "indigo";
  } else if (l < 7) {
    return "orange";
  } else if (l < 8) {
    return "purple";
  } else if (l < 9) {
    return "skyblue";
  } else {
    return "white";
  }
};

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  players[socket.id] = {
    x: 0,
    y: -1.2,
    z: 0,
    xVel: 0,
    yVel: 0,
    width: 0.7,
    height: 1.2,
    mass: 1,
    jumpForce: 7,
    jumps: 0,
    maxJumps: 2,
    jumping: false,
    speed: 0.02,
    character: "",
    glbScale: 0.08,
    num: Object.keys(players).length,
    color: chooseColor(Object.keys(players).length),
    frame: 0,
    dir: 0,
    id: socket.id,
    currentMap: "",
    status: "",
    room: "",
  };

  socket.emit("currentPlayers", players);
  socket.broadcast.emit("newPlayer", players[socket.id]);

  socket.on("disconnect", () => {
    io.emit("disconnected", socket.id);
    delete players[socket.id];
  });

  socket.on("playerMovement", (data) => {
    players[socket.id] = data;
    socket.broadcast.emit("playerMoved", players[socket.id]);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});