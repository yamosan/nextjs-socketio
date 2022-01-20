import { useCallback, VFC } from "react";
import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";

type Props = {};

export const TextBox: VFC<Props> = (props) => {
  const [value, setValue] = useState("");

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    setValue("");
    // TODO: send message
  }, []);

  return (
    <div className="flex items-center bg-white rounded-2xl overflow-hidden h-20 shadow-sm shadow-gray-200">
      <input
        type="text"
        value={value}
        placeholder="Write a message..."
        onChange={(e) => setValue(e.target.value)}
        className="h-full w-full outline-none px-12"
      />
      <button
        className="flex items-center justify-center rounded-full h-full px-8 rotate-90 outline-0 group"
        onClick={handleClick}
      >
        <PaperAirplaneIcon className="w-8 h-8 text-indigo-400 transition hover:-rotate-12 group-focus:-rotate-12" />
      </button>
    </div>
  );
};
