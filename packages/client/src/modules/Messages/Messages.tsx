import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { useMessage } from "../../stores/message";
import { useStore } from "../../stores/store";
import { Card } from "./components/Card/Card";
import { TextBox } from "./components/TextBox";
import { useScrollBottom } from "./hooks/useScrollBottom";

export const Messages: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isBottom, scrollBottom } = useScrollBottom(containerRef);
  const { state } = useStore();
  const { loading, messages, sendMessage } = useMessage();

  useEffect(() => {
    scrollBottom();
  }, [loading]);

  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto pt-12 pb-36" ref={containerRef}>
        <div className="max-w-app mx-auto flex flex-col-reverse space-y-reverse space-y-7">
          {!loading &&
            [...messages]
              .reverse()
              .map(({ id, sender, content }) => (
                <Card name={sender.name} content={content} avatarUrl={sender.avatarUrl} key={id} />
              ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="max-w-app mx-auto mb-8">
          <TextBox onSubmit={(content) => sendMessage(content, state.user)} />
        </div>
      </div>
    </div>
  );
};
