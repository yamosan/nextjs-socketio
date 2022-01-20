import type { NextPage } from "next";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@project/common/types/socketIO";

const Home: NextPage = () => {
  const [socket, state] = useSocket();

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.currentTarget as typeof e.currentTarget & {
        message: { value: string };
      };

      socket.emit("send", { message: target.message.value });
    },
    [socket]
  );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Message</h1>

      <div className="flex flex-col justify-start w-80 px-4 py-4 border-2">
        {state.messages.map((message, i) => (
          <p key={i.toString()}>
            <span className="text-sm">[{message.senderId}]:</span>{" "}
            {message.message}
          </p>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          name="message"
          className="px-2 border-2 border-gray-400"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded w-min"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

type Message = { message: string[]; senderId: string };
type State = {
  messages: Message[];
};

const useSocket = (): [Socket, State] => {
  const [state, setState] = useState<State>({
    messages: [],
  });

  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:5000",
      {
        reconnection: false,
      }
    );
    setSocket(socket);

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("disconnect", (reason) => {
      console.log("socket disconnected:", reason);
    });

    socket.on("receive", (data) => {
      console.log("[receive]", data);
      setState((prev) => ({
        messages: [...prev.messages, data],
      }));
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return [socket, state];
};

export default Home;
