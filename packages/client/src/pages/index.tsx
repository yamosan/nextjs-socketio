import type { NextPage } from "next";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { io, Socket } from "socket.io-client";

const Home: NextPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socketIo = io("http://localhost:5000");
    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("socket connected");
    });

    socketIo.on("pong", (data) => {
      console.log("[pong]", data);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.currentTarget as typeof e.currentTarget & {
        message: { value: string };
      };

      socket.emit("ping", target.message.value);
    },
    [socket]
  );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Message</h1>
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

export default Home;
