import type { MutableRefObject, RefCallback } from "react";

type ReactRef<T> = MutableRefObject<T> | RefCallback<T>;

export function mergeRefs<T>(...refs: (ReactRef<T> | null | undefined)[]) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (ref == null || node == null) return;

      if (typeof ref === "function") {
        ref(node);
        return;
      }

      try {
        ref.current = node;
      } catch (e) {
        throw new Error(`${node} to ref ${ref} is impossible.`);
      }
    });
  };
}
