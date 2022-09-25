import { useInView } from "my-custom-hooks";

import { HTMLProps, useEffect } from "react";

interface LazyLoadImageProps extends HTMLProps<HTMLDivElement> {
  src: string;
  alt: string;
  fallback: React.ReactNode;
}

export function LazyLoadImage({
  fallback,
  src,
  alt,
  ...attributes
}: LazyLoadImageProps) {
  const { measureRef, isIntersecting, observer } = useInView({
    options: {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    },
  });

  useEffect(() => {
    if (isIntersecting) {
      observer?.disconnect();
    }
  }, [isIntersecting]);

  return (
    <div ref={measureRef} {...attributes}>
      {isIntersecting ? (
        <img src={src} alt={alt} style={{ width: "100%", height: "100%" }} />
      ) : (
        fallback
      )}
    </div>
  );
}
