import { DependencyList, useEffect } from "react";

import type { RefObject } from "react";

interface UseEventListenerProps {
  type: keyof WindowEventMap;
  element?: RefObject<Element> | Element;
  listener: EventListenerOrEventListenerObject;
  deps?: DependencyList;
}

export function useEventListener({
  type,
  element,
  listener,
  deps = [],
}: UseEventListenerProps) {
  useEffect(() => {
    const target = element && "current" in element ? element.current : element;
    if (target == null) {
      return;
    }

    target.addEventListener(type, listener);

    return () => {
      target.removeEventListener(type, listener);
    };
  }, [...deps]);
}
