import "./App.css";

import { useState, useEffect, useCallback } from "react";
import { useFetch } from "my-custom-hooks";

import { PostList } from "./components/PostList";
import type { Post } from "./model/post";

const ENDPOINT = "https://jsonplaceholder.typicode.com";
const LIMIT = 10;

function App() {
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
    <div className="App">
      <h1>Infinite Scroll</h1>
      {posts.length > 0 && (
        <PostList posts={posts} hasMore={hasMore} loadMore={loadMore} />
      )}
    </div>
  );
}

export default App;
