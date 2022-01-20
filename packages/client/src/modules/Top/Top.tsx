import type { NextPage } from "next";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import { useStore } from "../../stores/store";
import { useRouter } from "next/router";

export const Top: NextPage = () => {
  const router = useRouter();
  const { username, setUsername } = useStore();

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/messages");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl font-bold mb-4">Top Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <label className="text-xs block text-gray-600">名前</label>
          <input
            type="text"
            name="name"
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
