import { useState } from "react";
import { flushSync, unstable_batchedUpdates } from "react-dom";

import { LogEvents } from "../components/LogEvents";

const fetchSomehting = () => {
  return new Promise((resolve) => setTimeout(resolve, 100));
};

export function BatchingCounterPage() {
  const [counter, setState] = useState(0);
  const [flag, setFlag] = useState(false);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ color: flag ? "blue" : "white" }}>Counter: {counter}</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => {
            /* 두 가지 상태 변경이 일어나지만 리렌더링은 한번만 일어남 */
            setState((counter) => counter + 1);
            setFlag((f) => !f);
          }}
        >
          Increment with event handler
        </button>
        <button
          onClick={() => {
            /* React 17버전 이하 batching 하는 방법 */
            fetchSomehting().then(() => {
              unstable_batchedUpdates(() => {
                setState((counter) => counter + 1);
                setFlag((f) => !f);
              });
            });
          }}
        >
          Increment with unstable_batchedUpdates
        </button>
        <button
          onClick={() => {
            /* React 18버전 이상 + createRoot: promise, timeout, event handler 등등 하나의 이벤트에서 발생한 상태 변경은 batching 한다. */
            fetchSomehting().then(() => {
              setState((counter) => counter + 1);
              setFlag((f) => !f);
            });
          }}
        >
          Increment with Promise
        </button>
        <button
          onClick={() => {
            /** 강제로 각각 batch하지 않고 실행하는 `flushSync`가 있음 */
            flushSync(() => {
              setState((counter) => counter + 1);
            });
            flushSync(() => {
              setFlag((f) => !f);
            });
          }}
        >
          Increment with flushSync
        </button>
        <button
          onClick={() => {
            /**
              이렇게 동작하는 이유는, 각각의 핸들러가 다르기 때문. 하나는 event, 하나는 promise 각각이 따로.
             */
            // batched 1
            setState((counter) => counter + 1);
            setFlag((f) => !f);

            fetchSomehting().then(() => {
              // batched 2
              setState((counter) => counter + 1);
              setFlag((f) => !f);
            });
          }}
        >
          Increment with umm..
        </button>
      </div>
      <LogEvents />
    </div>
  );
}
