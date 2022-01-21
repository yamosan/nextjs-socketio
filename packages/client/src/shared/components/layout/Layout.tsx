import Link from "next/link";
import type { ReactNode, VFC } from "react";
import { useStore } from "../../../stores/store";
import { Avatar } from "../Avatar";

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = ({ children }) => {
  const { state } = useStore();
  return (
    <div className="min-h-screen h-0 bg-slate-100 overflow-x-hidden">
      <header className="fixed h-16 w-full flex justify-center items-center bg-white border-b">
        <div className="flex justify-between items-center w-full max-w-app mx-auto">
          <Link href="/">
            <a>
              <h1 className="text-2xl font-bold text-gray-800">Chat</h1>
            </a>
          </Link>
          <div>{state.user && <Avatar src={state.user.avatarUrl} size={32} alt={state.user.name} />}</div>
        </div>
      </header>
      <main className="pt-16 h-full">{children}</main>
    </div>
  );
};
