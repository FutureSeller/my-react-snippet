import "./App.css";

import { useState } from "react";

import { CountUp } from "./component/CountUp";
import { TimingFunctionSelector } from "./component/TimingFunctionSelector";
import { useTimingFunctionState, Status } from "./hooks/useTimingFunctionState";
import { isTimingFunction } from "./utils/timingFunctions";

import type { UseMyElapsedTimeProps } from "./hooks/useMyElapsedTime";
import type { TimingFunctionName } from "./utils/timingFunctions";

const TARGET_VALUE = 3000;
const STARTED_AT = 0;
const config: UseMyElapsedTimeProps = {
  duration: 5,
};

function App() {
  const { state, dispatch } = useTimingFunctionState();
  const [timingFunctionName, setTimingFunctionName] =
    useState<TimingFunctionName>("linear");

  return (
    <div className="App">
      <h1 className="App__title">RequestAnimationFrame</h1>
      <div className="App__Actions">
        <TimingFunctionSelector
          value={timingFunctionName}
          onChange={(e) => {
            if (isTimingFunction(e.currentTarget.value)) {
              dispatch({ type: Status.IDLE });
              setTimingFunctionName(e.currentTarget.value);
            }
          }}
        />
        <button
          onClick={() => {
            dispatch({ type: state.nextStatus });
          }}
        >
          {state.value}
        </button>
      </div>
      <div className="App__layout">
        <CountUp
          status={state.status}
          startedAt={STARTED_AT}
          value={TARGET_VALUE}
          timingFunctionName={timingFunctionName}
          onComplete={() => {
            dispatch({ type: Status.DONE });
          }}
          {...config}
        />
      </div>
    </div>
  );
}

export default App;
