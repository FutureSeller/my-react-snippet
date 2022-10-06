import { forwardRef, useMemo } from "react";

import { AccordionItemProvider } from "./accordion-item-context";
import { useAccordionItem } from "./use-accordion-item";

import type { HTMLProps } from "react";
import type { UseAccordionItemProps } from "./use-accordion-item";

export interface AccordionItemProps
  extends Omit<
      HTMLProps<HTMLDivElement>,
      keyof UseAccordionItemProps | "children"
    >,
    UseAccordionItemProps {
  children?:
    | React.ReactNode
    | ((props: {
        isExpanded: boolean;
        isDisabled: boolean;
      }) => React.ReactNode);
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem(props, ref) {
    const { children } = props;
    const { htmlProps, ...context } = useAccordionItem(props);

    const ctx = useMemo(() => context, [context]);

    return (
      <AccordionItemProvider value={ctx}>
        <div ref={ref} {...htmlProps}>
          {typeof children === "function"
            ? children({
                isExpanded: !!context.isOpen,
                isDisabled: !!context.isDisabled,
              })
            : children}
        </div>
      </AccordionItemProvider>
    );
  }
);
