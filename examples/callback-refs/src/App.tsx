import "./App.css";

import { useEffect, useRef, useState } from "react";
import { useCallbackRef } from "my-custom-hooks";

import { Form } from "./component/Form";

function App() {
  const [forceRerender, setForceRerender] = useState(0);

  const callbackRef = useCallbackRef((node: HTMLInputElement) => {
    if (node !== null) {
      node.focus();
    }
  });

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="App">
      <h1 className="App__title">callback Refs vs. useRef</h1>
      <div className="App__Actions">
        <button
          onClick={() => {
            setForceRerender(forceRerender + 1);
          }}
        >
          force rerendering
        </button>
      </div>
      <div className="App__layout">
        <div>
          <h2>callback Ref with useCallback</h2>
          <Form ref={callbackRef} />
        </div>
        <div>
          <h2>callback Refs</h2>
          <Form ref={(node) => node?.focus()} />
        </div>
        <div>
          <h2>useRef</h2>
          <Form ref={ref} />
        </div>
      </div>
    </div>
  );
}

export default App;
