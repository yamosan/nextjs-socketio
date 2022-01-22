import type { Message, User } from "../types";

export interface ServerToClientEvents {
  init: (messages: Message[]) => void;
  new_message: (message: Message) => void;
}

export interface ClientToServerEvents {
  send_message: (content: Message["content"], sender: Pick<User, "name" | "avatarUrl">) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
