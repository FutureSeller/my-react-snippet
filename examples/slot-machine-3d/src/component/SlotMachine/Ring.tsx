import { useCallback, useMemo } from "react";
import { css, keyframes } from "@emotion/css";

import { RingItem } from "./RingItem";

import type { PropsWithChildren, HTMLAttributes } from "react";

export interface RingProps extends HTMLAttributes<HTMLDivElement> {
  values: string[];
  target: number | null;
  duration?: number;
  onAnimationEnd?: () => void;
}

export function Ring({
  values,
  target,
  duration = 1,
  onAnimationEnd,
  ...restAttributes
}: RingProps) {
  const numberOfItems = values.length;

  const animationName = useMemo(() => {
    if (target == null) {
      return null;
    }

    return xSpin(720 - 360 * (target / numberOfItems));
  }, [target]);

  const handleComplete = useCallback((node: HTMLDivElement | null) => {
    if (!node) {
      return;
    }

    const handleAnimationEnd = () => {
      onAnimationEnd?.();
    };

    node.addEventListener("animationend", handleAnimationEnd);

    return () => {
      node.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return (
    <div
      ref={handleComplete}
      className={css`
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;

        animation-name: ${animationName};
        animation-duration: ${duration}s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
      `}
      {...restAttributes}
    >
      {values.map((value, index) => (
        <RingItem
          key={`${value}-${index}`}
          value={value}
          angle={getAngle(index, numberOfItems)}
          radius={getRadius(numberOfItems)}
        />
      ))}
    </div>
  );
}

export const xSpin = (target: number) => keyframes`
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(${target}deg);
  }
`;

export const getAngle = (index: number, length: number) =>
  (360 * index) / length;

export const getRadius = (length: number) => (length * 100) / (Math.PI * 2);

export function RingContainer({ children }: PropsWithChildren) {
  return (
    <div
      className={css`
        overflow: hidden;
        background: #fff;
        width: 100px;
        height: 100px;
        border-radius: 10px;
      `}
    >
      {children}
    </div>
  );
}
