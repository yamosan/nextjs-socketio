import type { NextPage } from "next";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import { useStore } from "../../stores/store";
import { useRouter } from "next/router";
import { Avatar } from "../../shared/components/Avatar";
import { RefreshIcon } from "@heroicons/react/outline";
import { useRandomEmojiUrl } from "./hooks/useRandomEmojiUrl";

export const Top: NextPage = () => {
  const router = useRouter();
  const { dispatch } = useStore();
  const { loading, emoji, update } = useRandomEmojiUrl();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: "signin",
      payload: {
        user: {
          name: username,
          avatar: { src: emoji.src, alt: emoji.name },
        },
      },
    });
    router.push("/messages");
  };

  if (loading) return null;
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl font-bold mb-4">Top Page</h1>

      <div className="relative mb-4">
        {emoji && <Avatar src={emoji.src} size={96} alt={emoji.name} />}
        <button type="button" onClick={update} className="absolute -right-2 -bottom-2">
          <RefreshIcon className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <label className="text-xs block text-gray-600">名前</label>
          <input
            type="text"
            name="name"
            maxLength={20}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-2 border-2 border-gray-400 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={!username}
          className="mt-4 mx-auto block px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          参加する
        </button>
      </form>
    </div>
  );
};
