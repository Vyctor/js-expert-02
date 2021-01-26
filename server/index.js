const server = require("http").createServer((request, response) => {
  response.writeHead(204, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  });
  response.end("Hey there!");
});

const { start } = require("repl");
const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

io.on("connection", (socket) => {
  console.log("connection: ", socket.id);
  socket.on("join-room", (roomId, userId) => {
    // adiciona os usuários na mesma sala
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-conected", userId);
    socket.on("disconnect", () => {
      console.log("disconnected: ", roomId, userId);
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

const startServer = () => {
  const { address, port } = server.address();
  console.log(`app running at ${address}:${port}`);
};

server.listen(process.env.PORT || 3000, startServer);
