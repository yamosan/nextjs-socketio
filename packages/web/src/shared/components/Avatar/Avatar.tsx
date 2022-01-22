import type { ComponentProps, VFC } from "react";
import { memo } from "react";
import Image from "next/image";

type Props = {
  size: number;
  padding?: number;
} & Omit<ComponentProps<typeof Image>, "width" | "height">;

const _Avatar: VFC<Props> = ({ size, padding, ...attrs }) => {
  const pad = padding || size / 4;
  return (
    <div
      className="aspect-square flex justify-center items-center rounded-full overflow-hidden bg-slate-200"
      style={{ padding: `${pad}px` }}
    >
      <Image width={size - pad * 2} height={size - pad * 2} {...attrs} />
    </div>
  );
};

export const Avatar = memo(_Avatar);
