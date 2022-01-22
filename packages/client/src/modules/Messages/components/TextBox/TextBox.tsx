import { memo, useCallback, VFC } from "react";
import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  onSubmit: (content: string) => void;
};

const _TextBox: VFC<Props> = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      onSubmit(value);
      setValue("");
    },
    [value]
  );

  return (
    <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-sm shadow-gray-200 min-h-[80px] h-max">
      <TextareaAutosize
        value={value}
        maxLength={1000}
        placeholder="Write a message..."
        onChange={(e) => setValue(e.target.value)}
        className="h-full w-full outline-none px-12 py-5 break-words resize-none overflow-auto"
      />

      <button
        className="flex items-center justify-center rounded-full h-full px-8 rotate-90 outline-0 group"
        onClick={handleClick}
        disabled={value === ""}
      >
        <PaperAirplaneIcon className="w-8 h-8 text-indigo-400 transition hover:-rotate-12 group-focus:-rotate-12 group-disabled:rotate-0 group-disabled:opacity-50" />
      </button>
    </div>
  );
};

export const TextBox = memo(_TextBox);
