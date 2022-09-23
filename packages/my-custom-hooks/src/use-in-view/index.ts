import { useState, useCallback } from "react";

interface UseInViewProps {
  options: IntersectionObserverInit;
}

export function useInView({ options }: UseInViewProps) {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const measureRef = useCallback(
    (node: Element | null) => {
      if (node) {
        const observer = new IntersectionObserver(([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        }, options);

        observer.observe(node);
        setObserver(observer);
      }
    },
    [options]
  );

  return { measureRef, isIntersecting, observer };
}
