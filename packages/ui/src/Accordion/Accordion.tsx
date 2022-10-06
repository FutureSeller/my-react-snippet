import { forwardRef, HTMLProps, useMemo } from "react";

import {
  AccordionProvider,
  AccordionDescendantsProvider,
} from "./accordion-context";
import { useAccordion } from "./use-accordion";

import type { UseAccordionProps } from "./use-accordion";

export interface AccordionProps
  extends UseAccordionProps,
    Omit<HTMLProps<HTMLDivElement>, keyof UseAccordionProps> {}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, ...rest }, ref) => {
    const { htmlProps, descendants, ...context } = useAccordion(rest);

    return (
      <AccordionDescendantsProvider value={descendants}>
        <AccordionProvider value={context}>
          <div ref={ref} {...htmlProps}>
            {children}
          </div>
        </AccordionProvider>
      </AccordionDescendantsProvider>
    );
  }
);
Accordion.displayName = "Accordion";
