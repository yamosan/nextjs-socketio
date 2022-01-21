export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Message = {
  id: number;
  content: string;
  createdAt: Date;
  sender: User;
};

// POST messages
export type PostMessageInput = {
  content: string;
  senderId: string;
};
export type PostMessagePayload = Message;
