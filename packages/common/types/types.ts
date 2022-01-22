export type User = {
  name: string;
  avatarUrl: string;
};

export type Message = {
  id: number;
  content: string;
  createdAt: Date;
  sender: User;
};
