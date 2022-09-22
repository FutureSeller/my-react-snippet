// https://github.com/react-component/util/blob/master/src/hooks/useState.ts 에서 가져옴
import React from "react";

export type SetState<T> = (
  nextValue: React.SetStateAction<T>,
  /**
   * Will not update state when destroyed.
   * Developer should make sure this is safe to ignore.
   */
  ignoreDestroy?: boolean
) => void;

export function useSafeState<T>(defaultValue: T | (() => T)): [T, SetState<T>] {
  const destoryRef = React.useRef(false);
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    destoryRef.current = false;

    return () => {
      destoryRef.current = true;
    };
  }, []);

  function safeGetState(
    setStateAction: React.SetStateAction<T>,
    ignoreDestory?: boolean
  ) {
    if (ignoreDestory && destoryRef.current) {
      return;
    }

    setValue(setStateAction);
  }

  return [value, safeGetState];
}
