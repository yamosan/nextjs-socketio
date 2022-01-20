import type { NextPage } from "next";
import { useCallback } from "react";
import type { FormEvent } from "react";

// 名前とアイコン設定して、ユーザーを作成する画面
// グローバルステイトを登録
export const Top: NextPage = () => {
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget as typeof e.currentTarget & {
      name: { value: string };
    };
    console.log({ name: target.name.value });
  }, []);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Top Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <label className="text-xs block text-gray-600">名前</label>
          <input
            type="text"
            name="name"
            className="px-2 border-2 border-gray-400 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 mx-auto block px-3 py-1 bg-blue-500 text-white rounded"
        >
          参加する
        </button>
      </form>
    </main>
  );
};
