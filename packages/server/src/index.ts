import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;

const app = express();
const http = createServer(app);
const io = new Server(http);

app.get("/", (req, res) => {
  res.send("hello world");
});

http.listen(PORT);
