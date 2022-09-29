import type { JSXElementConstructor } from "react";

export function inject<TProps, TInjectedKeys extends keyof TProps>(
  Component: JSXElementConstructor<TProps>,
  injector: Pick<TProps, TInjectedKeys>
) {
  return function Injected(props: Omit<TProps, TInjectedKeys>) {
    return <Component {...(props as TProps)} {...injector} />;
  };
}
