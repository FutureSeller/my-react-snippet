import { useEffect } from "react";
import { useInView } from "my-custom-hooks";

import type { Post } from "../model/post";

interface Props {
  posts: Post[];
  hasMore: boolean;
  loadMore: () => void;
}

export function PostList({ posts, hasMore, loadMore }: Props) {
  const { measureRef, isIntersecting, observer } = useInView({
    options: {
      root: null,
      rootMargin: "0px",
      threshold: 0,
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
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <li ref={measureRef} key={post.id} className="card">
              {post.id}
              <br />
              {post.body}
            </li>
          );
        }

        return (
          <li key={post.id} className="card">
            {post.id}
            <br />
            {post.body}
          </li>
        );
      })}
    </ul>
  );
}
