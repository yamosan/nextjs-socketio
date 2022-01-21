import { memo, VFC } from "react";
import { Avatar } from "../../../../shared/components/Avatar";

type Props = {
  name: string;
  content: string;
  avatarUrl: string;
};

const _Card: VFC<Props> = ({ name, content, avatarUrl }) => {
  return (
    <div className="flex space-x-4">
      <div className="shrink-0">
        <Avatar src={avatarUrl} alt={name} size={32} />
      </div>
      <div className="min-w-0">
        <span className="text-sm text-gray-400">{name}</span>
        <p className="mt-2 text-base break-words">{content}</p>
      </div>
    </div>
  );
};

export const Card = memo(_Card);
