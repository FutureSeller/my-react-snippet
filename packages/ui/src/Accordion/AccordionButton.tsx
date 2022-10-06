import { forwardRef } from "react";
import { useAccordionItemContext } from "./accordion-item-context";

import type { HTMLProps } from "react";

export interface AccordionButtonProps extends HTMLProps<HTMLButtonElement> {}

export const AccordionButton = forwardRef<
  HTMLButtonElement,
  AccordionButtonProps
>(function AccordionButton(props, ref) {
  const { getButtonProps } = useAccordionItemContext()!;
  const { children, ...buttonProps } = getButtonProps(props, ref);

  const buttonStyles = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    outline: 0,
  };

  return (
    <button {...buttonProps} style={buttonStyles}>
      {children}
    </button>
  );
});
