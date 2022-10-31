import { css } from "@emotion/css";
import { memo } from "react";

interface Props {
  value: string;
  angle: number;
  radius: number;
}

function Item({ value, angle, radius }: Props) {
  return (
    <div
      className={css`
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.7;
        color: rgba(0, 0, 0, 0.9);
        backface-visibility: hidden;
        transform: ${"rotateX(" + angle + "deg) translateZ(" + radius + "px)"};
      `}
    >
      <p
        className={css`
          font-size: 36px;
          font-weight: bold;
          text-align: center;
        `}
      >
        {value}
      </p>
    </div>
  );
}

export const RingItem = memo(Item);
