type Message = { message: string[]; senderId: string };

export interface ServerToClientEvents {
  receive: (msg: Message) => void;
}

export interface ClientToServerEvents {
  send: (msg: Message) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
