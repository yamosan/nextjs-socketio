import dotenvFlow from "dotenv-flow";
import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "@project/common/types/lib/socketIO";
import { prisma } from "./lib/prisma";

dotenvFlow.config();

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>({
  cors: {
    origin: process.env.FRONTEND_HOST,
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

io.listen(5000);
