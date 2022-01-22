import Link from "next/link";
import type { ReactNode, VFC } from "react";
import { useUser } from "../../../providers/user";
import { Avatar } from "../Avatar";

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = ({ children }) => {
  const { user } = useUser();
  return (
    <div className="min-h-screen h-0 bg-slate-100 overflow-x-hidden">
      <header className="fixed h-16 w-full flex justify-center items-center bg-white border-b">
        <div className="flex justify-between items-center max-w-app mx-auto w-11/12">
          <Link href="/">
            <a>
              <h1 className="text-2xl font-bold text-gray-800">Chat</h1>
            </a>
          </Link>
          <div>
            {user && (
              <Link href="/messages">
                <a>
                  <Avatar src={user.avatarUrl} size={32} alt={user.name} />
                </a>
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="pt-16 h-full">{children}</main>
    </div>
  );
};
