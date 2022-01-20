import { memo, VFC } from "react";
import Image from "next/image";

type Props = {
  id: string;
};

const _Avatar: VFC<Props> = ({ id }) => {
  return (
    <div className="aspect-square flex justify-center items-center rounded-full overflow-hidden">
      <Image
        src={`https://i.pravatar.cc/48/?u=${id}`}
        width={48}
        height={48}
        alt="avatar"
      />
    </div>
  );
};

export const Avatar = memo(_Avatar);
