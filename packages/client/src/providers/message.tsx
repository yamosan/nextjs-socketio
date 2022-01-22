import type { Message } from "@project/common/types/types";
import { createContext, useContext, useMemo, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "@project/common/types/lib/socketIO";

type IO = Socket<ServerToClientEvents, ClientToServerEvents>;

type MessageContext = {
  loading: boolean;
  messages: Message[];
  sendMessage: (content: string, sender: { name: string; avatarUrl: string }) => void;
};

const MessageContext = createContext<MessageContext>({} as MessageContext);

// Hooks
export const useMessage = () => useContext(MessageContext);

// Provider
type State = {
  data: Message[];
  loading: boolean;
};
const MessageProvider: React.VFC<{
  children: ReactNode;
}> = ({ children }) => {
  const [messages, setMessages] = useState<State>({
    data: [],
    loading: true,
  });
  const [socket, setSocket] = useState<IO | null>(null);

  useEffect(() => {
    const socket: IO = io("http://localhost:5000", {
      reconnection: false,
    });
    setSocket(socket);

    socket.on("connect", () => {
      console.log("[->connect]");
    });

    socket.on("disconnect", (reason) => {
      console.log("[->disconnect]:", reason);
    });

    socket.on("init", (messages) => {
      console.log("[->init]:", messages);
      setMessages({
        data: messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
        loading: false,
      });
    });

    socket.on("new_message", (data) => {
      console.log("[->new_message]:", data);
      setMessages((prev) => ({
        data: [...prev.data, data],
        loading: false,
      }));
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const sendMessage = useCallback<MessageContext["sendMessage"]>(
    (content, sender) => {
      console.log("[sendMessage->]:", content);
      if (socket) {
        socket.emit("send_message", content, sender);
      }
    },
    [socket]
  );

  return (
    <MessageContext.Provider
      value={{
        loading: messages.loading,
        messages: messages.data,
        sendMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
