import React from "react";

const map = new Map<string, React.RefObject<unknown>>();

function setRef<T>(key: string) {
  if (!key) return;
  const ref = React.createRef<T>();

  map.set(key, ref);
  return ref;
}

function getRef<T>(key: string) {
  if (!map.has(key)) return;
  return map.get(key) as React.RefObject<T>;
}

export function useDynamicRefs<T>(): [typeof getRef<T>, typeof setRef<T>] {
  return [getRef, setRef];
}
