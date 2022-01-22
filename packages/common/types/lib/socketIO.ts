import type { Message } from "../types";

export interface ServerToClientEvents {
  init: (messages: Message[]) => void;
  new_message: (message: Message) => void;
}

export interface ClientToServerEvents {
  send_message: (content: string, sender: { avatarUrl: string; name: string }) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
