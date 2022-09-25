import { useState, useEffect, useCallback } from "react";
import { useFetch } from "my-custom-hooks";

import { InfiniteList } from "../components/InfiniteList";
import { LazyLoadImage } from "../components/LazyLoadImage";

import type { Photo } from "../model/photo";

const ENDPOINT = "https://jsonplaceholder.typicode.com";
const LIMIT = 10;

export function LazyLoadImagePhoto() {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const { status, data } = useFetch<Photo[]>(
    `${ENDPOINT}/photos?_page=${page}&_limit=${LIMIT}`
  );

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  useEffect(() => {
    if (status === "fetched" && !!data) {
      setPhotos((prevPhotos) => prevPhotos.concat(data));
      setHasMore(data.length > 0);
    }
  }, [data]);

  return (
    <>
      {photos.length > 0 && (
        <InfiniteList items={photos} hasMore={hasMore} loadMore={loadMore}>
          {photos.map((photo) => {
            return (
              <li key={photo.id} className="card">
                {photo.id} - {photo.albumId} - {photo.title}
                <br />
                <LazyLoadImage
                  src={photo.url}
                  alt=""
                  fallback={
                    <div
                      style={{
                        background: "gray",
                        width: "100%",
                        height: "100%",
                      }}
                    ></div>
                  }
                  style={{
                    width: "300px",
                    height: "300px",
                  }}
                />
              </li>
            );
          })}
        </InfiniteList>
      )}
    </>
  );
}
