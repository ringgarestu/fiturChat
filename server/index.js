const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"],
  },
});

io.on("Terhubung", (socket) => {
  console.log(`User terhubung: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`Pengguna dengan ID: ${socket.id} telah bergabung pada ruangan ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("Tidak terhubung", () => {
    console.log("Pengguna tidak terhubung", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server sedang berjalan");
});
