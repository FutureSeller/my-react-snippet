import React from "react";
import { inject } from "../hoc/injectProps";

const OrignalButton = ({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...rest}>{children}</button>;
};

export const Button = inject(OrignalButton, {
  style: { backgroundColor: "red" },
});
