import { useState } from "react";

import { useMyElapsedTime } from "../hooks/useMyElapsedTime";

import type { UseMyElapsedTimeProps } from "../hooks/useMyElapsedTime";

const config: UseMyElapsedTimeProps = {
  isPlaying: true,
  duration: 8,
  startedAt: 0,
};

export function CountDown() {
  const [pause, setPause] = useState(false);
  const { time } = useMyElapsedTime({
    ...config,
    isPlaying: !pause,
  });

  return (
    <div>
      {Math.round(config.duration - time)}
      <button
        onClick={() => {
          setPause((prev) => !prev);
        }}
      >
        paused
      </button>
    </div>
  );
}
