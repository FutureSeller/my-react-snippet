type Args<T extends (event?: any) => void> = T extends (...args: infer R) => any
  ? R
  : never;

export function callAllHandlers<T extends (event?: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function fun(event?: Args<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
}
