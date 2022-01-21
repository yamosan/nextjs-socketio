import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { Card } from "./components/Card/Card";
import { TextBox } from "./components/TextBox";
import { useScrollBottom } from "./hooks/useScrollBottom";

const LOREM100 =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptatibus iure libero quam fugit! Labore ad dolor cumque ipsam debitis, eveniet vel rerum blanditiis sit officiis nemo numquam unde consequatur quo reiciendis ullam repellat minima reprehenderit enim id harum laudantium exercitationem! Libero corporis et doloribus labore eaque quos delectus eligendi error cum a accusantium facilis, dolores quo commodi esse impedit quas ratione consequuntur. Sit, fugit enim assumenda ab modi nihil, optio, commodi libero saepe ut ipsa? Libero eius ab, soluta qui architecto facere nulla vel sit doloremque blanditiis, pariatur debitis rem sapiente, ullam illum eveniet eaque nisi voluptates et odio.";
const AVATAR_URL = "https://github.githubassets.com/images/icons/emoji/unicode/2708.png?v8";
const DATA = [
  {
    sender: "Alice",
    content: LOREM100,
    avatarUrl: AVATAR_URL,
  },
  {
    sender: "Bob",
    content: LOREM100,
    avatarUrl: AVATAR_URL,
  },
  {
    sender: "Charlie",
    content: LOREM100,
    avatarUrl: AVATAR_URL,
  },
];

export const Messages: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isBottom, scrollBottom } = useScrollBottom(containerRef);

  useEffect(() => {
    scrollBottom();
  }, []);

  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto pt-12 pb-36" ref={containerRef}>
        <div className="max-w-app mx-auto flex flex-col-reverse space-y-reverse space-y-7">
          {DATA.reduce((pre, cur) => [...pre, cur, cur, cur, cur], []).map(({ sender, content, avatarUrl }, i) => (
            <Card name={sender} content={content} avatarUrl={avatarUrl} key={i} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="max-w-app mx-auto mb-8">
          <TextBox />
        </div>
      </div>
    </div>
  );
};
