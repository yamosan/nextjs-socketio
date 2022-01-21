import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "@project/common/types/socketIO";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

const app = express();
const http = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(http, {
  // TODO
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/messages", async (req, res) => {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      content: true,
      createdAt: true,
      sender: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
  });
  res.json(messages);
});

io.on("connection", (socket) => {
  console.log(`[${socket.id}] connected`);

  socket.on("send", (data) => {
    console.log(`[send]: ${data} @${socket.id}`);
    io.emit("receive", { ...data, senderId: socket.id });
  });

  socket.on("disconnect", () => {
    console.log(`[${socket.id}] disconnected`);
  });
});

http.listen(PORT);
