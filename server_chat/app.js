const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 3030;
const app = express();

app.use(cors());

const server = app.listen(port, () => {
  console.log(`connected successfully to port ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("message", ({ username, message, time }) => {
    io.emit("message", { username, message, time });
  });
  socket.on("typing", (data) => {
    console.log("typing event catched");
    io.emit("typing", data);
  });
});
