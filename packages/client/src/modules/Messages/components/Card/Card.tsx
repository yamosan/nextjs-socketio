import { memo, VFC } from "react";
import { Avatar } from "../../../../shared/components/Avatar/Avatar";

type Props = {
  name: string;
  content: string;
};

const _Card: VFC<Props> = ({ name, content }) => {
  return (
    <div className="flex space-x-4">
      <div className="shrink-0">
        <Avatar id={name} />
      </div>
      <div className="min-w-0">
        <span className="text-sm text-gray-400">{name}</span>
        <p className="mt-2 text-base break-words">{content}</p>
      </div>
    </div>
  );
};

export const Card = memo(_Card);
