const socket = io();
var players = {
  offline: {
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
    num: 1,
    color: "blue",
    frame: 0,
    dir: 0,
    id: "offline",
    currentMap: "",
    status: "",
    room: "",
  }
};
var myId = "offline";
var initiated = false;
var animateFrame, syncGame, updatePlayer, gameLoop, rooms;

socket.on("currentRooms", (data) => {
  rooms = data;
});

socket.on("currentPlayers", (data) => {
  players = data;
  
  // if (sessionStorage.getItem("gameSave")) {
  //   players[socket.id] = JSON.parse(sessionStorage.getItem("gameSave"));
  // }

  myId = socket.id;
  players[socket.id].id = socket.id;

  if (initiated) return;
  initiated = true;
  
  cancelAnimationFrame(animateFrame);
  clearInterval(syncGame);
  syncGame = setInterval(syncWithServer, 1000 / 60);
  
  initGame();
});

socket.on("playerMoved", (player) => {
  players[player.id] = player;
});

socket.on("newPlayer", (player) => {
  players[player.id] = player;
  createPlayer(player);
});

socket.on("disconnected", (id) => {
  delete players[id];
});

function syncWithServer() {
  if (!socket.connected) return;
  socket.emit("playerMovement", players[myId]);
}