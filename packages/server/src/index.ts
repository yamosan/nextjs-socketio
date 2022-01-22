import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "@project/common/types/lib/socketIO";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

// TODO: cors
const app = express();
app.use(cors());
const http = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const MESSAGE_SELECT = {
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
};

io.on("connection", async (socket) => {
  console.log(`[${socket.id}] connected`);
  const prevMessages = await prisma.message.findMany({
    orderBy: { createdAt: "asc" },
    select: MESSAGE_SELECT,
  });
  socket.emit("init", prevMessages);

  socket.on("send_message", async (content, sender) => {
    const message = await prisma.message.create({
      data: {
        content,
        sender: {
          connectOrCreate: {
            where: { id: socket.id },
            create: {
              id: socket.id,
              name: sender.name,
              avatarUrl: sender.avatarUrl,
            },
          },
        },
      },
      select: MESSAGE_SELECT,
    });
    io.emit("new_message", message);
  });

  socket.on("disconnect", () => {
    console.log(`[${socket.id}] disconnected`);
  });
});

http.listen(PORT);
