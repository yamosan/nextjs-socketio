import type { ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen h-0 bg-slate-100 overflow-x-hidden">
      <header className="fixed h-16 w-full flex justify-center items-center bg-white border-b">
        <div className="flex justify-start w-full max-w-app mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">Chat</h1>
        </div>
      </header>
      <main className="pt-16 h-full">{children}</main>
    </div>
  );
};
