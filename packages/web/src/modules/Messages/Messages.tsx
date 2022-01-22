import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { useMessage } from "../../providers/message";
import { useUser } from "../../providers/user";
import { Card } from "./components/Card/Card";
import { TextBox } from "./components/TextBox";
import { useScrollBottom } from "./hooks/useScrollBottom";

export const Messages: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isBottom, scrollBottom } = useScrollBottom(containerRef);
  const { user } = useUser();
  const { loading, messages, sendMessage } = useMessage();

  useEffect(() => {
    scrollBottom();
  }, [loading]);

  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto pt-6 sm:pt-12 pb-28 sm:pb-36" ref={containerRef}>
        <div className="max-w-app w-11/12 mx-auto flex flex-col-reverse space-y-reverse space-y-7">
          {!loading &&
            [...messages]
              .reverse()
              .map(({ id, sender, content }) => (
                <Card name={sender.name} content={content} avatarUrl={sender.avatarUrl} key={id} />
              ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="max-w-app mx-auto sm:w-11/12 sm:mb-8">
          <TextBox onSubmit={(content) => sendMessage(content, user)} />
        </div>
      </div>
    </div>
  );
};
