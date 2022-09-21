import { useReducer, useEffect, useRef } from "react";

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

type Status = Action<unknown>["type"];

interface State<T> {
  status: Status;
  data?: T;
  error?: Error;
}

export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit
): State<T> {
  const cache = useRef<Cache<T>>({});

  const initialState: State<T> = {
    status: "idle",
    error: undefined,
    data: undefined,
  };

  const reducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, status: action.type };
      case "fetched":
        return { ...initialState, data: action.payload, status: action.type };
      case "error":
        return { ...initialState, error: action.payload, status: action.type };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!url) {
      return;
    }

    const abortController = new AbortController();

    const fetchData = async () => {
      dispatch({ type: "loading" });

      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;

        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.warn("aborted request.");
          } else {
            dispatch({ type: "error", payload: error as Error });
          }
        } else {
          throw error;
        }
      }
    };

    void fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return state;
}
