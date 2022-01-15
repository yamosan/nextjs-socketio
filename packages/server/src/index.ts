import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("hello world");
});

io.on("connection", (socket) => {
  console.log(`[${socket.id}] connected`);

  socket.on("ping", (data) => {
    console.log(`[ping]: ${data} @${socket.id}`);
    socket.emit("pong", "pong");
  });

  socket.on("disconnect", () => {
    console.log(`[${socket.id}] disconnected`);
  });
});

http.listen(PORT);
