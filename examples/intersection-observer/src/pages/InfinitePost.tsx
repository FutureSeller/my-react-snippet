import { useState, useEffect, useCallback } from "react";
import { useFetch } from "my-custom-hooks";

import { InfiniteList } from "../components/InfiniteList";
import type { Post } from "../model/post";

const ENDPOINT = "https://jsonplaceholder.typicode.com";
const LIMIT = 10;

export function InfinitePost() {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const { status, data } = useFetch<Post[]>(
    `${ENDPOINT}/posts?_page=${page}&_limit=${LIMIT}`
  );

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  useEffect(() => {
    if (status === "fetched" && !!data) {
      setPosts((prevComments) => prevComments.concat(data));
      setHasMore(data.length > 0);
    }
  }, [data]);

  return (
    <>
      {posts.length > 0 && (
        <InfiniteList items={posts} hasMore={hasMore} loadMore={loadMore}>
          {posts.map((post) => {
            return (
              <li key={post.id} className="card">
                {post.id}
                <br />
                {post.body}
              </li>
            );
          })}
        </InfiniteList>
      )}
    </>
  );
}
