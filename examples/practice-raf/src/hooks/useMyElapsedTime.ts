import { useState, useRef, useEffect, useCallback } from "react";

export interface UseMyElapsedTimeProps {
  isPlaying?: boolean;
  duration: number;
  startedAt?: number;
  onComplete?: (time: number) => void;
}

export function useMyElapsedTime({
  isPlaying = true,
  duration,
  startedAt = 0,
  onComplete,
}: UseMyElapsedTimeProps) {
  const [time, setTime] = useState(startedAt);
  const elapsedTimeRef = useRef<number>(0);
  const previousTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);
  const repeatedTimeRef = useRef<NodeJS.Timeout | null>(null);

  const animate: FrameRequestCallback = (time) => {
    const timeSec = time / 1000;

    if (previousTimeRef.current === null) {
      previousTimeRef.current = timeSec;
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    const deltaTime = timeSec - previousTimeRef.current;
    const currentElapsedTime = elapsedTimeRef.current + deltaTime;

    previousTimeRef.current = timeSec;
    elapsedTimeRef.current = currentElapsedTime;

    const displayTime = startedAt + currentElapsedTime;
    const totalTime = startedAt + currentElapsedTime;
    const isCompleted = totalTime >= duration;

    setTime(isCompleted ? duration : displayTime);

    if (!isCompleted) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      onComplete?.(displayTime);
    }
  };

  const reset = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    elapsedTimeRef.current = 0;
    previousTimeRef.current = null;
    requestRef.current = null;
    setTime(startedAt);

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      requestRef.current && cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = null;
    };
  }, [isPlaying]);

  return {
    time,
    reset,
  };
}
