import { forwardRef } from "react";
import { useAccordionContext } from "./accordion-context";
import { useAccordionItemContext } from "./accordion-item-context";

import type { HTMLProps } from "react";

export interface AccordionPanelProps extends HTMLProps<HTMLDivElement> {}

export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
  function AccordionPanel(props, ref) {
    const { getPanelProps } = useAccordionItemContext()!;

    const { children, ...panelProps } = getPanelProps(props, ref);

    return <div {...panelProps}>{children}</div>;
  }
);
