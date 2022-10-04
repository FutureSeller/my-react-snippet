import { useEffect } from "react";
import { useMyElapsedTime } from "../hooks/useMyElapsedTime";
import { Status } from "../hooks/useTimingFunctionState";
import timingFunctions from "../utils/timingFunctions";

import type { UseMyElapsedTimeProps } from "../hooks/useMyElapsedTime";
import type { TimingFunctionName } from "../utils/timingFunctions";

export function CountUp({
  status,
  value,
  timingFunctionName,
  ...config
}: {
  status: Status;
  value: number;
  timingFunctionName: TimingFunctionName;
} & UseMyElapsedTimeProps) {
  const { time, reset } = useMyElapsedTime({
    ...config,
    isPlaying: status === Status.PLAY,
  });
  const currentValue =
    value * timingFunctions[timingFunctionName](time / config.duration);

  useEffect(() => {
    if (status === Status.IDLE) {
      reset();
    }
  }, [status]);

  useEffect(() => {
    reset();
  }, [timingFunctionName]);

  return (
    <div style={{ fontSize: "32px", fontWeight: "700" }}>
      {Math.round(currentValue)}
    </div>
  );
}
