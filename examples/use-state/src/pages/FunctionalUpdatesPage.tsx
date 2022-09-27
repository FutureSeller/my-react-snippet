import { useState } from "react";

export function FunctionalUpdatesPage() {
  const [counter, setState] = useState(0);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Counter: {counter}</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <div
          onClick={() => {
            console.log("increase in parent");
            setState(counter + 1);
            setState(counter + 1);
            setState(counter + 1);
            setState(counter + 1);
            setState(counter + 1);
          }}
        >
          <button
            onClick={() => {
              console.log("increase in button");
              setState(counter + 1);
              setState(counter + 1);
              setState(counter + 1);
              setState(counter + 1);
              setState(counter + 1);
            }}
          >
            Increment
          </button>
        </div>
        <div
          onClick={() => {
            console.log("increase in parent");
            setState((prevCounter) => prevCounter + 1);
          }}
        >
          <button
            onClick={() => {
              console.log("increase in button");
              setState((prevCounter) => prevCounter + 1);
            }}
          >
            Increment twice
          </button>
        </div>
      </div>
      <details style={{ marginTop: "40px" }}>
        <summary>왜 이런 현상이 발생할까?</summary>
        <div style={{ marginTop: "10px" }}>
          <a
            href="https://reactjs.org/docs/hooks-reference.html#lazy-initial-state"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lazy initial state
          </a>
          를 읽어보자.
        </div>
      </details>
    </div>
  );
}
