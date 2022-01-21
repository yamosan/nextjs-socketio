import type { NextPage } from "next";
import { useState } from "react";
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
          avatarUrl: emoji.src,
        },
      },
    });
    router.push("/messages");
  };

  if (loading) return null;
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl font-bold mb-6">Set up your profile</h1>

      <div className="relative mb-4">
        {emoji && <Avatar src={emoji.src} size={96} alt={emoji.name} />}
        <button type="button" onClick={update} className="absolute -right-0.5 -bottom-0.5 text-indigo-400">
          <RefreshIcon className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <label className="text-xs block text-gray-400">name</label>
          <input
            type="text"
            name="name"
            maxLength={20}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-2 rounded shadow-sm shadow-gray-200 h-7"
          />
        </div>
        <button
          type="submit"
          disabled={!username}
          className="mt-4 mx-auto block px-6 py-1.5 bg-indigo-400 text-white rounded disabled:opacity-50"
        >
          join
        </button>
      </form>
    </div>
  );
};
