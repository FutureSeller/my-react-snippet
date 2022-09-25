import { Children, useEffect, isValidElement } from "react";
import { useInView } from "my-custom-hooks";

interface Props<T> {
  items: T[];
  hasMore: boolean;
  loadMore: () => void;
  children: React.ReactElement[];
}

export function InfiniteList<T>({
  items,
  hasMore,
  loadMore,
  children,
}: Props<T>) {
  const { measureRef, isIntersecting, observer } = useInView({
    options: {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    },
  });

  useEffect(() => {
    if (isIntersecting && hasMore) {
      loadMore();
      observer?.disconnect();
    }
  }, [isIntersecting, hasMore, loadMore]);

  return (
    <ul>
      {Children.map(children, (child, i) => {
        return isValidElement(child) && i === items.length - 1 ? (
          <child.type ref={measureRef} />
        ) : (
          child
        );
      })}
    </ul>
  );
}
