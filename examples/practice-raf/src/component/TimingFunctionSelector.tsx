import timingFunctions from "../utils/timingFunctions";

import type { HTMLProps } from "react";

const TimingFunctions = Object.keys(timingFunctions);

export function TimingFunctionSelector({
  value = "linear",
  onChange,
}: HTMLProps<HTMLSelectElement>) {
  return (
    <select onChange={onChange} value={value}>
      {TimingFunctions.map((functionName) => {
        return (
          <option key={functionName} value={functionName}>
            {functionName}
          </option>
        );
      })}
    </select>
  );
}
